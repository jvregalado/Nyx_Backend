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
						role_id: {
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
		})
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
			filters:filters
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
	filter
}) => {
	try{
		return await models.user_tbl.findOne({
			where:{
				...filter
			}
		})
	}
	catch(e){
		throw e
	}
}

exports.getAllUser = async({
	filter
}) => {
	try{
		return await models.user_tbl.findAll({
			where:{
				...filter
			},
			include:[
				{
					model:models.role_hdr_tbl,
					attributes:['role_id','role_code','role_name'],
					as:'role',
					required:false
				}
			]
		})
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
        )
    }
    catch(e){
        throw e
    }
}