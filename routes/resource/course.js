/**
 * Created by Gnnng on 5/30/15.
 */
var router = require('express').Router();
var modelPath = '../../db/group1db/';
var debug = require('debug')('resource');
var Course = require(modelPath + 'CourseModel');
var Person = require(modelPath + 'PersonModel');
var homeworkModel = require("../../db/resource/homework");
var File = require("./basicfileop");

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

router.get('/homework/upload', function(req, res, next) {
  var html = '<form action="/resource/cloud/upload"enctype="multipart/form-data" method="post"> ' +
    '<h1> Upload your file </h1> ' +
    'Please specify a file, or a set of files:<br> ' +
    '<input type="file" name="file" size="40" multiple="multiple">  ' +
    '<div> <input type="submit" > </div> </form>';
  res.send(html);
  res.end();
});
/*

  file upload api

 */
router.post('/homework/upload', function(req, res, next) {
  File.upload(req,function (id) {
    console.log(id);
  });
  console.log(req);
//  req.busboy.on('file', function(fieldname, readStream, filename, encoding, mimetype) {
//    debug('a file is posted: ' + filename);
//    var ws = gfs.createWriteStream({
//      mode: 'w',
//      content_type: mimetype,
//      filename: filename,
//      metadata: {}
//    });
//    console.log(ws.id);
//    readStream.pipe(ws);
//  });

  //TODO: should not allow any other field to be post to the upload route
  req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
    debug('Field is ' + key + value);
  });

  req.busboy.on('finish', function() {
    res.redirect('/resource/cloud');
  });
//
//  req.pipe(req.busboy);
});

router.get('/homework/', isValidCourseID, function (req, res, next) {
  var cid = decodeURIComponent(req.query.cid);
  var homeworkName = [];
  var filelist = [];
  var thisfilelist = [];
  Person.findbyid(req.session.user.userid, function (err, user) {
    homeworkModel.findbycourseid(cid, function (error,result) {
      var homeworkList=result.homework;
      for (var i=0; i<homeworkList.length; i++) {
        homeworkName.push(homeworkList.homework);
        var uploadfile=homeworkList.uploadfile;
        thisfilelist=[];
        for (var j=0;j<uploadfile.length;j++){
          if (user.status == '学生') {
            if (uploadfile.stid == user.userid){
              thisfilelist.push(uploadfile.fileid);
            }
          } else {
            thisfilelist.push(uploadfile.fileid);
          }
        }
        filelist.push(thisfilelist);
      }
    });
      //课程名单放在了homeworkName,上传的文件在fileidlist中   
  });
  var render_data = {
    homewokeLisr  : homeworkName,
    uploadfile    : filelist,//是一个二维数组
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