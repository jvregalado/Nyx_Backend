"use strict";

const dataLayer = require('./dataLayer');

exports.createReport = async({
	...data
}) => {
	try{

		return await dataLayer.createReport({
			...data
		})

	}
	catch(e){
		throw e
	}
}

exports.getPaginatedReport = async({
	filters
}) => {
	try{

		let {orderBy,page,totalPage,...newFilters} = filters
		return await dataLayer.getPaginatedReport({
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

exports.getAllReport = async({
	filters
}) => {
	try{

		return await dataLayer.getAllReport({
			filter:filters
		})
		.then(result => JSON.parse(JSON.stringify(result)))
	}
	catch(e){
		throw e
	}
}

exports.updateReport = async({
	filters,
	data
}) => {
	try{

		return await dataLayer.updateReport({
			filters,
			data
		})

	}
	catch(e){
		throw e
	}
}