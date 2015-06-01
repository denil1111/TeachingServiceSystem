var express = require('express');
var router = express.Router();
var auth = require('./basic/auth');
var session = require('express-session');

var info = require('./info/info');
var arrange = require('./arrange/arrange')
// var arrange = require()

// var select = require("./course")
// var resource = require()
// var test = require()
// var score = require()
// var grades = require("./grades")

//session initial
router.use(session({
  secret: 'TeachingServerSystem',
  resave: false,
  saveUnintialized: false
}));

var select = require("./course");
// var resource = require()
// var test = require()
// var score = require()
var grades = require("./grades");
var login = require("./basic/login");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/login');
});


router.use('/info', info);
router.use('/arrange', arrange);
// router.use('/select', select);
// router.get('/resource', resource);
// router.get('/test', test);
// router.get('/score', score);
// router.use('/grades', grades);

function isLoggedIn(req, res, next) {
	console.log("isLoggedIn");
    if (req.isAuthenticated())
        return next();

    res.redirect('/info/login');
}

router.use('/', login);
router.use('/info', auth.isLoggedIn, info);
// router.get('/arrange', auth.isLoggedIn, arrange);
router.use('/select', auth.isLoggedIn, select);
// router.get('/resource', auth.isLoggedIn, resource);
// router.get('/test', auth.isLoggedIn, test);
// router.get('/score', auth.isLoggedIn, score);
router.use('/grades', auth.isLoggedIn, grades);

module.exports = router;
