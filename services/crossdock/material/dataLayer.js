"use strict";

const {aelousZeus2, aelousZeus1, aelousArtemis, aelousEros} = require('../../../models/crossdock');
// const {sequelize, Sequelize} = models;

exports.getLatestMaterial = async({
	server
}) => {
	try {
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
					'Material' AS 'data_sync_master_table'
			FROM material
			ORDER BY IF(updated>created, updated, created) DESC
			LIMIT 1`
		,{ type: seq_db.Sequelize.QueryTypes.SELECT })
		.then(result => JSON.parse(JSON.stringify(result)))
	}
	catch(e) {
		throw e
	}
}

exports.getAllMaterial_fromZeus2_byDate = async({
	date
}) => {
	try {
		return await aelousZeus2.material.findAll({
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
	catch(e) {
		throw e
	}
}

exports.upsertMaterial = async({
	server,
	data
}) => {
	try {
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

		return await seq_db.material.bulkCreate(
			data
		,{
			updateOnDuplicate: [
				"material_category_id",
				"description",
				"case_length",
				"case_width",
				"case_height",
				"case_weight",
				"case_barcode",
				"piece_weight",
				"piece_barcode",
				"pallet_max_layer",
				"pallet_max_case",
				"layer_max_case",
				"weight_unit",
				"unit_measure",
				"unit_conversion",
				"status",
				"cluster_id",
				"created_by",
				"updated_by",
				"created",
				"updated",
				"deleted" ]
		}).then(result => JSON.parse(JSON.stringify(result)))
	}
	catch(e) {
		throw e
	}
}
