"use strict";

const router = require('express').Router();
const { masterService } = require('../services/hw');
const { roleService, reasoncodeService, moduleService } = require('../services/nyx');

router.get('/administration/:type', async(req,res) => {
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
			case 'module':
				resultData = await moduleService.getAllModule({filters:{module_status:true}})
				selectData = resultData.map(item => {
					return {
						value	:item.module_id,
						label	:item.module_name
					}
				})
				break;
			default:
				throw new Error(`Select was not able to check for TYPE:${type} from administration table.`)
		}

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
			case 'Warehouse Location':
				resultData = await reasoncodeService.getAllReasonCode({ filters : {rc_type:type, rc_status:true} })
				selectData = resultData.map(item => { return { value	:item.rc_id,
																label	:item.rc_desc}})
				break;
			case 'Job Position':
				resultData = await reasoncodeService.getAllReasonCode({ filters : {rc_type:type, rc_status:true} })
				selectData = resultData.map(item => { return { value	:item.rc_id,
																label	:item.rc_desc}})
				break;
			case 'Report System Type':
				resultData = await reasoncodeService.getAllReasonCode({ filters : {rc_type:type, rc_status:true} })
				selectData = resultData.map(item => { return { value	:item.rc_id,
																label	:item.rc_desc}})
				break;
			case 'Report Type':
				resultData = await reasoncodeService.getAllReasonCode({ filters : {rc_type:type, rc_status:true} })
				selectData = resultData.map(item => { return { value	:item.rc_id,
																label	:item.rc_desc}})
				break;
			default:
				throw new Error(`Select was not able to check for TYPE:${type} from reason code table.`)
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

router.get('/masterdata/:type', async(req,res) => {
	try {
		const {systemType} = req.query;
		const {type} = req.params;

		switch(systemType) {
			case 'wms' :
				if(type === 'Report') {
					const data = await masterService.getWhseID()
					const selectData = data.map(item => {
						return {
							label:`${item.warehouseDescr}`,
							value:item.warehouseId
						}
					})
					return res.status(200).json({
						data:selectData
					})

				}
				else { throw new Error(`Select was not able to check for Type:${systemType}`) }
			default:
				throw new Error(`Select was not able to check for System Type:${systemType}`)
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