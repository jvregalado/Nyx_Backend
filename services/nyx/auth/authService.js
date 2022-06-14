"use strict";

const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const token_expiry = process.env.JWT_EXP;

const dataLayer = require('./dataLayer');

exports.generateToken = async({
	user_id,
	user_email
}) => {
	try {
		const token = jwt.sign({user_email:user_email,user_id:user_id},secret,{
			expiresIn:token_expiry
		})
		const decode = jwt.verify(token,secret)

		return {
			token,
			expiry:decode.exp
		}
	}
	catch(e) {
		throw e
	}
}

exports.saveUserSession = async({
	user_id,
	user_email,
	user_token,
	user_token_expiry
}) => {
	try {

		return await dataLayer.upsertUserSession({
			user_id,
			user_email,
			user_token,
			user_token_expiry
		})

	}
	catch(e) {
		throw e
	}
}

exports.getUserSession = async({
	user_id,
	user_email,
	user_token
}) => {
	try {

		return await dataLayer.getUserSession({
			user_id,
			user_email,
			user_token
		})

	}
	catch(e) {
		throw e
	}
}