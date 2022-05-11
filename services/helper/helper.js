"use strict"

const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');
//const http = require('http');
const fetch = require('node-fetch');


exports.sortByProperty = async({
	property
}) => {
	return function(b, a) {
		if (a[property] > b[property])
			return 1;
		else if (a[property] < b[property])
			return -1;
		return 0;
	}
}
	
exports.remove_File = async({fileDir})=>
fs.unlink(fileDir, function (err) {
	if (err) {
	  console.error(err);
	} else {
	  console.log("File removed:",fileDir);
	}
});

exports.generate_JSON_to_CSV = async({customerCode,toExcel,fileName,pdfFile,res})=>{
	try
	{
		const newBook = xlsx.utils.book_new();
		const newSheet = xlsx.utils.json_to_sheet(toExcel);
		
		const stream = xlsx.stream.to_csv(newSheet);
		stream.pipe(fs.createWriteStream(fileName));
	}
	catch(e){
		
		fs.unlink(pdfFile, function (err) {
			if (err) {
			  console.error(err);
			} else {
			  console.log("File removed:", pdfFile);
			}
		  });
		  
		fs.unlink(fileName, function (err) {
			if (err) {
			  console.error(err);
			} else {
			  console.log("File removed:", fileName);
			}
		  });
		res.status(500).json({
			message:`${e}`
		})
	}
}

exports.read_PreConverted = async({fileName})=>{
	const wb = xlsx.readFile(fileName, {
		type: "text",raw:true
	});
	const wsname = wb.SheetNames[0];
	const ws = wb.Sheets[wsname];
	const data = xlsx.utils.sheet_to_json(ws);
	return data;
}

exports.getData_from_other_API = async({
	customerCode
}) => {
	const response = await fetch('http://bellatrix.aeolus.ph:8002/customer-primaries/PCC-000617/customer-secondaries', {
		method: 'post',
		//body: JSON.stringify(body),
		method: 'GET',
		  headers: {
		'Content-Type': 'application/json',
		'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNGY1Y2I5MjAyM2ZhZTA5OTc2MTI4NTg0Nzc4M2M1ODgxMjNjMjk0ZmVjNTM2NjMzOTI4NWQyMTM1YjdkMjAzMjU2M2JkNTRlZWI3MzE4M2E5YzVmM2JmODM3NWZlODJmZGM3Yzg4ZWU4MWMzZTA3NTIzMzMzMTJkNjQ5MTUzMjFlYmM4MTMwNDcxZGE2MmE5ZjRiYmMyNjViMTFmOGM1YjA1OWQxODBiYmY2NTYyZjIwOWQyNzA1NWU0MWRiNzJlYzUyZjkzMmE1ZmE0YTE0ZGJmOWM4NjdjNzhiYzc4MzVjNjgyMTZjNmFhYWIwZTljNTYzOTMyZTFjOTMzMDgxYjU0Yjg2NjI1YWJhZjkxZWQ3OTk1Mzc5ZTBiOGVmMmY5NTRhMDRkZmQ1MDA2MTVkYzA0ZmEyZmIwNTY1MGFhMmE1MjZjNDUwYWFhZjk3OTg5ZGQ1ODZiNjJhN2UzMWZkYmJkOTg3OWI2OGNhYmU0OGRjYmZlMmQ0ZjExOGEyMDYzOWMxMGYxYTc0ZTNhNzkxMTRjOWYyN2M5MDMwY2U5NDIxNmIxZTJmZjk0MjJmYWQ5YzUxNGUxMDU1YTFiNTdmNzdkZGYwZjdmYzQyMDAyOWRlZmQwNzIzOWE5NmE1ODM1ZGUzZDQzMDcxMTQzMGJmNjlmNzk2NzY5OTU2NjQ3OTIiLCJpYXQiOjE2NTE1NTkwODIsImV4cCI6MTY2OTcwMzA4Mn0.knHfFzzi0j_8JGR1HFjHCQpabGbv97jsVxlyUDHiRv0'
		}
	});
	const data = await response.json();
	return data;
}

exports.getMaintainedSTC = async({
	siteCode
}) => {
	try {

		let maintainedSTCs = await helper.getData_from_other_API({});

		let getSTC = maintainedSTCs.data.items;

		let uniqueSTCs = [... new Set(getSTC.map(x => x.ship_to_code_primary))];

		let difference = siteCode.filter(x => !uniqueSTCs.includes(x));

		return difference
	}
	catch(e) {
		console.log(e)
		throw e
	}
}
// exports.generate_HW_ASN_File = async({
// 	fileName,
// 	data
// }) => {
// 	try {
		

// 		// let n = 0;
// 		// let fileOutputDir = generated;
// 		// while (fs.existsSync(fileOutputDir + ".xlsx")) {
// 		// 	n++;
// 		// 	fileOutputDir = generated + n;
// 		// }

// 		xlsx.utils.book_append_sheet(book, sheet, "ASN Details");
// 		xlsx.writeFile(book, outputFilePath)

// 		return {
// 			outputFilePath,
// 			outputFileName
// 		}
// 		//return res.download(fileOutputDir + ".xlsx");
// 	} catch (e) {
// 		console.log(e)
// 		throw e
// 	}
// }
