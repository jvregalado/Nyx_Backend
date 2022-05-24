"use strict";

const _ = require('lodash')
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
			//orderBy:orderBy.split(','),
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
			filters
		})
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

exports.getRoleDetails = async({
	filters
}) => {
	try{
		return await dataLayer.getRoleDetails({
			filters
		})
	}
	catch(e){
		throw e
	}
}

exports.getRoleDetailsAndAllModules = async({
	filters
}) => {
	try{
		return await dataLayer.getRoleDetailsAndAllModules({
			filters
		})
	}
	catch(e){
		throw e
	}
}

exports.putRoleDetails = async({
	data
}) => {
	try{
		return await dataLayer.putRoleDetails({
			data
		})
	}
	catch(e){
		throw e
	}
}
