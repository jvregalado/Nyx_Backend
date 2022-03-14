"use strict";

const router = require('express').Router();

/**authentications; token generation, login, and logout */
router.use('/auth',				require('./authentication'));

/**select query to populate dropdown in frontend */
router.use('/select',			require('./select'));

/**API for modules*/
router.use('/user',				require('./administration-user'));
router.use('/role',				require('./administration-role'));
router.use('/report',			require('./administration-report'));
router.use('/reasoncode',			require('./administration-reasoncode'));

/**API for reports generation */
router.use('/file-converter',	require('./file-converter'));
// router.use('/conversion/ODO',		require('./odofile'));


module.exports = router;