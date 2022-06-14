const router                = require('express').Router()
const {techHoursService}    = require('../services/nyx')
const moment                = require('moment')


router.get('/project',async(req,res)=>{
    try{

        const projects = await techHoursService.getAssignedProjects({
            filters:{
                '$employee.emp_nyx_user_id$':req.processor.user_id
            }
        })

        res.status(200).json({
            projects
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