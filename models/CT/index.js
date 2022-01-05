const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  {
    username : process.env.DB_U_USER,
    password : process.env.DB_U_PASSWORD,
    host :      process.env.DB_U_HOST,
    database : process.env.DB_U_NAME,
    host: process.env.DB_U_HOST,
    dialect: "mysql",
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    logging:true,
    dialectOptions: {
          useUTC: false, //for reading from database
          dateStrings: true,
          typeCast: true
    },
    timezone: '+08:00' //for writing to database
  }
);

sequelize.sync();

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
