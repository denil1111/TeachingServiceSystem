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
    });
  });
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
    for (var i = 0; i < cList.length; i++) {
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
}

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

/*
  routes
 */

router.use(
  function cache_courseList(req, res, next) {
    debug('cache_courseList');
    if ('courseList' in req.session) {
      next();
    } else {
      getCourseList(req.session.user.userid, function (err, courseList) {
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
      for (var i = 0; i < req.session.courseList.length; i++) {
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
    current_cid: decodeURIComponent(req.query.cid),
    slide_course: req.session.slide_course,
    path_prefix: 'data'
  };
  debug(render_data);
  res.render('resource/course_data', render_data);
});

router.get('/info', isValidCourseID, function (req, res, next) {
  var render_data = {
    current_cid: decodeURIComponent(req.query.cid),
    slide_course: req.session.slide_course,
    path_prefix: 'info'
  };

  res.render('resource/course_info', render_data);
});

router.get('/homework/upload', function (req, res, next) {
  var html = '<form action="/resource/course/homework/upload?cid=g1&hw=hw1"enctype="multipart/form-data" method="post"> ' +
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
router.get('/homework/insertdemo', function (req, res, next) {
  homeworkModel.insertdemo(function (error, doc) {
    console.log(doc);
  });
})
router.post('/homework/upload', function (req, res, next) {
  var cid = decodeURIComponent(req.query.cid);
  var homework = decodeURIComponent(req.query.hw);
  File.upload(req, function (fileinfo) {
    console.log(fileinfo);
    var file = {
      stid: req.session.user.userid,
      filename: fileinfo.name,
      contentType: fileinfo.options.content_type,
      id: fileinfo.id
    };
    console.log("file");
    console.log(file);
    homeworkModel.findbycourseid(cid, function (error, result) {
      if (error) {
        console.log(error);
      } else {
        var homeworkList = result[0].homeworklist;
        for (var i = 0; i < homeworkList.length; i++) {
          if (homeworkList[i].homework == homework) {
            homeworkList[i].uploadfile.push(file);
            break;
          }
        };
        homeworkModel.updatehw(cid, homeworkList, function (error, doc) {
          console.log('update');
          console.log(doc);
          if (error) {
            console.log(error);
          } else {
            res.redirect('/resource/course/data');
          }
        });
      }
    });
  });
});

router.get('/homework/', isValidCourseID, function (req, res, next) {
  var cid = decodeURIComponent(req.query.cid);
  var homeworkName = [];
  var filelist = [];
  var thisfilelist = [];
  var thisuploadfile = [];
  var fileinfo;
  Person.findbyid(req.session.user.userid, function (err, user) {
    homeworkModel.findbycourseid(cid, function (error, result) {
      if (error) {
        console.log(error);
      } else {
        var homeworkList = result[0].homeworklist;
        for (var i = 0; i < homeworkList.length; i++) {
          homeworkName.push(homeworkList[i].homework);
          debug('homeworkName:');
          debug(homeworkName);
          thisuploadfile = homeworkList[i].uploadfile;
          debug('uploadfile:');
          debug(thisuploadfile);
          thisfilelist = [];
          for (var j = 0; j < thisuploadfile.length; j++) {
            fileinfo = {
              filename: thisuploadfile[j].filename,
              contentType: thisuploadfile[j].contentType,
              id: thisuploadfile[j].id
            };
            if (user.status == '学生') {
              if (thisuploadfile[j].stid == user.userid) {
                thisfilelist.push(fileinfo);
              }
            } else {
              thisfilelist.push(fileinfo);
            }
          }
          filelist.push(thisfilelist);
          if (i == homeworkList.length - 1) {
            console.log('true');
            var render_data = {
              homewokeLisr: homeworkName,
              uploadfile: filelist,//是一个二维数组
              current_cid: decodeURIComponent(req.query.cid),
              slide_course: req.session.slide_course,
              path_prefix: 'homework'
            };
            debug('homework');
            debug(filelist);
            res.render('resource/course_homework', render_data);
          } else {
            console.log(i);
          }
        }
      }
    });
    //课程名单放在了homeworkName,上传的文件在fileidlist中   
  });
});

router.get('/feedback', function (req, res, next) {
  var render_data = {
    current_cid: decodeURIComponent(req.query.cid),
    slide_course: req.session.slide_course,
    path_prefix: 'feedback'
  };

  res.render('resource/course_feedback', render_data);

});



/*
  exports
 */
exports.router = router;

exports.getCourseList = getCourseList;
exports.cache_courseList = cache_courseList;
exports.cache_slide_course_data = cache_slide_course_data;