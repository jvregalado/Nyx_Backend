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
				if(filters[key].value) {
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
