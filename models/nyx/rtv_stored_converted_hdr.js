"use strict";

module.exports = (sequelize, DataTypes) => {
	const rtv_stored_converted_hdr = sequelize.define("rtv_stored_converted_hdr", {
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false
		},
		rtv_type: {
			type: DataTypes.STRING,
			allowNull: true
		},
		uploaded_file_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		uploaded_by: {
			type: DataTypes.STRING,
			allowNull: true
		},
		uploaded_date: {
			type: DataTypes.DATE(6),
			allowNull: true,
			defaultValue: DataTypes.NOW
		},

		checked_file_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		checked_by: {
			type: DataTypes.STRING,
			allowNull: true
		},
		checked_date: {
			type: DataTypes.DATE(6),
			allowNull: true,
			defaultValue: DataTypes.NOW
		},
		generated_file_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		generated_by: {
			type: DataTypes.STRING,
			allowNull: true
		},
		generated_date: {
			type: DataTypes.DATE(6),
			allowNull: true,
			//defaultValue: DataTypes.NOW
		},
		last_generated_by: {
			type: DataTypes.STRING,
			allowNull: true
		},
		last_generated_date: {
			type: DataTypes.DATE(6),
			allowNull: true,
			//defaultValue: DataTypes.NOW
		},
		c_status: {
			type: DataTypes.STRING,
			allowNull: false
		},
		customer: {
			type: DataTypes.STRING,
			allowNull: false
		},
		createdAt: {
			type: DataTypes.DATE(6)
		},
		updatedAt: {
			type: DataTypes.DATE(6)
		}
	},
	{
		freezeTableName : true,
		hasTrigger: true
	})

	return rtv_stored_converted_hdr;
}