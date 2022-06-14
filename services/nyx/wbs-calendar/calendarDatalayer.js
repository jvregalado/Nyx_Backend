const models = require('../../../models/nyx');

const getHolidays = async({filters}) => {
    try{
        return await models.wbs_holiday_tbl.findAll({
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

module.exports = {
    getHolidays
}