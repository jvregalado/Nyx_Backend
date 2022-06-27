const router = require('express').Router();

const { userService,
	reportService } = require('../services/nyx')

router.use(async(req, res, next) => {
	try {

		let {report_id} = req.query;
		let {processor} = req;

		/**Get the user details */
		let user = await userService.getUser({
			filters	: {
				user_email	: processor?.user_email
			}
		})

		/**Get Report Access Weight */
		let report = await reportService.getAllReport({
			filters	: {
				report_id
			}
		})

		let userAccessWeight = user.user_rank
		let reportAccessWeight = report[0]?.report_min_access_wt ?? 0

		if(reportAccessWeight > userAccessWeight) {
			throw Error ('You do not have enough access. Please contact administrator.')
		}

		next()
	}
	catch(e) {
		console.log(e)
		return res.status(403).json({
			message:`${e}`
		})
	}
})

module.exports = router;