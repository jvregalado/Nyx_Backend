"use strict";

module.exports = (sequelize, DataTypes) => {
	const material = sequelize.define("material", {
		
	},
	{
		freezeTableName : true,
		hasTrigger: true
	})

	return material;
}