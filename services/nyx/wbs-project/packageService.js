const dataLayer = require('./packageDatalayer');
const moment = require('moment')

exports.createProject=async({data})=>{
    try{

        const projectCode = await generateProjectCode({
            project_type:data.project_type
        })

        return await dataLayer.createProject({
            data:{
                ...data,
                project_code:projectCode
            },
            options:{}
        })
    }
    catch(e){
        throw e
    }
}

const generateProjectCode = async({
    project_type
}) => {
    try{
        const today = moment()
        const projects = await dataLayer.getAllProjects({})
        const count = String(projects.length).padStart(4,"0")        
       
        return `${project_type}-${today.format('YYYY')}-${count}`
    }
    catch(e){
        throw e
    }
}

exports.getPaginatedProjects = async({
    filters
}) => {
    try{
        let {orderBy,page,totalPage,...newFilters} = filters;
        
        return await dataLayer.getPaginatedProjects({
            filters:newFilters,
            orderBy,
            page,
            totalPage
        })
    }
    catch(e){
        throw e
    }
}

exports.getProject = async({filters}) => {
    try{
        return await dataLayer.getProject({
            filters
        })
        .then(result => {
            const {project_roles,...data} = result
            const roles = project_roles.map(item => {
                const {role,service_catalog,...details} = item
                return {
                    ...details,
                    ...role,
                    ...service_catalog
                }
            })

            return {
                ...data,
                project_roles:roles
            }
        })
    }
    catch(e){
        throw e
    }
}

exports.getAllEmpResource = async({filters})=>{
    try {
        
        return await dataLayer.getAllEmpResource({
            filters
        })
        .then(result => {
            return result.map(item => {
                const {employee,...emp} = item
                const {user_tbl} = employee
                return {
                    ...emp,
                    user_email:user_tbl?.user_email || null
                }
            })
        })


    } catch (error) {
        throw error
    }
}

exports.createRoleResource = async({data})=>{
    try{
        return await dataLayer.createRoleResource({
            data
        })
    }
    catch(e){
        throw e
    }
}

exports.createEmployeeResource = async({data})=>{
    try{
        return await dataLayer.createEmployeeResource({data,options:{
            updateOnDuplicate:["is_active","updated_by","updated_At"]
        }})
    }
    catch(e){
        throw e
    }
}

