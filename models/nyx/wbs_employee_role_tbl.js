'use strict';
module.exports=(sequelize,DataTypes) => {
	const wbs_employee_role_tbl = sequelize.define('wbs_employee_role_tbl',{
		role_id:{
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		},
		role_name:{
			type: DataTypes.STRING,
			allowNull: false
		},
		role_description:{
			type: DataTypes.STRING,
			allowNull: false
		},
		role_status:{
			type:DataTypes.STRING
		},
		createdAt:DataTypes.DATE,
		updatedAt:DataTypes.DATE,
		created_by:{
			type: DataTypes.STRING,
		},
		updated_by:{
			type: DataTypes.STRING,
		}
	},
	{
		freezeTableName : true
	})

	return wbs_employee_role_tbl
}