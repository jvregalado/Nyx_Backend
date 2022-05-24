"use strict";

module.exports = (sequelize, DataTypes) => {
	const report_tbl = sequelize.define("report_tbl", {
		report_id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		},
		module_id: {
			type: DataTypes.STRING,
			allowNull: true
		},
		report_code: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		report_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		report_type: {
			type: DataTypes.STRING,
			allowNull: false
		},
		report_min_access_wt: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		report_desc: {
			type: DataTypes.STRING,
			allowNull: false
		},
		report_status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		},
		report_source_code: {
			type: DataTypes.TEXT
		},
		report_remarks1: {
			type: DataTypes.STRING
		},
		report_remarks2: {
			type: DataTypes.STRING
		},
		report_remarks3: {
			type: DataTypes.STRING
		},
		createdBy: {
			type: DataTypes.STRING,
			allowNull: false
		},
		createdAt: {
			type: DataTypes.DATE
		},
		updatedBy: {
			allowNull: true,
			type: DataTypes.STRING
		},
		updatedAt: {
			type: DataTypes.DATE
		}
	},
	{
		freezeTableName : true,
		hasTrigger: true
	})

	return report_tbl;
}