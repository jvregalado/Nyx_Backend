"use strict";

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const moment = require('moment');

const { userService, authService } = require('../services/nyx');

router.post('/sign-out',(req, res) => {
	res.status(200).end();
})

router.post('/connection',async(req,res) => {
	try{
		res.status(200).end()
	}
	catch(e){
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

router.post('/token', async(req,res) => {
	try{
		const {user_email, user_password} = req.body;

		const getUser = await userService.getUser({
			filters:{
				user_email
			}
		})

		if(!getUser){
			return res.status(404).json({
				message:'Invalid Email or Password'
			})
		}

		if(!getUser.dataValues.user_status){
			return res.status(404).json({
				message:'User inactive'
			})
		}

		if(!bcrypt.compareSync(user_password,getUser.user_password)){
			return res.status(400).json({
				message:'Invalid Email or Password'
			})
		}

		const token = await authService.generateToken({
			user_email	: getUser['dataValues'].user_email,
			user_id		: getUser['dataValues'].user_id
		})

		let expiryDate = new moment(token?.expiry * 1000).format('YYYY-MM-DD HH:mm')

		await authService.saveUserSession({
			user_id				: getUser['dataValues'].user_id,
			user_email			: getUser['dataValues'].user_email,
			user_token			: token?.token,
			user_token_expiry	: expiryDate
		})

		res.status(200).json({
			user_email,
			token
		})
	}
	catch(e){
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

module.exports = router;