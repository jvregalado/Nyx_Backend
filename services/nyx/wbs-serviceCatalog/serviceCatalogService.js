const dataLayer = require('./serviceCatalogDataLayer');

exports.createCategoryTransaction = async({
    header,details
}) => {
    try{
        return await dataLayer.createCategoryTransaction({
            header,
            details
        })
    }
    catch(e){
        throw e
    }
}

exports.getPaginatedServiceCatalogs = async({filters})=>{
    try{
        let {orderBy,page,totalPage,...newFilters} = filters;
        return await dataLayer.getPaginatedServiceCatalogs({
            filters:newFilters,
            orderBy,
            page,
            totalPage
        })

    }
    catch(e){
        throw e
    }
}

exports.getSubServiceCatalog = async({filters})=>{
    try{
        return await dataLayer.getSubServiceCatalog({
            filters
        })
    }
    catch(e){
        throw e
    }
}

exports.getServiceCatalog = async({filters})=>{
    try{

        return await dataLayer.getServiceCatalog({
            filters
        })

    }
    catch(e){
        throw e
    }
}

