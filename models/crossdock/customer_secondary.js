"use strict";

module.exports = (sequelize, DataTypes) => {
	const customer_secondary = sequelize.define("customer_secondary", {
		
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