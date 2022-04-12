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
router.use('/wms/reporthub',				require('./wms-reporthub'));
// router.use('/wms/converter',				require('./wms-converter'));
// router.use('/wms/dashboard',				require('./wms-dashboard'));
// router.use('/wms/interface',				require('./wms-interface'));

// router.use('/tms/reporthub',				require('./tms-reporthub'));
// router.use('/tms/converter',				require('./tms-converter'));
router.use('/tms/datasync',				require('./tms-datasync'));
// router.use('/tms/interface',				require('./tms-interface'));

module.exports = router;