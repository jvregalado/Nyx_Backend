"use strict";

module.exports = (sequelize, DataTypes) => {
	const user_session_tbl = sequelize.define("user_session_tbl", {
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
		user_token: {
			type: DataTypes.TEXT('tiny'),
			allowNull: true
		},
		user_token_expiry: {
			type: DataTypes.STRING,
			allowNull: true
		},
		createdAt: {
			type: DataTypes.STRING
		},
		updatedAt: {
			type: DataTypes.STRING
		}
	},
	{
		freezeTableName : true,
		hasTrigger: true
	})

	return user_session_tbl;
}