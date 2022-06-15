'use strict';
module.exports=(sequelize,DataTypes) => {
	const wbs_service_catalog_l3_dtl_tbl = sequelize.define('wbs_service_catalog_l3_dtl_tbl',{
		id:{
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		},
		sub_catalog_id:{
			type: DataTypes.STRING,
			allowNull: false
		},
		l3_catalog_name:{
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
		freezeTableName : true
	})

	return wbs_service_catalog_l3_dtl_tbl
}