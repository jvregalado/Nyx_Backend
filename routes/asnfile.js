const xlsx = require('xlsx');
const path = require('path');
const router = require('express').Router();


let TempASNHoneywell = path.join(__dirname, '../files/temporaryTemplates/', 'TempASNHoneywell.xlsx')
const TempASNwb = xlsx.readFile(TempASNHoneywell);
const WStempASN = TempASNwb.Sheets["ASN Details"];

function sortByProperty(property){  
    return function(a,b){  
       if(a[property] > b[property])  
          return 1;  
       else if(a[property] < b[property])  
          return -1;  
   
       return 0;  
    }  
  }

//ASN Template for CIC
router.post("/ASNConvert", async(req, res) => {
	try {
var data = xlsx.utils.sheet_to_json(WStempASN);

var fromData = req.body.fromFront;
 const {WarehouseID,fileName} = req.query;


fromData.sort(sortByProperty("Product Code"));
fromData.sort(sortByProperty("Material Document Reference"));
fromData.sort(sortByProperty("Trucking Details"));
var refdoc='';
for(let x in fromData)
{
 let matdoc = fromData[x]['Material Document Reference'];
 let truckingd =fromData[x]['Trucking Details'];
 let PrirefDoc = ""+matdoc;
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

let fileOutputDir = path.join(__dirname, '../files/generatedTemplates/', `Generated${fileName}.xlsx`);
xlsx.utils.book_append_sheet(newBook,newSheet,"ASN Details");
xlsx.writeFile(newBook,fileOutputDir)
return res.download(fileOutputDir);
}
catch(e) {
    res.status(500).json({message:`${e}`});
}
});

//ASN Template for CMIP
router.post("/ASNConvertCMIP", async(req, res) => {
    try {
var data = xlsx.utils.sheet_to_json(WStempASN);
var fromData = req.body.fromFront;
const {WarehouseID,fileName} = req.query;
  
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
       
       let fileOutputDir = path.join(__dirname, '../files/generatedTemplates/', `Generated${fileName}.xlsx`);
       xlsx.utils.book_append_sheet(newBook,newSheet,"ASN Details");
       xlsx.writeFile(newBook,fileOutputDir)
       return res.download(fileOutputDir);
}
catch(e) {
    console.log(e)
    res.status(500).json({message:`${e}`});
}
});

//ASN PO 
router.post("/ASNPo", async(req, res) => {
    try {
      var data = xlsx.utils.sheet_to_json(WStempASN);
      var fromData = req.body.fromFront;
      const {WarehouseID,fileName} = req.query;
 
        const fromSheet = xlsx.readFile(fileName);
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
 
 let fileOutputDir = path.join(__dirname, '../files/generatedTemplates/', `Generated${fileName}.xlsx`);
 xlsx.utils.book_append_sheet(newBook,newSheet,"ASN Details");
 xlsx.writeFile(newBook,fileOutputDir)
 return res.download(fileOutputDir);
 }
 catch(e) {
     console.log(e)
     res.status(500).json({message:`${e}`});
 }
 });

//ASN STO
router.post("/ASNsto", async(req, res) => {
    try {
      var data = xlsx.utils.sheet_to_json(WStempASN);
      var fromData = req.body.fromFront;
      const {WarehouseID,fileName} = req.query;
 
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
 
 let fileOutputDir = path.join(__dirname, '../files/generatedTemplates/', `Generated${fileName}.xlsx`);
 xlsx.utils.book_append_sheet(newBook,newSheet,"ASN Details");
 xlsx.writeFile(newBook,fileOutputDir)
 return res.download(fileOutputDir);
 }
 catch(e) {
     console.log(e)
     res.status(500).json({message:`${e}`});
 }
 });

module.exports = router;