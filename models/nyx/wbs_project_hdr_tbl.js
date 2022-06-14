'use strict';
module.exports=(sequelize,DataTypes) => {
	const wbs_project_hdr_tbl = sequelize.define('wbs_project_hdr_tbl',{
		project_code:{
			allowNull: false,
			primaryKey: true,
			type: DataTypes.STRING
		},
		project_name:{
			type: DataTypes.STRING
		},
		project_type:{
			type: DataTypes.STRING
		},
		project_sponsor:{
			type: DataTypes.STRING
		},
		project_customer:{
			type: DataTypes.STRING
		},
		project_bu:{
			type: DataTypes.STRING
		},
		project_objective:{
			type: DataTypes.STRING
		},
		project_scope:{
			type: DataTypes.STRING
		},
		project_out_scope:{
			type: DataTypes.STRING
		},
		project_go_live:{
			type: DataTypes.DATEONLY
		},
		project_planned_date:{
			type: DataTypes.DATEONLY
		},
		project_service_type:{
			type: DataTypes.STRING
		},
		project_post_code:{
			type: DataTypes.STRING
		},
		project_priority:{
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
		freezeTableName : true
	})
	return wbs_project_hdr_tbl
}