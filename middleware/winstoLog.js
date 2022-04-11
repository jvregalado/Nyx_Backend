const moment = require('moment');
const winston = require('winston');

exports.logger = async({
	log_level, // info, error
	requestId, // requestID
	processor, // {user_email, user_id, ...}
	route, // http route
	http_method, // http method
	http_status, // http method
	message
}) => {
	try {

		const now = moment();
		const processor_email = processor?.user_email || 'unknown_user@gmail.com';
		const mmyyyy = now.format('MM-YYYY');

		const logger = winston.createLogger({
			level: 'info',
			format: winston.format.json(),
			defaultMeta: { service: 'web-service' },
			transports: [
				new winston.transports.File({ filename: `error_${mmyyyy}.log`, level: 'error' }),
				new winston.transports.File({ filename: `combined_${mmyyyy}.log` }),
			],
		});

		logger.log({
			date		: now.format('DD-MM-YYYY'),
			time		: now.format('HH:mm:ss.SSS'),
			level		: log_level,
			http_method	: http_method,
			http_status	: http_status,
			route		: route,
			requestId	: requestId,
			message		: message,
			user		: processor_email
		})

	}
	catch(e){
		console.log(e)
		throw e
	}
}
