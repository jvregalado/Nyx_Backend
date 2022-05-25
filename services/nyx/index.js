module.exports = {
	authService			: require('./auth/authService'),
	userService			: require('./administration-user'),
	roleService			: require('./administration-role'),
	moduleService		: require('./administration-module'),
	reportService		: require('./administration-report'),
	reasoncodeService	: require('./administration-reasoncode'),

	tmsConverterService	: require('./tms-converter'),
	tmsReporthubService	: require('./tms-reporthub'),
	tmsDataSyncService	: require('./tms-datasync')
}