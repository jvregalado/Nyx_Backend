"use strict";

const router = require('express').Router();
const { userService } = require('../services/nyx');

router.post('/', async(req,res) => {
	try {
		const {data} = req.body;
		const processor = req.processor;

		if(!data.user_email || !data.user_first_name || !data.user_last_name) {
			throw new Error(`Email address, First and Last name cannot be empty.`)
		}

		await userService.createUser({...data, password: 'kerrylogistikus',
							createdBy: processor.user_id})

		res.status(200).end()
	}
	catch(e) {
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

router.get('/', async(req,res) => {
	try {
		let query = req.query;

		const {count, rows} = await userService.getPaginatedUser({
			filters:{
				...query
			},
		})

		res.status(200).json({
			data:rows,
			rows:count
		})
	}
	catch(e) {
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

router.get('/details', async(req,res) => {
	try {
		let query = req.query;

		const result = await userService.getAllUser({
			filters:{
				...query
			}
		})

		res.status(200).json({
			data:result
		})
	}
	catch(e) {
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

router.patch('/', async(req,res) => {
	try {
		const {data} = req.body;
		const processor = req.processor;

		if(!data.user_id) {
			throw new Error(`user_id and user_email is not provided.`)
		}

		if(!data.user_first_name || !data.user_last_name) {
			throw new Error(`First and Last name cannot be empty.`)
		}

		await userService.updateUser({
			filters:{
				user_id : data.user_id
			},
			data:{
				...data,
				updatedBy:processor.user_id
			}
		})
		res.status(200).end()
	}
	catch(e) {
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

module.exports = router;