const xlsx = require('xlsx');
const path = require('path');

const WarehouseID = 'ZEU-CIC';

let TempASNHoneywell = path.join(__dirname, '../temporaryTemplates/', 'TempASNHoneywell.xlsx')
const TempASNwb = xlsx.readFile(TempASNHoneywell);
const WStempASN = TempASNwb.Sheets["ASN Details"];
var data = xlsx.utils.sheet_to_json(WStempASN);

const fromSheet = xlsx.readFile("ASNConversionTemplateCMIP.xlsx");
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
 fromData.sort(sortByProperty("Plant Code"));
 fromData.sort(sortByProperty("Container Number"));
var refdoc='';
for(let x in fromData)
{
  let PrirefDoc =fromData[x]['Container Number'];
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
    'ASN Reference1': fromData[x]['Container Number'],
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
    
    'Carrier Contact': fromData[x]['Container Number'],
    'Carrier Name': fromData[x]['PO or STO Reference'],
    'Carrier Fax': fromData[x]['DR Reference'],
    'Carrier Telphone1': fromData[x]['Invoice Reference']

})}
}

const newBook = xlsx.utils.book_new();
const newSheet = xlsx.utils.json_to_sheet(data);

xlsx.utils.book_append_sheet(newBook,newSheet,"ASN Details");
xlsx.writeFile(newBook,"GeneratedASNHoneywell.xlsx")