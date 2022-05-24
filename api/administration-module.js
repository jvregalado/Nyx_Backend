"use strict";

const router = require('express').Router();
const { moduleService } = require('../services/nyx');

router.post('/', async(req,res) => {
	try{
		const {data} = req.body;
		const processor = req.processor;

		if(!data.module_code || !data.module_name) {
			throw new Error(`Module code and Module name cannot be empty.`)
		}

		await moduleService.createModule({...data,
							createdBy: processor.user_id})

		res.status(200).end()
	}
	catch(e){
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

router.get('/', async(req,res) => {
	try {
		let query = req.query;

		const {count, rows} = await moduleService.getPaginatedModule({
			filters:{
				...query
			}
		})

		res.status(200).json({
			data:rows,
			rows:count
		})
	}
	catch(e){
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

router.get('/details', async(req,res) => {
	try {
		let query = req.query;

		const result = await moduleService.getAllModule({
			filters:{
				...query
			}
		})

		res.status(200).json({
			data:result
		})
	}
	catch(e){
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

router.patch('/', async(req,res) => {
	try{
		const {data} = req.body;
		const processor = req.processor;

		if(!data.module_id) {
			throw new Error(`module_id is not provided.`)
		}

		if(!data.module_code || !data.module_name) {
			throw new Error(`Module code or Module name cannot be empty.`)
		}

		await moduleService.updateModule({
			filters:{
				module_id : data.module_id
			},
			data:{
				...data,
				updatedBy:processor.user_id
			}
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