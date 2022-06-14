const router = require('express').Router()
const {employeeRoleService} = require('../services/nyx');

router.post('/',async(req,res)=>{
	try {

		const {data} = req.body;
		const user = req.processor;

		await employeeRoleService.createRole({
			data:{
				...data,
				created_by:user.user_id
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

router.post('/details',async(req,res)=>{
	try {
		const {data} = req.body;
		await employeeRoleService.bulkCreateRoleDetails({
			data
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

router.get('/',async(req,res)=>{
	try {
		const query = req.query;

		const {count,rows}=await employeeRoleService.getPaginatedRole({
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

router.get('/:role_id',async(req,res)=>{
	try {
		const {role_id} = req.params;

		const data = await employeeRoleService.getRole({
			filters:{
				role_id
			}
		})

		const details = await employeeRoleService.getRoleDetails({
			filters:{
				role_id
			}
		})

		res.status(200).json({
			data,
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

module.exports = router