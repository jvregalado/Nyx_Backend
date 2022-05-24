const Sequelize = require('sequelize');

const { kronosDBConfig } = require('../../config/config');

const sequelize = new Sequelize({
	...kronosDBConfig,
	logging: false
	// logging: function(str) {
	// console.log(`\nKronos MySQL ${moment().format('YY-MM-DD_HH:mm:ss')}: ${str}`);
	// }
});

let db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;