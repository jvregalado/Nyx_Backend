const xlsx = require('xlsx');
const path = require('path');

const WarehouseID = 'ZEU-CIC';

ASNConvert.get('ASNConvert/:filename', async(req,res) => {
  const { fileName } = req.params;

let TempASNHoneywell = path.join(__dirname, '../temporaryTemplates/', 'TempASNHoneywell.xlsx')
console.log(TempASNHoneywell);
const TempASNwb = xlsx.readFile(TempASNHoneywell);
const WStempASN = TempASNwb.Sheets["ASN Details"];
var data = xlsx.utils.sheet_to_json(WStempASN);

const fromSheet = xlsx.readFile(fileName);
const WSfromSheet = fromSheet.Sheets["ASN"];
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
 fromData.sort(sortByProperty("Product Code"));
 fromData.sort(sortByProperty("Material Document Reference"));
 fromData.sort(sortByProperty("Trucking Details"));
var refdoc='';
for(let x in fromData)
{
  console.log(refdoc);
  let matdoc = fromData[x]['Material Document Reference'];
  let truckingd =fromData[x]['Trucking Details'];
  let PrirefDoc = ""+matdoc;
  console.log(PrirefDoc);
    if(refdoc===PrirefDoc)
    {
        c++;
    }
    else
    {
        c=1;
        refdoc=PrirefDoc;
    }
    if(x>0)
    {
data.push({
    'Warehouse ID': WarehouseID,
    'ASN Type': 'PO',
    'ASN Status': '00',
    'Customer ID': 'CIC',
    'ASN Reference1': fromData[x]['Material Document Reference'],
    'ASN Reference2': fromData[x]['Trucking Details'],
    'Warehouse ID Item': WarehouseID,
    'ASN LineNO': c,	
    'Customer ID Item': 'CIC',
    'SKU': fromData[x]['Product Code'],
    'SKU Descr(L)': fromData[x]['Description'],
    'Line Status':'00',
    'Expected QTY':	fromData[x]['Qty'],
    'Expected QTY Each': 	fromData[x]['Qty'],
    'Pack UOM': 'EA',
    'LOTATT08': 'QC',
    'Total Cubic Item': '0',
    'Total Gross Weight Item': '0',
    'Total Net Weight Item': '0',
    'Total Price Item': '0',
    // 'Carrier Contact': fromData[x]['Trucker/Truck Plate Number'],
    // 'Carrier Fax': fromData[x]['Trip Waybill No.'],
    'Carrier Telphone1': fromData[x]['Plant Code']

})}
}

const newBook = xlsx.utils.book_new();
const newSheet = xlsx.utils.json_to_sheet(data);
let fileOutput = ("Generated",fileName,".xlsx");
xlsx.utils.book_append_sheet(newBook,newSheet,"ASN Details");
xlsx.writeFile(newBook,fileOutput)
return fileOutput
)}
module.exports ASNConvert;