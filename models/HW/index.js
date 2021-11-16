'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const Sequelize = require('sequelize');

const {hwConfig} = require('../../config/config');
console.log(hwConfig);
const sequelize = new Sequelize({
	...hwConfig
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
