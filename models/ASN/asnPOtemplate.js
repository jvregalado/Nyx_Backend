const xlsx = require('xlsx');
const path = require('path');

const WarehouseID = 'ZEU-CIC';

let TempASNHoneywell = path.join(__dirname, '/temporaryTemplates/', 'TempASNHoneywell.xlsx')
const TempASNwb = xlsx.readFile(TempASNHoneywell);
const WStempASN = TempASNwb.Sheets["ASN Details"];
var data = xlsx.utils.sheet_to_json(WStempASN);

const fromSheet = xlsx.readFile("ASNPOTEMP.xlsx");
const WSfromSheet = fromSheet.Sheets["Sheet1"];
var WSfromSheetd = xlsx.utils.sheet_to_json(WSfromSheet);

let insertCount = WSfromSheetd.map(x => {
	return {
  	"PO Number" : x["PO Number"],
      "Customer": x.Customer,
      "Model Code": x["Model Code"],
      "Model Name": x["Model Name"],
      "Carrier Contact":x["Container"],
      "Carrier Name":x["Type of Container"],
      "Carrier Fax":x['Seal No.'],
      "Carrier Telphone1": x['Invoice No.'],
    "countItem" : 0
  }
});

for(let i of WSfromSheetd) {
	insertCount.map(foo => {
  	if(foo["PO Number"] === i["PO Number"] && foo["Model Code"] === i["Model Code"]) {
    	return {
      	...foo,
      	"countItem" : foo.countItem++
      }
    }
  })
}

var fromData = [];
insertCount.filter(function(item){
  var i = fromData.findIndex(x => (x["PO Number"] == item["PO Number"] && x["Model Code"] == item["Model Code"]));
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

 fromData.sort(sortByProperty("Model Code"));
 fromData.sort(sortByProperty("PO Number"));

for(let x in fromData)
{
    let PrirefDoc = fromData[x]['PO Number'];
    let customer = fromData[x]['Customer'];
    let skuCode = fromData[x]['Model Code'];
    let descr=fromData[x]['Model Name'];
    let counts=fromData[x]['countItem'];
    let container=fromData[x]['Carrier Contact'];
    let typeofcontainer = fromData[x]['Carrier Name'];
    let sealno = fromData[x]['Carrier Fax'];
    let invoiceno = fromData[x]['Carrier Telphone1'];
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
    'ASN Type': 'PO',
    'ASN Status': '00',
    'Customer ID': customer,
    'ASN Reference1': PrirefDoc,
    'Warehouse ID Item': WarehouseID,
    'ASN LineNO': c,	
    'Customer ID Item': customer,
    'SKU': skuCode,
    'SKU Descr(L)': descr,
    'Line Status':'00',
    'Expected QTY':	counts,
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
    'Carrier Telphone1': invoiceno

})}

const newBook = xlsx.utils.book_new();
const newSheet = xlsx.utils.json_to_sheet(data);

xlsx.utils.book_append_sheet(newBook,newSheet,"ASN Details");
xlsx.writeFile(newBook,"GeneratedASNHoneywell.xlsx")