'use strict';


module.exports=(sequelize,DataTypes) => {
    const wbs_employee_tbl = sequelize.define('wbs_employee_tbl',{
        emp_id:{
            allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4  
        },
        emp_first_name:{
            type: DataTypes.STRING,
			allowNull: false
        },
        emp_middle_name:{
            type: DataTypes.STRING,
			// allowNull: false
        },  
        emp_last_name:{
            type: DataTypes.STRING,
			// allowNull: false
        },
        emp_status:{
            type:DataTypes.STRING,
        },
        emp_suffix:{
            type: DataTypes.STRING,
			// allowNull: false
        },
        emp_mobile_number:{
            type: DataTypes.STRING,
			allowNull: false
        },
        emp_employment_status:{
            type: DataTypes.STRING,
			allowNull: false
        },
        emp_nyx_user_id:{
            type: DataTypes.STRING,
			allowNull: false
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
        freezeTableName : true,
       
    })

    return wbs_employee_tbl
}