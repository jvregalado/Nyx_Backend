"use strict";

const dataLayer = require('./dataLayer');


const sp_salem_sample_cdi = async({
	...data
}) => {
	try {
		return await dataLayer.sp_salem_sample_cdi({
			...data
		})
	}
	catch(e) {
		throw e
	}
}

exports.response_pdf = async({
	...data
}) => {
	try {
		let x = await sp_salem_sample_cdi({
			...data
		})

		console.log('xxxxxxxxx',x)

	}
	catch(e) {
		throw e
	}
}