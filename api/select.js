"use strict";

const router = require('express').Router();
const { masterService } = require('../services/hw');
const { roleService } = require('../services/nyx');

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

router.get('/admin/:type', async(req,res) => {
	try {
		const {type} = req.params;

		let selectData;

		switch(type) {
			case 'role':
				let data = await roleService.getAllRole({filters:{role_status:true}})
				selectData = data.map(item => {
					return {
						value :item.role_id,
						label :item.role_name
					}
				})
				break;
			// case 'module':
			// 	let data = await moduleService.getAllModule({filters:{module_status:true}})
			// 	selectData = data.map(item => {
			// 		return {
			// 			value	:item.role_id,
			// 			label	:item.role_name
			// 		}
			// 	})
			// 	break;
			default:
				console.log(`WAS NOT ABLE TO CHECK FOR TYPE`)
		}

		// console.log('selectData', selectData)

		return res.status(200).json({
			data:selectData
		})
	}
	catch(e){
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

router.get('/reasoncode/:type', async(req,res) => {
	try {
		const {type} = req.params;

		let selectData;

		switch(type) {
			case 'role':
				let data = await roleService.getAllRole({filters:{role_status:true}})
				selectData = data.map(item => {
					return {
						value	:item.role_id,
						label	:item.role_name
					}
				})
				break;
			default:
				console.log(`WAS NOT ABLE TO CHECK FOR TYPE`)
		}

		console.log('selectData', selectData)

		return res.status(200).json({
			data:selectData
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