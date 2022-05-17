const Sequelize = require('sequelize');

const { kronosDBConfig } = require('../../config/config');

const sequelize = new Sequelize({
	...kronosDBConfig
});

let db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;