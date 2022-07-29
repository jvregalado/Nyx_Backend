"use strict"

const reasoncodeService = require('../services/nyx/administration-reasoncode')

exports.normalizeFilterFromFrontend = async({
	filters
}) => {
	try {
		let newFilters = {};
		let keys = Object.keys(filters);

		for(let key of keys) {
			if((key.toLowerCase().includes('date') || key.toLowerCase().includes('time'))
				&& typeof filters[key] === 'string') {
				newFilters[key] = filters[key].replace('T', ' ').replace('Z','').slice(0,10)
			}
			else if(typeof filters[key] === 'object') {
				if(filters[key]?.value) {
					let reasoncode = await reasoncodeService.getAllReasonCode({
						filters : {
							rc_id : filters[key].value
						}
					})
					newFilters[key] = reasoncode[0]?.rc_code
				}
			}
			else {
				newFilters[key] = filters[key]
			}
		}

		return newFilters
	}
	catch(e) {
		throw e
	}
}

const stringToJson_report_source_code = async({
	report_source_code
}) => {
	try {

		if(/^[\],:{}\s]*$/.test(report_source_code.replace(/\\["\\\/bfnrtu]/g, '@').
		replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
		replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
			return JSON.parse(report_source_code)
		}

	}
	catch(e) {
		throw e
	}
}

exports.validateFilters_vs_sourceCode = async({
	filters,
	report_source_code
}) => {
	try {

		let source_code = await stringToJson_report_source_code({
			report_source_code
		})

		console.log('source_code',source_code)
		console.log('filters',filters)

		for(let dd of source_code?.dropdowns) {
			if(dd.isRequired && !filters[dd.name]) {
				throw new Error (`No filter provided for ${dd.label}`)
			}
		}

		for(let tf of source_code?.textfields) {
			if(tf.isRequired && !filters[tf.name]) {
				throw new Error (`No filter provided for ${tf.label}`)
			}
		}

		for(let df of source_code?.datefields) {
			if(df.isRequired && !filters[df.name]) {
				throw new Error (`No filter provided for ${df.label}`)
			}
		}

	}
	catch(e) {
		throw e
	}
}

exports.stringToJson_report_source_code