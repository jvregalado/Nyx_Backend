"use strict";

module.exports = (sequelize, DataTypes) => {
	const primary_secondary_map = sequelize.define("primary_secondary_map", {
		
	},
	{
		freezeTableName : true,
		hasTrigger: true
	})

	return primary_secondary_map;
}