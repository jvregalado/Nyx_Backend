"use strict";

module.exports = (sequelize, DataTypes) => {
	const primary_secondary_map = sequelize.define("primary_secondary_map", {
		
	},
	{
		freezeTableName : true,
		hasTrigger: true,
		timestamps: false
	})

	return primary_secondary_map;
}

// id
// customer_primary_id
// customer_secondary_id
// ship_to_code_primary
// ship_to_code_logistikus
// prioritization
// created
// updated
// deleted
// ship_to_code
// ship_to_name
// name_registered