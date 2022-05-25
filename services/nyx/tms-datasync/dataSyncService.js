"use strict";

const dataLayer = require('./dataLayer');
const models = require('../../../models/nyx');

exports.createDataSyncLog = async({
	...data
}) => {
	try{
		return await dataLayer.createDataSyncLog({
			...data
		})
	}
	catch(e){
		throw e
	}
}

exports.getPaginatedDataSyncLog = async({
	filters
}) => {
	try{
		let {orderBy,page,totalPage,...newFilters} = filters
		return await dataLayer.getPaginatedDataSyncLog({
			orderBy:orderBy.split(','),
			page,
			totalPage,
			filters:{
				...newFilters
			}
		})
	}
	catch(e){
		throw e
	}
}

exports.updateDataSyncLog = async({
	filters,
	data
}) => {
	try{

		return await dataLayer.updateDataSyncLog({
			filters,
			data
		})
	}
	catch(e){
		throw e
	}
}
