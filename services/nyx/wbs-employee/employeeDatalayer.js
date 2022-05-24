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

module.exports={
    createEmployee,
    getPaginatedEmployees,
    getAllEmployees
}