"use strict";

const router = require('express').Router();
const { roleService } = require('../services/nyx');

router.post('/', async(req,res) => {
	try {
		const {data} = req.body;
		const processor = req.processor;

		if(!data.role_code || !data.role_name) {
			throw new Error(`Role code and Role name cannot be empty.`)
		}

		await roleService.createRole({...data,
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

		const {count, rows} = await roleService.getPaginatedRole({
			filters:{
				...query
			}
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

router.patch('/', async(req,res) => {
	try {
		const {data} = req.body;
		const processor = req.processor;

		if(!data.role_id) {
			throw new Error(`role_id is not provided.`)
		}

		if(!data.role_code || !data.role_name) {
			throw new Error(`Role code or Role name cannot be empty.`)
		}
		console.log('data',data)

		await roleService.updateRole({
			filters:{
				role_id : data.role_id
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

router.get('/details', async(req,res) => {
	try {
		let query = req.query;

		const result = await roleService.getRoleDetails({
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

router.get('/assignment', async(req,res) => {
	try {
		let query = req.query;

		const result = await roleService.getRoleDetailsAndAllModules({
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

router.put('/assignment', async(req,res) => {
	try {
		const {data} = req.body;
		const processor = req.processor;

		let bindProcessor = data.map(module => { return {...module,
			updatedBy: processor.user_id,
			createdBy: processor.user_id
		}})

		await roleService.putRoleDetails({
			data:bindProcessor
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