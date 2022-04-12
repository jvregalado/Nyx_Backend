"use strict";

module.exports = (sequelize, DataTypes) => {
	const data_sync_hdr_log_tbl = sequelize.define("data_sync_hdr_log_tbl", {
		report_id: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: true
		},
		last_sync_At: {
			allowNull: false,
			type: DataTypes.DATE(6),
			defaultValue: DataTypes.NOW
		},
		data_sync_hdr_remarks1: {
			type: DataTypes.STRING
		},
		data_sync_hdr_remarks2: {
			type: DataTypes.STRING
		},
		data_sync_hdr_remarks3: {
			type: DataTypes.STRING
		},
		createdBy: {
			type: DataTypes.STRING
		},
		createdAt: {
			allowNull: false,
			type: DataTypes.DATE(6),
			defaultValue: DataTypes.NOW
		},
		updatedBy: {
			allowNull: true,
			type: DataTypes.STRING
		},
		updatedAt: {
			allowNull: true,
			type: DataTypes.DATE(6)
		}
	},
	{
		freezeTableName : true,
		hasTrigger: true
	})

	return data_sync_hdr_log_tbl;
}