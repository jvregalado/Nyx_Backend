const projectService = require('../wbs-project');

exports.getAssignedProjects = async({
	filters
}) => {
	try {
		return await projectService.getAllEmpResource({
			filters
		})
		.then(result => {
			return result.map(item => {
				const {project,employee_role,project_roles,...data} = item;
				const {project_priority,project_name,project_go_live,project_planned_date} = project
				const {role_name} = employee_role
				const {service_catalog,project_service_catalog} = project_roles

				return {
					...data,
					project_name,
					project_go_live,
					project_planned_date,
					project_priority,
					role_name,
					project_service_catalog,
					cat_name:service_catalog?.cat_name || null
				}
			})
		})
	}
	catch(e) {
		throw e
	}
}