const models = require('../../../models/nyx');

const getAllQuickCodes = async({filters}) => {
    try{

        return await models.wbs_quick_codes_tbl.findAll({
            where:{
                ...filters
            }
        })
        .then(result => JSON.parse(JSON.stringify(result)))
    }
    catch(e){
        throw e
    }
}

module.exports ={
    getAllQuickCodes
}