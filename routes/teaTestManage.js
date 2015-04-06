var express = require('express');
var router = express.Router();
var db = require('../db/OnlineTestDB/problemFunction');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('teaTestManage', { title: 'Online Test System - Teacher' });
});

router.post('/', function(req, res, next) {
	var stem = req.body.stem;
	var answer = req.body.answer;
	db.addProblem(stem, answer);

	res.redirect('/teaTestManage');
});

module.exports = router;
