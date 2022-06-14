'use strict';


module.exports=(sequelize,DataTypes) => {
    const wbs_sub_service_catalog_dtl_tbl = sequelize.define('wbs_sub_service_catalog_dtl_tbl',{
        id:{
            allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4  
        },
        catalog_id:{
            type: DataTypes.STRING,
			allowNull: false
        },
        sub_catalog_name:{
            type: DataTypes.STRING,
			allowNull: false
        },  
        is_active:{
            type:DataTypes.TEXT('tiny')
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

    return wbs_sub_service_catalog_dtl_tbl
}