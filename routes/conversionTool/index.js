const express = require('express');
const router = express.Router();
const asn = require('./asnfile')
const odo = require('./odofile')

router.use('/ASN', asn)
router.use('/ODO', odo)

module.exports = router;