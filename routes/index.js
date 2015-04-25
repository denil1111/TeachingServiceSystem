var express = require('express');
var router = express.Router();
// var info = require()
// var arrange = require()
var select = require("./course")
var classroom = require("./classroom")
// var resource = require()
// var test = require()
// var score = require()
var grades = require("./grades")
var arrange = require("./arrange")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// router.get('/info', info);
// router.get('/arrange', arrange);
router.use('/', select);
// router.get('/resource', resource);
// router.get('/test', test);
// router.get('/score', score);
router.use('/', grades);
router.use('/', arrange);
router.use('/', classroom);

module.exports = router;
