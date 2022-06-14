"use strict";

const {aelousZeus2, aelousZeus1, aelousArtemis, aelousEros} = require('../../../models/crossdock');
// const {sequelize, Sequelize} = models;

exports.getLatestPrimaryCustomer = async({
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
					'Primary Customer' AS 'data_sync_master_table'
			FROM customer_primary
			ORDER BY IF(updated>created, updated, created) DESC
			LIMIT 1`
		,{ type: seq_db.Sequelize.QueryTypes.SELECT })
		.then(result => JSON.parse(JSON.stringify(result)))
	}
	catch(e){
		throw e
	}
}

exports.getAllPrimaryCustomer_fromZeus2_byDate = async({
	date
}) => {
	try{
		return await aelousZeus2.customer_primary.findAll({
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

exports.upsertPrimaryCustomer = async({
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

		return await seq_db.customer_primary.bulkCreate(
			data
		,{
			updateOnDuplicate: [
				"code",
				"customer_category_id",
				"name_trade",
				"name_alias",
				"name_abbreviation",
				"address_billing",
				"address_shipping",
				"address_collection",
				"contact_person_name",
				"payment_term_id",
				"ship_to_code",
				"area_id",
				"cluster_id",
				"config",
				"check_expiry",
				"countering_requirements",
				"pickup_time_start",
				"pickup_time_end",
				"acceptance_time_start",
				"acceptance_time_end",
				"acceptance_days",
				"collection_schedule",
				"sales_district",
				"sales_office",
				"tax_class",
				"tax_description",
				"tax_number",
				"credit_limit",
				"receivables",
				"documents_for_return",
				"account_manager_name",
				"price_list",
				"price_group",
				"service_type_pricing_crossdock",
				"service_type_pricing_storage_handling",
				"service_type_pricing_storage",
				"service_type_pricing_domestic_freight",
				"service_type_pricing_ptsd",
				"service_type_rate_crossdock",
				"service_type_rate_storage_handling",
				"service_type_rate_storage",
				"service_type_rate_domestic_freight",
				"service_type_rate_ptsd",
				"business_style",
				"customer_stat",
				"status",
				"created_by",
				"updated_by",
				"created",
				"updated",
				"deleted",
				"contact_person_number",
				"account_manager_number",
				]
		}).then(result => JSON.parse(JSON.stringify(result)))
	}
	catch(e){
		throw e
	}
}
