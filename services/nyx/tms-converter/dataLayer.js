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
						id: {
							[Sequelize.Op.like]: `%${filters.search}%`
						}
					},
					{
						uploaded_by: {
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



exports.getAllrtv = async({
	filters
}) => {
	try{
		return await models.rtv_stored_converted_hdr.findAll({
			where:{
				...filters
			},
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
				as:'checker',
				required:false
			},
			{
				model:models.user_tbl,
				attributes:['user_email'],
				as:'generate',
				required:false
			},
			{
				model:models.user_tbl,
				attributes:['user_email'],
				as:'lastgenerate',
				required:false
			}
			]
		}).then(result => JSON.parse(JSON.stringify(result)))
	}
	catch(e){
		throw e
	}
}

exports.getPaginatedRTV = async({
	filters,
	orderBy,
	page,
	totalPage
}) => {
	try {
		let newFilter = formatFilters({
			model:models.rtv_stored_converted_hdr.rawAttributes,
			filters
		});

		const {count,rows} = await models.rtv_stored_converted_hdr.findAndCountAll({
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
					as:'checker',
					required:false
				},
				{
					model:models.user_tbl,
					attributes:['user_email'],
					as:'generate',
					required:false
				},
				{
					model:models.user_tbl,
					attributes:['user_email'],
					as:'lastgenerate',
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

exports.createRTVhdr = async({
	...data
}) => {
	try {
		return await models.rtv_stored_converted_hdr.create({
			...data
		}).then(result => JSON.parse(JSON.stringify(result)))
	}
	catch(e){
		throw e
	}
}
exports.createRTVdtl = async({
	...data
}) => {
	try {
		return await models.rtv_stored_converted_dtl.create({
			...data
		}).then(result => JSON.parse(JSON.stringify(result)))
	}
	catch(e){
		throw e
	}
}

exports.getStoredRTV = async({
	rtvno,
	customerCode
}) => {
	try {
		return await sequelize.query(
			`SELECT * FROM rtv_stored_converted_dtl
			WHERE customer_code = '${customerCode}'
				AND rtv_no in (${rtvno.map(x => '\''+x+'\'').join(',')})`,
			{
				type:sequelize.QueryTypes.SELECT
			})
		.then((result) => {
			//console.log(result)
			return JSON.parse(JSON.stringify(result))
		})
	}
	catch(e) {
		console.log(e)
		throw e
	}
}

exports.updateRTVhdr = async({
	filters,
	data
}) => {
	try{
		return await models.rtv_stored_converted_hdr.update(
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
