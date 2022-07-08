module.exports = {
	authService			: require('./auth/authService'),
	userService			: require('./administration-user'),
	roleService			: require('./administration-role'),
	moduleService		: require('./administration-module'),
	reportService		: require('./administration-report'),
	reasoncodeService	: require('./administration-reasoncode'),

	wmsReporthubService	: require('./wms-reporthub'),

	tmsConverterService	: require('./tms-converter'),
	tmsReporthubService	: require('./tms-reporthub'),
	tmsDataSyncService	: require('./tms-datasync'),

	quickCodeService	: require('./wbs-quickCodes'),
	employeeService		: require('./wbs-employee'),
	employeeRoleService : require('./wbs-role'),
	calendarService		: require('./wbs-calendar'),
	catalogService		: require('./wbs-serviceCatalog'),
	projectService		: require('./wbs-project'),
	techHoursService	: require('./wbs-techHours')

}