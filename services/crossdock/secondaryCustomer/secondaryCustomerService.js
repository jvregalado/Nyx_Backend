"use strict";

const dataLayer = require('./dataLayer');

exports.getLatestSecondaryCustomer = async({
	server
}) => {
	try{
		return await dataLayer.getLatestSecondaryCustomer({
			server
		})
	}
	catch(e){
		throw e
	}
}

exports.getAllSecondaryCustomer_fromZeus2_byDate = async({
	date
}) => {
	try{
		return await dataLayer.getAllSecondaryCustomer_fromZeus2_byDate({
			date
		})
	}
	catch(e){
		throw e
	}
}

exports.upsertSecondaryCustomer = async({
	server,
	data
}) => {
	try{
		return await dataLayer.upsertSecondaryCustomer({
			server,
			data
		})
	}
	catch(e){
		throw e
	}
}
