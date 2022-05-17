"use strict";

module.exports = (sequelize, DataTypes) => {
	const customer_secondary = sequelize.define("customer_secondary", {
		
	},
	{
		freezeTableName : true,
		hasTrigger: true
	})

	return customer_secondary;
}