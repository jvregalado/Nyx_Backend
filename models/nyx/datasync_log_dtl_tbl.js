"use strict";

module.exports = (sequelize, DataTypes) => {
	const datasync_log_dtl_tbl = sequelize.define("datasync_log_dtl_tbl", {
		datasync_dtl_id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		datasync_id: {
			type: DataTypes.STRING,
			allowNull: false
		},
		datasync_master_table: {
			type: DataTypes.STRING,
			allowNull: false
		},
		datasync_latest_upsert: {
			type: DataTypes.DATE,
			allowNull: true
		},
		datasync_status: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		datasync_data_rows: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		datasync_dtl_remarks1: {
			type: DataTypes.STRING
		},
		datasync_dtl_remarks2: {
			type: DataTypes.STRING
		},
		datasync_dtl_remarks3: {
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

	return datasync_log_dtl_tbl;
}