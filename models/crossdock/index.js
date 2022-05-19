const fs = require('fs');
const path = require('path');
const moment = require('moment');
const basename = path.basename(__filename);
const Sequelize = require('sequelize');

const { aelousZeus2_DBConfig,
		aelousZeus1_DBConfig,
		aelousArtemis_DBConfig,
		aelousEros_DBConfig } = require('../../config/config');

const aelousZeus2DB = new Sequelize({
	...aelousZeus2_DBConfig,
	logging: false
	// logging: function(str) {
	// console.log(`\nNYX MySQL ${moment().format('YY-MM-DD_HH:mm:ss')}: ${str}`);
	// }
});

const aelousZeus1DB = new Sequelize({
	...aelousZeus1_DBConfig,
	logging: false
	// logging: function(str) {
	// console.log(`\nNYX MySQL ${moment().format('YY-MM-DD_HH:mm:ss')}: ${str}`);
	// }
});

const aelousArtemisDB = new Sequelize({
	...aelousArtemis_DBConfig,
	logging: false
	// logging: function(str) {
	// console.log(`\nNYX MySQL ${moment().format('YY-MM-DD_HH:mm:ss')}: ${str}`);
	// }
});

const aelousErosDB = new Sequelize({
	...aelousEros_DBConfig,
	logging: false
	// logging: function(str) {
	// console.log(`\nNYX MySQL ${moment().format('YY-MM-DD_HH:mm:ss')}: ${str}`);
	// }
});

let db = {
	aelousZeus2DB,
	aelousZeus1DB,
	aelousArtemisDB,
	aelousErosDB};

for(let i in db) {
	fs.readdirSync(__dirname)
		.filter(file => {
			return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
		})
		.forEach(file => {
			let model = require(path.join(__dirname,file))(db[i]/**sequelize*/, Sequelize.DataTypes);
			db[i][model.name] = model;
		});
}
db.Sequelize = Sequelize;

module.exports = db;