var express = require('express');
var router = express.Router();

var personinsert = require('./personinsert');
var personselect = require('./personselect');
var courseinsert = require('./courseinsert');
var courseselect = require('./courseselect');

router.use('/personinsert', personinsert);
router.use('/personselect', personselect);
router.use('/courseinsert', courseinsert);
router.use('/courseselect', courseselect);

module.exports = router;
