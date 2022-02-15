"use strict";

module.exports = (sequelize, DataTypes) => {
	const tbl_users = sequelize.define("tbl_users", {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		},
		first_name: {
			allowNull: false,
			type: DataTypes.STRING
		},
		last_name: {
			allowNull: false,
			type: DataTypes.STRING
		},
		suffix: {
			type: DataTypes.STRING
		},
		email_add: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		contactNo: {
			type: DataTypes.STRING
		},
		password: {
			type: DataTypes.STRING
		},
		role_id: {
			type: DataTypes.STRING
		},
		userStatus: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		},
		userAdmin: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
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
			type: DataTypes.STRING
		},
		updatedAt: {
			allowNull: true,
			type: DataTypes.DATE(6)
		}
	},
	{
		freezeTableName : true
	})

	return tbl_users;
}