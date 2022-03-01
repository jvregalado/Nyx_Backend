"use strict";

const router = require('express').Router();
const { masterService } = require('../services/hw');

router.get('/whseLocation', async(req,res) => {
	try {
		let {systemType} = req.query;

		if(systemType==='wms') {
			const data = await masterService.getWhseID()
			const selectData = data.map(item => {
				return {
					label:`${item.warehouseDescr}`,
					value:item.warehouseId
				}
			})
			console.log('selectData', selectData)
			return res.status(200).json({
				data:selectData
			})
		}

	}
	catch(e){
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

module.exports = router;