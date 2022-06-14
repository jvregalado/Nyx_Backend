"use strict";

module.exports = (sequelize, DataTypes) => {
	const material = sequelize.define("material", {
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
		customer_primary_id: {
			type: DataTypes.STRING,
			allowNull: false
		},
		material_category_id: {
			type: DataTypes.STRING,
			allowNull: false
		},
		sku: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false
		},
		case_length: {
			type: DataTypes.STRING,
			allowNull: false
		},
		case_width: {
			type: DataTypes.STRING,
			allowNull: false
		},
		case_height: {
			type: DataTypes.STRING,
			allowNull: false
		},
		case_weight: {
			type: DataTypes.STRING,
			allowNull: false
		},
		case_barcode: {
			type: DataTypes.STRING,
			allowNull: false
		},
		piece_weight: {
			type: DataTypes.STRING,
			allowNull: false
		},
		piece_barcode: {
			type: DataTypes.STRING,
			allowNull: false
		},
		pallet_max_layer: {
			type: DataTypes.STRING,
			allowNull: true
		},
		pallet_max_case: {
			type: DataTypes.STRING,
			allowNull: true
		},
		layer_max_case: {
			type: DataTypes.STRING,
			allowNull: true
		},
		weight_unit: {
			type: DataTypes.STRING,
			allowNull: true
		},
		unit_measure: {
			type: DataTypes.STRING,
			allowNull: true
		},
		unit_conversion: {
			type: DataTypes.STRING,
			allowNull: true
		},
		status: {
			type: DataTypes.STRING,
			allowNull: true
		},
		cluster_id: {
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
			allowNull: true
		},
		updated: {
			type: DataTypes.STRING,
			allowNull: true
		},
		deleted: {
			type: DataTypes.STRING,
			allowNull: true
		},
	},
	{
		freezeTableName : true,
		hasTrigger: true,
		timestamps: false
	})

	return material;
}

// id
// customer_primary_id
// material_category_id
// sku
// description
// case_length
// case_width
// case_height
// case_weight
// case_barcode
// piece_weight
// piece_barcode
// pallet_max_layer
// pallet_max_case
// layer_max_case
// weight_unit
// unit_measure
// unit_conversion
// status
// cluster_id
// created_by
// updated_by
// created
// updated
// deleted