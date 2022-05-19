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
	// timezone: '+08:00' /**for writing to database**/
}

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

const scmdb_tms = {
	username : process.env.DB_SCMDB_TMS_USER,
	password : process.env.DB_SCMDB_TMS_PASSWORD,
	database : process.env.DB_SCMDB_TMS_NAME,
	host : process.env.DB_SCMDB_TMS_HOST,
	dialect: "mssql",
	pool:{
		max: 100,
		min: 1,
		idle: 2000000,
		acquire: 2000000
	},
	dialectOptions: {
			// dateStrings: true,
			typeCast: true
	},
}

const kronosDBConfig = {
	username : 	process.env.DB_KRONOS_USER,
	password : 	process.env.DB_KRONOS_PASSWORD,
	host : 		process.env.DB_KRONOS_HOST,
	database : 	process.env.DB_KRONOS_NAME,
	dialect : 'mysql'
}

const aelousZeus2_DBConfig = {
	username : process.env.DB_AELOUS_ZEUS2_USER,
	password : process.env.DB_AELOUS_ZEUS2_PASSWORD,
	database : process.env.DB_AELOUS_ZEUS2_NAME,
	host: process.env.DB_AELOUS_ZEUS2_HOST,
	dialect: "mysql",
	pool:{
		max: 10,
		min: 1,
		idle: 2000000,
		acquire: 2000000
	}
}

const aelousZeus1_DBConfig = {
	username : process.env.DB_AELOUS_ZEUS1_USER,
	password : process.env.DB_AELOUS_ZEUS1_PASSWORD,
	database : process.env.DB_AELOUS_ZEUS1_NAME,
	host: process.env.DB_AELOUS_ZEUS1_HOST,
	dialect: "mysql",
	pool:{
		max: 10,
		min: 1,
		idle: 2000000,
		acquire: 2000000
	}
}

const aelousArtemis_DBConfig = {
	username : process.env.DB_AELOUS_ARTEMIS_USER,
	password : process.env.DB_AELOUS_ARTEMIS_PASSWORD,
	database : process.env.DB_AELOUS_ARTEMIS_NAME,
	host: process.env.DB_AELOUS_ARTEMIS_HOST,
	dialect: "mysql",
	pool:{
		max: 10,
		min: 1,
		idle: 2000000,
		acquire: 2000000
	}
}

const aelousEros_DBConfig = {
	username : process.env.DB_AELOUS_EROS_USER,
	password : process.env.DB_AELOUS_EROS_PASSWORD,
	database : process.env.DB_AELOUS_EROS_NAME,
	host: process.env.DB_AELOUS_EROS_HOST,
	dialect: "mysql",
	pool:{
		max: 10,
		min: 1,
		idle: 2000000,
		acquire: 2000000
	}
}

module.exports = {
	hwConfig,
	nyxDBConfig,
	aelousZeus2_DBConfig,
	aelousZeus1_DBConfig,
	aelousArtemis_DBConfig,
	aelousEros_DBConfig,
	scmdb_tms,
	kronosDBConfig
}