const router = require('express').Router();
const {catalogService} = require('../services/nyx')


router.post('/service-catalog',async(req,res)=>{
    try{
        const {data} = req.body;

        console.log(data)
        const createCatalog = await catalogService.createCategoryTransaction({
            header:data.header,
            details:data.details
        })

        res.status(200).end()
    }
    catch(e){
        console.log(e);
		res.status(500).json({
			message:`${e}`
		})  
    }
})

router.get('/service-catalog',async(req,res)=>{
    try{
        const query=req.query;

        const {count,rows}=await catalogService.getPaginatedServiceCatalogs({
            filters:{
                ...query
            }
        })

        res.status(200).json({
            count,
            data:rows
        })

    }
    catch(e){
        console.log(e);
		res.status(500).json({
			message:`${e}`
		})  
    }

})

router.get('/service-catalog/:catalog_id',async(req,res)=>{
    try{
        const {catalog_id} = req.params
        
        const details = await catalogService.getSubServiceCatalog({
            filters:{
                catalog_id
            }
        })

        const header = await catalogService.getServiceCatalog({
            filters:{
                catalog_id
            }
        })

        res.status(200).json({
            header,
            details
        })
    }   
    catch(e){
        console.log(e);
		res.status(500).json({
			message:`${e}`
		})  
    }
})

module.exports = router