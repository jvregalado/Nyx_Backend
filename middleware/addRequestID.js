const router = require('express').Router();
const {nanoid} = require('nanoid');
const winstoLog = require('../middleware/winstoLog');

router.use(async(req, res, next) => {
	try {

		const uid = nanoid();
		const method = req.method;
		const route = req.url;

		/**Assign a unique identifier to each request */
		req.requestId = uid;
		res.setHeader('requestId', uid);

		let message = `Received ${method} request for ${route}`;

		winstoLog.logger({
			log_level: 'info',
			requestId: uid,
			http_method: method,
			http_status: null,
			route: route,
			message: message,
			processor: req?.processor
		})

		next();
	}
	catch(e) {
		console.log(e)
		return res.status(403).json({
			message:`${e}`
		})
	}
})

module.exports = router;