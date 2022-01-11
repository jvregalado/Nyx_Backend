const express = require("express");
const tbl_users = require("../../models/CT/tbl_users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const moment = require("moment");

const router = express.Router();

const defaultPassword = 'logistikus';
const hashed = bcrypt.hashSync(defaultPassword, 10);

const verifyJWT = (req,res,next)=>{
    const token = req.headers["x-access-token"]
    if(!token){
        res.send("No token found.")
    }
    else{
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded) => {
            if(err){
                res.json({auth: false, message: "Failed to authenticate"});
            }else{
                req.userId = decoded.id;
                next();
            }
        })
    }
}

//Aunthentication of token
router.get("/Authentication",verifyJWT,(req,res)=>{
    res.send("Authenticated");
})

//creating user
router.post("/createuser", async (req, res) => {
    try{
        const {
        email_add,
        first_name,
        suffix,
        last_name,
        createdBy,
        userAdmin,
        contactNo
    } = req.body;
    const creatingUser = await tbl_users.create({
        email_add,
        first_name,
        suffix,
        last_name,
        createdBy,
        userAdmin,
        password:hashed,
        contactNo
    })
    res.status(200).json({
        creatingUser
    });
}
catch(e){
    console.log(e,"console log error")
    console.log(e.message, "original")
        if(e.message === 'Validation error'){
            return res.status(400).json({
                message:'Email already exists!'
            });
        }
        res.status(500).json({
            message:`${e}`
        });
}
})


router.post("/changepassword", async (req, res) => {
    const {
        id,
        newPassword,
        oldPassword
    } = req.body;
    
    const userWithID = await tbl_users.findOne({
        where: {
            id
        }
    }).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );
    const correctPass = await bcrypt.compare(oldPassword, userWithID.password);
    if(correctPass)
    {
        const newPass = bcrypt.hashSync(newPassword, 10);
        const changePassword = await tbl_users.update(
            { password:newPass
             },
            { where: {
                id:userWithID.id
            }
        }).catch(
            (err) => {
                console.log("Error: ", err);
            }
        );
        res.status(200).json({
            changePassword,
            message: "Password has been changed!"
        });
    }
    else{
        return res.status(500).json({
            message: "Incorrect old password!",
            auth: false
        })
    }
})
router.post("/resetpassword", async (req, res) => {
    const {
        email_add,
        id
    } = req.body;

    const userWithEmail = await tbl_users.findOne({
        where: {
            email_add
        }
    }).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );
    
    if (!userWithEmail)
        return res
            .status(400)
            .json({
                message: "Email does not exist."
            });
            28

var now = moment().format('YYYY-d-MM HH:mm:ss')
    if (userWithEmail)
    {
        const resetPassword = await tbl_users.update(
            { password:hashed,
                updatedBy: id,
                updatedAt: now
             },
            { where: {
                id:userWithEmail.id
            }
        }).catch(
            (err) => {
                console.log("Error: ", err);
            }
        );
        res.status(200).json({
            resetPassword,
            message: "Password Reset!"
        });
    }
})

//login
router.post("/", async (req, res) => {
    const {
        email_add,
        password
    } = req.body;

    const userWithEmail = await tbl_users.findOne({
        where: {
            email_add
        }
    }).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );

    if (!userWithEmail)
        return res
            .status(400)
            .json({
                message: "Email or password does not match!",
                auth: false
            });
    if (userWithEmail) {
        const correctPass = await bcrypt.compare(password, userWithEmail.password);
        if (correctPass) {
            const jwtToken = jwt.sign({
                    id: userWithEmail.id,
                    email_add: userWithEmail.email_add,
                    first_name: userWithEmail.first_name,
                    last_name: userWithEmail.last_name,
                },
                process.env.JWT_SECRET
            );
            res.json({
                message: "Welcome Back!",
                token: jwtToken,
                auth: true,
                user:{
                    id: userWithEmail.id,
                    email_add: userWithEmail.email_add,
                    first_name: userWithEmail.first_name,
                    last_name: userWithEmail.last_name,
                    userAdmin: userWithEmail.userAdmin
                }
            });
        }
        else {
            return res.status(500).json({
                message: "Email or password does not match!",
                auth: false
            })
        }
    }
});

module.exports = router;