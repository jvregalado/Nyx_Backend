const fs = require('fs');
const path = require('path');
const moment = require('moment');
const basename = path.basename(__filename);
const { nyxDBConfig } = require('../../config/config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
	...nyxDBConfig,
	logging: function(str) {
        console.log(`MSSQL ${moment().format('MM-DD HH:mm:ss')}: ${str}`)
    },
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

module.exports = db;