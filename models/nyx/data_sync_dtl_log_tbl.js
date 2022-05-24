"use strict";

module.exports = (sequelize, DataTypes) => {
	const data_sync_dtl_log_tbl = sequelize.define("data_sync_dtl_log_tbl", {
		data_sync_id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		},
		report_id: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		data_sync_status: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		data_sync_dtl_remarks1: {
			type: DataTypes.STRING
		},
		data_sync_dtl_remarks2: {
			type: DataTypes.STRING
		},
		data_sync_dtl_remarks3: {
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

	return data_sync_dtl_log_tbl;
}