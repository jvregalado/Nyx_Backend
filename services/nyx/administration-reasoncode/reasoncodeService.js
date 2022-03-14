"use strict";

const dataLayer = require('./dataLayer');

exports.createReasonCode = async({
	...data
}) => {
	try{

		return await dataLayer.createReasonCode({
			...data
		})

	}
	catch(e){
		throw e
	}
}

exports.getPaginatedReasonCode = async({
	filters
}) => {
	try{

		let {orderBy,page,totalPage,...newFilters} = filters
		return await dataLayer.getPaginatedReasonCode({
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

exports.getAllReasonCode = async({
	filters
}) => {
	try{

		return await dataLayer.getAllReasonCode({
			filter:filters
		})
		.then(result => JSON.parse(JSON.stringify(result)))
	}
	catch(e){
		throw e
	}
}

exports.updateReasonCode = async({
	filters,
	data
}) => {
	try{

		return await dataLayer.updateReasonCode({
			filters,
			data
		})

	}
	catch(e){
		throw e
	}
}