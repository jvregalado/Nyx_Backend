const router = require('express').Router();

const { lstatSync } = require('fs');
const { userService } = require('../services/nyx')

router.use(async(req,res,next) => {
	try{
		const path = req.originalUrl;
		console.log('path',path)

		const userRoles = await userService.getUser({ filters: { user_id		: req.processor.user_id,
																user_email	: req.processor.user_email
													}})
		let userRole = JSON.parse(JSON.stringify(userRoles))

		if(!userRole.role?.role_code === 'Superadmin') {
			console.log('SUPERRRRRRRRRRRRRR')
			next()
		}
		else {
			//if(path.slice(0,16) === '/administration/') { throw new Error(`You do not have access in administration module.`) }

			console.log(userRole)

			next()
		}

	}
	catch(e){
		console.log(e)
		return res.status(403).json({
			message:`${e}`
		})
	}
})

module.exports = router;