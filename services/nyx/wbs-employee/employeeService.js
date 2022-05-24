const dataLayer = require('./employeeDatalayer');

exports.createEmployee = async({data}) => {
    try{
        return await dataLayer.createEmployee({
            data
        })
    }
    catch(e){
        throw e
    }
}

exports.getPaginatedEmployees = async({filters}) => {
    try{

        let {orderBy,page,totalPage,...newFilters} = filters;

        return await dataLayer.getPaginatedEmployees({
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

exports.getAllEmployees = async({filters})=>{
    try{
        return await dataLayer.getAllEmployees({
            filters
        })
    }
    catch(e){
        throw e
    }
}