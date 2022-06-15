const dataLayer = require('./wbsRoleDatalayer');
exports.createRole = async({data})=>{
	try {
		return await dataLayer.createRole({
			data
		})
	}
	catch(e) {
		throw e
	}
}

exports.getPaginatedRole = async({filters})=>{
	try {
		let {orderBy,page,totalPage,...newFilters} = filters;
		return await dataLayer.getPaginatedRole({
			filters:newFilters,
			orderBy,
			page,
			totalPage
		})

	}
	catch(e) {
		throw e
	}
}

exports.getRole = async({filters})=>{
	try {
		return await dataLayer.getRole({filters})
	}
	catch(e) {
		throw e
	}
}

exports.getAllRoles = async({filters})=>{
	try {
		return await dataLayer.getAllRoles({filters})

	}
	catch(e) {
		throw e
	}
}

exports.getRoleDetails = async({filters}) => {
	try {
		return await dataLayer.getRoleDetails({filters})
	}
	catch(e) {
		throw e
	}
}

exports.bulkCreateRoleDetails = async({data})=>{
	try {
		return await dataLayer.bulkCreateRoleDetails({
			data,
			options:{
				updateOnDuplicate:['is_primary','is_active']
			}
		})
	}
	catch(e) {
		throw e
	}
}