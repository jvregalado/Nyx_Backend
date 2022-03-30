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
						user_email: {
							[Sequelize.Op.like]: `%${filters.search}%`
						}
					},
					{
						user_first_name: {
							[Sequelize.Op.like]: `%${filters.search}%`
						}
					},
					{
						user_last_name: {
							[Sequelize.Op.like]: `%${filters.search}%`
						}
					},
					{
						user_contact_no: {
							[Sequelize.Op.like]: `%${filters.search}%`
						}
					},
					{
						user_remarks1: {
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

exports.createUser = async({
	...data
}) => {
	try {
		return await models.user_tbl.create({
			...data
		}).then(result => JSON.parse(JSON.stringify(result)))
	}
	catch(e){
		throw e
	}
}

exports.getPaginatedUser = async({
	filters,
	orderBy,
	page,
	totalPage
}) => {
	try {
		let newFilter = formatFilters({
			model:models.user_tbl.rawAttributes,
			filters
		});

		const {count,rows} = await models.user_tbl.findAndCountAll({
			where:{
				...newFilter
			},
			offset	:parseInt(page) * parseInt(totalPage),
			limit	:parseInt(totalPage),
			include:[
				{
					model:models.role_hdr_tbl,
					attributes:['role_name'],
					as:'role'
				},
				{
					model:models.reason_code_tbl,
					attributes:['rc_id','rc_desc'],
					as:'user_position_fk'
				},
				{
					model:models.reason_code_tbl,
					attributes:['rc_id','rc_desc'],
					as:'user_whLocation_fk'
				},
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
				rows: rows.map(item => {
					const {role,...users} = item
					return {
						...users,
						role_name:role?.role_name
					}
				}), 
				count
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

exports.getUser = async({
	filters
}) => {
	try{
		return await models.user_tbl.findOne({
			where:{
				...filters
			},
			include:[
				{
					model:models.role_hdr_tbl,
					attributes:['role_id','role_code'],
					as:'role',
					required:false,
					include:[
						{
							model:models.role_dtl_tbl,
							attributes:['module_id'],
							as:'role_dtl_fk',
							required:false
						}
					]
				}
			]
		}).then(result => JSON.parse(JSON.stringify(result)))
	}
	catch(e){
		throw e
	}
}

exports.getAllUser = async({
	filters
}) => {
	try{
		return await models.user_tbl.findAll({
			where:{
				...filters
			},
			include:[
				{
					model:models.role_hdr_tbl,
					attributes:['role_id','role_code','role_name'],
					as:'role',
					required:false
				},
				{
					model:models.reason_code_tbl,
					attributes:['rc_id','rc_desc'],
					as:'user_position_fk',
					required:false
				},
				{
					model:models.reason_code_tbl,
					attributes:['rc_id','rc_desc'],
					as:'user_whLocation_fk',
					required:false
				}
			]
		}).then(result => JSON.parse(JSON.stringify(result)))
	}
	catch(e){
		throw e
	}
}

exports.updateUser = async({
	filters,
	data,
	option
}) => {
	try{
		return await models.user_tbl.update(
			{
				...data
			},
			{
				where:{
					...filters
				}
			}
		).then(result => JSON.parse(JSON.stringify(result)))
	}
	catch(e){
		throw e
	}
}
