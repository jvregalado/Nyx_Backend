const xlsx = require('xlsx');
const path = require('path');

const WarehouseID = 'ZEU-CIC';

let TempASNHoneywell = path.join(__dirname, '../temporaryTemplates/', 'TempASNHoneywell.xlsx')
console.log(TempASNHoneywell);
const TempASNwb = xlsx.readFile(TempASNHoneywell);
const WStempASN = TempASNwb.Sheets["ASN Details"];
var data = xlsx.utils.sheet_to_json(WStempASN);

const fromSheet = xlsx.readFile("ASNSTOCICTEMPLATE.xlsx");
const WSfromSheet = fromSheet.Sheets["Sheet1"];
var fromData = xlsx.utils.sheet_to_json(WSfromSheet);

function sortByProperty(property){  
  return function(a,b){  
     if(a[property] > b[property])  
        return 1;  
     else if(a[property] < b[property])  
        return -1;  
 
     return 0;  
  }  
}
 fromData.sort(sortByProperty("Material Code"));
 fromData.sort(sortByProperty("STO Reference"));
var refdoc='';

for(let x in fromData)
{
  let PrirefDoc = fromData[x]['STO Reference'];
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
    'ASN Type': 'STO',
    'ASN Status': '00',
    'Customer ID': 'CIC',
    'ASN Reference1': fromData[x]['STO Reference'],
    'Warehouse ID Item': WarehouseID,
    'ASN LineNO': c,	
    'Customer ID Item': 'CIC',
    'SKU': fromData[x]['Material Code'],
    'SKU Descr(L)': fromData[x]['Material Description'],
    'Line Status':'00',
    'Expected QTY':	fromData[x]['Quantity'],
    'Expected QTY Each': 	fromData[x]['Quantity'],
    'Pack UOM': 'EA',
    'LOTATT08': 'QC',
    'Total Cubic Item': '0',
    'Total Gross Weight Item': '0',
    'Total Net Weight Item': '0',
    'Total Price Item': '0',
    'Carrier Contact': fromData[x]['Trucker/Truck Plate Number'],
    'Carrier Fax': fromData[x]['Trip Waybill No.'],
    'Carrier Telphone1': fromData[x]['Delivery No.']

})}

const newBook = xlsx.utils.book_new();
const newSheet = xlsx.utils.json_to_sheet(data);

xlsx.utils.book_append_sheet(newBook,newSheet,"ASN Details");
xlsx.writeFile(newBook,"GeneratedASNHoneywell.xlsx")