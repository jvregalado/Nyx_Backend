"use strict";

const models = require('../../../models/nyx');
const {sequelize,Sequelize} = models;

const formatFilters = ({
	model,
	filters
}) => {
	try {
		let formattedFilters;
		if(filters.search && filters.search !== '') {
			formattedFilters = {
				[Sequelize.Op.or]: [
					{
						role_id: {
							[Sequelize.Op.like]: `%${filters.search}%`
						}
					},
					{
						role_name: {
							[Sequelize.Op.like]: `%${filters.search}%`
						}
					},
					{
						role_remarks1: {
							[Sequelize.Op.like]: `%${filters.search}%`
						}
					}
				]
			};
		}
		else {
			formattedFilters = filters;
			const attributes = Object.keys(model).filter(h => !['createdAt','updatedAt'].includes(h))
			Object.keys(filters).map(field => {
				if(field==='search'){
					let fields = {}
					attributes.map(item => (fields[item] = filters.search))
					formattedFilters={
						...formattedFilters,
						[Sequelize.Op.or]:fields
					}

					delete formattedFilters["search"]
				}
			})
		}

		return formattedFilters
	}
	catch(e){
		throw e
	}
}

exports.createRole = async({
	...data
}) => {
	try {
		return await models.role_hdr_tbl.create({
			...data
		})
	}
	catch(e){
		throw e
	}
}

exports.getPaginatedRole = async({
	filters,
	orderBy,
	page,
	totalPage
}) => {
	try {

		let newFilter = formatFilters({
			model:models.role_hdr_tbl.rawAttributes,
			filters:filters
		});

		const {count,rows} = await models.role_hdr_tbl.findAndCountAll({
			where:{
				...newFilter
			},
			offset	:parseInt(page) * parseInt(totalPage),
			limit	:parseInt(totalPage),
			include:[
				{
					model:models.user_tbl,
					attributes:['user_email'],
					as:'creator',
					required:false
				},
				{
					model:models.user_tbl,
					attributes:['user_email'],
					as:'modifier',
					required:false
				}
			]
			// ,order	:[[orderBy]]
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
	catch (error) {
		throw error
	}
}

exports.getAllRole = async({
	filter
}) => {
	try{
		return await models.role_hdr_tbl.findAll({
			where:{
				...filter
			}
		})
	}
	catch(e){
		throw e
	}
}

exports.updateRole = async({
	filters,
	data,
	option
}) => {
	try{
		return await models.role_hdr_tbl.update(
			{
				...data
			},
			{
				where:{
					...filters
				}
			}
		)
	}
	catch(e){
		throw e
	}
}

exports.getRoleDetails = async({
	filters
}) => {
	try {
		return await models.role_hdr_tbl.findAll({
			where:{
				...filters
			},
			include:[
				{
					model:models.role_dtl_tbl,
					attributes:['module_id','role_module_status'],
					as:'role_dtl_fk',
					required:false,
					where:{
						role_module_status : true
					}
				}

			]
		})
	}
	catch(e){
		throw e
	}
}

exports.getRoleDetailsAndAllModules = async({
	filters
}) => {
	try {
		return await sequelize.query(`
			call sp_getRoleDetailsAndAllModules_cdi
				('${filters?.role_code || '' }')
			`,{
				type:sequelize.QueryTypes.SELECT
			})
		.then((result) => {
			return JSON.parse(JSON.stringify(result))
		})
	}
	catch(e){
		throw e
	}
}

exports.putRoleDetails = async({
	data
}) => {
	try {
		return await models.role_dtl_tbl.bulkCreate(
			data
		,{
			updateOnDuplicate: ["role_module_status", "updatedBy", "updatedAt"]
		})
	}
	catch(e){
		throw e
	}
}
