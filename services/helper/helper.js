"use strict"

const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

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
