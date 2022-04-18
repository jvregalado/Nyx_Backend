"use strict";

const router = require('express').Router();
const { reportService } = require('../services/nyx');

router.get('/report-sourcecode', async(req,res) => {
	try {
		let {report_id} = req.query;
		// let processor = req.processor;

		let result = await reportService.getAllReport({ filters : { report_id } })

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

router.post('/', async(req,res) => {
	try {
		let {data} = req.body;
		let processor = req.processor;

		// console.log('1',processor)
		// console.log('2',req.query)
		// console.log('3',req.body.data)

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