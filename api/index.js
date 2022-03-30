"use strict";

const router = require('express').Router();

/**authentications; token generation, login, and logout */
router.use('/auth',							require('./authentication'));

/**select query to populate dropdown in frontend */
router.use('/select',						require('./select'));

/**API for administration*/
router.use('/administration/user',			require('./administration-user'));
router.use('/administration/role',			require('./administration-role'));
router.use('/administration/module',		require('./administration-module'));
router.use('/administration/report',		require('./administration-report'));
router.use('/administration/reasoncode',	require('./administration-reasoncode'));

/**API for reports generation */


module.exports = router;