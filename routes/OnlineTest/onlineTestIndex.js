var express = require('express');
var router = express.Router();

var teaOnlineTestManage = require('./teaManage');
var problemOnlineTest = require('./probManage');
var paperOnlineTest = require('./paperManage');
var stuOnlineTestManage = require('./stuManage');

router.use('/teacher', teaOnlineTestManage);
router.use('/probManage', problemOnlineTest);
router.use('/paperManage', paperOnlineTest);
router.use('/student', stuOnlineTestManage);

module.exports = router;