"use strict";

const moment = require('moment')
const router = require('express').Router()

const accessWeightChecker = require('../middleware/accessWeightChecker')
const { reportService,
	wmsReporthubService } = require('../services/nyx');


router.get('/report-sourcecode', accessWeightChecker, async(req,res) => {
	try {
		let {report_id} = req.query;
		// let processor = req.processor;

		let result = await reportService.getAllReport({ filters : { report_id } })

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

router.post('/xlsx', async(req,res) => {
	try {
		let {data} = req.body;
		let processor = req.processor;

		//## To log all the details from frontend; needed to generate the report.
		// console.log('1', processor)
		// console.log('2', req.query)
		// console.log('3', data)

		//## Get the report(from report service) based on the dropdown report of frontend
		let report = await reportService.getAllReport({
			filters : {
				report_id : data?.report?.value ?? ''
			}
		})

		if(report.length !== 1) { console.log('Report not found.') }

		let filename = `${report[0].report_name} - ${moment(new Date()).format('MMDDYYY_HHmmsss')}.xlsx`;

		//## Get the generated report
		let { contents, filepath } = await wmsReporthubService.generateReport_XLSX({
			report,
			filters : data,
			filename
		})

		res.status(200).json({
			contents,
			filepath,
			filename
		})
	}
	catch(e) {
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

router.post('/pdf', async(req,res) => {
	try {

	}
	catch(e) {
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

module.exports = router;