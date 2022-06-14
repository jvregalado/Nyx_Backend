const router = require('express').Router();

const { userService } = require('../services/nyx')

router.use(async(req,res,next) => {
	try {
		const path = req.originalUrl;
		let processor = req.processor;

		if(['/auth/token','/auth/sign-out'].includes(path)) {
			return next();
		}

		const userRole = await userService.getUser({ filters: {	user_id		: processor.user_id,
																user_email	: processor.user_email }})

		/**SUPERADMIN PROCEEDS AS IS WITH HIGHEST ACCESS */
		if(userRole?.role?.role_code === 'Superadmin') {
			return next()
		}
		else {
			/**NORMAL ROLES IS NOT ALLOWED IN Administration Modules */
			if(path.split('/')[1] === 'administration') {
				throw new Error(`You do not have access on module: administration`)
			}
			else {
				let allowed_modules = await userRole?.role?.role_dtl_fk?.map(x => x.role_module_fk[0]?.module_code)

				/**DERIVED FROM request path="/wms/reporthub" output will be "wms reporthub" */
				const req_module_code = `${path.split('/')[1]} ${path.split('/')[2]}`

				if(!allowed_modules.includes(req_module_code)){
					throw new Error(`You do not have access on module: ${req_module_code}`)
				}
			}
		}

		next()
	}
	catch(e){
		console.log(e)
		return res.status(403).json({
			message:`${e}`
		})
	}
})

module.exports = router;