module.exports = {
	authService			: require('./auth/authService'),
	userService			: require('./administration-user'),
	roleService			: require('./administration-role'),
	moduleService		: require('./administration-module'),
	reportService		: require('./administration-report'),
	reasoncodeService	: require('./administration-reasoncode'),
	quickCodeService	: require('./wbs-quickCodes'),
	employeeService		: require('./wbs-employee'),
	employeeRoleService : require('./wbs-role'),
	calendarService		: require('./wbs-calendar'),
	catalogService		: require('./wbs-serviceCatalog')

}