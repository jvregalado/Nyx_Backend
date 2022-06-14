"use strict";

const {aelousZeus2, aelousZeus1, aelousArtemis, aelousEros} = require('../../../models/crossdock');
// const {sequelize, Sequelize} = models;

exports.getLatestSecondaryCustomer = async({
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
					'Secondary Customer' AS 'data_sync_master_table'
			FROM customer_secondary
			ORDER BY IF(updated>created, updated, created) DESC
			LIMIT 1`
		,{ type: seq_db.Sequelize.QueryTypes.SELECT })
		.then(result => JSON.parse(JSON.stringify(result)))
	}
	catch(e){
		throw e
	}
}

exports.getAllSecondaryCustomer_fromZeus2_byDate = async({
	date
}) => {
	try{
		return await aelousZeus2.customer_secondary.findAll({
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

exports.upsertSecondaryCustomer = async({
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

		return await seq_db.customer_secondary.bulkCreate(
			data
		,{
			updateOnDuplicate: [
				"customer_primary_id",
				"customer_category_id",
				"prioritization",
				"name_trade",
				"name_alias",
				"address_billing",
				"ship_to_code",
				"ship_to_name",
				"ship_to_address",
				"contact_person_name",
				"account_manager_name",
				"cluster_id",
				"documents_for_return",
				"acceptance_time_start",
				"acceptance_time_end",
				"delivery_days",
				"status",
				"created_by",
				"updated_by",
				"created",
				"updated",
				"deleted",
				"account_manager_number",
				"area_id",
				"city_id",
				"contact_person_number"
			]
		}).then(result => JSON.parse(JSON.stringify(result)))
	}
	catch(e){
		throw e
	}
}
