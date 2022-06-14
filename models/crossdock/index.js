const fs = require('fs');
const path = require('path');
const moment = require('moment');
const basename = path.basename(__filename);
const Sequelize = require('sequelize');

const { aelousZeus2_DBConfig,
		aelousZeus1_DBConfig,
		aelousArtemis_DBConfig,
		aelousEros_DBConfig } = require('../../config/config');

const aelousZeus2 = new Sequelize({
	...aelousZeus2_DBConfig,
	logging: false
	// logging: function(str) {
	// console.log(`\nAelous_Zeus2 MySQL ${moment().format('YY-MM-DD_HH:mm:ss')}: ${str}`);
	// }
});

const aelousZeus1 = new Sequelize({
	...aelousZeus1_DBConfig,
	logging: false
	// logging: function(str) {
	// console.log(`\nAelous_Zeus1 MySQL ${moment().format('YY-MM-DD_HH:mm:ss')}: ${str}`);
	// }
});

const aelousArtemis = new Sequelize({
	...aelousArtemis_DBConfig,
	logging: false
	// logging: function(str) {
	// console.log(`\nAelous_Artemis MySQL ${moment().format('YY-MM-DD_HH:mm:ss')}: ${str}`);
	// }
});

const aelousEros = new Sequelize({
	...aelousEros_DBConfig,
	logging: false
	// logging: function(str) {
	// console.log(`\nAelous_Eros MySQL ${moment().format('YY-MM-DD_HH:mm:ss')}: ${str}`);
	// }
});

let db = {
	aelousZeus2,
	aelousZeus1,
	aelousArtemis,
	aelousEros};

for(let i in db) {
	fs.readdirSync(__dirname)
		.filter(file => {
			return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
		})
		.forEach(file => {
			let model = require(path.join(__dirname,file))(db[i]/**sequelize*/, Sequelize.DataTypes);
			db[i][model.name] = model;
		});
	db[i].Sequelize = Sequelize;
}

module.exports = db;