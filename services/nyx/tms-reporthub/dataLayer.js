"use strict";

const models = require('../../../models/scmdb_tms');
const {sequelize,Sequelize} = models;

exports.sp_DFDailyMonitoring_cdi = async({
	dateFrom
}) => {
	try {
		return await sequelize.query(
			`EXEC sp_DFDailyMonitoring_cdi '${dateFrom}'`,
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
