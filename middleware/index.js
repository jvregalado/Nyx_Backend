"use strict";

const router = require('express').Router();

router.use(require('./tokenAuthenticator'));
router.use(require('./modulePermissionChecker'));

module.exports = router;