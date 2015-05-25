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
<<<<<<< HEAD
//session initial
router.use(session({
  secret: 'TeachingServerSystem',
  resave: false,
  saveUnintialized: false
}));

=======
var arrange = require("./arrange")
>>>>>>> c4b3da3247712db836a7ab3297e916fd5c270869

/* GET home page. */
router.all('/',isLoggedIn);
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/info', info);
// router.get('/arrange', arrange);
router.use('/', select);
// router.get('/resource', resource);
// router.get('/test', test);
// router.get('/score', score);
<<<<<<< HEAD
router.use('/grades', grades);

function isLoggedIn(req, res, next) {
	console.log("isLoggedIn");
    if (req.isAuthenticated())
        return next();

    res.redirect('/info/login');
}
=======
router.use('/', grades);
router.use('/', arrange);
>>>>>>> c4b3da3247712db836a7ab3297e916fd5c270869

module.exports = router;
