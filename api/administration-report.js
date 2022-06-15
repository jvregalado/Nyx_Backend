"use strict";

const router = require('express').Router();
const { reportService } = require('../services/nyx');

router.post('/', async(req,res) => {
	try {
		const {data} = req.body;
		const processor = req.processor;

		if(!data.report_code || !data.report_name) {
			throw new Error(`Report code and Report name cannot be empty.`)
		}

		await reportService.createReport({...data,
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

		const {count, rows} = await reportService.getPaginatedReport({
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

router.get('/details', async(req,res) => {
	try {
		let query = req.query;

		const result = await reportService.getAllReport({
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

		if(!data.report_id) {
			throw new Error(`report_id is not provided.`)
		}

		if(!data.report_code || !data.report_name) {
			throw new Error(`Report code or Report name cannot be empty.`)
		}

		await reportService.updateReport({
			filters:{
				report_id : data.report_id
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