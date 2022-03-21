"use strict";

module.exports = (sequelize, DataTypes) => {
	const user_tbl = sequelize.define("user_tbl", {
		user_id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		},
		user_email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		user_status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		},
		user_password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		user_first_name: {
			allowNull: false,
			type: DataTypes.STRING
		},
		user_last_name: {
			allowNull: false,
			type: DataTypes.STRING
		},
		user_middle_name: {
			type: DataTypes.STRING
		},
		user_contact_no: {
			type: DataTypes.BIGINT(10)
		},
		role_id: {
			type: DataTypes.STRING
		},
		user_rank: {
			type: DataTypes.INTEGER
		},
		user_position: {
			type: DataTypes.STRING
		},
		user_whLocation: {
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

	return user_tbl;
}