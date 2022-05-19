"use strict";

const router = require('express').Router();
const { reportService,tmsreporthubService } = require('../services/nyx');
const helper = require('../services/helper/helper');
const path = require('path');
const fs = require('fs');
const { Console } = require('console');
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

router.post('/sp_DFDailyMonitoring_cdi', async(req,res) => {
	try {
		let {report_id} = req.query;
		let {data} = req.body;
		if(!data.dateFrom){
			throw new Error(`Please insert date creation`)
		}
		let ReportName = data.report.label.split(':').pop().replace(/\s/g, '')
		// let processor = req.processor;

		let result = await tmsreporthubService.sp_DFDailyMonitoring_cdi({ dateFrom:data.dateFrom })
		
		if(result.length<=1){
			throw new Error(`No data for this date`)
		}

		let TripIDpickArray = [...new Set(result.map(x => `${x['TripIDpick']}`))];
		let TripIDlineArray = [...new Set(result.map(x => `${x['TripIDline']}`))];
		let TripIDdelArray = [...new Set(result.map(x => `${x['TripIDdel']}`))];
		
		let KronosTripIDpick = await tmsreporthubService.getDFpick({TripIDpickArray})
		let KronosTripIDline= await tmsreporthubService.getDFline({TripIDlineArray})
		let KronosTripIDdel= await tmsreporthubService.getDFdel({TripIDdelArray})

		let DFreport = [];
		for (let x in result) 
		{
			const pick = KronosTripIDpick.findIndex(p => p.tripIDpick === result[x].TripIDpick);
			const line = KronosTripIDline.findIndex(p => p.tripIDline === result[x].TripIDline);
			const del = KronosTripIDdel.findIndex(p => p.tripIDdel === result[x].TripIDdel);
			//Pick Computation
			const CallTimeToDate = new Date(result[x].CallTime);
			const CallTimeStart = new Date(Date.parse(result[x].PickUpdate+' '+CallTimeToDate.toLocaleTimeString()))
			
			const ATA = new Date(KronosTripIDpick[pick]?.ataPickLoc)

			const CallTimeDuration = (CallTimeStart-ATA) / (1000 * 60 * 60 ); 
			const CompliancetoCallTime = Number(((ATA/CallTimeStart)*100)).toFixed(2)

			//Line Computation
			const LCTToDate = new Date(Date.parse(result[x].LCT));
			const LCTStart = new Date(Date.parse(result[x].PickUpdate+' '+LCTToDate.toLocaleTimeString()))
			// console.log("LCTStart",LCTStart)
			const ATAdel = new Date(KronosTripIDdel[del]?.ataInYard)

			const LCTDuration = (LCTStart-ATAdel) / (1000 * 60 * 60 ); 
			const CompliancetoLCT = Number(((ATAdel/LCTStart)*100)).toFixed(2)

			const ActualRDD = new Date(KronosTripIDdel[del]?.ADelConsignee)
			const RDD = new Date(result[x].RDD)
			const RDDduration = (ActualRDD-RDD) / (1000 * 60 * 60 ); 
			const CompliancetoRDD = Number(((ActualRDD/RDD)*100)).toFixed(2)
			//console.log(KronosTripIDpick[pick]?.ataPickLoc)
			DFreport.push({
				"Booking Date":result[x].BookingDate||"",												//1
				"Pickup Date":result[x].PickUpdate||"",													//2
				"Call Time":CallTimeToDate.toLocaleTimeString('en-US', { timeZone: 'Africa/Abidjan', hour12: true })||"",												//3
				"Container Size":result[x].ContainerSize||"",											//4
				"Principal":result[x].Principal||"",													//5
				"Pickup Site":result[x].ShipFrom||"",													//6
				"Origin":result[x].ShipTo||"",															//7
				"Destination":result[x].Destination||"",												//8
				"Delivery Address":result[x].DeliveryAddress||"",										//9
				"RDD":result[x].RDD||"",																//10
				"Trucker Assignment":KronosTripIDpick[pick]?.TruckAssignment||"",						//11
				"Plate No. Pick":KronosTripIDpick[pick]?.PlateNo||"",										//12
				"ATA @ Pickup Location": await helper.formatDateAndTime({toFormat:KronosTripIDpick[pick]?.ataPickLoc}),					//13
				"Call Time duration":CallTimeDuration,													//14
				"Compliance to Call Time":CompliancetoCallTime,											//15
				"LCT":LCTToDate.toLocaleTimeString('en-US', { timeZone: 'Africa/Abidjan', hour12: true })||"",				//16
				"ATA @ Pier for In-Yard":ATAdel,														//17
				"LCT Duration":LCTDuration,																//18
				"Compliance to LCT or In-Yard":CompliancetoLCT,											//19
				"Booking in SL":result[x].BookingSL||"",												//20
				"Container no.":KronosTripIDpick[pick]?.ContainerNo||"",								//21
				"Vessel & Voyage":KronosTripIDline[line]?.Voyage||"",									//22
				"Carrier":KronosTripIDline[line]?.Carrier||"",											//23
				"ETD Origin":`${KronosTripIDline[line]?.ETDoriginDate||""}-${KronosTripIDline[line]?.ETDoriginTime||""}`,	//24
				"ATD Origin":await helper.formatDateAndTime({toFormat:KronosTripIDline[line]?.ATDorigin}),								//25
				"ETA Destination":`${KronosTripIDline[line]?.ETDdestDate||""}-${KronosTripIDline[line]?.ETDdestTime||""}`,	//26
				"ATA Destination":await helper.formatDateAndTime({toFormat:KronosTripIDline[line]?.ATDdest}),							//27
				"Discharge Port":result[x].DischargePort,												//28
				"Actual Pullout from Pier":await helper.formatDateAndTime({toFormat:KronosTripIDdel[del]?.ApulloutPier}),				//29
				"Trucker":KronosTripIDdel[del]?.trucker||"",											//30
				"Plate No. Del":KronosTripIDdel[del]?.PlateNo||"",											//31
				"Actual delivery to consignee":await helper.formatDateAndTime({toFormat:KronosTripIDdel[del]?.ADelConsignee}),			//32
				"RDD Duration":RDDduration,																//33
				"Compliance to RDD":CompliancetoRDD,													//34
				"Dwell Time":"",						//35
				"Storage dwell time (2 days free)":"",	//36		
				"Shipment No.":result[x].ShipmentNo||"",												//37
				"Received by":result[x].ReceivedBy,														//38
				"Status":KronosTripIDdel[del]?.Remarks||"",												//39
				"Remarks":KronosTripIDdel[del]?.Remarks||""												//40
			})
		}

		

		res.status(200).json({
			data:await helper.generate_JSON_to_Excel({JSONdata:DFreport,ReportName})
		})
	}
	catch(e){
		console.log(e);
		res.status(500).json({
			message:`${e}`
		})
	}
})

module.exports = router;