const router = require('express').Router();
const winstoLog = require('../middleware/winstoLog');


router.use(async(req, res, next) => {
	let method = req.method;
	//let processor_email = req.processor?.user_email || 'unknown_user@gmail.com';
	let route = req.url;

	res.on('finish', function() {
		let requestId = res.getHeader('requestId') || 'unknown_requestID'
		let code = this.statusCode;
		//console.log(`${now} info: -> [${requestId}] ${method} res ${code} [${processor_email}]`);
		let message = (`Response sent for the ${method} ${route}`)

		winstoLog.logger({
			log_level: 'info',
			requestId: requestId,
			http_method: method,
			http_status: code,
			route: route,
			message: message,
			processor: req?.processor
		})
	})

	next();
})

module.exports = router;