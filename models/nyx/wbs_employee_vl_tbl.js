'use strict';

module.exports=(sequelize,DataTypes) => {
	const wbs_employee_vl_tbl = sequelize.define('wbs_employee_vl_tbl',{
		id:{
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		},
		emp_id:{
			type: DataTypes.STRING,
			allowNull: false
		},
		vl_reason:{
			type: DataTypes.STRING,
			// allowNull: false
		},
		vl_date_from:{
			type: DataTypes.DATEONLY,
			// allowNull: false
		},
		vl_date_to:{
			type:DataTypes.DATEONLY,
		},
		is_active:{
			type: DataTypes.STRING,
			// allowNull: false
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

	return wbs_employee_vl_tbl
}