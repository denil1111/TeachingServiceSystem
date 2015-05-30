/**
 * Created by Gnnng on 5/30/15.
 */
var router = require('express').Router();
var modelPath = '../../db/group1db/';
var debug = require('debug')('resource');
var Course = require(modelPath + 'CourseModel');
var Pesron = require(modelPath + 'PersonModel');

router.get('/', function (req, res, next) {
  res.redirect('/resource/course/data');
});

router.get('/data', function (req, res, next) {
  var courseList = req.user && req.user.cstlist ? req.user.cstlist : [];

  courseList = courseList.concat(['Software Engineer', 'Design Pattern', 'Principal of Programming Language'].map(function(val){return {coursename: val}}));
  debug(courseList);

  res.render('resource/courseInfo', {courseList: courseList});
});

router.get('/info', function (req, res, next) {

  res.render('resource/')
});

router.get('/homework', function (req, res, next) {

});

router.get('/feedback', function (req, res, next) {

});

module.exports = router;
