"use strict";

const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const token_expiry = process.env.JWT_EXP;

exports.generateToken = async({
	user_id,
	user_email
}) => {
	try{
		const token = jwt.sign({user_email:user_email,user_id:user_id},secret,{
			expiresIn:token_expiry
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