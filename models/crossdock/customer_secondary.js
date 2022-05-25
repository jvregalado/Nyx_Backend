"use strict";

module.exports = (sequelize, DataTypes) => {
	const customer_secondary = sequelize.define("customer_secondary", {
		id: {
			type: DataTypes.STRING,
			allowNull: true,
			primaryKey: true
		},
		customer_primary_id: {
			type: DataTypes.STRING,
			allowNull: true
		},
		customer_category_id: {
			type: DataTypes.STRING,
			allowNull: true
		},
		prioritization: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		name_trade: {
			type: DataTypes.STRING,
			allowNull: true
		},
		name_registered: {
			type: DataTypes.STRING,
			allowNull: true
		},
		name_alias: {
			type: DataTypes.STRING,
			allowNull: true
		},
		address_billing: {
			type: DataTypes.STRING,
			allowNull: true
		},
		ship_to_code: {
			type: DataTypes.STRING,
			allowNull: true
		},
		ship_to_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		ship_to_address: {
			type: DataTypes.STRING,
			allowNull: true
		},
		contact_person_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		account_manager_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		cluster_id: {
			type: DataTypes.STRING,
			allowNull: false
		},
		documents_for_return: {
			type: DataTypes.STRING,
			allowNull: true
		},
		acceptance_time_start: {
			type: DataTypes.STRING,
			allowNull: true
		},
		acceptance_time_end: {
			type: DataTypes.STRING,
			allowNull: true
		},
		delivery_days: {
			type: DataTypes.STRING,
			allowNull: true
		},
		status: {
			type: DataTypes.STRING,
			allowNull: true
		},
		created_by: {
			type: DataTypes.STRING,
			allowNull: true
		},
		updated_by: {
			type: DataTypes.STRING,
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
		},
		account_manager_number: {
			type: DataTypes.STRING,
			allowNull: true
		},
		area_id: {
			type: DataTypes.STRING,
			allowNull: true
		},
		city_id: {
			type: DataTypes.STRING,
			allowNull: true
		},
		contact_person_number: {
			type: DataTypes.STRING,
			allowNull: true
		},
	},
	{
		freezeTableName : true,
		hasTrigger: true,
		timestamps: false
	})

	return customer_secondary;
}

// id
// customer_primary_id
// customer_category_id
// prioritization
// name_trade
// name_registered
// name_alias
// address_billing
// ship_to_code
// ship_to_name
// ship_to_address
// contact_person_name
// account_manager_name
// cluster_id
// documents_for_return
// acceptance_time_start
// acceptance_time_end
// delivery_days
// status
// created_by
// updated_by
// created
// updated
// deleted
// account_manager_number
// area_id
// city_id
// contact_person_number