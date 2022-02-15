const hwConfig = {
    username : process.env.DB_HW_USER,
    password : process.env.DB_HW_PASSWORD,
    host :      process.env.DB_HW_HOST,
    database : process.env.DB_HW_NAME,
    dialect : 'mysql',
    dialectOptions : {
        dateStrings: true,
        typeCast: true
    }
    //,logging: false
}

const nyxDBConfig = {
    username : process.env.DB_U_USER,
    password : process.env.DB_U_PASSWORD,
    database : process.env.DB_U_NAME,
    host: process.env.DB_U_HOST,
    dialect: "mysql",
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    dialectOptions: {
            dateStrings: true,
            typeCast: true
    },
    timezone: '+08:00' //for writing to database
}

module.exports = {hwConfig, nyxDBConfig}