"use strict";

const router = require('express').Router();

router.use('/file-converter',		require('./file-converter'));
router.use('/user/login',			require('./login'));
// router.use('/conversion/ASN',		require('./asnfile'));
// router.use('/conversion/ODO',		require('./odofile'));

module.exports = router;