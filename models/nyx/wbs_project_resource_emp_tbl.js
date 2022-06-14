'use strict';
module.exports=(sequelize,DataTypes) => {
    const wbs_project_resource_emp_tbl = sequelize.define('wbs_project_resource_emp_tbl',{
        id:{
            allowNull: false,
			primaryKey: true,
            type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4             
        },
        fk_resource_id:{
            type: DataTypes.STRING  
        },
        emp_id:{
            type: DataTypes.STRING
        },
        project_role:{
            type: DataTypes.STRING
        },
        project_code:{
            type: DataTypes.STRING
        },
        is_active:{
            type: DataTypes.STRING
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
    return wbs_project_resource_emp_tbl
}