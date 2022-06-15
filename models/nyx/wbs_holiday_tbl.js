'use-strict';
module.exports=(sequelize,DataTypes) => {
	const wbs_holiday_tbl = sequelize.define('wbs_holiday_tbl',{
		id:{
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		},
		holiday_date:{
			type: DataTypes.DATEONLY,
		},
		holiday_name:{
			type: DataTypes.STRING,
		},
		created_by:{
			type: DataTypes.STRING,
		},
		updated_by:{
			type: DataTypes.STRING,
		},
		createdAt:DataTypes.DATE,
		updatedAt:DataTypes.DATE

	},
	{
		freezeTableName : true
	})

	return wbs_holiday_tbl
}
