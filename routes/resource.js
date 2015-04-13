/**
 * Created by Gnnng on 4/10/15.
 */
var express = require('express');
var router = express.Router();

// TODO: wait to split those routes into separate files
router.get('/myresource', function(req, res, next) {
  res.render('myresource',{});
});

router.get('/info', function(req, res, next) {
  res.render('courseInfo',{});
});

router.get('/feedback', function(req, res, next) {
  res.render('feedback',{});
});

router.get('/homework', function(req, res, next) {
  res.render('homework',{});
});

router.get('/resource', function(req, res, next) {
  res.render('resource',{});
});

router.get('/search', function(req, res, next) {
  res.render('search', {});
});

router.get('/admin_changeinfo', function(req, res, next) {
  res.render('admin_changeInfo', {});
});

router.get('/admin_feedback', function(req, res, next) {
  res.render('admin_feedback', {});
});

router.get('/admin_homework', function(req, res, next) {
  res.render('admin_homework', {});
});

router.get('/admin_resource', function(req, res, next) {
  res.render('admin_resource', {});
});



module.exports = router;
