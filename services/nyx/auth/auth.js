"use strict";

const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

exports.generateToken = async({
    email
}) => {
    try{
        const token = jwt.sign({email:email},secret,{
            expiresIn:"24h"
        })
        const decode = jwt.verify(token,secret)

        return {
            token,
            expiry:decode.exp
        }
    }
    catch(e){
        throw e
    }
}