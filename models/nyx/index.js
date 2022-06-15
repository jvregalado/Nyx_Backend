const fs = require('fs');
const path = require('path');
const moment = require('moment');
const basename = path.basename(__filename);
const Sequelize = require('sequelize');

const { nyxDBConfig } = require('../../config/config');

const sequelize = new Sequelize({
	...nyxDBConfig,
	logging: false
	// logging: function(str) {
	// console.log(`\nNYX MySQL ${moment().format('YY-MM-DD_HH:mm:ss')}: ${str}`);
	// }
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
/**ROLE_HDR TO ROLE_DTL TO MODULE_TBL ASSOCIATION */
db.role_hdr_tbl.hasMany(db.role_dtl_tbl, {
	sourceKey:'role_id',
	foreignKey:'role_id',
	as:'role_dtl_fk'
})

db.role_dtl_tbl.hasMany(db.module_tbl, {
	sourceKey:'module_id',
	foreignKey:'module_id',
	as:'role_module_fk'
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
	sourceKey:'report_type',
	foreignKey:'rc_id',
	as:'report_type_fk'
})
/**REPORT TO MODULE Associations */
db.report_tbl.hasOne(db.module_tbl, {
	sourceKey:'module_id',
	foreignKey:'module_id',
	as:'report_module_fk'
})
db.module_tbl.belongsTo(db.report_tbl, {
	foreignKey:'module_id'
})

/**MODULE to REASON CODE Association */
db.module_tbl.hasOne(db.reason_code_tbl, {
	sourceKey:'module_system_type',
	foreignKey:'rc_id',
	as:'module_system_type_fk'
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

/**RTV*/
db.rtv_stored_converted_hdr.hasOne(db.user_tbl, {
	sourceKey: 'uploaded_by',
	foreignKey: 'user_id',
	as:'creator'
})
db.rtv_stored_converted_hdr.hasOne(db.user_tbl, {
	sourceKey: 'checked_by',
	foreignKey: 'user_id',
	as:'checker'
})
db.rtv_stored_converted_hdr.hasOne(db.user_tbl, {
	sourceKey: 'generated_by',
	foreignKey: 'user_id',
	as:'generate'
})
db.rtv_stored_converted_hdr.hasOne(db.user_tbl, {
	sourceKey: 'last_generated_by',
	foreignKey: 'user_id',
	as:'lastgenerate'
})
/**DATASYNC LOGS*/
db.datasync_log_hdr_tbl.hasOne(db.user_tbl, {
	sourceKey: 'createdBy',
	foreignKey: 'user_id',
	as:'creator'
})
db.datasync_log_hdr_tbl.hasOne(db.user_tbl, {
	sourceKey: 'updatedBy',
	foreignKey: 'user_id',
	as:'modifier'
})
db.datasync_log_dtl_tbl.hasOne(db.user_tbl, {
	sourceKey: 'createdBy',
	foreignKey: 'user_id',
	as:'creator'
})
db.datasync_log_dtl_tbl.hasOne(db.user_tbl, {
	sourceKey: 'updatedBy',
	foreignKey: 'user_id',
	as:'modifier'
})
//wbs-employee
db.wbs_employee_tbl.hasOne(db.user_tbl,{
	sourceKey:'emp_nyx_user_id',
	foreignKey:'user_id',
	as:'user_tbl'
})

db.wbs_employee_tbl.hasMany(db.wbs_employee_role_dtl_tbl,{
	sourceKey:'emp_id',
	foreignKey:'emp_id',
	as:'employee_role'
})

db.wbs_employee_tbl.hasMany(db.wbs_employee_vl_tbl,{
	sourceKey:'emp_id',
	foreignKey:'emp_id',
	as:'vacation_leave'
})

db.wbs_employee_tbl.hasMany(db.wbs_employee_work_hours,{
	sourceKey:'emp_id',
	foreignKey:'emp_id',
	as:'working_hours'
})

//wbs-role-detail
db.wbs_employee_role_dtl_tbl.hasOne(db.wbs_employee_tbl,{
	sourceKey:'emp_id',
	foreignKey:'emp_id',
	as:'emp_tbl'
})
//wbs project codes
db.wbs_project_hdr_tbl.hasMany(db.wbs_project_resource_role_tbl,{
	sourceKey:'project_code',
	foreignKey:'project_code',
	as:'project_roles'
})
//project role resource
db.wbs_project_resource_role_tbl.hasOne(db.wbs_employee_role_tbl,{
	sourceKey:'project_role',
	foreignKey:'role_id',
	as:'role'
})

db.wbs_project_resource_role_tbl.hasOne(db.wbs_service_catalogs_hdr_tbl,{
	sourceKey:'project_service_catalog',
	foreignKey:'catalog_id',
	as:'service_catalog'
})
//project emp
db.wbs_project_resource_emp_tbl.hasOne(db.wbs_employee_tbl,{
	sourceKey:'emp_id',
	foreignKey:'emp_id',
	as:'employee'
})

db.wbs_project_resource_emp_tbl.hasOne(db.wbs_project_hdr_tbl,{
	sourceKey:'project_code',
	foreignKey:'project_code',
	as:'project'
})

db.wbs_project_resource_emp_tbl.hasOne(db.wbs_employee_role_tbl,{
	sourceKey:'project_role',
	foreignKey:'role_id',
	as:'employee_role'
})

db.wbs_project_resource_emp_tbl.hasOne(db.wbs_project_resource_role_tbl,{
	sourceKey:'project_code',
	foreignKey:'project_code',
	as:'project_roles'
})

module.exports = db;