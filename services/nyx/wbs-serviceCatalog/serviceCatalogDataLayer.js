const models = require('../../../models/nyx');
const {useFormatFilters} = require('../../../helpers');
const {globalSearchFilter} = useFormatFilters;
const {sequelize} = models

const createCategory = async({data,options}) => {
    try{
        return await models.wbs_service_catalogs_hdr_tbl.create({
            ...data,
            
        },
        {
            ...options
        })
    }
    catch(e){
        throw e
    }
}

const bulkCreateSubCategory = async({data,options}) => {
    try{
        return await models.wbs_sub_service_catalog_dtl_tbl.bulkCreate(
            data,
        {
            ...options
        })
    }
    catch(e){
        throw e
    }
}

const bulkCreateL3Catalog = async({data,options})=>{
    try {
        return await models.wbs_service_catalog_l3_dtl_tbl.bulkCreate(data,
            {
                ...options
            })    
    } 
    catch (error) {
        throw error
    }
}

const createCategoryTransaction =async({header,details}) => {
    try{
        return await sequelize.transaction(async t => {
            const headers = await createCategory({
                data:header,
                options:{
                    transaction:t
                }
            })

            await bulkCreateSubCategory({
                data:details.map(item => {
                    return {
                        ...item,
                        catalog_id:headers.catalog_id
                    }
                }),
                options:{
                    transaction:t
                }
            })
        })

    }
    catch(e){
        throw e
    }
}

const getPaginatedServiceCatalogs = async({
    filters,
    orderBy,
	page,
	totalPage
})=>{
    try{
        let newFilter = globalSearchFilter({
            model:models.wbs_service_catalogs_hdr_tbl.rawAttributes,
            filters
        })

        const {count,rows} = await models.wbs_service_catalogs_hdr_tbl.findAndCountAll({
            where:{
                ...newFilter
            },
            offset:parseInt(page)*parseInt(totalPage),
            limit :parseInt(totalPage),
        })
        .then(result => {
            let {count,rows} = JSON.parse(JSON.stringify(result))
            return {
                count,
                rows
            }
        })

        return {
			count,
			rows
		}
    }
    catch(e){
        throw e
    }
}

const getSubServiceCatalog = async({filters})=>{
    try{
        return await models.wbs_sub_service_catalog_dtl_tbl.findAll({
            where:{
                ...filters
            }
        })
        .then(result => {
            return JSON.parse(JSON.stringify(result))
        })
    }
    catch(e){
        throw e
    }
}

const getServiceCatalog = async({filters})=>{
    try{
        return await models.wbs_service_catalogs_hdr_tbl.findOne({
            where:{
                ...filters
            }
        })
        .then(result => result)
    }
    catch(e){
        throw e
    }
}

const getAllServiceCatalog = async({filters})=>{
    try{
        return await models.wbs_service_catalogs_hdr_tbl.findAll({
            where:{
                ...filters
            }
        })
    }
    catch(e){
        throw e
    }
}

const getAllL3ServiceCatalog = async({filters})=>{
    try{
        return await models.wbs_service_catalog_l3_dtl_tbl.findAll({
           where:{
               ...filters
           }
        })
        .then(result => JSON.parse(JSON.stringify(result)))
    }
    catch(e){
        throw e
    }
}


const updateServiceCatalog = async({
    filters,
    data,
    options
}) => {
    try{

        return await models.wbs_service_catalogs_hdr_tbl.update({
            ...data
        },
        {
            where:{
                ...filters
            },
            ...options
        })

    }
    catch(e){
        throw e
    }
}

const updateServiceCatalogTransaction = async({
    header,
    filters,
    details
})=>{
    try{
        return await sequelize.transaction(async t=> {
            await updateServiceCatalog({
                data:{
                    ...header
                },
                filters:{
                    ...filters
                },
                options:{
                    transaction : t
                }
            })

            await bulkCreateSubCategory({
                data:details,
                options:{
                    transaction:t,
                    updateOnDuplicate:['is_active','updated_by']
                }
            })


        })
    }
    catch(e){
        throw e
    }
}

module.exports = {
    createCategoryTransaction,
    bulkCreateL3Catalog,
    getPaginatedServiceCatalogs,
    getSubServiceCatalog,
    getServiceCatalog,
    getAllServiceCatalog,
    getAllL3ServiceCatalog,
    updateServiceCatalog,
    updateServiceCatalogTransaction
}