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
		
		if(result.length<=0){
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
			// console.log("pick",pick);
			// console.log("line",line);
			// console.log("del",del);
			// console.log("KronosTripIDdel",KronosTripIDdel);
			//Pick Computation
			const CallTimeToDate = new Date(result[x].CallTime);
			const CallTimeStart = new Date(Date.parse(result[x].PickUpdate+' '+CallTimeToDate.toLocaleTimeString()))
			const CallTimeStartDate = await helper.formatDateAndTime({toFormat:CallTimeStart})
			
			const ATAnum = new Date(KronosTripIDpick[pick]?.ataPickLoc);
			const ATA = await helper.formatDateAndTime({toFormat:ATAnum})

			const CallTimeDuration = ((CallTimeStart-ATAnum) / (1000 * 60 * 60 )).toFixed(2); 
			const CompliancetoCallTime = (((24+Number(CallTimeDuration))/24)*100).toFixed(2);;
			//Line Computation
			const LCTToDate = new Date(Date.parse(result[x].LCT));
			const LCTStartnum = new Date(Date.parse(result[x].PickUpdate+' '+LCTToDate.toLocaleTimeString()))
			const LCTStart = await helper.formatDateAndTime({toFormat:LCTStartnum})
			
			const ATApicknum = new Date(KronosTripIDpick[pick]?.ataInYard)
			const ATApick = await helper.formatDateAndTime({toFormat:ATApicknum})

			const LCTDuration = (LCTStartnum-ATApicknum) / (1000 * 60 * 60 ).toFixed(2); 
			const CompliancetoLCT = (((24+Number(LCTDuration))/24)*100).toFixed(2);

			const ActualRDDnum = new Date(KronosTripIDdel[del]?.ADelConsignee)
			const ActualRDD = await helper.formatDateAndTime({toFormat:ActualRDDnum})
			const RDD = new Date(result[x].RDD)
			const RDDduration = Number((RDD-ActualRDDnum) / (1000 * 60 * 60 * 24)).toFixed(2); 
			const RDDdurationHR = Number((RDD-ActualRDDnum) / (1000 * 60 * 60)).toFixed(2); 
			const CompliancetoRDD = (((24+Number(RDDdurationHR))/24)*100).toFixed(2);

			const ETDOriginnum = new Date(Date.parse(KronosTripIDline[line]?.ETDoriginDate||null+' '+KronosTripIDline[line]?.ETDoriginTime.toLocaleTimeString()))
			const ETDOrigin = await helper.formatDateAndTime({toFormat:ETDOriginnum})

			const ATAOriginnum = new Date(KronosTripIDline[line]?.ATDorigin);
			const ATAOrigin = await helper.formatDateAndTime({toFormat:ATAOriginnum})

			const DeparturePerformance = Number((ETDOriginnum-ATAOriginnum) / (1000 * 60 * 60 * 24)).toFixed(2);
			 
			const ETDDestinationnum = new Date(Date.parse(KronosTripIDline[line]?.ETDdestDate||null+' '+KronosTripIDline[line]?.ETDdestTime.toLocaleTimeString()))
			const ETDDestination = await helper.formatDateAndTime({toFormat:ETDDestinationnum})

			const ATADestinationnum = new Date(KronosTripIDline[line]?.ATDdest);
			const ATADestination = await helper.formatDateAndTime({toFormat:ATADestinationnum})

			const ArrivalPerformance = Number((ETDDestinationnum-ATADestinationnum) / (1000 * 60 * 60 * 24)).toFixed(2); 

			const ApulloutPiernum = new Date(KronosTripIDdel[del]?.ApulloutPier)
			const ApulloutPier = await helper.formatDateAndTime({toFormat:ApulloutPiernum})

			const StorageDwell = Number((ATADestinationnum-ApulloutPiernum) / (1000 * 60 * 60 * 24)).toFixed(2); 
			
			DFreport.push({
				"Booking Date":result[x].BookingDate||"",																	//1
				"Pickup Date":result[x].PickUpdate||"",																		//2
				"Call Time":CallTimeStartDate,																				//3
				"Container Size":result[x].ContainerSize||"",																//4
				"Principal":result[x].Principal||"",																		//5
				"Pickup Site":result[x].ShipFrom||"",																		//6
				"Origin":result[x].ShipTo||"",																				//7
				"Destination":result[x].Destination||"",																	//8
				"Delivery Address":result[x].DeliveryAddress||"",															//9
				"RDD":result[x].RDD||"",																					//10
				"Trucker Assignment":KronosTripIDpick[pick]?.TruckAssignment||"",											//11
				"Plate No. Pick":KronosTripIDpick[pick]?.PlateNo||"",														//12
				"ATA @ Pickup Location": ATA,																				//13
				"Call Time duration":ATA?`${CallTimeDuration} Hour(s)`:null,																//14
				"Compliance to Call Time":ATA?`${CompliancetoCallTime} %`:null,												//15
				"LCT":LCTStart,																								//16
				"ATA @ Pier for In-Yard":ATApick,																			//17
				"LCT Duration":ATApick?`${LCTDuration} Hour(s)`:null,																					//18
				"Compliance to LCT or In-Yard":ATApick?CompliancetoLCT:null,																//19
				"Booking in SL":result[x].BookingSL||"",																	//20
				"Container no.":KronosTripIDpick[pick]?.ContainerNo||"",													//21
				"Vessel & Voyage":KronosTripIDline[line]?.Voyage||"",														//22
				"Carrier":KronosTripIDline[line]?.Carrier||"",																//23
				"ETD Origin":ETDOrigin,																						//24
				"ATD Origin":ATAOrigin,																						//25
				"Departure Reliability Performance":ETDOrigin?`${DeparturePerformance} Day(s)`:null,													//26
				"ETA Destination":ETDDestination,																			//27
				"ATA Destination":ATADestination,																			//28
				"Arrival Reliability Performance":ETDDestination?`${ArrivalPerformance} Day(s)`:null,														//29
				"Discharge Port":result[x].DischargePort,																	//30
				"Actual Pullout from Pier":ApulloutPier,	//31
				"Trucker":KronosTripIDdel[del]?.trucker||"",																//32
				"Plate No. Del":KronosTripIDdel[del]?.PlateNo||"",															//33
				"Actual delivery to consignee":ActualRDD,																	//34
				"RDD Duration":ActualRDD?`${RDDduration} Day(s)`:"",														//35
				"Compliance to RDD":ActualRDD?`${CompliancetoRDD}%`:"",														//36
				//"Dwell Time":"",																							//37
				"Storage dwell time (2 days free)":`${StorageDwell} Day(s)`,																		//38		
				"Shipment No.":result[x].ShipmentNo||"",												//39
				"Received by":result[x].ReceivedBy,														//40
				"Status":KronosTripIDdel[del]?.Remarks||"",												//4
				"Remarks":KronosTripIDdel[del]?.Remarks||""												//4
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