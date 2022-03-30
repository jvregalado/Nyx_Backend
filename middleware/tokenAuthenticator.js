const jwt = require('jsonwebtoken');
const router = require('express').Router();

const secret = process.env.JWT_SECRET;

const { authService } = require('../services/nyx')

router.use(async(req,res,next) => {
	try{
		const path = req.originalUrl
		if(!['/auth/token','/auth/sign-out'].includes(path))
		{
			const token = req.headers['x-access-token']

			/**CHECK if token is available*/
			if(!token){
				throw Error('No token provided.')
			}

			/**DECODE token using the secret key*/
			let decode = jwt.verify(token, secret, (err, decoded) => {
				if(err) {
					if(err.name === 'TokenExpiredError') {
						throw Error ('Token session expired, please relogin.')
					}
					throw Error ('Token authentication failed.')
				}
				return decoded
			});

			/**Get the user session */
			let userSession = await authService.getUserSession({
				user_id		:decode?.user_id,
				user_email	:decode?.user_email,
				user_token	:token
			})

			/**Check if session is the latest one available in the user_session_tbl */
			if(!userSession?.user_id || !userSession?.user_email){
				return res.status(403).json({
					message:'Invalid user session, please relogin.'
				})
			}
			else{
				req.processor = decode
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