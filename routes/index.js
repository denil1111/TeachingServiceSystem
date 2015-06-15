var express = require('express');
var router = express.Router();
var auth = require('./basic/auth');

var info = require('./info/info');
var arrange = require('./arrange/arrange')
// var arrange = require()

var resource = require('./resource/resource');
var select = require("./select/course")

//<<<<<<< HEAD

// var select = require("./course")
//=======
var select = require("./select/course")
//>>>>>>> master

// var resource = require()
// var test = require()

// var grades = require("./grades")

var login = require("./basic/login");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/login');
});

router.use('/', login);
var adduser = require('../scripts/addUser.js'); 
router.get('/addUser',adduser);
router.use('/info', function setStatus(req, res, next){
  res.locals.Navstatus = 1;
  next();
}, auth.isLoggedIn, info);
 router.use('/arrange', function setStatus(req, res, next){
  res.locals.Navstatus = 2;
  next();
}, auth.isLoggedIn, arrange);
router.use('/select', function setStatus(req, res, next){
  res.locals.Navstatus = 3;
  next();
}, auth.isLoggedIn, select);
 router.use('/resource', function setStatus(req, res, next){
  res.locals.Navstatus = 4;
  next();
}, auth.isLoggedIn, resource);
//// router.get('/test', function setStatus(req, res, next){
//  res.locals.Navstatus = 5;
//  next();
//}, auth.isLoggedIn, test);

//router.use('/grades', function setStatus(req, res, next){
//  res.locals.Navstatus = 6;
//  next();
//}, auth.isLoggedIn, grades);


module.exports = router;
