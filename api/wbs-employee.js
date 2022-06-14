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

router.post('/vacation-leave',async(req,res)=>{
    try{
        const {data}=req.body;
        
        const result = await employeeService.createVacationLeave({
            data:data.map(item => {
                return {
                    ...item,
                    created_by:req.processor.user_id,
                    updated_by:req.processor.user_id
                }
            })
        })
        .then(result => {
           return result.map(item => {
               const {created_by,updated_by,createdAt,updatedAt,...newItem} = item
               return newItem
           })
        })
        
        res.status(200).json({
            data:result
        })
    }
    catch(e){
        console.log(e);
		res.status(500).json({
			message:`${e}`
		})
    }
})

router.post('/work-schedule',async(req,res)=>{
    try{
        const {data}=req.body;
        const result = await employeeService.createWorkSched({
            data:data.map(item => {
                return {
                    ...item,
                    created_by:req.processor.user_id,
                    updated_by:req.processor.user_id
                }
            })  
        })

        res.status(200).json({
            data:result
        })
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

router.get('/:emp_id',async(req,res)=>{
    try{
        const {emp_id} = req.params;

        const data = await employeeService.getEmployee({
            filters:{
                emp_id
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