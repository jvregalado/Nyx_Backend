"use strict";

const dataLayer = require('./dataLayer');
const helper = require('../../helper/helper');
const pdfToExcelGen = require('pdf-to-excel');
const Excel = require('exceljs');
const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');


exports.getAllrtv = async({
	filters
}) => {
	try{
		return await dataLayer.getAllrtv({
			filters
		})
	}
	catch(e){
		throw e
	}
}

exports.getPaginatedRTV = async({
	filters
}) => {
	try{

		let {orderBy,page,totalPage,...newFilters} = filters
		return await dataLayer.getPaginatedRTV({
			orderBy:orderBy.split(','),
			page,
			totalPage,
			filters:{
				...newFilters
			}
		})

	}
	catch(e){
		throw e
	}
}

exports.updateRTVhdr = async({
	filters,
	data
}) => {
	try{
		return await dataLayer.updateRTVhdr({
			filters,
			data
		})
	}
	catch(e){
		throw e
	}
}

exports.createRTVhdr = async({
	...data
}) => {
	try{
		return await dataLayer.createRTVhdr({
			...data
		})
	}
	catch(e){
		throw e
	}
}

exports.createRTVdtl = async({
	...data
}) => {
	try{
		return await dataLayer.createRTVdtl({
			...data
		})
	}
	catch(e){
		throw e
	}
}

exports.getPreConverter = async({
	pdfFile
}) => {
	helper.read_PreConverted({fileName:pdfFile});
}

exports.rtv_converter_to_excel = async({
	pdfFile,
	customerCode,
	ConversionCode,
	res,
	reupload,
	JSONExcel
}) => {
	try {
		const getMaintainedSTC = async({
			siteName,
			customerCode
		}) => {
			let maintainedSTCs = await helper.getData_from_other_API({customerCode});
		
			let getSTC = maintainedSTCs.data.items;

			let uniqueSTCs = getSTC.filter( i => siteName.includes((i.ship_to_name).toLowerCase()));

			//console.log("uniqueSTCs",uniqueSTCs)

			//let ship_to_code_logistikus = getSTC.filter( i => siteName.includes(i.name_trade))

			//let uniqueSTCs =ship_to_code_primary.concat(ship_to_code_logistikus);
			//console.log("uniqueSTCs",uniqueSTCs)
			return uniqueSTCs
		}

		const getStoredRTV = async({
			rtvnoArray,
			customerCode
		}) => {
			try {
		
				let storedRTV = await dataLayer.getStoredRTV({ rtvnoArray,customerCode });
		
				let uniqueRTV = [... new Set(storedRTV.map(x => x.rtv_no))];
		
				let difference = rtvnoArray.filter(x => uniqueRTV.includes(x));
		
				return difference
			}
			catch(e) {
				console.log(e)
			}
		}

		let toExcel=[];
		const filePath = pdfFile.replace('.pdf','.xlsx').replace('.html','.xlsx');
		const ext = pdfFile.split('.').pop().toLowerCase();
		//console.log("pdfFile",pdfFile)
		if(reupload)
		{
			toExcel=await helper.read_PreConverted({fileName:pdfFile})
		}
		if(ConversionCode==`MDLZ-Puregold-HTML`)
		{
			const html = fs.readFileSync(pdfFile, 'utf8').replace(/(\r\n|\n|\r)/gm, "");
			//console.log(html)

			const siteCode1 = `<td width="100"></td><td width="250"></td><td width="200" align="center"><font face="Tahoma" size="2"><b>`
			const siteCode2 = `</b></font></td><td width="300"></td></tr><tr><td width="100"></td><td width="250"></td><td width="200" align="center"><font face="Tahoma" size="2"><b>*** RTV Shipping Manifest ***`
			
			const site = html.substring(
				html.indexOf(siteCode1) + siteCode1.length, 
				html.lastIndexOf(siteCode2));

			//console.log(site);
			const siteCode = site.split(`_`);
			const site2 = siteCode[1].split(`<br>`);
			
			const rtv1 = `RTV Number:</b></font></td><td width="175" align="left"><font face="Tahoma" size="2">`
			const rtv2 = `</font></td></tr><tr style="line-height:100%"><td width="150"></td><td width="100"><font face="Tahoma" size="2"><b>`
			
			const rtv = html.substring(
				html.indexOf(rtv1) + rtv1.length, 
				html.lastIndexOf(rtv2));
			
			const rtvD1 =`Ship Date:</b></font></td><td width="175" align="left"><font face="Tahoma" size="2">`;
			const rtvD2 = `</font></td></tr></table><hr width="950" align="left"><table><tr><td width="100" align="center"><font face="Tahoma" size="2"><b>`
			
			const rtvD = html.substring(
				html.indexOf(rtvD1) + rtvD1.length, 
				html.lastIndexOf(rtvD2));
				toExcel.push({
					RTV: "'"+rtv,
					"RTV Date": rtvD,
					// "Vendor Code": "017674",
					// "Vendor Name": "MONDELEZ PHILIPPINES INC.",
					"Site Code": "'"+siteCode[0],
					"Site Name": site2[0],
					"Site Address": site2[1]
				})
		}
		if(ext=='pdf' && !JSONExcel)
		{
			/* convert to PDF to Excel */
			await pdfToExcelGen.genXlsx(pdfFile,pdfFile.replace('.pdf','.xlsx'))

			/* read excel */
			const wb = new Excel.Workbook();
			
			await wb.xlsx.readFile(filePath).then(function a(){
				var sh = wb.getWorksheet("Sheet1");

				let rtv;
				let site;

				if(ConversionCode==`MDLZ-Alfamart-PDF`)
				{
					console
					for (let i = 1; i <= sh.rowCount; i++) 
					{
						if(sh.getRow(i).getCell(8).value=="RTV Number:")
						{
							//console.log(sh.getRow(i).getCell(9).value);
							rtv=sh.getRow(i).getCell(9).value;
							const rtvDate=sh.getRow(i-8).getCell(4).value;
							site=sh.getRow(i-4).getCell(1).value;
							const siteCode = site.split(' ');
							const siteName = site.replace(siteCode[0],"").trim();
							const siteAddress=sh.getRow(i-2).getCell(1).value;

							toExcel.push({
								RTV: "'"+rtv,
								"RTV Date": rtvDate.trim(),
								// "Vendor Code": vendorCode[0],
								// "Vendor Name": vendorName,
								"Site Code":"'"+siteCode[0],
								"Site Name":siteName,
								"Site Address": siteAddress
							})
						}
					}
				}
				if(ConversionCode==`MDLZ-Waltermart-PDF`)
				{
					let recordInFile=``;
					for (let i = 1; i <= sh.rowCount; i++) 
					{
						for(let x = 1; x <= 100;x++)
						{
							if(sh.getRow(i).getCell(x).value)
							recordInFile=recordInFile+sh.getRow(i).getCell(x).value;
						}
						let findValue=sh.getRow(i).getCell(1).value;

						if(findValue)
						{
							if(findValue.includes(`Total articles in this RTV:`))
							{
								const rtv = recordInFile.substring(
									recordInFile.indexOf("RTV NO:") + 7, 
									recordInFile.lastIndexOf(" WALTERMART SUPERMARKETAnnouncement"));
								const rtvDate = recordInFile.substring(
									recordInFile.indexOf("RO Date:") + 8, 
									recordInFile.lastIndexOf("Amount:"));
								const site = recordInFile.substring(
									recordInFile.indexOf(`Site Code & Name:`) + 17, 
									recordInFile.lastIndexOf("Site Address:"));
								const siteCode = site.split(' ');
								const siteName = site.replace(siteCode[0],"").trim();
								const siteAddress = recordInFile.substring(
									recordInFile.indexOf(`Site Address:`) + 13, 
									recordInFile.lastIndexOf("Reasons:"));
								toExcel.push({
									RTV: "'"+rtv,
									"RTV Date": rtvDate,
									// "Vendor Code": '7587',
									// "Vendor Name": 'MONDELEZ PHILIPPINES INC',
									"Site Code":"'"+siteCode[0],
									"Site Name":siteName,
									"Site Address": siteAddress
								})
								recordInFile="";
							}
						}
					}
				}
				if(ConversionCode==`MDLZ-SM-PDF`)
				{
					for (let i = 1; i <= sh.rowCount; i++) 
					{
						if(sh.getRow(i).getCell(8).value)
						{
							// const VendorName=sh.getRow(i).getCell(6).value;
							// const VendorCode=sh.getRow(i).getCell(10).value;
							const Location=sh.getRow(i).getCell(8).value;
							const RTV=sh.getRow(i).getCell(15).value;
							let RTVdate="";
							let cellNo=1;
							for(;;)
							{
								if(sh.getRow(i).getCell(cellNo).value=='Date: ')
								{
									RTVdate=sh.getRow(i).getCell(cellNo+1).value;
									break;
								}
								cellNo++;
							}
							toExcel.push({
								RTV: "'"+RTV,
								"RTV Date": RTVdate,
								// "Vendor Code": VendorCode,
								// "Vendor Name": VendorName,
								"Site Code":"",
								"Site Name":Location,
								"Site Address": Location
							})
						}
					}
				}
				if(ConversionCode==`MDLZ-SM_Hypermarket-PDF`)
				{
					let site;
					let siteAddress;
					for (let i = 1; i <= sh.rowCount; i++) 
					{
						if(sh.getRow(i).getCell(8).value=="RTV NO:")
						{
						let rtv=sh.getRow(i).getCell(9).value;
						let rtvDate=sh.getRow(i).getCell(3).value;
							if(sh.getRow(i-2).getCell(1).value=="Site Address")
							{
								site=sh.getRow(i-3).getCell(1).value;
								siteAddress=sh.getRow(i-1).getCell(1).value+" "+sh.getRow(i).getCell(1).value;
							}
							else
							{
								site=sh.getRow(i-2).getCell(1).value;
								siteAddress=sh.getRow(i).getCell(1).value;
							}
						const siteCode = site.split(' ');
						const siteName = site.replace(siteCode[0],"").trim();

						toExcel.push({
							RTV: "'"+rtv.trim(),
							"RTV Date": rtvDate,
							// "Vendor Code": '110139',
							// "Vendor Name": 'MONDELEZ PHILIPPINES, INC. ',
							"Site Code":siteCode[0],
							"Site Name":siteName,
							"Site Address": siteAddress
							})
						}
					}
				}
				if(ConversionCode==`MDLZ-Robinson-PDF`)
				{
					let rtv
					let rtvDate
					let site
					let siteCode
					let siteName
					for (let i = 1; i <= sh.rowCount; i++) 
					{
						if(sh.getRow(i).getCell(2).value)
						{
							if(sh.getRow(i).getCell(15).value=="RTV DATE :")
							{
								rtv=sh.getRow(i).getCell(21).value;
								rtvDate=sh.getRow(i).getCell(17).value;

								site=sh.getRow(i).getCell(12).value;
								siteCode = site.split('-');
								siteName = site.replace(siteCode[0],"").trim().substring(1);
						
								//siteAddress="";
							}
							else
							{
								rtv=sh.getRow(i).getCell(20).value;

								rtvDate=sh.getRow(i).getCell(16).value;

								site=sh.getRow(i).getCell(12).value;
								siteCode = site.split('-');
								siteName = site.replace(siteCode[0],"").trim().substring(1);

								//siteAddress="";
							}
							toExcel.push({
								RTV: "'"+rtv,
								"RTV Date": rtvDate,
								// "Vendor Code": vendorCode[0],
								// "Vendor Name": vendorName,
								"Site Code":siteCode[0].replace(`VALENZUELA `,""),
								"Site Name":siteName,
								//"Site Address": ""
							})
						 }
					}
				}
				
			});
		}

		helper.generate_JSON_to_CSV({customerCode,toExcel,fileName:filePath.replace('.xlsx','.csv'),pdfFile,res})

		let findUnique = JSONExcel||toExcel;

		let uniqueSiteName = [...new Set(findUnique.map(x => `${x['Site Name'].toLowerCase().replace('\'','')}`))];

		let uniqueRTV = [...new Set(findUnique.map(x => `${x['RTV'].replace('\'','')}`))];

		let getMaintined = await getMaintainedSTC({siteName:uniqueSiteName,customerCode})
		
		let getStored = await getStoredRTV({rtvnoArray:uniqueRTV,customerCode})
		//console.log("getStored",getStored)

		for (let x in findUnique) 
		{
			//console.log("(getStored.includes(findUnique[x].RTV.replace('\'','')))",(getStored.includes(findUnique[x].RTV.replace('\'',''))))
			findUnique[x].Status=(getStored.includes(findUnique[x].RTV.replace('\'','')))?'Duplicate':'Unmaintained'
		}

		for (let x in getMaintined)
		{
			//Find the position of unmaintained STC
			//let pos = findUnique.multiIndexOf(v => v['Site Code'].replace('\'','') == getMaintined[x]['ship_to_code_primary'])
			//let pos = findUnique.map((elm, idx) => elm['Site Code'].replace('\'','') == getMaintined[x]['ship_to_code_primary'] ? idx : '').filter(String);
			let pos = findUnique.reduce((c, v, i) => v['Site Name'].replace('\'','') == getMaintined[x]['ship_to_name'] ? c.concat(i) : c, []);
			//Change value of Status 
			if(pos)
			{
				for(let i of pos)
				{
					findUnique[i]['Site Code'] = getMaintined[x]['ship_to_code_logistikus']
					if(findUnique[i]['Status']=='Unmaintained')
						findUnique[i]['Status'] = 'OK'
				}
			}

			let pos2 = findUnique.reduce((c, v, i) => v['Site Code'].replace('\'','') == getMaintined[x]['ship_to_code_logistikus'] ? c.concat(i) : c, []);
			if(pos2)
			{
				for(let i of pos2)
				{
					findUnique[i]['Site Code'] = getMaintined[x]['ship_to_code_logistikus']
					if(findUnique[i]['Status']=='Unmaintained')
						findUnique[i]['Status'] = 'OK'
				}
			}
		}
		res.status(200).json({
			pdfFile,
			customerCode,
			ConversionCode,
			toExcel:findUnique
		})
	}
	catch(e){
		helper.remove_File({fileDir:pdfFile});
		helper.remove_File({fileDir:pdfFile.toLowerCase().replace('.pdf','.xlsx').replace('.html','.xlsx')});
		res.status(500).json({
			message:`${e}`
		})
	}
}

exports.generate_JSON_to_Excel_RTV = async({customerCode,toExcel,fileName,res})=>{
	try
	{
		const TempBRpath = path.join(__dirname,'../../../assets/TemplateFiles', 'TempBR.xlsx')
		
		const TempBRread = xlsx.readFile(TempBRpath);
		const BasicInfoSheet = TempBRread.Sheets["Basic Info"];
		const BasicInfoJSON = xlsx.utils.sheet_to_json(BasicInfoSheet);
		
		const ConsignmentDetailsSheet = TempBRread.Sheets["Consignment Details"];
		const ConsignmentDetailsJSON = xlsx.utils.sheet_to_json(ConsignmentDetailsSheet);

		const AddressDetailsSheet = TempBRread.Sheets["Address Details"];
		const AddressDetailsJSON = xlsx.utils.sheet_to_json(AddressDetailsSheet);

		let recno = 0;
		for (let x in toExcel) {
			recno++;
			BasicInfoJSON.push({
				'Please DO NOT DELETE THIS Column':1,
				'Rec No':recno,
				'Location':'ZEUS',//to change. should not be hardcoded
				'BR Priority':'Normal',	
				'Customer ID':'10005',//to change. should not be hardcoded
				'Cust Ref No':toExcel[x]["rtv"],
				'Service Type': 'REVERSE LOGISTICS',
				'Vehicle Type Non Mandatory': 'ACC-L300CV',
				'Ship From': toExcel[x]["Site Code"],//to change. Shipfrom
				'Ship To':'STC-000002281',
				'Pick Up Date':toExcel[x]["RTV Date"],
				'Delivery Date': toExcel[x]["RTV Date"],

			})
		}
		//BasicInfoJSON.shift()
		//console.log(BasicInfoJSON)
		const newBook = xlsx.utils.book_new();
		const BasicInfo = xlsx.utils.json_to_sheet(BasicInfoJSON);
		const ConsignmentDetails = xlsx.utils.json_to_sheet(ConsignmentDetailsJSON);
		const AddressDetails = xlsx.utils.json_to_sheet(AddressDetailsJSON);

		xlsx.utils.book_append_sheet(newBook, BasicInfo, "Basic Info");
		xlsx.utils.book_append_sheet(newBook, ConsignmentDetails, "Consignment Details");
		xlsx.utils.book_append_sheet(newBook, AddressDetails, "Address Details");
		const fileoutput = fileName.replace('.xlsx','Generated.xlsx').replace('.pdf','Generated.xlsx').replace('.html','Generated.xlsx').replace('.csv','Generated.xlsx');
		xlsx.writeFile(newBook, fileoutput)
		//res.status(200).json({ })
		//console.log(fileoutput);
		const contents = fs.readFileSync(fileoutput, {encoding: 'base64'});
		//console.log("contents",contents)
		res.status(200).json({contents});
	}
	catch(e){
		res.status(500).json({
			message:`${e}`
		})
	}
}
