"use strict";

const router = require('express').Router();
const { masterService } = require('../services/hw');
const { employeeRoleService,
	reasoncodeService,
	moduleService,
	reportService,
	quickCodeService,
	userService,
	employeeService,
	roleService } = require('../services/nyx');
const serviceCatalogService = require('../services/nyx/wbs-serviceCatalog')

router.get('/administration/:type', async(req,res) => {
	try {
		const {type} = req.params;
		const {module_code} = req.query;
		let resultData, selectData;

		switch(type) {
			case 'module':
				resultData = await moduleService.getAllModule({filters:{module_status:true, }})
				selectData = resultData.map(item => {
					return {
						value :item.module_id,
						label :item.module_name
					}
				})
				break;
			case 'report':
				resultData = await reportService.getAllReport({filters:{report_status:true}})
				selectData = await resultData.reduce((acc, cur) => {
					if(cur.report_module_fk?.module_code === module_code) {
						acc.push({	value : cur.report_id,
									label : `${cur.report_code} : ${cur.report_name}`
						})
					}
					return acc;
				},[])
				break;
			case 'role':
				resultData = await roleService.getAllRole({filters:{role_status:true}})
				selectData = resultData.map(item => {
					return {
						value :item.role_id,
						label :item.role_name
					}
				})
				break;
			default:
				throw new Error(`Select was not able to check for TYPE:${type} from administration tables.`)
		}

		return res.status(200).json({
			data:selectData
		})
	}
	catch(e) {
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

router.get('/reasoncode/:type', async(req,res) => {
	try {
		const {type} = req.params;

		if(!type) {
			throw new Error(`Select type: '${type}', was not provided to lookup in reason code table.`)
		}

		let resultData = await reasoncodeService.getAllReasonCode({ filters : {rc_type:type, rc_status:true} });

		if(resultData.length === 0) {
			throw new Error(`Select type: '${type}', found 0 results from reason code table.`)
		}

		let selectData = resultData.map(item =>
			{
				return {
					value	:item.rc_id,
					label	:`${item.rc_code} : ${item.rc_desc}`
				}
			})

		return res.status(200).json({
			data:selectData
		})
	}
	catch(e) {
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
					const selectData = data.map(item => { return {
							label : item.warehouseDescr,
							value : item.warehouseId
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
	catch(e) {
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

router.get('/quick-code/:type', async(req,res)=>{
	try {
		const {type} = req.params;

		const data = await quickCodeService.getAllQuickCodes({
			filters:{
				qc_type:type,
				qc_status:'ACTIVE'
			}
		})

		res.status(200).json({
			data:data.map(item => {
				return {
					label:item.qc_name,
					value:item.qc_code
				}
			})
		})

	}
	catch(e) {
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

router.get('/employee', async(req,res)=>{
	try {
		const data = await employeeService.getAllEmployees({
			filters:{
				emp_status:'ACTIVE'
			}
		})

		res.status(200).json({
			data:data.map(item => {
				return {
					label:item.user_email,
					value:item.emp_id
				}
			})
		})
	}
	catch(e) {
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

router.get('/employee/:role',async(req,res)=>{
	try {
		const {role} = req.params
		const data = await employeeService.getAllEmployees({
			filters:{
				emp_status:'ACTIVE',
				'$employee_role.role_id$':role
			}
		})

		res.status(200).json({
			data:data.map(item => {
				return {
					label:item.user_email,
					value:item.emp_id
				}
			})
		})
	}
	catch(e) {

	}
})

router.get('/user', async(req,res)=>{
	try {
		//const {type} = req.params;

		const data = await userService.getAllUser({
			filters:{
				user_status:true,
				has_wbs:true
			}
		})

		res.status(200).json({
			data:data.map(item => {
				return {
					label:item.user_email,
					value:item.user_id
				}
			})
		})

	}
	catch(e) {
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

router.get('/role', async(req,res) => {
	try {

		const data = await employeeRoleService.getAllRoles({
			filters:{
				role_status:'ACTIVE'
			}
		})

		res.status(200).json({
			data:data.map(item => {
				return {
					label:item.role_name,
					value:item.role_id
				}
			})
		})

	}
	catch(e) {
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

router.get('/service-catalog', async(req,res) => {
	try {

		const data = await serviceCatalogService.getAllServiceCatalog({
			filters:{
				cat_status:'ACTIVE'
			}
		})

		res.status(200).json({
			data:data.map(item => {
				return {
					label:item.cat_name,
					value:item.catalog_id
				}
			})
		})

	}
	catch(e) {
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

router.get('/l2-service-catalog/:service_catalog',async(req,res)=>{
	try {
		const {service_catalog} = req.params;

		const data = await serviceCatalogService.getSubServiceCatalog({
			filters:{
				catalog_id: service_catalog
			}
		})

		res.status(200).json({
			data:data.map(item => {
				return {
					label: item.sub_catalog_name,
					value: item.id
				}
			})
		})
	}
	catch(e) {
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

module.exports = router;