var express = require('express');
var router = express.Router();

var auth = require('./basic/auth');

var info = require('./info/info');
// var arrange = require()
var select = require("./course");
// var resource = require()
var test = require('./OnlineTest/onlineTestIndex');
// var score = require()
var grades = require("./grades");
var login = require("./basic/login");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/login');
});

router.use('/', login);
router.use('/info', auth.isLoggedIn, info);
// router.get('/arrange', auth.isLoggedIn, arrange);
router.use('/select', auth.isLoggedIn, select);
// router.get('/resource', auth.isLoggedIn, resource);
router.use('/OnlineTest', test);
// router.get('/score', auth.isLoggedIn, score);
router.use('/grades', auth.isLoggedIn, grades);

module.exports = router;
