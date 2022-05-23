"use strict";

module.exports = (sequelize, DataTypes) => {
	const datasync_log_hdr_tbl = sequelize.define("datasync_log_hdr_tbl", {
		datasync_id: {
			type: DataTypes.STRING(50),
			allowNull: false,
			primaryKey: true
		},
		report_id: {
			type: DataTypes.STRING,
			allowNull: false
		},
		report_code: {
			type: DataTypes.STRING,
			allowNull:false
		},
		datasync_hdr_remarks1: {
			type: DataTypes.STRING
		},
		datasync_hdr_remarks2: {
			type: DataTypes.STRING
		},
		datasync_hdr_remarks3: {
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

	return datasync_log_hdr_tbl;
}