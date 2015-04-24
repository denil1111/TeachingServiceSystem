var express = require('express');
var router = express.Router();

var teaOnlineTestManage = require('./OnlineTest/teaManage');
var problemOnlineTest = require('./OnlineTest/probManage');
var paperOnlineTest = require('./OnlineTest/paperManage');
var stuOnlineTestManage = require('./OnlineTest/stuManage');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/OnlineTest/teacher', teaOnlineTestManage);
router.use('/OnlineTest/probManage', problemOnlineTest);
router.use('/OnlineTest/paperManage', paperOnlineTest);
router.use('/OnlineTest/student', stuOnlineTestManage);

module.exports = router;
