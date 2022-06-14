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
						rc_code: {
							[Sequelize.Op.like]: `%${filters.search}%`
						}
					},
					{
						rc_type: {
							[Sequelize.Op.like]: `%${filters.search}%`
						}
					},
					{
						rc_desc: {
							[Sequelize.Op.like]: `%${filters.search}%`
						}
					},
					{
						rc_remarks1: {
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

exports.createReasonCode = async({
	...data
}) => {
	try {
		return await models.reason_code_tbl.create({
			...data
		}).then(result => JSON.parse(JSON.stringify(result)))
	}
	catch(e) {
		throw e
	}
}

exports.getPaginatedReasonCode = async({
	filters,
	orderBy,
	page,
	totalPage
}) => {
	try {
		let newFilter = formatFilters({
			model:models.reason_code_tbl.rawAttributes,
			filters:filters
		});

		const {count,rows} = await models.reason_code_tbl.findAndCountAll({
			where:{
				...newFilter
			},
			offset	:parseInt(page) * parseInt(totalPage),
			limit	:parseInt(totalPage)
			,order	:[[orderBy]]
			,include:[
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

exports.getAllReasonCode = async({
	filter
}) => {
	try {
		return await models.reason_code_tbl.findAll({
			where:{
				...filter
			}
		}).then(result => JSON.parse(JSON.stringify(result)))
	}
	catch(e) {
		throw e
	}
}

exports.updateReasonCode = async({
	filters,
	data,
	option
}) => {
	try {
		return await models.reason_code_tbl.update(
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
