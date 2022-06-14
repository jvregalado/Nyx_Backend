"use strict";
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');
const router = require('express').Router();

const masterServices = require('../../services/hw/master/masterServices');
const TempASNHoneywell = path.join(__dirname, '../../files/temporaryTemplates/', 'TempASNHoneywell.xlsx')
const TempASNwb = xlsx.readFile(TempASNHoneywell);
const WStempASN = TempASNwb.Sheets["ASN Details"];
function generatingFile(res, fileName, data) {
	try {
		const newBook = xlsx.utils.book_new();
		const newSheet = xlsx.utils.json_to_sheet(data);
		const generated = path.join(__dirname, '../../files/generatedTemplates/', `Generated${fileName}`);
		let n = 0;
		let fileOutputDir = generated;
		while (fs.existsSync(fileOutputDir + ".xlsx")) {
			n++;
			fileOutputDir = generated + n;
		}

		xlsx.utils.book_append_sheet(newBook, newSheet, "ASN Details");
		xlsx.writeFile(newBook, fileOutputDir + ".xlsx")
		return res.download(fileOutputDir + ".xlsx");
	} catch (e) {
		res.status(500).json({
			message: `${e}`
		});
	}
}

function sortByProperty(property) {
	return function(b, a) {
		if (a[property] > b[property])
			return 1;
		else if (a[property] < b[property])
			return -1;

		return 0;
	}
}

function ifBlank(PrirefDoc, res) {
	if (PrirefDoc == null || PrirefDoc == "" || PrirefDoc=='undefined') {
		return res.status(500).json({
			message: "Reference Number cannot be empty"
		})
	}
}
//ASN Template for CIC
router.post("/ASNConvert", async (req, res) => {
	try {
		var data = xlsx.utils.sheet_to_json(WStempASN);
		var fromData = req.body.fromFront;
		const {
			WarehouseID,
			fileName,
			valcon,
			userID
		} = req.query;
		const datetime = new Date().toLocaleString();
		fromData.sort(sortByProperty("Product Code"));
		fromData.sort(sortByProperty("Material Document Reference"));
		fromData.sort(sortByProperty("Trucking Details"));

		let uniqueSKUs = [...new Set(fromData.map(x => `${x['Product Code']}`))];
		var unmaintainedSKU = await masterServices.getHWunmaintainedSKUs({
			skus: uniqueSKUs
		})

		var c = 0;
		var refdoc = '';
		for (let x in fromData) {
			let PrirefDoc = `${fromData[x]['Material Document Reference']}`;
			let skuCode = `${fromData[x]['Product Code']}`;

			if (refdoc === PrirefDoc) {
				c++;
			} else {
				c = 1;
				refdoc = PrirefDoc;
			}
			if (x > 0) {
				ifBlank(PrirefDoc, res);
				data.push({
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
					'SKU Descr(L)': fromData[x]['Description'],
					'Line Status': '00',
					'Expected QTY': fromData[x]['Qty'],
					'Expected QTY Each': fromData[x]['Qty'],
					'Pack UOM': 'EA',
					'LOTATT08': 'QC',
					'Total Cubic Item': '0',
					'Total Gross Weight Item': '0',
					'Total Net Weight Item': '0',
					'Total Price Item': '0',
					'Carrier Name': fromData[x]['Trucking Details'],
					'ASN Reference3': fromData[x]['Plant Code'],
					'Date Converted': datetime,
					'Conversion Type': valcon,
					'user':userID
				})
			}
		}
		generatingFile(res, fileName, data);
	} catch (e) {
		res.status(500).json({
			message: `${e}`
		});
	}
});

//ASN Template for CMIP
router.post("/ASNConvertCMIP", async (req, res) => {
	try {
		var data = xlsx.utils.sheet_to_json(WStempASN);
		var fromData = req.body.fromFront;
		const {
			WarehouseID,
			fileName,
			valcon,
			userID
		} = req.query;
		const datetime = new Date().toLocaleString();

		fromData.sort(sortByProperty("Plant Code"));
		fromData.sort(sortByProperty("Container Number"));

		let uniqueSKUs = [...new Set(fromData.map(x => `${x['Product Code']}`))];
		var unmaintainedSKU = await masterServices.getHWunmaintainedSKUs({
			skus: uniqueSKUs
		})
		var refdoc = '';
		var c=0;
		for (let x in fromData) {
			let PrirefDoc = `${fromData[x]['Container Number']}`;
			let skuCode = `${fromData[x]['Product Code']}`;

			if (refdoc === PrirefDoc) {
				c++;
			} else {
				c = 1;
				refdoc = PrirefDoc;
			}
			if (x > 0) {
				ifBlank(PrirefDoc, res);
				data.push({
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
					'SKU Descr(L)': fromData[x]['Description'],
					'Line Status': '00',
					'Expected QTY': fromData[x]['Qty'],
					'Expected QTY Each': fromData[x]['Qty'],
					'Pack UOM': 'EA',
					'LOTATT08': 'QC',
					'Total Cubic Item': '0',
					'Total Gross Weight Item': '0',
					'Total Net Weight Item': '0',
					'Total Price Item': '0',

					'Carrier Contact': fromData[x]['PO or STO Reference'],
					'Carrier Name': fromData[x]['Container Number'],
					'Carrier Fax': fromData[x]['DR Reference'],
					'ASN Reference3': fromData[x]['Invoice Reference'],
					'Date Converted': datetime,
					'Conversion Type': valcon,
					'user':userID
				})
			}
		}
		generatingFile(res, fileName, data);
	} catch (e) {
		console.log(e)
		res.status(500).json({
			message: `${e}`
		});
	}
});

//ASN PO
router.post("/ASNPo", async (req, res) => {
	try {
		var data = xlsx.utils.sheet_to_json(WStempASN);
		var WSfromSheetd = req.body.fromFront;
		const {
			WarehouseID,
			fileName,
			valcon,
			userID
		} = req.query;
		const datetime = new Date().toLocaleString();

		let insertCount = WSfromSheetd.map(x => {
			return {
				"PO Number": x["PO Number"],
				"Customer": x.Customer,
				"Model Code": x["Model Code"],
				"Model Name": x["Model Name"],
				"Carrier Contact": x["Type of Container"],
				"Carrier Name": x["Container"],
				"Carrier Fax": x['Seal No.'],
				"ASN Reference3": x['Invoice No.'],
				"countItem": 0
			}
		});
		for (let i of WSfromSheetd) {
			insertCount.map(foo => {
				if (foo["PO Number"] === i["PO Number"] && foo["Model Code"] === i["Model Code"]) {
					return {
						...foo,
						"countItem": foo.countItem++
					}
				}
			})
		}

		var fromData = [];
		insertCount.filter(function(item) {
			var i = fromData.findIndex(x => (x["PO Number"] == item["PO Number"] && x["Model Code"] == item["Model Code"]));
			if (i <= -1) {
				fromData.push(item);
			}
			return null;
		});

		var c = 0;
		var refdoc = '';

		fromData.sort(sortByProperty("Model Code"));
		fromData.sort(sortByProperty("PO Number"));
		let uniqueSKUs = [...new Set(fromData.map(x => `${x['Model Code']}`))];
		var unmaintainedSKU = await masterServices.getHWunmaintainedSKUs({
			skus: uniqueSKUs
		})

		for (let x in fromData) {
			let PrirefDoc = `${fromData[x]['PO Number']}`;
			let customer = fromData[x]['Customer'];
			let skuCode = `${fromData[x]['Model Code']}`;
			let descr = fromData[x]['Model Name'];
			let counts = fromData[x]['countItem'];
			let typeofcontainer = fromData[x]['Carrier Contact'];
			let container = fromData[x]['Carrier Name'];
			let sealno = fromData[x]['Carrier Fax'];
			let invoiceno = fromData[x]['ASN Reference3'];
			if (refdoc === PrirefDoc) {
				c++;
			} else {
				c = 1;
				refdoc = PrirefDoc;
			}
			ifBlank(PrirefDoc, res);
			data.push({

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
				'Carrier Contact': typeofcontainer,
				'Carrier Name': container,
				'Carrier Fax': sealno,
				'ASN Reference3': invoiceno,
				'Date Converted': datetime,
				'Conversion Type': valcon,
				'user':userID
			})
		}
		generatingFile(res, fileName, data);
	} catch (e) {
		console.log(e)
		res.status(500).json({
			message: `${e}`
		});
	}
});

//ASN STO
router.post("/ASNsto", async (req, res) => {
	try {
		var data = xlsx.utils.sheet_to_json(WStempASN);
		var fromData = req.body.fromFront;
		const {
			WarehouseID,
			fileName,
			valcon,
			userID
		} = req.query;
		const datetime = new Date().toLocaleString();

		fromData.sort(sortByProperty("Material Code"));
		fromData.sort(sortByProperty("STO Reference"));
		let uniqueSKUs = [...new Set(fromData.map(x => `${x['Material Code']}`))];
		var unmaintainedSKU = await masterServices.getHWunmaintainedSKUs({
			skus: uniqueSKUs
		})

		var c = 0;
		var refdoc = '';

		for (let x in fromData) {
			let PrirefDoc = `${fromData[x]['STO Reference']}`;
			let skuCode = `${fromData[x]['Material Code']}`;
			if (refdoc === PrirefDoc) {
				c++;
			} else {
				c = 1;
				refdoc = PrirefDoc;
			}
			ifBlank(PrirefDoc, res);
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
				'SKU Descr(L)': fromData[x]['Material Description'],
				'Line Status': '00',
				'Expected QTY': fromData[x]['Quantity'],
				'Expected QTY Each': fromData[x]['Quantity'],
				'Pack UOM': 'EA',
				'LOTATT08': 'QC',
				'Total Cubic Item': '0',
				'Total Gross Weight Item': '0',
				'Total Net Weight Item': '0',
				'Total Price Item': '0',
				'Carrier Name': fromData[x]['Trucker/Truck Plate Number'],
				'Carrier Fax': fromData[x]['Trip Waybill No.'],
				'ASN Reference3': fromData[x]['Delivery No.'],
				'Date Converted': datetime,
				'Conversion Type': valcon,
				'user':userID
			})
		}
		generatingFile(res, fileName, data);
	} catch (e) {
		console.log(e)
		res.status(500).json({
			message: `${e}`
		});
	}
});

module.exports = router;