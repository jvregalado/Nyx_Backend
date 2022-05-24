"use strict";

module.exports = (sequelize, DataTypes) => {
	const role_hdr_tbl = sequelize.define("role_hdr_tbl", {
		role_id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4
		},
		role_code: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		role_name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		role_status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		},
		role_remarks1: {
			type: DataTypes.STRING
		},
		role_remarks2: {
			type: DataTypes.STRING
		},
		role_remarks3: {
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

	return role_hdr_tbl;
}