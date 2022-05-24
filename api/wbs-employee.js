const router = require('express').Router()
const {employeeService, userService} = require('../services/nyx');

router.post('/',async(req,res)=>{
    try{
        const {data} = req.body;

        const user = req.processor;

        await employeeService.createEmployee({
            data:{
                ...data,
                created_by:user.user_id
            }
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

router.get('/',async(req,res)=>{
    try{
        const query = req.query;

        const {count,rows} = await employeeService.getPaginatedEmployees({
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

module.exports = router