"use strict";

const scmdb_wms_Service = require('../../scmdb_wms');
const { json2Excel,
	dataFormat } = require('../../../helpers');

exports.generateReport_XLSX = async({
	report,
	filters
}) => {
	try {

		let report_code = report[0].report_code;
		let arrayJsonData = [];

		let newFilters = await dataFormat.normalizeFilterFromFrontend({
			filters
		})

		let filename = `${report[0].report_code}.xlsx`

		switch(report_code) {
			case 'WMS-MGMT-A004' : //## Traceability Report
				//## Geth the data rows
				let queryResult = await scmdb_wms_Service.sp_Traceability_cdi({
					...newFilters
				})

				//## Check if data rows is empty
				if(queryResult.length === 0) { throw new Error('No datarows found.')}

				//## Insert the data rows to sheet1. Can accommodate multiple sheets.
				arrayJsonData.push({ sheetName:'sampleSheetName', sheetData: queryResult })
				break;
			default:
				throw new Error(`No XLSX downloading for the report.`)
		}

		let { contents, filepath } = await json2Excel.ArrayJson2Xlsx({
			arrayJsonData,
			filename
		})

		return {
			contents,
			filepath,
			filename
		}

	}
	catch(e) {
		throw e
	}
}

exports.generateReport_PDF = async({
	report
}) => {
	try {

		let report_code = '';

		switch(report_code) {
			case '' :
				//do something
				break;
			default:
				throw new Error(`No PDF handling for the report.`)
		}

	}
	catch(e) {
		throw e
	}
}
