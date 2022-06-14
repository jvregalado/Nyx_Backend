'use strict';

module.exports=(sequelize,DataTypes) => {
    const wbs_employee_vl_tbl = sequelize.define('wbs_employee_work_hours',{
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
        day_of_week:{
            type: DataTypes.STRING,
			// allowNull: false
        },  
        work_hours:{
            type:DataTypes.DECIMAL
			// allowNull: false
        },
        scrum_hours:{
            type:DataTypes.DECIMAL
        },
        lunch_break:{
            type:DataTypes.DECIMAL
			// allowNull: false
        },
        support_hours:{
            type:DataTypes.DECIMAL
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

    return wbs_employee_vl_tbl
}