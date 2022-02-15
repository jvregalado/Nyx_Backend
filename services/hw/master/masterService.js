"use strict";

const dataLayer = require('./masterDataLayer');

exports.getHWunmaintainedSKUs = async({
	skus
}) => {
	try {

		let maintainedSKUs = await dataLayer.getHWmaintainedSKUs({ skus });

		let uniqueSKUs = [... new Set(maintainedSKUs.map(x => x.sku))];

		let difference = skus.filter(x => !uniqueSKUs.includes(x));

		return difference
	}
	catch(e) {
		console.log(e)
		throw e
	}
}

exports.getSKUs = async({
	skus
}) => {
	try {

		let maintainedSKUs = await dataLayer.getHWmaintainedSKUs({ skus });

		let uniqueSKUs = [... new Set(maintainedSKUs.map(x => x.sku))];

		let difference = skus.filter(x => !uniqueSKUs.includes(x));

		return difference
	}
	catch(e) {
		console.log(e)
		throw e
	}
}