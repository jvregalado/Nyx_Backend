const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');
const router = require('express').Router();

const masterServices = require('../../services/hw/master/masterServices');

const TempOrderHoneywell = path.join(__dirname, '../../files/temporaryTemplates/', 'TempOrderHoneywell.xlsx')
const TempODOwb = xlsx.readFile(TempOrderHoneywell);
const WStempODO = TempODOwb.Sheets["Shipment Order Details"];

function sortByProperty(property) {
	return function(b, a) {
		if (a[property] > b[property])
			return 1;
		else if (a[property] < b[property])
			return -1;

		return 0;
	}
}

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

		xlsx.utils.book_append_sheet(newBook, newSheet, "Shipment Order Details");
		xlsx.writeFile(newBook, fileOutputDir + ".xlsx")
		return res.download(fileOutputDir + ".xlsx");
	} catch (e) {
		res.status(500).json({
			message: `${e}`
		});
	}
}

//ODO Lazada
router.post("/ODOLazada", async (req, res) => {
	try {
		var data = xlsx.utils.sheet_to_json(WStempODO);
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
				"Seller SKU": x["Seller SKU"],
				"Order Number": x["Order Number"],
				"Customer Name": x["Customer Name"],
				"Customer Email": x["Customer Email"],
				"Shipping Name": x["Shipping Name"],
				"Shipping Address": x["Shipping Address"],
				"Shipping Address2": x["Shipping Address2"],
				"Shipping Address3": x["Shipping Address3"],
				"Shipping Address4": x["Shipping Address4"],
				"Shipping Address5": x["Shipping Address5"],
				'Shipping Phone Number': x["Shipping Phone Number"] + "",
				'Shipping Phone Number2': x["Shipping Phone Number2"] + "",
				'Shipping City': x["Shipping City"],
				'Shipping Postcode': x["Shipping Postcode"],
				'Shipping Country': x["Shipping Country"],
				'Shipping Region': x["Shipping Region"],
				'Billing Name': x["Billing Name"],
				'Billing Address': x["Billing Address"],
				'Billing Address2': x["Billing Address2"],
				'Billing Address3': x["Billing Address3"],
				'Billing Address4': x["Billing Address4"],
				'Billing Address5': x["Billing Address5"],
				'Billing Phone Number': x["Billing Phone Number"] + "",
				'Billing Phone Number2': x["Billing Phone Number2"] + "",
				'Billing City': x["Billing City"],
				'Billing Postcode': x["Billing Postcode"],
				'Billing Country': x["Billing Country"],
				'Payment Method': x["Payment Method"],
				'Item Name': x["Item Name"],
				'Status': x["Status"],
				"countItem": 0
			}
		});

		for (let i of WSfromSheetd) {
			insertCount.map(foo => {
				if (foo["Order Number"] === i["Order Number"] && foo["Seller SKU"] === i["Seller SKU"]) {
					return {
						...foo,
						"countItem": foo.countItem++
					}
				}
			})
		}

		var fromData = [];
		insertCount.filter(function(item) {
			var i = fromData.findIndex(x => (x["Order Number"] == item["Order Number"] && x["Seller SKU"] == item["Seller SKU"]));
			if (i <= -1) {
				fromData.push(item);
			}
			return null;
		});

		var c = 0;
		var refdoc = '';

		fromData.sort(sortByProperty("Seller SKU"));
		fromData.sort(sortByProperty("Order Number"));
		let uniqueSKUs = [...new Set(fromData.map(x => `${x['Seller SKU']}`))];
		var unmaintainedSKU = await masterServices.getHWunmaintainedSKUs({
			skus: uniqueSKUs
		})

		for (let x in fromData) {
			let PrirefDoc = `${fromData[x]["Order Number"]}`;
			let skuCode = `${fromData[x]["Seller SKU"]}`;
			let OrderStatus = fromData[x]["Status"];
			if (refdoc === PrirefDoc) {
				c++;
			} else {
				c = 1;
				refdoc = PrirefDoc;
			}

			if (OrderStatus === 'Pending') {
				data.push({
					'Warehouse ID': WarehouseID,
					'Order Type': 'SO',
					'SO Status': '00',
					'Customer ID': 'CIC',
					'SO Reference1': PrirefDoc,
					'Consignee ID': 'Lazada',
					'Consignee Name': fromData[x]["Shipping Name"],
					'Consignee Address1': fromData[x]["Shipping Address"],
					'Consignee Address2': fromData[x]["Shipping Address3"],
					'Consignee Address3': fromData[x]["Shipping Address4"],
					'Consignee Address4': fromData[x]["Shipping Address5"],
					'Consignee District': fromData[x]["Shipping Region"],
					'Consignee City': fromData[x]["Shipping City"],
					'Consignee Province': fromData[x]["Shipping Address4"],
					'Consignee Country': fromData[x]["Shipping Country"],
					'Consignee ZIP': fromData[x]["Shipping Postcode"],
					'Consignee Contact': fromData[x]["Shipping Phone Number"],
					'Consignee Email': fromData[x][""],
					'Consignee TEL1': fromData[x]["Shipping Phone Number2"],
					'Consignee TEL2': fromData[x][""],
					'Billing Name': fromData[x]["Billing Name"],
					'Billing Address1': fromData[x]["Billing Address"],
					'Billing Address2': fromData[x]["Billing Address3"],
					'Billing Address3': fromData[x]["Billing Address4"],
					'Billing Address4': fromData[x]["Billing Address5"],
					'Billing District': fromData[x][""],
					'Billing City': fromData[x]["Billing City"],
					'Billing Province': fromData[x]["Billing Address4"],
					'Billing Country': fromData[x]["Billing Country"],
					'Billing ZIP': fromData[x]["Billing Postcode"],
					'Billing Contact': fromData[x]["Billing Phone Number"],
					'Billing TEL1': fromData[x]["Billing Phone Number2"],
					'Warehouse ID Item': WarehouseID,
					'Order LineNO': c,
					'Customer ID Item': 'CIC',
					'SKU': unmaintainedSKU.includes(skuCode) ? `Error: Unmaintained SKU, ${ skuCode}` : skuCode,
					'Pack ID':skuCode,
					'Line Status': '00',
					'QTY Ordered': fromData[x]["countItem"],
					'Pack UOM': 'EA',
					'QTY Ordered Each': fromData[x]["countItem"],
					Price: fromData[x]["Unit Price"],
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

//ODO Shopee
router.post("/ODOShopee", async (req, res) => {
	try {
		var data = xlsx.utils.sheet_to_json(WStempODO);
		var fromDataArray = req.body.fromFront;
		const {
			WarehouseID,
			fileName,
			valcon,
			userID
		} = req.query;
		const datetime = new Date().toLocaleString();

		fromDataArray.sort(sortByProperty("SKU Reference No."));
		fromDataArray.sort(sortByProperty("Order ID"));

		var fromData = [];
		fromDataArray.reduce(function(res, curr) {
			var uniqueval = curr["Order ID"] + "|" + curr["SKU Reference No."] + "";
			if (!res[uniqueval]) {
				res[uniqueval] = {
					"Order ID": curr["Order ID"],
					Quantity: 0,
					"SKU Reference No.": curr["SKU Reference No."],
					"Order Status": curr["Order Status"],
					"Receiver Name": curr["Receiver Name"],
					District: curr.District,
					Town: curr.Town,
					Province: curr.Province,
					Country: curr.Country,
					"Zip Code": curr["Zip Code"],
					"Phone Number": curr["Phone Number"],
					"Remark from buyer": curr["Remark from buyer"],
					"Unit Price": curr["Unit Price"]
				};
				fromData.push(res[uniqueval])
			}
			res[uniqueval].Quantity += curr.Quantity;
			return res;
		}, {});

		var c = 0;
		var refdoc = '';

		let uniqueSKUs = [...new Set(fromData.map(x => `${x['SKU Reference No.']}`))];
		var unmaintainedSKU = await masterServices.getHWunmaintainedSKUs({
			skus: uniqueSKUs
		})

		for (let x in fromData) {
			var PrirefDoc = `${fromData[x]["Order ID"]}`;
			var skuCode = `${fromData[x]['SKU Reference No.']}`;
			let OrderStatus = fromData[x]["Order Status"];
			if (refdoc === PrirefDoc) {
				c++;
			} else {
				c = 1;
				refdoc = PrirefDoc;
			}
			if (OrderStatus === 'To ship') {
				data.push({
					'Warehouse ID': WarehouseID,
					'Order Type': 'SO',
					'SO Status': '00',
					'Customer ID': 'CIC',
					'SO Reference1': PrirefDoc,
					'Consignee ID': 'Shopee',
					'Consignee Name': fromData[x]["Receiver Name"],
					'Consignee Address1': fromData[x]["Delivery Address"],
					'Consignee District': fromData[x]["District"],
					'Consignee City': fromData[x]["Town"],
					'Consignee Province': fromData[x]["Province"],
					'Consignee Country': fromData[x]["Country"],
					'Consignee ZIP': fromData[x]["Zip Code"],
					'Consignee Contact': fromData[x]["Phone Number"],
					'Order Handle Instruction': fromData[x]["Remark from buyer"],
					'Warehouse ID Item': WarehouseID,
					'Order LineNO': c,
					'Customer ID Item': 'CIC',
					'SKU': unmaintainedSKU.includes(skuCode) ? `Error: Unmaintained SKU, ${ skuCode}` : skuCode,
					'Pack ID':skuCode,
					'Line Status': '00',
					'QTY Ordered': fromData[x]["Quantity"],
					'Pack UOM': 'EA',
					'QTY Ordered Each': fromData[x]["Quantity"],
					Price: fromData[x]["Unit Price"],
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

//##ODO Shopify
router.post("/ODOShopify", async (req, res) => {
	try {
		var data = xlsx.utils.sheet_to_json(WStempODO);
		var fromData = req.body.fromFront;
		const {
			WarehouseID,
			fileName,
			valcon,
			userID
		} = req.query;
		const datetime = new Date().toLocaleString();

		var c = 0;
		var refdoc = '';

		fromData.sort(sortByProperty("Lineitem sku"));
		fromData.sort(sortByProperty("Shipping Name"));
		fromData.sort(sortByProperty("Name"));

		let uniqueSKUs = [...new Set(fromData.map(x => `${x['Lineitem sku']}`))];
		var unmaintainedSKU = await masterServices.getHWunmaintainedSKUs({
			skus: uniqueSKUs
		})

		for (let x in fromData) {
			let PrirefDoc = `${fromData[x]["Name"]}`;
			let skuCode = `${fromData[x]["Lineitem sku"]}`;
			if (refdoc === PrirefDoc) {
				c++;
			} else {
				c = 1;
				refdoc = PrirefDoc;
			}
			data.push({
				'Warehouse ID': WarehouseID,
				'Order Type': 'SO',
				'SO Status': '00',
				'Customer ID': 'CIC',
				'SO Reference1': PrirefDoc,
				'Consignee ID': 'Shopify',
				'Consignee Name': fromData[x]["Shipping Name"],
				'Consignee Address1': fromData[x]["Shipping Address1"],
				'Consignee Address2': fromData[x]["Shipping Address2"],
				'Consignee Address3': fromData[x]["Shipping Street"],
				'Consignee Address4': fromData[x][""],
				'Consignee District': fromData[x][""],
				'Consignee City': fromData[x]["Shipping City"],
				'Consignee Province': fromData[x]["Shipping Province Name"],
				'Consignee Country': fromData[x]["Shipping Country"],
				'Consignee ZIP': fromData[x]["Shipping Zip"],
				'Consignee Contact': fromData[x]["Shipping Phone"],
				'Consignee Email': fromData[x]["Email"],
				'Consignee TEL1': fromData[x][""],
				'Consignee TEL2': fromData[x][""],
				'Billing Name': fromData[x]["Billing Name"],
				'Billing Address1': fromData[x]["Billing Address1"],
				'Billing Address2': fromData[x]["Billing Address2"],
				'Billing Address3': fromData[x][""],
				'Billing Address4': fromData[x][""],
				'Billing District': fromData[x]["Billing Province Name"],
				'Billing City': fromData[x]["Billing City"],
				'Billing Province': fromData[x][""],
				'Billing Country': fromData[x][""],
				'Billing ZIP': fromData[x]["Billing Zip"],
				'Billing Contact': fromData[x]["Billing Phone"],
				'Billing Email': fromData[x][""],
				'Billing TEL1': fromData[x][""],
				'Billing TEL2': fromData[x][""],
				'Order Handle Instruction': fromData[x]["Notes"],
				'Warehouse ID Item': WarehouseID,
				'Order LineNO': c,
				'Customer ID Item': 'CIC',
				'SKU': unmaintainedSKU.includes(skuCode) ? `Error: Unmaintained SKU, ${ skuCode}` : skuCode,
				'Pack ID':skuCode,
				'Line Status': '00',
				'QTY Ordered': fromData[x]["Lineitem quantity"],
				'Pack UOM': 'EA',
				'QTY Ordered Each': fromData[x]["Lineitem quantity"],
				Price: fromData[x]["Unit Price"],
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