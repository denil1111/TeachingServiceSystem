/**
 * Created by Gnnng on 4/10/15.
 */
var express = require('express');
var router = express.Router();

// TODO: wait to split those routes into separate files
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Resource' });
});

router.get('/cloud', function(req, res, next) {
  res.render('index', { title: 'Cloud' });
});

router.get('/course', function(req, res, next) {
  res.render('index', { title: 'Course' });
});

router.get('/config', function(req, res, next) {
  res.render('index', { title: 'Config' });
});

module.exports = router;
