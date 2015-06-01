/**
 * Created by Gnnng on 5/26/15.
 */
var mongoose = require('../node_modules/mongoose');
var settings = require('../settings');
var async = require('../node_modules/async');

var Person = require('../db/group1db/PersonModel');
var Course = require('../db/group1db/CourseModel');

mongoose.connect(settings.db.connect);

var courseList = [
  'g1',
  'g2',
  'g3'
];

var courseNames = [
  'course1',
  'course2',
  'course3'
];

var courses = courseList.map(function(courseID, i) {
  return {
    courseid2 : courseID,
    coursename : courseNames[i]
  }
});

var user = {
  photo     : '',
  userid    : '312',
  username  : 'wtf',
  password  : '312',
  status    : '系统管理员',
  sex       : '',
  age       : '',
  cstlist   : courseList,
  major     : '',
  college   : '',
  title     : '',
  tel       : '',
  email     : ''
};

async.series([
  function (next) {
    Course.create(courses, function(err, data) {
      if (err)
        next(err, null);
      else
        next(null,data);
    })
  },
  function (next) {
    Person.create(user, function(err, data) {
      if (err)
        next(err, null);
      else {
        next(null, data)
      }
    });
  }
], function (err, results) {
    console.log('Insert into db ' + results);
    mongoose.disconnect();
  }
);
