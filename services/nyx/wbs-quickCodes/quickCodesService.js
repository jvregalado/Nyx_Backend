const dataLayer = require('./quickCodeDatalayer');

exports.getAllQuickCodes = async({filters}) => {
	try {
		return await dataLayer.getAllQuickCodes({filters})
	}
	catch(e) {
		throw e
	}
}
