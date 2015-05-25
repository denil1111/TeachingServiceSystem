var express = require('express');
var router = express.Router();
var session = require('express-session');


var info = require('./info/info');
// var arrange = require()
var select = require("./course")
// var resource = require()
// var test = require()
// var score = require()
var grades = require("./grades")


router.use(session({
  secret: 'TeachingServerSystem',
  resave: false,
  saveUnintialized: false
}));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/info', info);
// router.get('/arrange', arrange);
router.use('/', select);
// router.get('/resource', resource);
// router.get('/test', test);
// router.get('/score', score);
router.use('/grades', grades);


module.exports = router;
