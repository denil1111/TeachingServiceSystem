var express = require('express');
var router = express.Router();
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

/* GET home page. */
router.all('/',isLoggedIn);
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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

module.exports = router;
