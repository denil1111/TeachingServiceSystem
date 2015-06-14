var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//course.push({teacher:"xxx",campus:"玉泉",time:"周一12 周三345",room:"曹西502",language:"双语",remain:20,all:40,waiting:30,courseid:1});
//course.push({teacher:"xxx",campus:"玉泉",time:"周一12 周三345",room:"曹西502",language:"双语",remain:20,all:40,waiting:30,courseid:2});
//course.push({teacher:"xxx",campus:"玉泉",time:"周一12 周三345",room:"曹西502",language:"双语",remain:20,all:40,waiting:30,courseid:3});
stu_data=[];
stu_data.push({stu_name:"Henry",major:"计算机科学与技术"});

router.get('/manual_add', function(req, res, next) {
  var course=[];
  console.log(course.ejs);
  res.render('select/manual', {
    type:2,//manager
    course:course,
    name: '程序员', 
    image: 'images/avatars/avatar3.jpg',
    choose_time:choose_time
  });
});
router.post('/manual_add', function(req, res, next) {
  var course=[];
  console.log(req.body);
  res.render('select/manual', {
    type:2,//manager
    course:course,
    name: '程序员', 
    image: 'images/avatars/avatar3.jpg',
    choose_time:choose_time
  });
});

module.exports = router;