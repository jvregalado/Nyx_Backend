"use strict";

const dataLayer = require('./dataLayer');

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