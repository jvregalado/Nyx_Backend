"use strict";

const router = require('express').Router();
const { reasoncodeService } = require('../services/nyx');

router.post('/', async(req,res) => {
	try{
		const {data} = req.body;
		const processor = req.processor;

		if(!data.rc_type || !data.rc_code || !data.rc_desc) {
			throw new Error(`Reason type, code, and description cannot be empty.`)
		}

		await reasoncodeService.createReasonCode({...data,
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

		const {count, rows} = await reasoncodeService.getPaginatedReasonCode({
			filters:{
				...query
			},
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

		const result = await reasoncodeService.getAllReasonCode({
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

		if(!data.rc_id) {
			throw new Error(`Reason id is not provided.`)
		}

		if(!data.rc_desc) {
			throw new Error(`Reason description cannot be empty.`)
		}

		await reasoncodeService.updateReasonCode({
			filters:{
				rc_id : data.rc_id
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