const Sequelize = require('sequelize')

const defaultFilter = ({
    model,
    filters
}) => {

    let formattedFilters = filters;
        const attributes = Object.keys(model)
        Object.keys(filters).map(field => {
            if(field === 'delivery_date'){
                formattedFilters={
                    ...formattedFilters,
                    delivery_date: {
                        [Sequelize.Op.between]:filters.delivery_date.split(',')
                    }
                }
            }
            if(field==='search'){
                let fields = {}
                attributes.map(item => (fields[item] = filters.search))
                formattedFilters={
                    ...formattedFilters,
                    [Sequelize.Op.or]:fields
                }

                delete formattedFilters["search"]
            }
        })

        return formattedFilters
}

const revenueLeakFilter = ({model,
    filters}) => {
        let formattedFilters = filters;
        const attributes = Object.keys(model)
        Object.keys(filters).map(field => {
         
            if(field==='search'){
                let fields = {}
                attributes.map(item => (fields[`$invoice.${item}$`] = filters.search))
                formattedFilters={
                    ...formattedFilters,
                    [Sequelize.Op.or]:fields
                }

                delete formattedFilters["search"]
            }

            if(attributes.includes(field)){
                const att = attributes.filter(att => att === field)
                formattedFilters={
                    ...formattedFilters,
                    [`$invoice.${att[0]}$`]:filters[field]
                }

                delete formattedFilters[field]
            }

            if(field==='rdd'){
                console.log(filters.rdd.split(','))
                formattedFilters={
                    ...formattedFilters,
                    '$invoice.rdd$':{
                        [Sequelize.Op.between]:filters.rdd.split(',')
                    }
                }
                delete formattedFilters['rdd']
            }
            

        })

        return formattedFilters
}

const globalSearchFilter = ({
    model,
    filters
}) => {
    try{
        
        let formattedFilters = filters;
        const attributes = Object.keys(model)
        Object.keys(filters).map(field => {
            if(field==='search'){
                let fields = []

                for(const attribute of attributes){
                    fields.push({
                        [attribute]:{
                            [Sequelize.Op.like]:'%'+filters.search+'%'
                        }
                    })
                }

                formattedFilters={
                    ...formattedFilters,
                    [Sequelize.Op.or]:fields
                }

                delete formattedFilters["search"]
            }
        })

        return formattedFilters
    }
    catch(e){
        throw e
    }
}

module.exports={
    defaultFilter,
    revenueLeakFilter,
    globalSearchFilter
}