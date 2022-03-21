"use strict";

const dataLayer = require('./dataLayer');

exports.createModule = async({
	...data
}) => {
	try{

		return await dataLayer.createModule({
			...data
		})

	}
	catch(e){
		throw e
	}
}

exports.getPaginatedModule = async({
	filters
}) => {
	try{

		let {orderBy,page,totalPage,...newFilters} = filters
		return await dataLayer.getPaginatedModule({
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

exports.getAllModule = async({
	filters
}) => {
	try{

		return await dataLayer.getAllModule({
			filter:filters
		})
		.then(result => JSON.parse(JSON.stringify(result)))
	}
	catch(e){
		throw e
	}
}

exports.updateModule = async({
	filters,
	data
}) => {
	try{

		return await dataLayer.updateModule({
			filters,
			data
		})

	}
	catch(e){
		throw e
	}
}