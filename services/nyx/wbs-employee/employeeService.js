const dataLayer = require('./employeeDatalayer');

exports.createEmployee = async({data}) => {
    try{
        return await dataLayer.createEmployee({
            data
        })
    }
    catch(e){
        throw e
    }
}

exports.createVacationLeave=async({data})=>{
    try{
        return await dataLayer.createVacationLeave({
            data,
            options:{
                updateOnDuplicate:['is_active','updated_by']
            }
        })
    }
    catch(e){
        throw e
    }
}

exports.createWorkSched = async({data})=>{
    try{
        return await dataLayer.createWorkSched({
            data,
            options:{
                updateOnDuplicate:['work_hours','scrum_hours','lunch_break','support_hours','updated_by']
            }
        })
    }
    catch(e){
        throw e
    }
}

exports.getPaginatedEmployees = async({filters}) => {
    try{
        let {orderBy,page,totalPage,...newFilters} = filters;
        return await dataLayer.getPaginatedEmployees({
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

exports.getAllEmployees = async({filters})=>{
    try{
        return await dataLayer.getAllEmployees({
            filters
        })
    }
    catch(e){
        throw e
    }
}

exports.getEmployee = async({filters})=>{
    try{
        return await dataLayer.getEmployee({
            filters
        })
        .then(result => {
            const {user_tbl,working_hours,...item} = result
            let hours
            if(working_hours.length === 0 ){
                hours = [
                    {
                        emp_id:null,
                        day_of_week:'MONDAY',
                        work_hours:0,
                        scrum_hours:0,
                        lunch_break:0,
                        support_hours:0
                    },
                    {
                        emp_id:null,
                        day_of_week:'TUESDAY',
                        work_hours:0,
                        scrum_hours:0,
                        lunch_break:0,
                        support_hours:0
                    },
                    {
                        emp_id:null,
                        day_of_week:'WEDNESDAY',
                        work_hours:0,
                        scrum_hours:0,
                        lunch_break:0,
                        support_hours:0
                    },
                    {
                        emp_id:null,
                        day_of_week:'THURSDAY',
                        work_hours:0,
                        scrum_hours:0,
                        lunch_break:0,
                        support_hours:0
                    },
                    {
                        emp_id:null,
                        day_of_week:'FRIDAY',
                        work_hours:0,
                        scrum_hours:0,
                        lunch_break:0,
                        support_hours:0
                    },
                    {
                        emp_id:null,
                        day_of_week:'SATURDAY',
                        work_hours:0,
                        scrum_hours:0,
                        lunch_break:0,
                        support_hours:0
                    },
                    {
                        emp_id:null,
                        day_of_week:'SUNDAY',
                        work_hours:0,
                        scrum_hours:0,
                        lunch_break:0,
                        support_hours:0
                    },
                ]
            }
            else{
                hours = working_hours
            }
            return {
                ...item,
                user_email:user_tbl?.user_email || null,
                working_hours:hours        
            }   
        })
    }
    catch(e){
        throw e
    }
}

