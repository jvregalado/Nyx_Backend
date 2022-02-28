"use strict";

const bcrypt = require('bcryptjs');
const dataLayer = require('./dataLayer');

exports.createUser = async({
    ...data
}) => {
    try{

        const hashPassword = bcrypt.hashSync(data.password,10);

        return await dataLayer.createUser({
            ...data,
            user_password : hashPassword
        })

    }
    catch(e){
        throw e
    }
}

exports.getPaginatedUser = async({
    filters
}) => {
    try{

        let {orderBy,page,totalPage,...newFilters} = filters
        return await dataLayer.getPaginatedUser({
            orderBy:orderBy.split(','),
            page,
            totalPage,
            filters:{
                ...newFilters
            }
        })

    }
    catch(e){
        throw e
    }
}

/**LOGIN SERVICE */
exports.getUser = async({
    filters
}) => {
    try{

        return await dataLayer.getUser({
            filter:filters
        })

    }
    catch(e){
        throw e
    }
}

exports.updateUser = async({
    filters,
    data
}) => {
    try{

        return await dataLayer.updateUser({
            filters,
            data
        })

    }
    catch(e){
        throw e
    }
}