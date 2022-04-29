"use strict";

const router = require('express').Router();
const { reportService,tmsconverterService } = require('../services/nyx');
const path = require('path');
const fs = require('fs');
const NOW = new Date();

router.get('/report-sourcecode', async(req,res) => {
	try {
		let {report_id} = req.query;
		// let processor = req.processor;

		let result = await reportService.getAllReport({ filters : { report_id } })

		res.status(200).json({
			data:result
		})
	}
	catch(e){
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})


router.get('/', async(req,res) => {
	try {
		let query = req.query;
		console.log(query)
		// const conversionType = value.rtvType.label

		// if(!conversionType) {
		// 	throw new Error(`Select Conversion Type!`)
		// }
		// const customerCode = conversionType.split('-')[0];
		// const {rows} = await tmsconverterService.getPreConverter({pdfFile,customerCode})
		
		// res.status(200).json({
		// 	data:rows
		// })
	}
	catch(e){
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

router.post('/', async(req,res) => {
	try 
	{

		const {data} = req.body;
		const processor = req.processor;

		if(!data.fileName){
			throw new Error(`Please upload a file`)
		}
		//console.log(data)
		const file = data.file;
		const JSONExcel = data.JSONExcel;
		//console.log(data);
		const value = data.value;
		const fileDir = data.id;
		const ext = data.fileName.split('.').pop().toLowerCase();
		const reupload = data.reupload;

		if((ext!='csv') && (reupload))
			throw new Error(`You can only re-upload the CSV file!`)

		const conversionType = value.rtvType.label
		if(!conversionType) {
			throw new Error(`Select Conversion Type!`)
		}

		const customerCode = conversionType.split('-')[0];
		const ConversionCode = conversionType.split(' ')[0];
		const fileDirSplit = fileDir.split('-')

		//console.log(data.id);

		var fd=path.join(__dirname,`../SavedFiles/${fileDirSplit[0]}`);

		if (!fs.existsSync(fd)) 
			fs.mkdirSync(fd, { recursive: true })

		const fileName = fileDir+`.`+ext;
		const dir = fd+`\\`+fileName;

		data.uploaded_file_name = fileName;
		data.uploaded_by=processor.user_id;
		data.c_status=`Uploaded`
		data.customer=customerCode;
		data.rtv_type=ConversionCode;
		data.checked_file_name = `${fileDir}.csv`;
		data.checked_by = processor.user_id;
		
		//console.log(data)
		if(file)
		{
				let base64Data;
			if(ext==`html`)
				base64Data = file.replace(/^data:text\/html;base64,/, "");
			if(ext==`csv`)
				base64Data = file.replace(/^data:text\/csv;base64,/, "");
			if(ext==`pdf`)
				base64Data = file.replace(/^data:application\/pdf;base64,/, "");
			
			fs.writeFile(dir, base64Data,'base64', function(err) {
				if (err){
					console.log(dir,"\n\n\n\n\n Can not write to above file:\n\n",err);
				}
				else {
					tmsconverterService.rtv_converter_to_excel({
						pdfFile:dir,
						customerCode,
						ConversionCode,
						reupload,
						JSONExcel,res})
					//console.log(data)
					if(!reupload)
						tmsconverterService.createRTVhdr({...data})
				}
			});
		}
		else{
			console.log(fileDir)
			//console.log("dir",dir,"customerCode",customerCode,"ConversionCode",ConversionCode,"reupload",reupload);
			tmsconverterService.rtv_converter_to_excel({pdfFile:dir,customerCode,ConversionCode,reupload,JSONExcel,res})
			
		}
		tmsconverterService.updateRTVhdr({
			filters:{
				id : fileDir
			},
			data:{
				checked_by:processor.user_id,
				checked_date:NOW
			}
		})
		//res.status(200).end()
	}
	catch(e){
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}

 })


 router.get('/', async(req,res) => {
	try {
		let query = req.query;

		const {count, rows} = await tmsconverterService.getPaginatedRTV({
			filters:{
				...query
			},
		})
		
		res.status(200).json({
			data:rows,
			rows:count
		})
	}
	catch(e){
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

 router.get('/details', async(req,res) => {
	try {
		let query = req.query;

		const result = await tmsconverterService.getAllrtv({
			filters:{
				...query
			}
		})

		res.status(200).json({
			data:result
		})
	}
	catch(e){
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})
 
router.post('/generate', async(req,res) => {
	try 
	{

		const {data} = req.body;
		const processor = req.processor;
		const insertToExcel=data.toExcel;
		if(!data.pdfFile){
			throw new Error(`Please upload a file`)
		}
		
		for(let x in insertToExcel)
		{
			if(insertToExcel[x]["Status"]!=='OK')
				throw new Error(`Unable to generate file, please check the Status`)
		}

		tmsconverterService.generate_JSON_to_Excel_RTV({
			customerCode:data.customerCode,
			toExcel:data.toExcel,
			fileName:data.pdfFile,
			res})
		
		tmsconverterService.updateRTVhdr({
			filters:{
				id : data.id
			},
			data:{
				generated_by:processor.user_id,
				generated_date:NOW,
				generated_file_name:`${data.id}Generated.xlsx`,
				last_generated_by:processor.user_id,
				last_generated_date:NOW,
				c_status:`Generated`
			}
		})
		for(let x in insertToExcel)
		{
			tmsconverterService.createRTVdtl({
				id:`${data.id}${x}`,
				header_id:data.id,
				rtv_no:insertToExcel[x]["RTV"].replace('\'',''),
				rtv_date:insertToExcel[x]["RTV Date"],
				site_code:insertToExcel[x]["Site Code"].replace('\'',''),
				site_name:insertToExcel[x]["Site Name"],
				customer_code:data.customerCode
			})
		}
		
	}
	catch(e){
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

module.exports = router;