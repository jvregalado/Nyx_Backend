"use strict";

const models = require('../../models/scmdb_wms');
const {sequelize, Sequelize} = models;

exports.sp_Traceability_cdi = async({
	whLocation,
	dateFrom,
	dateTo,
	itemCode,
	batch,
	type,
	refDoc,
	destination,
	customer,
	palletID
}) => {
	try {
		return await sequelize.query(
			`EXEC sp_cron_Traceability_cdi
				'${whLocation ?? ''}',
				'${dateFrom ?? ''}',
				'${dateTo ?? ''}',
				'${itemCode ?? ''}',
				'${batch ?? ''}',
				'${type ?? ''}',
				'${refDoc ?? ''}',
				'${destination ?? ''}',
				'${customer ?? ''}',
				'${palletID ?? ''}'
			`,
			{
				type:sequelize.QueryTypes.SELECT
			})
		.then((result) => {
			return JSON.parse(JSON.stringify(result))
		})
	}
	catch(e) {
		console.log(e)
		throw e
	}
}
