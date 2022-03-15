"use strict";

const router = require('express').Router();
const { masterService } = require('../services/hw');
const { moduleService, roleService, reasoncodeService } = require('../services/nyx');

router.get('/master/:type', async(req,res) => {
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
			//console.log('selectData', selectData)
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

		let resultData, selectData;

		switch(type) {
			case 'role':
				resultData = await roleService.getAllRole({filters:{role_status:true}})
				selectData = resultData.map(item => {
					return {
						value :item.role_id,
						label :item.role_name
					}
				})
				break;
			// case 'module':
			// 	resultData = await moduleService.getAllModule({filters:{module_status:true}})
			// 	selectData = resultData.map(item => {
			// 		return {
			// 			value	:item.role_id,
			// 			label	:item.role_name
			// 		}
			// 	})
			// 	break;
			default:
				console.log(`WAS NOT ABLE TO CHECK FOR TYPE from ADMIN`)
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

		let resultData, selectData;

		switch(type) {
			case 'Report System Type':
				resultData = await reasoncodeService.getAllReasonCode({ filters : {rc_type:type, rc_status:true} })
				selectData = resultData.map(item => {
					return {value	:item.rc_id,
							label	:item.rc_desc
					}
				})
				break;
			case 'Report Type':
				resultData = await reasoncodeService.getAllReasonCode({ filters : {rc_type:type, rc_status:true} })
				selectData = resultData.map(item => {
					return {value	:item.rc_id,
							label	:item.rc_desc
					}
				})
				break;
			default:
				console.log(`WAS NOT ABLE TO CHECK FOR TYPE from REASON CODE`)
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

module.exports = router;