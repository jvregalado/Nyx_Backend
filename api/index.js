"use strict";

const router = require('express').Router();

router.use('/auth',					require('./authentication'));
router.use('/user',					require('./user'));
router.use('/select',				require('./select'));
router.use('/file-converter',		require('./file-converter'));
// router.use('/conversion/ODO',		require('./odofile'));

module.exports = router;