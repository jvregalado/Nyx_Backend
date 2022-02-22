"use strict";

const router = require('express').Router();

router.use('/auth',					require('./authentication'));
router.use('/file-converter',		require('./file-converter'));
router.use('/user/login',			require('./login'));
// router.use('/conversion/ODO',		require('./odofile'));

module.exports = router;