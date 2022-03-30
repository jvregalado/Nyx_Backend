"use strict";

module.exports = (sequelize, DataTypes) => {
	const module_tbl = sequelize.define("module_tbl", {
		module_id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4
		},
		module_code: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		module_name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		module_system_type: {
			type: DataTypes.STRING,
			allowNull: true
		},
		module_desc: {
			type: DataTypes.TEXT('tiny'),
			allowNull: false
		},
		module_status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		},
		module_remarks1: {
			type: DataTypes.STRING
		},
		module_remarks2: {
			type: DataTypes.STRING
		},
		module_remarks3: {
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

	return module_tbl;
}