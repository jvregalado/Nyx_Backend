'use strict';

module.exports=(sequelize,DataTypes) => {
	const wbs_employee_role_dtl_tbl = sequelize.define('wbs_employee_role_dtl_tbl',{
		role_id:{
			allowNull: false,
			primaryKey: true,
			type: DataTypes.STRING
		},
		emp_id:{
			allowNull: false,
			primaryKey: true,
			type: DataTypes.STRING
		},
		is_primary:{
			type:DataTypes.TEXT('tiny')
		},
		is_active:{
			type:DataTypes.TEXT('tiny')
		}
	},
	{
		freezeTableName:true,
		timestamps:false
	})

	return wbs_employee_role_dtl_tbl
}