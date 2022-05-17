"use strict";

const dataLayer = require('./dataLayer');
const dataLayerKronos = require('./dataLayerKronos');
const helper = require('../../helper/helper');



exports.sp_DFDailyMonitoring_cdi = async({
	dateFrom
}) => {
	try{
		return await dataLayer.sp_DFDailyMonitoring_cdi({
			dateFrom
		})
	}
	catch(e){
		throw e
	}
}

exports.getDFpick = async({
	TripIDpickArray
}) => {
	try{
		return await dataLayerKronos.getDFpick({
			TripIDpickArray
		})
	}
	catch(e){
		throw e
	}
}

exports.getDFline = async({
	TripIDlineArray
}) => {
	try{
		return await dataLayerKronos.getDFline({
			TripIDlineArray
		})
	}
	catch(e){
		throw e
	}
}

exports.getDFdel = async({
	TripIDdelArray
}) => {
	try{
		return await dataLayerKronos.getDFdel({
			TripIDdelArray
		})
	}
	catch(e){
		throw e
	}
}