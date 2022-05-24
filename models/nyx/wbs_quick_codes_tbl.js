'use strict';

module.exports=(sequelize,DataTypes) => {
    const wbs_quick_code_tbl = sequelize.define('wbs_quick_codes_tbl',{
        qc_code:{
            type: DataTypes.STRING,
			allowNull: false,
            primaryKey: true,
			  
        },
        qc_name:{
            type: DataTypes.STRING,
			allowNull: false
        },
        qc_type:{
            type: DataTypes.STRING,
			allowNull: false,
            primaryKey: true,
        },  
        qc_status:{
            type: DataTypes.STRING,
			// allowNull: false
        }
    },
    {
        freezeTableName : true,   
        timestamps:false     
    })


    return wbs_quick_code_tbl
}