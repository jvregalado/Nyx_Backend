"use strict";

const router = require('express').Router();

router.post('/', async(req,res) => {
	try {
		let {data} = req.body;
		let processor = req.processor;

		console.log('1',processor)
		console.log('2',data)

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