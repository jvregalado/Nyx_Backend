"use strict";

const dataLayer = require('./dataLayer');

exports.sp_Traceability_cdi = async({
	...data
}) => {
	try {
		return await dataLayer.sp_Traceability_cdi({
			...data
		})
	}
	catch(e) {
		throw e
	}
}
