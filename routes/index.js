var express = require('express');
var router = express.Router();
// var info = require()
// var arrange = require()
var select = require("./course")
// var resource = require()
// var test = require()
// var score = require()
var grades = require("./grades")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// router.get('/info', info);
// router.get('/arrange', arrange);
router.use('/select', select);
// router.get('/resource', resource);
// router.get('/test', test);
// router.get('/score', score);
router.use('/grades', grades);


module.exports = router;
