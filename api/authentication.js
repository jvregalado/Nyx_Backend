"use strict";

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { user, auth } = require('../services/nyx');

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
		const {email, password} = req.body;

		const getUsers = await user.getUser({
			filters:{
				email
			}
		})

		if(getUsers.length === 0){
			return res.status(404).json({
				message:'Invalid Email or Password'
			})
		}

		if(!bcrypt.compareSync(password,getUsers.password)){
			return res.status(400).json({
				message:'Invalid Email or Password'
			})
		}

		const token = await auth.generateToken({
			email
		})

		// const rawModules = await roles.getRoleModule({
		// 	 filters:{
		// 		 role_id:getUsers.user_role_id,
		// 		 has_access:1
		// 	 }
		// })

		// const modules = await roles.formatRoleModules({data:rawModules})
		// console.log(modules)
		// req.session.userId = getUsers.id
		// req.session.token_expiry = token.expiry

		res.status(200).json({
			token
			// ,modules
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