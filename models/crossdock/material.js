"use strict";

module.exports = (sequelize, DataTypes) => {
	const material = sequelize.define("material", {
		
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
// customer_primary_name_registered
// created_by_name
// updated_by_name