"use strict";

const router = require('express').Router();
const moment = require('moment');

const { reportService, tmsDataSyncService } = require('../services/nyx');
const { primaryCustService,
	secondaryCustService,
	priSecMapService,
	materialService } = require('../services/crossdock');

router.get('/report-sourcecode', async(req,res) => {
	try {
		let {report_id} = req.query;

		let result = await reportService.getAllReport({ filters : { report_id } })

		res.status(200).json({
			data:result
		})
	}
	catch(e) {
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

router.get('/', async(req,res) => {
	try {
		let query = req.query;

		const {count, rows} = await tmsDataSyncService.getPaginatedDataSyncLog({
			filters:{
				...query
			}
		})

		res.status(200).json({
			data:rows,
			rows:count
		})

	}
	catch(e) {
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

router.get('/details', async(req,res) => {
	try {
		let {data} = req.body;
		let processor = req.processor;

		// let result = await tmsDataSyncService.get

		res.status(200).json()
	}
	catch(e) {
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

//## Manual Trigger Sync
router.post('/', async(req,res) => {
	try {
		let {data} = req.body;
		let processor = req.processor;

		const report = await reportService.getAllReport({filters:{
			report_id : data?.report?.value ?? 'unknown_report_id'
		}})

		/**GET REPORT(submodule) CODE*/
		if(!report || report.length === 0) { throw new Error('Report (target server) is not found.')}

		const targetCode = report[0].report_code;

		/**GET LAST MOVEMENT FROM TARGER SERVER*/
		const lastUpsert_priCust = await primaryCustService.getLatestPrimaryCustomer({ server : targetCode })
		const lastUpsert_secCust = await secondaryCustService.getLatestSecondaryCustomer({ server : targetCode })
		const lastUpsert_priSecMap = await priSecMapService.getLatestPriSecMap({ server : targetCode })
		const lastUpsert_material = await materialService.getLatestMaterial({ server : targetCode })

		/**GET DATA TO INSERT */
		const dataToInsert_priCust = await primaryCustService.getAllPrimaryCustomer_fromZeus2_byDate({
			date : lastUpsert_priCust[0]?.lastMovementDate })
		const dataToInsert_secCust = await secondaryCustService.getAllSecondaryCustomer_fromZeus2_byDate({
			date : lastUpsert_secCust[0]?.lastMovementDate })
		const dataToInsert_priSecMap = await priSecMapService.getAllPriSecMap_fromZeus2_byDate({
			date : lastUpsert_priSecMap[0]?.lastMovementDate })
		const dataToInsert_material = await materialService.getAllMaterial_fromZeus2_byDate({
			date : lastUpsert_material[0]?.lastMovementDate })

		/**CREATE LOGS */
		let logsToInsert_Header = [{
			report_id	: report[0].report_id,
			report_code	: report[0].report_code,
			createdBy	: processor.user_id
		}]

		let logsToInsert_Detail = [{
			datasync_master_table	: lastUpsert_priCust[0]?.data_sync_master_table ?? 'Primary Customer',
			datasync_latest_upsert	: lastUpsert_priCust[0]?.lastMovementDate,
			datasync_data_rows		: dataToInsert_priCust.length,
			createdBy				: processor.user_id
		},{
			datasync_master_table	: lastUpsert_secCust[0]?.data_sync_master_table ?? 'Secondary Customer',
			datasync_latest_upsert	: lastUpsert_secCust[0]?.lastMovementDate,
			datasync_data_rows		: dataToInsert_secCust.length,
			createdBy				: processor.user_id
		},{
			datasync_master_table	: lastUpsert_priSecMap[0]?.data_sync_master_table ?? 'Primary Secondary Map',
			datasync_latest_upsert	: lastUpsert_priSecMap[0]?.lastMovementDate,
			datasync_data_rows		: dataToInsert_priSecMap.length,
			createdBy				: processor.user_id
		},{
			datasync_master_table	: lastUpsert_material[0]?.data_sync_master_table ?? 'Material',
			datasync_latest_upsert	: lastUpsert_material[0]?.lastMovementDate,
			datasync_data_rows		: dataToInsert_material.length,
			createdBy				: processor.user_id
		}]

		let logs = await tmsDataSyncService.createDataSyncLog({
			logsToInsert_Header,
			logsToInsert_Detail,
		})

		/**UPSERT DATA TO TARGER SERVER */
		await primaryCustService.upsertPrimaryCustomer({ server: targetCode, data: dataToInsert_priCust })
		await secondaryCustService.upsertSecondaryCustomer({ server: targetCode, data: dataToInsert_secCust })
		await priSecMapService.upsertPriSecMap({ server: targetCode, data: dataToInsert_priSecMap })
		await materialService.upsertMaterial({ server: targetCode, data: dataToInsert_material })

		let update_logs = logs.map(foo => {
			return {
				datasync_id				: foo?.datasync_id,
				datasync_dtl_id			: foo?.datasync_dtl_id,
				datasync_master_table	: foo?.datasync_master_table,
				datasync_data_rows		: foo?.datasync_data_rows,
				datasync_status			: true
			}
		})

		await tmsDataSyncService.updateDataSyncLog({
			data : update_logs
		})

		res.status(200).end()
	}
	catch(e) {
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

module.exports = router;