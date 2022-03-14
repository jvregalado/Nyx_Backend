"use strict";

module.exports = (sequelize, DataTypes) => {
	const reason_code_tbl = sequelize.define("reason_code_tbl", {
		rc_id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		},
		rc_type: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: 'compositeIndex'
		},
		rc_code: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: 'compositeIndex'
		},
		rc_desc: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		rc_status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		},
		rc_remarks1: {
			type: DataTypes.STRING
		},
		rc_remarks2: {
			type: DataTypes.STRING
		},
		rc_remarks3: {
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

	return reason_code_tbl;
}