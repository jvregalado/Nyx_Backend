const xlsx = require('xlsx');
const path = require('path');
function sortByProperty(property){  
    return function(a,b){  
       if(a[property] > b[property])  
          return 1;  
       else if(a[property] < b[property])  
          return -1;  
   
       return 0;  
    }  
  }
try {
    //let TempOrderHoneywell = path.join(__dirname, '../files/temporaryTemplates/', 'TempOrderHoneywell.xlsx')
const TempODOwb = xlsx.readFile('./files/temporaryTemplates/TempOrderHoneywell.xlsx');
const WStempODO = TempODOwb.Sheets["Shipment Order Details"];
var data = xlsx.utils.sheet_to_json(WStempODO);

const daa = xlsx.readFile('shopee outbound cic.xls');
const fromd = daa.Sheets["orders"];
var fromDataArray = xlsx.utils.sheet_to_json(fromd);

const WarehouseID = 'LOL';

var c = 0;
var refdoc='';


fromDataArray.sort(sortByProperty("SKU Reference No."));
fromDataArray.sort(sortByProperty("Order ID"));

// var res = alasql('SELECT [Order ID], SUM(hits) AS hits, SUM(bytes) AS bytes \
//        FROM ? \
//        GROUP BY category \
//        ORDER BY bytes DESC', fromDataArray);

var fromData = [];
fromDataArray.reduce(function(res, curr) {
  var uniqueval = curr["Order ID"]+"|"+curr["SKU Reference No."]+"";
  if (!res[uniqueval]) {
   res[uniqueval] = { 
     "Order ID": curr["Order ID"], 
     Quantity: 0,  
     "SKU Reference No.": curr["SKU Reference No."],
     "Order Status": curr["Order Status"],
     "Receiver Name": curr["Receiver Name"],
     District: curr.District,
     Town:curr.Town,
     Province:curr.Province,
     Country:curr.Country,
     "Zip Code": curr["Zip Code"],
     "Phone Number": curr["Phone Number"],
     "Remark from buyer": curr["Remark from buyer"],
     "Unit Price":curr["Unit Price"]

   };
   fromData.push(res[uniqueval])
  }
  res[uniqueval].Quantity += curr.Quantity;
  return res;
 }, {});

for(let x in fromData)
{
 PrirefDoc=fromData[x]["Order ID"];
 let OrderStatus = fromData[x]["Order Status"];
   if(refdoc===PrirefDoc)
   {
       c++;
   }
   else
   {
       c=1;
       refdoc=PrirefDoc;
   }
   console.log(fromData[x]["Receiver Name"]);
if(OrderStatus==='Shipping')
{
 data.push({
 'Warehouse ID': WarehouseID,
 'Order Type': 'PO',
 'SO Status': '00',
 'Customer ID': 'CIC',
 'SO Reference1': PrirefDoc,
 'Ship to': 'Shopee',
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
 SKU: fromData[x]["SKU Reference No."]+"",
 'Line Status': '00',
 'QTY Ordered': fromData[x]["Quantity"],
 'Pack UOM': 'PCS',
 'QTY Ordered Each': fromData[x]["Quantity"],
 Price: fromData[x]["Unit Price"]
})
}
}


const newBook = xlsx.utils.book_new();
const newSheet = xlsx.utils.json_to_sheet(data);
   
let fileOutputDir = path.join('GeneratedODO.xlsx');
xlsx.utils.book_append_sheet(newBook,newSheet,"Shipment Order Details");
 xlsx.writeFile(newBook,fileOutputDir)
// return res.download(fileOutputDir);
}
catch(e) {
   console.log(e)
}
