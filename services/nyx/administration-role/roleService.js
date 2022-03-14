"use strict";

const dataLayer = require('./dataLayer');

exports.createRole = async({
	...data
}) => {
	try{

		return await dataLayer.createRole({
			...data
		})

	}
	catch(e){
		throw e
	}
}

exports.getPaginatedRole = async({
	filters
}) => {
	try{

		let {orderBy,page,totalPage,...newFilters} = filters
		return await dataLayer.getPaginatedRole({
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

exports.getAllRole = async({
	filters
}) => {
	try{

		return await dataLayer.getAllRole({
			filter:filters
		})
		.then(result => JSON.parse(JSON.stringify(result)))
	}
	catch(e){
		throw e
	}
}

exports.updateRole = async({
	filters,
	data
}) => {
	try{

		return await dataLayer.updateRole({
			filters,
			data
		})

	}
	catch(e){
		throw e
	}
}