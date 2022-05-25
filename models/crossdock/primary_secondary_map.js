"use strict";

module.exports = (sequelize, DataTypes) => {
	const primary_secondary_map = sequelize.define("primary_secondary_map", {
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
		customer_primary_id: {
			type: DataTypes.STRING,
			allowNull: true
		},
		customer_secondary_id: {
			type: DataTypes.STRING,
			allowNull: true
		},
		ship_to_code_primary: {
			type: DataTypes.STRING,
			allowNull: true
		},
		ship_to_code_logistikus: {
			type: DataTypes.STRING,
			allowNull: true
		},
		prioritization: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		created: {
			type: DataTypes.STRING,
			allowNull: false
		},
		updated: {
			type: DataTypes.STRING,
			allowNull: true
		},
		deleted: {
			type: DataTypes.STRING,
			allowNull: true
		}
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