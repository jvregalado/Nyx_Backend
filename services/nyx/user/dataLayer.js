"use strict";

const models = require('../../../models/nyx');

exports.getUser = async({
	filter
}) => {
	try{
		return await models.user_table.findOne({
			where:{
				...filter
			}
		})
	}
	catch(e){
		throw e
	}
}
