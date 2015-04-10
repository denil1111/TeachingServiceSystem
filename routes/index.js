var express = require('express');
var router = express.Router();
var mytest = require('../lhtest/index');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/lhtest',mytest);
module.exports = router;
