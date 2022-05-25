"use strict";

module.exports = (sequelize, DataTypes) => {
	const rtv_stored_converted_dtl = sequelize.define("rtv_stored_converted_dtl", {
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false
		},
		header_id: {
			type: DataTypes.STRING,
			allowNull: false
		},
		rtv_no: {
			type: DataTypes.STRING,
			allowNull: true
		},
		rtv_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		// vendor_code: {
		// 	type: DataTypes.STRING,
		// 	allowNull: true
		// },
		// vendor_name: {
		// 	type: DataTypes.STRING,
		// 	allowNull: true
		// },
		site_code: {
			type: DataTypes.STRING,
			allowNull: true
		},
		site_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		customer_code: {
			type: DataTypes.STRING,
			allowNull: true
		},
		createdAt: {
			type: DataTypes.DATE(6)
		},
		updatedAt: {
			type: DataTypes.DATE(6)
		},
	},
	{
		freezeTableName : true,
		hasTrigger: true
	})

	return rtv_stored_converted_dtl;
}