"use strict";

const models = require('../../../models/nyx');
const {sequelize,Sequelize} = models;

exports.upsertUserSession = async({
	...data
}) => {
	try {
		return await models.user_session_tbl.upsert({
			...data
		})
	}
	catch(e){
		throw e
	}
}

exports.getUserSession = async({
	...data
}) => {
	try {
		return await models.user_session_tbl.findOne({
			filters : {...data}
		})
	}
	catch(e){
		throw e
	}
}


