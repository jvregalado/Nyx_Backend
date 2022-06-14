const router            = require('express').Router()
const {calendarService} = require('../services/nyx')

router.get('/',async(req,res)=>{
    try{
        const query = req.query
        const data = await calendarService.getHolidays({
            filters:{
                ...query
            }
        })

        res.status(200).json({
            data
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