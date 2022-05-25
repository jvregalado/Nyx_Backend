"use strict";

const dataLayer = require('./dataLayer');

exports.getLatestPrimaryCustomer = async({
	server
}) => {
	try{
		return await dataLayer.getLatestPrimaryCustomer({
			server
		})
	}
	catch(e){
		throw e
	}
}

exports.getAllPrimaryCustomer_fromZeus2_byDate = async({
	date
}) => {
	try{
		return await dataLayer.getAllPrimaryCustomer_fromZeus2_byDate({
			date
		})
	}
	catch(e){
		throw e
	}
}

exports.upsertPrimaryCustomer = async({
	server,
	data
}) => {
	try{
		return await dataLayer.upsertPrimaryCustomer({
			server,
			data
		})
	}
	catch(e){
		throw e
	}
}
