"use strict";

const dataLayer = require('./masterDataLayer');

exports.getHWunmaintainedSKUs = async({
	skus
}) => {
	try {

		let maintainedSKUs = await dataLayer.getHWmaintainedSKUs({ skus });

		console.log("text dito ",skus)
		let uniqueSKUs = [... new Set(maintainedSKUs.map(x => x.sku))];

		console.log("text dito 2 ",uniqueSKUs)
		let difference = skus.filter(x => !uniqueSKUs.includes(x));

		return difference
	}
	catch(e) {
		console.log(e)
		throw e
	}
}