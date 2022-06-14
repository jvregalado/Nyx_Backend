const models = require('../../../models/nyx');
const {useFormatFilters} = require('../../../helpers');
const {globalSearchFilter} = useFormatFilters;

const {sequelize,Sequelize} = models
const {Op} = Sequelize

const createProject = async({data,options}) => {
	try {
		return await models.wbs_project_hdr_tbl.create({
			...data
		},
		{
			...options
		}
		)
	}
	catch(e) {
		throw e
	}
}

const createRoleResource = async({data,options})=>{
	try {
		return await models.wbs_project_resource_role_tbl.create({
			...data
		},
		{
			...options
		})
	}
	catch(e) {
		throw e
	}
}

const createEmployeeResource = async({data,options})=>{
	try {
		return await models.wbs_project_resource_emp_tbl.bulkCreate(data,{
			...options
		})
	}
	catch(e) {
		throw e
	}
}

const getAllProjects = async({filters})=>{
	try {
		return await models.wbs_project_hdr_tbl.findAll({
			where:{
				...filters
			}
		})
		.then(result => JSON.parse(JSON.stringify(result)))
	}
	catch(e) {
		throw e
	}
}

const getPaginatedProjects = async({
	filters,
	orderBy,
	page,
	totalPage
})=>{
	try {
		let newFilter = globalSearchFilter({
			model:models.wbs_project_hdr_tbl.rawAttributes,
			filters
		})

		const {count,rows} = await models.wbs_project_hdr_tbl.findAndCountAll({
			where:{
				...newFilter
			},
			offset:parseInt(page)*parseInt(totalPage),
			limit :parseInt(totalPage),
		})
		.then(result => {
			let {count,rows} = JSON.parse(JSON.stringify(result))
			return {
				count,
				rows
			}
		})

		return {
			count,
			rows
		}
	}
	catch(e) {
		throw e
	}
}

const getProject = async({
	filters
})=>{
	try {
		return await models.wbs_project_hdr_tbl.findOne({
			include:[
				{
					model:models.wbs_project_resource_role_tbl,
					include:[
						{
							model:models.wbs_employee_role_tbl,
							attributes:['role_description','role_name'],
							as:'role'
						},
						{
							model:models.wbs_service_catalogs_hdr_tbl,
							attributes:['cat_name'],
							as:'service_catalog'
						}
					],
					as:'project_roles'
				}

			],
			where:{
				...filters
			}
		})
		.then(result => JSON.parse(JSON.stringify(result)))
	}
	catch(e) {
		throw e
	}
}

const getAllEmpResource = async({filters})=>{
	try {
		return await models.wbs_project_resource_emp_tbl.findAll({
			include:[
				{
					model:models.wbs_employee_tbl,
					include:[
						{
							model:models.user_tbl,
							as:'user_tbl'
						}
					],
					as:'employee'
				},
				{
					model:models.wbs_project_hdr_tbl,
					as:'project'
				},
				{
					model:models.wbs_employee_role_tbl,
					where:{
						role_status:'ACTIVE'
					},
					as:'employee_role'
				},
				{
					model:models.wbs_project_resource_role_tbl,
					include:[
						{
							model:models.wbs_service_catalogs_hdr_tbl,
							as:'service_catalog'
						}
					],
					where:{
						[Op.and]:[
							sequelize.where(sequelize.col('project_roles.project_role'),sequelize.col('wbs_project_resource_emp_tbl.project_role'))
						],
						is_active:1
					},
					as:'project_roles'
				}
			],
			where:{
				...filters
			}
		})
		.then(result => {
			return JSON.parse(JSON.stringify(result))
		})

	} catch (error) {
		throw error
	}
}

module.exports = {
	createProject,
	createRoleResource,
	createEmployeeResource,
	getAllProjects,
	getPaginatedProjects,
	getProject,
	getAllEmpResource
}