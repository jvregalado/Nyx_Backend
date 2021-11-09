const xlsx = require('xlsx');
const path = require('path');

const WarehouseID = 'ZEU-CIC';
const filePath = "shopify outbound set cic.csv";

let TempOrderHoneywell = path.join(__dirname, '/temporaryTemplates/', 'TempOrderHoneywell.xlsx')
const TempASNwb = xlsx.readFile(TempOrderHoneywell);
const WStempASN = TempASNwb.Sheets["Shipment Order Details"];
var data = xlsx.utils.sheet_to_json(WStempASN);

const fromSheet = xlsx.readFile(filePath);
const WSfromSheet = fromSheet.Sheets["Sheet1"];
var fromData = xlsx.utils.sheet_to_json(WSfromSheet);

var c = 0;
var refdoc='';


function sortByProperty(property){  
    return function(b,a){  
       if(a[property] > b[property])  
          return 1;  
       else if(a[property] < b[property])  
          return -1;  
   
       return 0;  
    }  
 }

console.log(fromData);
 fromData.sort(sortByProperty("Lineitem sku"));
 fromData.sort(sortByProperty("Shipping Name"));
 fromData.sort(sortByProperty("Name"));

 for(let x in fromData)
{
  PrirefDoc=fromData[x]["Name"];
    if(refdoc===PrirefDoc)
    {
        c++;
    }
    else
    {
        c=1;
        refdoc=PrirefDoc;
    }
  data.push({
  'Warehouse ID': WarehouseID,
  'Order Type': 'PO',
  'SO Status': '00',
  'Customer ID': 'CIC',
  'SO Reference1': PrirefDoc,
  'Ship to': 'Shopee',
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
  SKU: fromData[x]["Lineitem sku"]+"",
  'Line Status': '00',
  'QTY Ordered': fromData[x]["Lineitem quantity"],
  'Pack UOM': 'PCS',
  'QTY Ordered Each': fromData[x]["Lineitem quantity"],
  Price: fromData[x]["Unit Price"]
})
}




const newBook = xlsx.utils.book_new();
const newSheet = xlsx.utils.json_to_sheet(data);

xlsx.utils.book_append_sheet(newBook,newSheet,"Shipment Order Details");
xlsx.writeFile(newBook,"GeneratedOrderHoneywell.xlsx");