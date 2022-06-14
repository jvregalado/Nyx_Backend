"use strict";

const xlsx = require('xlsx');
const path = require('path');

const helper = require('../../helper')
const masterServices = require('../master')

exports.convert_CIC_to_ASN = async({
	data,
	WarehouseID,
	fileName,
	valcon,
	userID
}) => {
	try {

		const TempASNHoneywell = path.join(__dirname, '../../../assets/templateFiles/', 'TempASNHoneywell.xlsx')
		const TempASNwb = xlsx.readFile(TempASNHoneywell);
		const WStempASN = TempASNwb.Sheets["ASN Details"];

		const worksheet = xlsx.utils.sheet_to_json(WStempASN);

		const datetime = new Date().toLocaleString();

		data.sort(await helper.sortByProperty("Product Code"));
		data.sort(await helper.sortByProperty("Material Document Reference"));
		data.sort(await helper.sortByProperty("Trucking Details"));

		let uniqueSKUs = [...new Set(data.map(x => `${x['Product Code']}`))];
		var unmaintainedSKU = await masterServices.getHWunmaintainedSKUs({
			skus: uniqueSKUs
		})

		var c = 0;
		var refdoc = '';
		for (let x in data) {
			let PrirefDoc = `${data[x]['Material Document Reference']}`;
			let skuCode = `${data[x]['Product Code']}`;

			if (refdoc === PrirefDoc) {
				c++;
			} else {
				c = 1;
				refdoc = PrirefDoc;
			}
			if (x > 0) {
				if(!PrirefDoc) { throw new Error('Reference Number cannot be empty.') }
				// ifBlank(PrirefDoc, res);
				worksheet.push({
					'Warehouse ID': WarehouseID,
					'ASN Type': 'PO',
					'ASN Status': '00',
					'Customer ID': 'CIC',
					'ASN Reference1': PrirefDoc.toUpperCase(),
					'ASN Reference2': data[x]['Trucking Details'],
					'Warehouse ID Item': WarehouseID,
					'ASN LineNO': c,
					'Customer ID Item': 'CIC',
					'SKU': unmaintainedSKU.includes(skuCode) ? `Error: Unmaintained SKU, ${ skuCode}` : skuCode,
					'Pack ID':skuCode,
					'SKU Descr(L)': data[x]['Description'],
					'Line Status': '00',
					'Expected QTY': data[x]['Qty'],
					'Expected QTY Each': data[x]['Qty'],
					'Pack UOM': 'EA',
					'LOTATT08': 'QC',
					'Total Cubic Item': '0',
					'Total Gross Weight Item': '0',
					'Total Net Weight Item': '0',
					'Total Price Item': '0',
					'Carrier Telphone1': data[x]['Plant Code'],
					'Date Converted': datetime,
					'Conversion Type': valcon,
					'user':userID
				})
			}
		}

		const outputFileName = fileName;
		const outputFilePath = path.join(__dirname, '../../../assets/convertedFiles/', `${outputFileName}`);

		const book = xlsx.utils.book_new();
		const sheet = xlsx.utils.json_to_sheet(worksheet);

		xlsx.utils.book_append_sheet(book, sheet, "ASN Details");
		await xlsx.writeFile(book, outputFilePath)

		return {
			outputFileName,
			outputFilePath
		}
	}
	catch(e) {
		console.log(e);
		throw e
	}
}

exports.convert_CIMP_to_ASN = async({
	data,
	WarehouseID,
	fileName,
	valcon,
	userID
}) => {
	try {

		const TempASNHoneywell = path.join(__dirname, '../../../assets/templateFiles/', 'TempASNHoneywell.xlsx')
		const TempASNwb = xlsx.readFile(TempASNHoneywell);
		const WStempASN = TempASNwb.Sheets["ASN Details"];

		const worksheet = xlsx.utils.sheet_to_json(WStempASN);

		const datetime = new Date().toLocaleString();

		data.sort(await helper.sortByProperty("Plant Code"));
		data.sort(await helper.sortByProperty("Container Number"));

		let uniqueSKUs = [...new Set(data.map(x => `${x['Product Code']}`))];
		let unmaintainedSKU = await masterServices.getHWunmaintainedSKUs({
			skus: uniqueSKUs
		})
		let refdoc = '';
		let c;
		for (let x in data) {
			let PrirefDoc = `${data[x]['Container Number']}`;
			let skuCode = `${data[x]['Product Code']}`;

			if (refdoc === PrirefDoc) {
				c++;
			} else {
				c = 1;
				refdoc = PrirefDoc;
			}
			if (x > 0) {
				if(!PrirefDoc) { throw new Error('Reference Number cannot be empty.') }
				// ifBlank(PrirefDoc, res);
				worksheet.push({
					'Warehouse ID': WarehouseID,
					'ASN Type': 'PO',
					'ASN Status': '00',
					'Customer ID': 'CIC',
					'ASN Reference1': PrirefDoc.toUpperCase(),
					'Warehouse ID Item': WarehouseID,
					'ASN LineNO': c,
					'Customer ID Item': 'CIC',
					'SKU': unmaintainedSKU.includes(skuCode) ? `Error: Unmaintained SKU, ${ skuCode}` : skuCode,
					'Pack ID':skuCode,
					'SKU Descr(L)': data[x]['Description'],
					'Line Status': '00',
					'Expected QTY': data[x]['Qty'],
					'Expected QTY Each': data[x]['Qty'],
					'Pack UOM': 'EA',
					'LOTATT08': 'QC',
					'Total Cubic Item': '0',
					'Total Gross Weight Item': '0',
					'Total Net Weight Item': '0',
					'Total Price Item': '0',

					'Carrier Contact': data[x]['Container Number'],
					'Carrier Name': data[x]['PO or STO Reference'],
					'Carrier Fax': data[x]['DR Reference'],
					'Carrier Telphone1': data[x]['Invoice Reference'],
					'Date Converted': datetime,
					'Conversion Type': valcon,
					'user':userID
				})
			}
		}

		const outputFileName = fileName;
		const outputFilePath = path.join(__dirname, '../../../assets/convertedFiles/', `${outputFileName}`);

		const book = xlsx.utils.book_new();
		const sheet = xlsx.utils.json_to_sheet(worksheet);

		xlsx.utils.book_append_sheet(book, sheet, "ASN Details");
		await xlsx.writeFile(book, outputFilePath)

		return {
			outputFileName,
			outputFilePath
		}

	} catch(e) {
		console.log(e);
		throw e;
	}
}

exports.convert_PO_to_ASN = async({
	data,
	WarehouseID,
	fileName,
	valcon,
	userID
}) => {
	try {

		const TempASNHoneywell = path.join(__dirname, '../../../assets/templateFiles/', 'TempASNHoneywell.xlsx')
		const TempASNwb = xlsx.readFile(TempASNHoneywell);
		const WStempASN = TempASNwb.Sheets["ASN Details"];

		const worksheet = xlsx.utils.sheet_to_json(WStempASN);

		const datetime = new Date().toLocaleString();

		let insertCount = data.map(x => {
			return {
				"PO Number": x["PO Number"],
				"Customer": x.Customer,
				"Model Code": x["Model Code"],
				"Model Name": x["Model Name"],
				"Carrier Contact": x["Container"],
				"Carrier Name": x["Type of Container"],
				"Carrier Fax": x['Seal No.'],
				"Carrier Telphone1": x['Invoice No.'],
				"countItem": 0
			}
		});
		for (let i of data) {
			insertCount.map(foo => {
				if (foo["PO Number"] === i["PO Number"] && foo["Model Code"] === i["Model Code"]) {
					return {
						...foo,
						"countItem": foo.countItem++
					}
				}
			})
		}

		var newData = [];
		insertCount.filter(function(item) {
			var i = newData.findIndex(x => (x["PO Number"] == item["PO Number"] && x["Model Code"] == item["Model Code"]));
			if (i <= -1) {
				newData.push(item);
			}
			return null;
		});

		var c = 0;
		var refdoc = '';

		newData.sort(await helper.sortByProperty("Model Code"));
		newData.sort(await helper.sortByProperty("PO Number"));
		let uniqueSKUs = [...new Set(newData.map(x => `${x['Model Code']}`))];
		var unmaintainedSKU = await masterServices.getHWunmaintainedSKUs({
			skus: uniqueSKUs
		})

		for (let x in newData) {
			let PrirefDoc = `${newData[x]['PO Number']}`;
			let customer = newData[x]['Customer'];
			let skuCode = `${newData[x]['Model Code']}`;
			let descr = newData[x]['Model Name'];
			let counts = newData[x]['countItem'];
			let container = newData[x]['Carrier Contact'];
			let typeofcontainer = newData[x]['Carrier Name'];
			let sealno = newData[x]['Carrier Fax'];
			let invoiceno = newData[x]['Carrier Telphone1'];
			if (refdoc === PrirefDoc) {
				c++;
			} else {
				c = 1;
				refdoc = PrirefDoc;
			}
			if(!PrirefDoc) { throw new Error('Reference Number cannot be empty.') }
			// ifBlank(PrirefDoc, res);
			worksheet.push({
				'Warehouse ID': WarehouseID,
				'ASN Type': 'PO',
				'ASN Status': '00',
				'Customer ID': customer,
				'ASN Reference1': PrirefDoc.toUpperCase(),
				'Warehouse ID Item': WarehouseID,
				'ASN LineNO': c,
				'Customer ID Item': customer,
				'SKU': unmaintainedSKU.includes(skuCode) ? `Error: Unmaintained SKU, ${skuCode}` : skuCode,
				'Pack ID':skuCode,
				'SKU Descr(L)': descr,
				'Line Status': '00',
				'Expected QTY': counts,
				'Expected QTY Each': counts,
				'Pack UOM': 'EA',
				'LOTATT08': 'QC',
				'Total Cubic Item': '0',
				'Total Gross Weight Item': '0',
				'Total Net Weight Item': '0',
				'Total Price Item': '0',
				'Carrier Contact': container,
				'Carrier Name': typeofcontainer,
				'Carrier Fax': sealno,
				'Carrier Telphone1': invoiceno,
				'Date Converted': datetime,
				'Conversion Type': valcon,
				'user':userID
			})
		}

		const outputFileName = fileName;
		const outputFilePath = path.join(__dirname, '../../../assets/convertedFiles/', `${outputFileName}`);

		const book = xlsx.utils.book_new();
		const sheet = xlsx.utils.json_to_sheet(worksheet);

		xlsx.utils.book_append_sheet(book, sheet, "ASN Details");
		await xlsx.writeFile(book, outputFilePath)

		return {
			outputFileName,
			outputFilePath
		}

	} catch(e) {
		console.log(e);
		throw e;
	}
}

exports.convert_STO_to_ASN = async({
	data,
	WarehouseID,
	fileName,
	valcon,
	userID
}) => {
	try {

		const TempASNHoneywell = path.join(__dirname, '../../../assets/templateFiles/', 'TempASNHoneywell.xlsx')
		const TempASNwb = xlsx.readFile(TempASNHoneywell);
		const WStempASN = TempASNwb.Sheets["ASN Details"];

		const worksheet = xlsx.utils.sheet_to_json(WStempASN);

		const datetime = new Date().toLocaleString();
		data.sort(await helper.sortByProperty("Material Code"));
		data.sort(await helper.sortByProperty("STO Reference"));

		let uniqueSKUs = [...new Set(data.map(x => `${x['Material Code']}`))];
		var unmaintainedSKU = await masterServices.getHWunmaintainedSKUs({
			skus: uniqueSKUs
		})

		var c = 0;
		var refdoc = '';

		for (let x in data) {
			let PrirefDoc = `${data[x]['STO Reference']}`;
			let skuCode = `${data[x]['Material Code']}`;
			if (refdoc === PrirefDoc) {
				c++;
			} else {
				c = 1;
				refdoc = PrirefDoc;
			}
			// ifBlank(PrirefDoc, res);
			if(!PrirefDoc) { throw new Error('Reference Number cannot be empty.') }
			data.push({
				'Warehouse ID': WarehouseID,
				'ASN Type': 'STO',
				'ASN Status': '00',
				'Customer ID': 'CIC',
				'ASN Reference1': PrirefDoc.toUpperCase(),
				'Warehouse ID Item': WarehouseID,
				'ASN LineNO': c,
				'Customer ID Item': 'CIC',
				'SKU': unmaintainedSKU.includes(skuCode) ? `Error: Unmaintained SKU, ${ skuCode}` : skuCode,
				'Pack ID':skuCode,
				'SKU Descr(L)': data[x]['Material Description'],
				'Line Status': '00',
				'Expected QTY': data[x]['Quantity'],
				'Expected QTY Each': data[x]['Quantity'],
				'Pack UOM': 'EA',
				'LOTATT08': 'QC',
				'Total Cubic Item': '0',
				'Total Gross Weight Item': '0',
				'Total Net Weight Item': '0',
				'Total Price Item': '0',
				'Carrier Contact': data[x]['Trucker/Truck Plate Number'],
				'Carrier Fax': data[x]['Trip Waybill No.'],
				'Carrier Telphone1': data[x]['Delivery No.'],
				'Date Converted': datetime,
				'Conversion Type': valcon,
				'user':userID
			})
		}

		const outputFileName = fileName;
		const outputFilePath = path.join(__dirname, '../../../assets/convertedFiles/', `${outputFileName}`);

		const book = xlsx.utils.book_new();
		const sheet = xlsx.utils.json_to_sheet(worksheet);

		xlsx.utils.book_append_sheet(book, sheet, "ASN Details");
		await xlsx.writeFile(book, outputFilePath)

		return {
			outputFileName,
			outputFilePath
		}

	} catch(e) {
		console.log(e);
		throw e;
	}
}
