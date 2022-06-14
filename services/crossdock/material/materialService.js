"use strict";

const dataLayer = require('./dataLayer');

exports.getLatestMaterial = async({
	server
}) => {
	try {
		return await dataLayer.getLatestMaterial({
			server
		})
	}
	catch(e) {
		throw e
	}
}

exports.getAllMaterial_fromZeus2_byDate = async({
	date
}) => {
	try {
		return await dataLayer.getAllMaterial_fromZeus2_byDate({
			date
		})
	}
	catch(e) {
		throw e
	}
}

exports.upsertMaterial = async({
	server,
	data
}) => {
	try {
		return await dataLayer.upsertMaterial({
			server,
			data
		})
	}
	catch(e) {
		throw e
	}
}