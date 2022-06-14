"use strict";

const bcrypt = require('bcryptjs');
const dataLayer = require('./dataLayer');

exports.createUser = async({
	...data
}) => {
	try {

		const hashPassword = bcrypt.hashSync(data.password,10);

		return await dataLayer.createUser({
			...data,
			user_password : hashPassword
		})

	}
	catch(e) {
		throw e
	}
}

exports.getPaginatedUser = async({
	filters
}) => {
	try {

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
	catch(e) {
		throw e
	}
}

/**LOGIN SERVICE */
exports.getUser = async({
	filters
}) => {
	try {
		return await dataLayer.getUser({
			filters
		})
	}
	catch(e) {
		throw e
	}
}

exports.getAllUser = async({
	filters
}) => {
	try {
		return await dataLayer.getAllUser({
			filters
		})
	}
	catch(e) {
		throw e
	}
}

exports.updateUser = async({
	filters,
	data
}) => {
	try {
		const user_password = data.user_new_password ? bcrypt.hashSync(data.user_new_password,10) : undefined;

		return await dataLayer.updateUser({
			filters,
			data : {
				...data,
				user_password
			}
		})
	}
	catch(e) {
		throw e
	}
}
