'use strict';
module.exports=(sequelize,DataTypes) => {
    const wbs_project_resource_role_tbl = sequelize.define('wbs_project_resource_role_tbl',{
        id:{
            allowNull: false,
			primaryKey: true,
            type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4             
        },
        project_code:{
            type: DataTypes.STRING  
        },
        project_role:{
            type: DataTypes.STRING
        },
        project_service_catalog:{
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
    return wbs_project_resource_role_tbl
}