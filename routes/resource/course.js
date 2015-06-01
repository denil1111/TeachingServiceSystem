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

//检查数组中是否有相应的字符串
Array.prototype.S=String.fromCharCode(2);
Array.prototype.in_array=function(e){
  var r=new RegExp(this.S+e+this.S);
  return (r.test(this.S+this.join(this.S)+this.S));
}

function isValidCourseID(req, res, next) {
  var courseID = req.params['courseID'];
  if (!req.session.user.cstlist.in_array(courseID)) {
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
  getCourseNames(req.session.user.userid, function (err, courses) {
    var courseNames=[];
    var num=0;
    courses.forEach(function (course) {
      num++;
      courseNames.push(course.coursename);
      if(num >= courses.length){
        req.session.user.cstlist=courseNames;
        res.render('resource/courseInfo', {courseList: courses});
      };
    });
  });
});

router.get('/homework/:courseID', isValidCourseID, function (req, res, next) {

});

router.get('/feedback', function (req, res, next) {

});

exports.router = router;
exports.getCourseNames = getCourseNames;