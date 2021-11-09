
const xlsx = require('xlsx');
const path = require('path');

const WarehouseID = 'ZEU-CIC';
const filePath = "lazada outbound set cic.csv";

let TempOrderHoneywell = path.join(__dirname, '/temporaryTemplates/', 'TempOrderHoneywell.xlsx')
const TempASNwb = xlsx.readFile(TempOrderHoneywell);
const WStempASN = TempASNwb.Sheets["Shipment Order Details"];
var data = xlsx.utils.sheet_to_json(WStempASN);

const fromSheet = xlsx.readFile(filePath);
const WSfromSheet = fromSheet.Sheets["Sheet1"];
var WSfromSheetd = xlsx.utils.sheet_to_json(WSfromSheet);

let insertCount = WSfromSheetd.map(x => {
	return {
  	"Seller SKU" : x["Seller SKU"]+"",
      "Order Number": x["Order Number"]+"",
      "Customer Name": x["Customer Name"],
      "Customer Email": x["Customer Email"],
      "Shipping Name":x["Shipping Name"],
      "Shipping Address":x["Shipping Address"],
      "Shipping Address2":x["Shipping Address2"],
      "Shipping Address3":x["Shipping Address3"],
      "Shipping Address4":x["Shipping Address4"],
      "Shipping Address5":x["Shipping Address5"],
      'Shipping Phone Number': x["Shipping Phone Number"],
      'Shipping Phone Number2':x["Shipping Phone Number2"],
      'Shipping City': x["Shipping City"],
      'Shipping Postcode': x["Shipping Postcode"],
      'Shipping Country': x["Shipping Country"],
      'Shipping Region':x["Shipping Region"],
      'Billing Name': x["Billing Name"],
      'Billing Address': x["Billing Address"],
      'Billing Address2': x["Billing Address2"],
      'Billing Address3': x["Billing Address3"],
      'Billing Address4': x["Billing Address4"],
      'Billing Address5':x["Billing Address5"],
      'Billing Phone Number': x["Billing Phone Number"],
      'Billing Phone Number2': x["Billing Phone Number2"],
      'Billing City': x["Billing City"],
      'Billing Postcode': x["Billing Postcode"],
      'Billing Country': x["Billing Country"],
      'Payment Method': x["Payment Method"],
      'Item Name': x["Item Name"],
      'Status': x["Status"],
    "countItem" : 0
  }
});

for(let i of WSfromSheetd) {
	insertCount.map(foo => {
    if(foo["Order Number"] === i["Order Number"] && foo["Seller SKU"] === i["Seller SKU"]) {
    	return {
      	...foo,
      	"countItem" : foo.countItem++
      }
    }
  })
}

var fromData = [];
insertCount.filter(function(item){
  var i = fromData.findIndex(x => (x["Order Number"] == item["Order Number"] && x["Seller SKU"] == item["Seller SKU"]));
  if(i <= -1){
    fromData.push(item);
  }
  return null;
});

var c = 0;
var refdoc='';


function sortByProperty(property){  
    return function(a,b){  
       if(a[property] > b[property])  
          return 1;  
       else if(a[property] < b[property])  
          return -1;  
   
       return 0;  
    }  
 }

 fromData.sort(sortByProperty("Seller SKU"));
 fromData.sort(sortByProperty("Order Number"));

 for(let x in fromData)
{
  PrirefDoc=fromData[x]["Order Number"];
  let OrderStatus = fromData[x]["Status"];
    if(refdoc===PrirefDoc)
    {
        c++;
    }
    else
    {
        c=1;
        refdoc=PrirefDoc;
    }
if(OrderStatus==='Pending')
{
  data.push({
  'Warehouse ID': WarehouseID,
  'Order Type': 'PO',
  'SO Status': '00',
  'Customer ID': 'CIC',
  'SO Reference1': PrirefDoc,
  'Ship to': 'Lazada',
  'Consignee Name': fromData[x]["Shipping Name"],
  'Consignee Address1': fromData[x]["Shipping Address"],
  'Consignee Address2': fromData[x]["Shipping Address3"],
  'Consignee Address3':fromData[x]["Shipping Address4"],
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
  'Billing Email': fromData[x][""],
  'Billing TEL1': fromData[x]["Billing Phone Number2"],
  'Billing TEL2': fromData[x][""],
  'Warehouse ID Item': WarehouseID,
  'Order LineNO': c,
  'Customer ID Item': 'CIC',
  SKU: fromData[x]["Seller SKU"]+"",
  'Line Status': '00',
  'QTY Ordered': fromData[x]["countItem"],
  'Pack UOM': 'PCS',
  'QTY Ordered Each': fromData[x]["countItem"],
  Price: fromData[x]["Unit Price"]
})
}
}



const newBook = xlsx.utils.book_new();
const newSheet = xlsx.utils.json_to_sheet(data);

xlsx.utils.book_append_sheet(newBook,newSheet,"Shipment Order Details");
xlsx.writeFile(newBook,"GeneratedOrderHoneywell.xlsx");