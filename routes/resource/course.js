/**
 * Created by Gnnng on 5/30/15.
 */
var router = require('express').Router();
var modelPath = '../../db/group1db/';
var debug = require('debug')('resource');
var Course = require(modelPath + 'CourseModel');
var Person = require(modelPath + 'PersonModel');

router.get('/', function (req, res, next) {
  res.redirect('/resource/course/info');
});

function isValidCourseID(req, res, next) {
  var courseID = req.params['courseID'];
  if (!(courseID in req.session.user.cstlist)) {
    return next(Error("Invalid course ID"));
  }
  next();
}

function getCourseNames(userid, callback) {
  Person.findbyid(userid, function (err, user) {
    debug('user is ' + user);
    var cstlist = user[0].cstlist;
    debug('cstlist is ' + cstlist);
    Course.findbylist(cstlist, function (err, _courseList) {
      var courseList = _courseList ? _courseList : [];
      debug(courseList);
      callback(err, courseList);
    })
  })
}

router.get('/data/:courseID', isValidCourseID, function (req, res, next) {
  res.render('resource/courseInfo', {});
});

router.get('/info', function (req, res, next) {
  getCourseNames(req.session.user.userid, function (err, courseNames) {
    res.render('resource/courseInfo', {courseList: courseNames});
  });
});

router.get('/homework/:courseID', isValidCourseID, function (req, res, next) {

});

router.get('/feedback', function (req, res, next) {

});

exports.router = router;
exports.getCourseNames = getCourseNames;