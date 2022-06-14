const dataLayer = require('./serviceCatalogDataLayer');

exports.createCategoryTransaction = async({
	header,details
}) => {
	try {
		return await dataLayer.createCategoryTransaction({
			header,
			details
		})
	}
	catch(e) {
		throw e
	}
}

exports.bulkCreateL3Catalog=async({data})=>{
	try {
		return await dataLayer.bulkCreateL3Catalog({
			data,
			options:{
				updateOnDuplicate:['is_active','l3_catalog_name','updated_by']
			}
		})
	}
	catch(e) {
		throw e
	}
}

exports.getPaginatedServiceCatalogs = async({filters})=>{
	try {
		let {orderBy,page,totalPage,...newFilters} = filters;
		return await dataLayer.getPaginatedServiceCatalogs({
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

exports.getSubServiceCatalog = async({filters})=>{
	try {
		return await dataLayer.getSubServiceCatalog({
			filters
		})
	}
	catch(e) {
		throw e
	}
}

exports.getServiceCatalog = async({filters})=>{
	try {

		return await dataLayer.getServiceCatalog({
			filters
		})

	}
	catch(e) {
		throw e
	}
}

exports.getAllL3ServiceCatalog=async({filters})=>{
	try {
		return await dataLayer.getAllL3ServiceCatalog({
			filters
		})
		.then(result => {
			return result.map(item => {
				const {createdAt,updatedAt,created_by,updated_by,...newItem} = item

				return item
			})
		})

	}
	catch(e) {
		throw e
	}
}
exports.updateServiceCatalogTransaction = async({
	header,
	details,
	filters
})=>{
	try {
		return await dataLayer.updateServiceCatalogTransaction({
			header,
			details,
			filters
		})
	}
	catch(e) {
		throw e
	}
}

exports.getAllServiceCatalog = async({
	filters
})=>{
	try {
		return await dataLayer.getAllServiceCatalog({
			filters
		})
	}
	catch(e) {
		throw e
	}
}