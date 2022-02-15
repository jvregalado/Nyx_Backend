"use strict";

const models = require('../../../models/hw/index');
const { sequelize } = models;

exports.getHWmaintainedSKUs = async({
	skus
}) => {
	try {
		return await sequelize.query(
			`SELECT * FROM BAS_SKU
			WHERE activeFlag = 'Y'
				AND sku in (${skus.map(x => '\''+x+'\'').join(',')})`,
			{
				type:sequelize.QueryTypes.SELECT
			})
		.then((result) => {
			//console.log(result)
			return JSON.parse(JSON.stringify(result))
		})
	}
	catch(e) {
		console.log(e)
		throw e
	}
}