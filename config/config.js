const hwConfig = {
	username : process.env.DB_HW_USER,
	password : process.env.DB_HW_PASSWORD,
	host : 	process.env.DB_HW_HOST,
	database : process.env.DB_HW_NAME,
	dialect : 'mysql',
	dialectOptions : {
		dateStrings: true,
		typeCast: true
	}
	//,logging: false
}

const nyxDBConfig = {
	username : process.env.DB_NYX_USER,
	password : process.env.DB_NYX_PASSWORD,
	database : process.env.DB_NYX_NAME,
	host: process.env.DB_NYX_HOST,
	dialect: "mysql",
	charset: 'utf8',
	collate: 'utf8_unicode_ci',
	pool:{
		max: 10,
		min: 1,
		idle: 2000000,
		acquire: 2000000
	},
	dialectOptions: {
			// dateStrings: true,
			typeCast: true
	},
	timezone: '+08:00' /**for writing to database**/
}

module.exports = {hwConfig, nyxDBConfig}