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
						report_code: {
							[Sequelize.Op.like]: `%${filters.search}%`
						}
					},
					{
						report_name: {
							[Sequelize.Op.like]: `%${filters.search}%`
						}
					},
					{
						report_type: {
							[Sequelize.Op.like]: `%${filters.search}%`
						}
					},
					{
						report_remarks1: {
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
	catch(e) {
		throw e
	}
}

exports.createReport = async({
	...data
}) => {
	try {
		return await models.report_tbl.create({
			...data
		}).then(result => JSON.parse(JSON.stringify(result)))
	}
	catch(e) {
		throw e
	}
}

exports.getPaginatedReport = async({
	filters,
	orderBy,
	page,
	totalPage
}) => {
	try {

		let newFilter = formatFilters({
			model:models.report_tbl.rawAttributes,
			filters:filters
		});

		const {count,rows} = await models.report_tbl.findAndCountAll({
			where:{
				...newFilter
			},
			offset	:parseInt(page) * parseInt(totalPage),
			limit	:parseInt(totalPage),
			include:[
				{
					model:models.reason_code_tbl,
					attributes:['rc_id','rc_desc'],
					as:'report_type_fk',
					required:false
				},
				{
					model:models.module_tbl,
					attributes:['module_name'],
					as:'report_module_fk',
					required:false
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

exports.getAllReport = async({
	filters
}) => {
	try {
		return await models.report_tbl.findAll({
			where:{
				...filters
			},
			include:[
				{
					model:models.module_tbl,
					attributes:['module_id','module_code','module_name'],
					as:'report_module_fk'
				},
				{
					model:models.reason_code_tbl,
					attributes:['rc_id','rc_code','rc_type','rc_desc'],
					as:'report_type_fk',
					required:false
				}
			]
		}).then(result => JSON.parse(JSON.stringify(result)))
	}
	catch(e) {
		throw e
	}
}

exports.updateReport = async({
	filters,
	data,
	option
}) => {
	try {
		return await models.report_tbl.update(
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
	catch(e) {
		throw e
	}
}
