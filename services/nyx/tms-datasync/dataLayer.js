"use strict";

const models = require('../../../models/nyx');
const {sequelize, Sequelize} = models;

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
						datasync_hdr_remarks1: {
							[Sequelize.Op.like]: `%${filters.search}%`
						}
					},
					{
						datasync_hdr_remarks2: {
							[Sequelize.Op.like]: `%${filters.search}%`
						}
					},
					{
						datasync_hdr_remarks3: {
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

exports.createDataSyncLog = async({
	logsToInsert_Header,
	logsToInsert_Detail
}) => {
	try {
		return await sequelize.transaction(async(t1) => {

			//## HEADER
			let insert_result = await models.datasync_log_hdr_tbl.bulkCreate(logsToInsert_Header,
				{logging: false, transaction : t1
			}).then(result => JSON.parse(JSON.stringify(result)));

			logsToInsert_Detail = logsToInsert_Detail.map(foo => {
				return {
					...foo,
					datasync_id : insert_result[0].datasync_id
				}
			})

			//## DETAIL
			return await models.datasync_log_dtl_tbl.bulkCreate(
				logsToInsert_Detail, {logging: false, transaction : t1})
				.then(result => JSON.parse(JSON.stringify(result)));

		})
	}
	catch(e) {
		throw e
	}
}

exports.getPaginatedDataSyncLog = async({
	filters,
	orderBy,
	page,
	totalPage
}) => {
	try {
		let newFilter = formatFilters({
			model:models.datasync_log_hdr_tbl.rawAttributes,
			filters
		});

		const {count,rows} = await models.datasync_log_hdr_tbl.findAndCountAll({
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
			,order	:[[orderBy]]
		})
		.then(result => {
			let {count, rows} = JSON.parse(JSON.stringify(result))
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

exports.updateDataSyncLog = async({
	data
}) => {
	try {
		await models.datasync_log_dtl_tbl.bulkCreate(
			data
		,{
			updateOnDuplicate: [
				"datasync_status"
			]
		}).then(result => JSON.parse(JSON.stringify(result)))
	}
	catch(e) {
		throw e
	}
}
