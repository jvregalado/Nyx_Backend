const dataLayer = require('./calendarDatalayer');
const moment = require('moment')
const sequelize = require('sequelize')
const {Op} = sequelize
exports.getHolidays = async({filters}) => {
	try {
		const year = moment().format('YYYY')

		return await dataLayer.getHolidays({
			filters:{
				[Op.and]: [
					sequelize.where(sequelize.fn('YEAR',sequelize.col('holiday_date')),'2022' )
				]
			}
		})
	}
	catch(e) {
		throw e
	}
}