"use strict";

module.exports = (sequelize, DataTypes) => {
	const customer_primary = sequelize.define("customer_primary", {
		id : {
			type: DataTypes.STRING,
			allowNull: true,
			primaryKey: true
		},
		code : {
			type: DataTypes.STRING,
			allowNull: true
		},
		customer_category_id : {
			type: DataTypes.STRING,
			allowNull: true
		},
		name_trade : {
			type: DataTypes.STRING,
			allowNull: true
		},
		name_registered : {
			type: DataTypes.STRING,
			allowNull: true
		},
		name_alias : {
			type: DataTypes.STRING,
			allowNull: true
		},
		name_abbreviation : {
			type: DataTypes.STRING,
			allowNull: true
		},
		address_billing : {
			type: DataTypes.STRING,
			allowNull: true
		},
		address_shipping : {
			type: DataTypes.STRING,
			allowNull: true
		},
		address_collection : {
			type: DataTypes.STRING,
			allowNull: true
		},
		contact_person_name : {
			type: DataTypes.STRING,
			allowNull: true
		},
		payment_term_id : {
			type: DataTypes.STRING,
			allowNull: true
		},
		ship_to_code : {
			type: DataTypes.STRING,
			allowNull: true
		},
		area_id : {
			type: DataTypes.STRING,
			allowNull: true
		},
		cluster_id : {
			type: DataTypes.STRING,
			allowNull: true
		},
		config : {
			type: DataTypes.STRING,
			allowNull: true
		},
		check_expiry : {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		countering_requirements : {
			type: DataTypes.STRING,
			allowNull: true
		},
		pickup_time_start : {
			type: DataTypes.STRING,
			allowNull: true
		},
		pickup_time_end : {
			type: DataTypes.STRING,
			allowNull: true
		},
		acceptance_time_start : {
			type: DataTypes.STRING,
			allowNull: true
		},
		acceptance_time_end : {
			type: DataTypes.STRING,
			allowNull: true
		},
		acceptance_days : {
			type: DataTypes.STRING,
			allowNull: true
		},
		collection_schedule : {
			type: DataTypes.STRING,
			allowNull: true
		},
		sales_district : {
			type: DataTypes.STRING,
			allowNull: true
		},
		sales_office : {
			type: DataTypes.STRING,
			allowNull: true
		},
		tax_class : {
			type: DataTypes.STRING,
			allowNull: true
		},
		tax_description : {
			type: DataTypes.STRING,
			allowNull: true
		},
		tax_number : {
			type: DataTypes.STRING,
			allowNull: true
		},
		credit_limit : {
			type: DataTypes.STRING,
			allowNull: true
		},
		receivables : {
			type: DataTypes.STRING,
			allowNull: true
		},
		documents_for_return : {
			type: DataTypes.STRING,
			allowNull: true
		},
		account_manager_name : {
			type: DataTypes.STRING,
			allowNull: true
		},
		price_list : {
			type: DataTypes.STRING,
			allowNull: true
		},
		price_group : {
			type: DataTypes.STRING,
			allowNull: true
		},
		service_type_pricing_crossdock : {
			type: DataTypes.STRING,
			allowNull: true
		},
		service_type_pricing_storage_handling : {
			type: DataTypes.STRING,
			allowNull: true
		},
		service_type_pricing_storage : {
			type: DataTypes.STRING,
			allowNull: true
		},
		service_type_pricing_domestic_freight : {
			type: DataTypes.STRING,
			allowNull: true
		},
		service_type_pricing_ptsd : {
			type: DataTypes.STRING,
			allowNull: true
		},
		service_type_rate_crossdock : {
			type: DataTypes.STRING,
			allowNull: true
		},
		service_type_rate_storage_handling : {
			type: DataTypes.STRING,
			allowNull: true
		},
		service_type_rate_storage : {
			type: DataTypes.STRING,
			allowNull: true
		},
		service_type_rate_domestic_freight : {
			type: DataTypes.STRING,
			allowNull: true
		},
		service_type_rate_ptsd : {
			type: DataTypes.STRING,
			allowNull: true
		},
		business_style : {
			type: DataTypes.STRING,
			allowNull: true
		},
		customer_stat : {
			type: DataTypes.STRING,
			allowNull: true
		},
		status : {
			type: DataTypes.STRING,
			allowNull: true
		},
		created_by : {
			type: DataTypes.STRING,
			allowNull: true
		},
		updated_by : {
			type: DataTypes.STRING,
			allowNull: true
		},
		created : {
			type: DataTypes.STRING,
			allowNull: true
		},
		updated : {
			type: DataTypes.STRING,
			allowNull: true
		},
		deleted : {
			type: DataTypes.STRING,
			allowNull: true
		},
		contact_person_number : {
			type: DataTypes.STRING,
			allowNull: true
		},
		account_manager_number : {
			type: DataTypes.STRING,
			allowNull: true
		},
	},
	{
		freezeTableName : true,
		hasTrigger: true,
		ti
	})

	return customer_primary;
}

// id
// code
// customer_category_id
// name_trade
// name_registered
// name_alias
// name_abbreviation
// address_billing
// address_shipping
// address_collection
// contact_person_name
// payment_term_id
// ship_to_code
// area_id
// cluster_id
// config
// check_expiry
// countering_requirements
// pickup_time_start
// pickup_time_end
// acceptance_time_start
// acceptance_time_end
// acceptance_days
// collection_schedule
// sales_district
// sales_office
// tax_class
// tax_description
// tax_number
// credit_limit
// receivables
// documents_for_return
// account_manager_name
// price_list
// price_group
// service_type_pricing_crossdock
// service_type_pricing_storage_handling
// service_type_pricing_storage
// service_type_pricing_domestic_freight
// service_type_pricing_ptsd
// service_type_rate_crossdock
// service_type_rate_storage_handling
// service_type_rate_storage
// service_type_rate_domestic_freight
// service_type_rate_ptsd
// business_style
// customer_stat
// status
// created_by
// updated_by
// created
// updated
// deleted
// contact_person_number
// account_manager_number