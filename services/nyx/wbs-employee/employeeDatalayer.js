const models = require('../../../models/nyx');
const {useFormatFilters} = require('../../../helpers');
const {globalSearchFilter} = useFormatFilters;
const createEmployee = async({data}) => {
    try{
        return await models.wbs_employee_tbl.create({
            ...data
        })
    }
    catch(e){
        throw e
    }
}

const getPaginatedEmployees = async({
    filters,
    orderBy,
	page,
	totalPage
}) => {
    try{   

        let newFilter = globalSearchFilter({
            model:models.wbs_employee_tbl.rawAttributes,
            filters
        })

        const {count,rows} = await models.wbs_employee_tbl.findAndCountAll({
            where:{
                ...newFilter
            },
            offset:parseInt(page)*parseInt(totalPage),
            limit :parseInt(totalPage),
            include:[
                {
                    model:models.user_tbl,
                    attributes:['user_email'],
                    as:'user_tbl'
                }
            ]
        })
        .then(result => {
            let {count,rows} = JSON.parse(JSON.stringify(result))
            return {
                rows:rows.map(item => {
                    const {user_tbl,...newItem} = item
                    return {
                        ...newItem,
                        user_email:user_tbl?.user_email || null
                    }
                }),
                count
            }
        })
        
        return {
			count,
			rows
		}

    }
    catch(e){
        throw e
    }
}

const getAllEmployees = async({
    filters
})=>{
    try{
        return await models.wbs_employee_tbl.findAll({
            where:{
                ...filters
            },
            include:[
                {
                    model:models.user_tbl,
                    attributes:['user_email'],
                    as:'user_tbl'
                },
                {
                    model:models.wbs_employee_role_dtl_tbl,
                    as:'employee_role'
                }
            ]
        })
        .then(result =>{
            const data = JSON.parse(JSON.stringify(result))
            return data.map(item => {
                const {user_tbl,...newItem} = item
                return {
                    ...newItem,
                    user_email:user_tbl?.user_email || null
                }
            })
        })
    }
    catch(e){
        throw e
    }
}



const getEmployee = async({filters})=>{
    try{
        return await models.wbs_employee_tbl.findOne({
            where:{
                ...filters
            },
            include:[
                {
                    model:models.user_tbl,
                    attributes:['user_email'],
                    as:'user_tbl'
                },
                {
                    model:models.wbs_employee_role_dtl_tbl,
                    as:'employee_role'
                },
                {
                    model:models.wbs_employee_vl_tbl,
                    attributes:['vl_reason','vl_date_from','vl_date_to','is_active','id','emp_id'],
                    as:'vacation_leave'
                },
                {
                    model:models.wbs_employee_work_hours,
                    attributes:['id','emp_id','day_of_week','work_hours','scrum_hours','lunch_break','support_hours'],
                    as:'working_hours'
                }
            ]
        })
        .then(result => JSON.parse(JSON.stringify(result)))
    }
    catch(e){
        throw e
    }
}


const createVacationLeave = async({data,options}) => {
    try {
        return await models.wbs_employee_vl_tbl.bulkCreate(data,{
            ...options
        })
        .then(result => JSON.parse(JSON.stringify(result)))
    }catch (error) {
        throw error
    }
}

const createWorkSched = async({data,options}) => {
    try {
        return await models.wbs_employee_work_hours.bulkCreate(data,{
            ...options
        })
        .then(result => JSON.parse(JSON.stringify(result)))
    }catch (error) {
        throw error
    }
}

module.exports={
    createEmployee,
    createVacationLeave,
    createWorkSched,
    getPaginatedEmployees,
    getAllEmployees,
    getEmployee
}