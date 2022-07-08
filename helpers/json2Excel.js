"use strict"

const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

exports.ArrayJson2Xlsx = async({
	arrayJsonData,
	filename
}) => {
	try {

		let wb = xlsx.utils.book_new();

		for(let i in arrayJsonData) {
			let ws = xlsx.utils.json_to_sheet(arrayJsonData[i].sheetData);
			xlsx.utils.book_append_sheet(wb, ws, arrayJsonData[i].sheetName ?? `Sheet${++i}`);
		}

		let filepath = path.join(__dirname, '../assets/ReportGenerated/', filename);

		await xlsx.writeFile(wb, filepath);

		const contents = fs.readFileSync(filepath, {encoding: 'base64'});

		return {
			contents,
			filepath,
			filename
		}
	}
	catch(e) {
		console.log(e)
		throw e
	}
};
