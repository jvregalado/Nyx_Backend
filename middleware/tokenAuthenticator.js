const jwt = require('jsonwebtoken');
const router = require('express').Router();

const secret = process.env.JWT_SECRET;

router.use(async(req,res,next) => {
	try{
		const path = req.originalUrl
		if(!['/auth/token','/auth/sign-out'].includes(path))
		{
			const token = req.headers['x-access-token']

			if(!token){
				throw Error('No token provided.')
			}

			let decode = jwt.verify(token, secret, (err, decoded) => {
				if(err) {
					if(err.name === 'TokenExpiredError') {
						throw Error ('Token session expired, please relogin.')
					}
					throw Error ('Token authentication failed.')
				}
				return decoded
			});

			if(!decode.user_email){
				return res.status(403).json({
					message:'Invalid user session.'
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