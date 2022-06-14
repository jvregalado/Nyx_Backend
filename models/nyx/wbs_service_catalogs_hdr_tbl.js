'use strict';
module.exports=(sequelize,DataTypes) => {
    const wbs_service_catalogs_hdr_tbl = sequelize.define('wbs_service_catalogs_hdr_tbl',{
        catalog_id:{
            allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4  
        },
        cat_name:{
            type: DataTypes.STRING,
			//allowNull: false
        },
        cat_status:{
            type: DataTypes.STRING,
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

    return wbs_service_catalogs_hdr_tbl
}