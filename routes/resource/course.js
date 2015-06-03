/**
 * Created by Gnnng on 5/30/15.
 */
var router = require('express').Router();
var modelPath = '../../db/group1db/';
var debug = require('debug')('resource');
var Course = require(modelPath + 'CourseModel');
var Person = require(modelPath + 'PersonModel');


/*
  functions
 */
function getCourseList(userid, callback) {
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


function isValidCourseID(req, res, next) {
  if (!('cid' in req.query)) {
    // has no query of cid, default access at first course
    req.query.cid = encodeURIComponent(req.session.courseList[0].courseid2);
  } else {
    //has a query of cid, then check validation
    debug(JSON.stringify(req.session.courseList));
    var cList = req.session.courseList;
    var in_flag = false;
    for(var i = 0; i < cList.length; i++) {
      if (req.query.cid === cList[i].courseid2) {
        in_flag = true;
        break;
      }
    }
    if (!in_flag)
      next(Error("Invalid course id"));
  }

  // finish and next
  next();
}

/*
  routes
 */

router.use(
  function cache_courseList(req, res, next) {
    debug('cache_courseList');
    if ('courseList' in req.session) {
      next();
    } else {
      getCourseList(req.session.user.userid, function(err, courseList) {
        if (err)
          next(err);
        else {
          //debug(courseList);
          req.session.courseList = courseList;
          next();
        }
      })
    }
  },
  function cache_slide_course_data(req, res, next) {
    debug('cache_slide_course_data');
    if (!('slide_course' in req.session)) {
      var arr = [];
      debug('arr length is ' + arr.length);
      for(var i = 0; i < req.session.courseList.length; i++) {
        var c = req.session.courseList[i];
        debug('arr at ' + i + ' is ' + c);
        arr.push({
          courseid: c.courseid2,
          coursename: c.coursename
        });
      }
      debug('arr length is ' + arr.length);
      req.session.slide_course = {
        courses: arr
      };
      debug('slide_course is ' + JSON.stringify(req.session.slide_course));
    }
    next();
  }
);

router.get('/', function (req, res, next) {
  res.redirect('/resource/course/data');
});

router.get('/data', isValidCourseID, function (req, res, next) {
  var render_data = {
    current_cid   : decodeURIComponent(req.query.cid),
    slide_course  : req.session.slide_course,
    path_prefix   : 'data'
  };
  debug(render_data);
  res.render('resource/course_data', render_data);
});

router.get('/info', isValidCourseID, function (req, res, next) {
  var render_data = {
    current_cid   : decodeURIComponent(req.query.cid),
    slide_course  : req.session.slide_course,
    path_prefix   : 'info'
  };

  res.render('resource/course_info', render_data);
});

router.get('/homework/', isValidCourseID, function (req, res, next) {
  var render_data = {
    current_cid   : decodeURIComponent(req.query.cid),
    slide_course  : req.session.slide_course,
    path_prefix   : 'homework'
  };

  res.render('resource/course_homework', render_data);
});

router.get('/feedback', function (req, res, next) {
  var render_data = {
    current_cid   : decodeURIComponent(req.query.cid),
    slide_course  : req.session.slide_course,
    path_prefix   : 'feedback'
  };

  res.render('resource/course_feedback', render_data);

});



/*
  exports
 */
exports.router = router;

exports.getCourseList = getCourseList;