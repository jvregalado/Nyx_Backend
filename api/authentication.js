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

		if(!getUser.user_status){
			return res.status(404).json({
				message:'User inactive'
			})
		}

		if(!bcrypt.compareSync(user_password, getUser.user_password)){
			return res.status(400).json({
				message:'Invalid Email or Password'
			})
		}

		const token = await authService.generateToken({
			user_email	: getUser.user_email,
			user_id		: getUser.user_id
		})

		let expiryDate = new moment(token?.expiry * 1000).format('YYYY-MM-DD HH:mm')

		await authService.saveUserSession({
			user_id				: getUser.user_id,
			user_email			: getUser.user_email,
			user_token			: token?.token,
			user_token_expiry	: expiryDate
		})

		let role = getUser?.role?.role_code || '';

		res.status(200).json({
			user_email,
			token,
			role
		})
	}
	catch(e){
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

router.post('/password_change', async(req, res) => {
	try{
		const {user_email, user_old_password, user_new_password} = req.body?.data;

		const getUser = await userService.getUser({
			filters:{
				user_email
			}
		})

		if(!getUser){
			return res.status(400).json({
				message:'User not found'
			})
		}

		if(!getUser.user_status){
			return res.status(400).json({
				message:'User inactive'
			})
		}

		if(!bcrypt.compareSync(user_old_password, getUser.user_password)){
			return res.status(400).json({
				message:'Old password is incorrect'
			})
		}

		await userService.updateUser({
			filters:{user_email},
			data:{user_new_password}
		})

		res.status(200).end()
	}
	catch(e){
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

module.exports = router;