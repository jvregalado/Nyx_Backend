"use strict";

const dataLayer = require('./dataLayer');

exports.getLatestPriSecMap = async({
	server
}) => {
	try{
		return await dataLayer.getLatestPriSecMap({
			server
		})
	}
	catch(e){
		throw e
	}
}

exports.getAllPriSecMap_fromZeus2_byDate = async({
	date
}) => {
	try{
		return await dataLayer.getAllPriSecMap_fromZeus2_byDate({
			date
		})
	}
	catch(e){
		throw e
	}
}

exports.upsertPriSecMap = async({
	server,
	data
}) => {
	try{
		return await dataLayer.upsertPriSecMap({
			server,
			data
		})
	}
	catch(e){
		throw e
	}
}