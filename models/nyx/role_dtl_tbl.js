"use strict";

module.exports = (sequelize, DataTypes) => {
	const role_dtl_tbl = sequelize.define("role_dtl_tbl", {
		role_dtl_id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4
		},
		module_id: {
			type: DataTypes.UUID,
			allowNull: true
		},
		role_dtl_status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		},
		role_dtl_remarks1: {
			type: DataTypes.STRING
		},
		role_dtl_remarks2: {
			type: DataTypes.STRING
		},
		role_dtl_remarks3: {
			type: DataTypes.STRING
		},
		createdBy: {
			type: DataTypes.STRING,
			allowNull: false
		},
		createdAt: {
			type: DataTypes.DATE(6),
			allowNull: false,
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

	return role_dtl_tbl;
}