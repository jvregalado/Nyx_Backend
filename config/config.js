const hwConfig = {
    username : process.env.DB_HW_USER,
    password : process.env.DB_HW_PASSWORD,
    host :      process.env.DB_HW_HOST,
    database : process.env.DB_HW_NAME,
    dialect : 'mysql',
    dialectOptions : {
        trustedConnection : true,
        encrypt: true,
        options : {
            requestTimeout: 3600
        }
    }
    //,logging: false
    ,port : parseInt(process.env.DB_HW_PORT)
}
module.exports = {hwConfig}