const fs = require('fs');
const path = require('path');
const moment = require('moment');
const basename = path.basename(__filename);
const Sequelize = require('sequelize');

const { nyxDBConfig } = require('../../config/config');

const sequelize = new Sequelize({
	...nyxDBConfig,
	logging: function(str) {
	console.log(`\nNYX MySQL ${moment().format('YY-MM-DD_HH:mm:ss')}: ${str}`);
	}
});

let db = {};

fs.readdirSync(__dirname)
	.filter(file => {
		return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
	})
	.forEach(file => {
		let model = require(path.join(__dirname,file))(sequelize, Sequelize.DataTypes);
		db[model.name] = model;
	});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

/**USER TO ROLE ASSOCIATION */
db.user_tbl.hasOne(db.role_hdr_tbl, {
	sourceKey:'role_id',
	foreignKey:'role_id',
	as:'role'
})

db.role_hdr_tbl.belongsTo(db.user_tbl, {
	foreignKey:'role_id'
})

/**USER TO REASON CODE ASSOCIATION */
db.user_tbl.hasOne(db.reason_code_tbl, {
	sourceKey:'user_position',
	foreignKey:'rc_id',
	as:'user_position_fk'
})
db.user_tbl.hasOne(db.reason_code_tbl, {
	sourceKey:'user_whLocation',
	foreignKey:'rc_id',
	as:'user_whLocation_fk'
})

/**REPORT TO REASON CODE ASSOCIATION */
db.report_tbl.hasOne(db.reason_code_tbl, {
	sourceKey:'report_system_type',
	foreignKey:'rc_id',
	as:'report_system_type_fk'
})

db.report_tbl.hasOne(db.reason_code_tbl, {
	sourceKey:'report_type',
	foreignKey:'rc_id',
	as:'report_type_fk'
})

/**createdBy and updatedBy Associations */
/**1:USER */
db.user_tbl.hasOne(db.user_tbl, {
	sourceKey: 'createdBy',
	foreignKey: 'user_id',
	as:'creator'
})
db.user_tbl.hasOne(db.user_tbl, {
	sourceKey: 'updatedBy',
	foreignKey: 'user_id',
	as:'modifier'
})
/**2: REASON CODE*/
db.reason_code_tbl.hasOne(db.user_tbl, {
	sourceKey: 'createdBy',
	foreignKey: 'user_id',
	as:'creator'
})
db.reason_code_tbl.hasOne(db.user_tbl, {
	sourceKey: 'updatedBy',
	foreignKey: 'user_id',
	as:'modifier'
})
/**3: REPORT*/
db.report_tbl.hasOne(db.user_tbl, {
	sourceKey: 'createdBy',
	foreignKey: 'user_id',
	as:'creator'
})
db.report_tbl.hasOne(db.user_tbl, {
	sourceKey: 'updatedBy',
	foreignKey: 'user_id',
	as:'modifier'
})
/**4: MODULE*/
db.module_tbl.hasOne(db.user_tbl, {
	sourceKey: 'createdBy',
	foreignKey: 'user_id',
	as:'creator'
})
db.module_tbl.hasOne(db.user_tbl, {
	sourceKey: 'updatedBy',
	foreignKey: 'user_id',
	as:'modifier'
})
/**5: ROLE*/
db.role_hdr_tbl.hasOne(db.user_tbl, {
	sourceKey: 'createdBy',
	foreignKey: 'user_id',
	as:'creator'
})
db.role_hdr_tbl.hasOne(db.user_tbl, {
	sourceKey: 'updatedBy',
	foreignKey: 'user_id',
	as:'modifier'
})

module.exports = db;