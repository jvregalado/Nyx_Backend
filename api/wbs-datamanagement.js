const router = require('express').Router();
const {catalogService,projectService,employeeRoleService} = require('../services/nyx')

router.post('/service-catalog',async(req,res)=>{
	try {
		const {data} = req.body;
		const createCatalog = await catalogService.createCategoryTransaction({
			header:data.header,
			details:data.details.map(item => {
				return {
					...item,
					created_by:req.processor.user_id
				}
			})
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

router.get('/service-catalog',async(req,res)=>{
	try {
		const query=req.query;

		const {count,rows}=await catalogService.getPaginatedServiceCatalogs({
			filters:{
				...query
			}
		})

		res.status(200).json({
			count,
			data:rows
		})

	}
	catch(e) {
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}

})

router.get('/service-catalog/:catalog_id',async(req,res)=>{
	try {
		const {catalog_id} = req.params

		const details = await catalogService.getSubServiceCatalog({
			filters:{
				catalog_id
			}
		})

		const header = await catalogService.getServiceCatalog({
			filters:{
				catalog_id
			}
		})

		res.status(200).json({
			header,
			details
		})
	}
	catch(e) {
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

router.get('/service-catalog/l3-service-catalog/:sub_catalog_id',async(req,res)=>{
	try {
		const {sub_catalog_id} = req.params;

		const data = await catalogService.getAllL3ServiceCatalog({
			filters:{
				sub_catalog_id
			}
		})

		res.status(200).json({
			data
		})
	}
	catch(e) {
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

router.put('/service-catalog/:catalog_id',async(req,res)=>{
	try {
		const {data} = req.body;
		const {catalog_id} = req.params

		await catalogService.updateServiceCatalogTransaction({
			header:{
				cat_status:data.header.cat_status,
				updated_by:req.processor.user_id
			},
			filters:{
				catalog_id:catalog_id
			},
			details:data.details.map(item => {
				return {
					...item,
					updated_by:req.processor.user_id,
					created_by:req.processor.user_id
				}
			})
		})

		res.status(200).json()

	}
	catch(e) {
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

router.post('/service-catalog/l3-service-catalog',async(req,res)=>{
	try {
		const {data} = req.body

		await catalogService.bulkCreateL3Catalog({
			data:data.map(item => {
				return {
					...item,
					created_by:req.processor.user_id,
					updated_by:req.processor.user_id
				}
			})
		})

		res.status(200).end()
	}
	catch (error) {
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

router.get('/project-code',async(req,res)=>{
	try {
		const query=req.query;

		const {count,rows}=await projectService.getPaginatedProjects({
			filters:{
				...query
			}
		})

		res.status(200).json({
			count,
			data:rows
		})
	}
	catch(e) {
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

router.get('/project-code/:project_code',async(req,res)=>{
	try {

		const {project_code} = req.params

		const project = await projectService.getProject({
			filters:{
				project_code
			}
		})

		res.status(200).json({
			project
		})
	}
	catch(e) {
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

router.get('/project-code/:resource_id/employee', async(req,res)=>{
	try {
		const {resource_id} = req.params;

		const data = await projectService.getAllEmpResource({
			filters:{
				fk_resource_id:resource_id
			}
		})

		res.status(200).json({
			data
		})

	}
	catch(e) {
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

router.post('/project-code',async(req,res)=>{
	try {
		const {data} = req.body

		const project = await projectService.createProject({
			data:{
				...data,
				created_by:req.processor.user_id
			}
		})

		res.status(200).json({
			project
		})
	}
	catch(e) {
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

router.post('/project-code/role', async(req,res)=>{
	try {
		const {data} = req.body;
		await projectService.createRoleResource({
			data:{
				...data,
				created_by:req.processor.user_id
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

router.post('/projet-code/employee',async(req,res)=>{
	try {
		const {data} = req.body;
		await projectService.createEmployeeResource({
			data:data.map(item => {
				return {
					...item,
					created_by:req.processor.user_id,
					updated_by:req.processor.user_id
				}
			})
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

router.get('/role-details/:role_id', async(req,res)=>{
	try {
		const {role_id} = req.params;

		const data = await employeeRoleService.getRoleDetails({
			filters:{
				role_id
			}
		})

		res.status(200).json({
			data
		})
	}
	catch(e) {
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

module.exports = router