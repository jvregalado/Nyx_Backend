const models = require('../../../models/nyx');

const {useFormatFilters} = require('../../../helpers');
const {globalSearchFilter} = useFormatFilters;

const createRole = async({data}) => {
    try{
        return await models.wbs_employee_role_tbl.create({
            ...data
        })
    }
    catch(e){
        throw e
    }
}

const getRole = async({filters}) => {
    try{
        const role = await models.wbs_employee_role_tbl.findOne({
            where:{
                ...filters
            }
        })
        .then(result => JSON.parse(JSON.stringify(result)))

        return role
    }
    catch(e){
        throw e
    }
}

const getPaginatedRole = async({
    filters,
    orderBy,
	page,
	totalPage
}) => {
    try{

        let newFilter = globalSearchFilter({
            model:models.wbs_employee_role_tbl.rawAttributes,
            filters
        })

        const {count,rows} = await models.wbs_employee_role_tbl.findAndCountAll({
            where:{
                ...newFilter
            },
            offset:parseInt(page)*parseInt(totalPage),
            limit :parseInt(totalPage),
        })
        .then(result => {
            let {count,rows} = JSON.parse(JSON.stringify(result))
            return {
                count,
                rows
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

const bulkCreateRoleDetails = async({
    data,
    options
}) => {
    try{
        return await models.wbs_employee_role_dtl_tbl.bulkCreate(
            data
        ,{
            ...options
        })

    }
    catch(e){
        throw e
    }

}

const getRoleDetails = async({
    filters
}) => {
    try{
        return await models.wbs_employee_role_dtl_tbl.findAll({
            include:[
                {
                    model:models.wbs_employee_tbl,
                    attributes:['emp_nyx_user_id'],
                    include:[
                        {
                            model:models.user_tbl,
                            attributes:['user_email'],
                            as:'user_tbl'
                        }
                    ],
                    as:'emp_tbl'
                }
            ],
            where:{
                ...filters
            }
            
        })
        .then(result => {
            const data = JSON.parse(JSON.stringify(result))
            
            return data.map(item => {
                const {emp_tbl,...newItem} = item
                const user_email = emp_tbl?.user_tbl?.user_email || null
                return {
                    ...newItem,
                    user_email
                }
            })
        })
    }
    catch(e){
        throw e
    }
}

module.exports = {
    getPaginatedRole,
    getRole,
    getRoleDetails,
    createRole,
    bulkCreateRoleDetails
}