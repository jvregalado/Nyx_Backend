const express = require("express");
const tbl_users = require("../../models/CT/tbl_users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { route } = require(".");

const router = express.Router();

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
router.get("/Authentication",verifyJWT,(req,res)=>{
    console.log("working");
    res.send("Authenticated");
})
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
                    last_name: userWithEmail.last_name
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