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
						module_code: {
							[Sequelize.Op.like]: `%${filters.search}%`
						}
					},
					{
						module_name: {
							[Sequelize.Op.like]: `%${filters.search}%`
						}
					},
					{
						module_desc: {
							[Sequelize.Op.like]: `%${filters.search}%`
						}
					},
					{
						module_remarks1: {
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

exports.createModule = async({
	...data
}) => {
	try {
		return await models.module_tbl.create({
			...data
		}).then(result => JSON.parse(JSON.stringify(result)))
	}
	catch(e){
		throw e
	}
}

exports.getPaginatedModule = async({
	filters,
	orderBy,
	page,
	totalPage
}) => {
	try {
		let newFilter = formatFilters({
			model	:models.module_tbl.rawAttributes,
			filters	:filters
		});

		const {count,rows} = await models.module_tbl.findAndCountAll({
			where:{
				...newFilter
			},
			offset	:parseInt(page) * parseInt(totalPage),
			limit	:parseInt(totalPage)
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

exports.getAllModule = async({
	filter
}) => {
	try{
		return await models.module_tbl.findAll({
			where:{
				...filter
			}
		}).then(result => JSON.parse(JSON.stringify(result)))
	}
	catch(e){
		throw e
	}
}

exports.updateModule = async({
	filters,
	data,
	option
}) => {
	try{
		return await models.module_tbl.update(
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
