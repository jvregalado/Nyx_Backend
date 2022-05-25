"use strict";

const {aelousZeus2, aelousZeus1, aelousArtemis, aelousEros} = require('../../../models/crossdock');
// const {sequelize, Sequelize} = models;

exports.getLatestPriSecMap = async({
	server
}) => {
	try{
		let seq_db;

		switch(server) {
			case 'TMS-AELOUS-ZEUS1':
				seq_db = aelousZeus1;
				break;
			case 'TMS-AELOUS-ARTEMIS':
				seq_db = aelousArtemis;
				break;
			case 'TMS-AELOUS-EROS':
				seq_db = aelousEros;
				break;
			default:
				throw new Error(`Unknown server for syncing.`)
		}

		return await seq_db.query(
			`SELECT id,
					updated,
					created,
					IF(updated>created, updated,created) 'lastMovementDate',
					'Primary Secondary Map' AS 'data_sync_master_table'
			FROM primary_secondary_map
			ORDER BY IF(updated>created, updated, created) DESC
			LIMIT 1`
		,{ type: seq_db.Sequelize.QueryTypes.SELECT })
		.then(result => JSON.parse(JSON.stringify(result)))
	}
	catch(e){
		throw e
	}
}

exports.getAllPriSecMap_fromZeus2_byDate = async({
	date
}) => {
	try{
		return await aelousZeus2.primary_secondary_map.findAll({
			where:{
				[aelousZeus2.Sequelize.Op.or]: [
					{
						created: {
							[aelousZeus2.Sequelize.Op.gt]: date ?? new Date("2000-01-01")
						}
					},
					{
						updated: {
							[aelousZeus2.Sequelize.Op.gt]: date ?? new Date("2000-01-01")
						}
					}
				]
			}
		}).then(result => JSON.parse(JSON.stringify(result)))
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
		let seq_db;

		switch(server) {
			case 'TMS-AELOUS-ZEUS1':
				seq_db = aelousZeus1;
				break;
			case 'TMS-AELOUS-ARTEMIS':
				seq_db = aelousArtemis;
				break;
			case 'TMS-AELOUS-EROS':
				seq_db = aelousEros;
				break;
			default:
				throw new Error(`Unknown server for syncing.`)
		}

		return await seq_db.primary_secondary_map.bulkCreate(
			data
		,{
			updateOnDuplicate: [
				"customer_primary_id",
				"customer_secondary_id",
				"ship_to_code_primary",
				"prioritization",
				"created",
				"updated",
				"deleted",
				"ship_to_code",
				"ship_to_name",
				"name_registered"
			]
		}).then(result => JSON.parse(JSON.stringify(result)))
	}
	catch(e){
		throw e
	}
}
