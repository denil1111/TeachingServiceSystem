var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var course=[];
course.push({name:'程序员的自我修养',complete:true, teacher:'XX1', semaster:'春',time:'周一 123',campus:'玉泉',room:'曹西-204',id:'000001'});
course.push({name:'论程序员的把妹精神',complete:false, teacher:'XX2', semaster:'春夏',time:'周一 123 周二 345',campus:'玉泉',room:'曹西-101',id:'000002'});
course.push({name:'程序员的自我修养',complete:true, teacher:'XX1', semaster:'春',time:'周一 123',campus:'玉泉',room:'曹西-204',id:'000001'});
course.push({name:'论程序员的把妹精神',complete:false, teacher:'XX2', semaster:'春夏',time:'周一 123 周二 345',campus:'玉泉',room:'曹西-101',id:'000002'});
course.push({name:'程序员的自我修养',complete:true, teacher:'XX1', semaster:'春',time:'周一 123',campus:'玉泉',room:'曹西-204',id:'000001'});
course.push({name:'论程序员的把妹精神',complete:false, teacher:'XX2', semaster:'春夏',time:'周一 123 周二 345',campus:'玉泉',room:'曹西-101',id:'000002'});
course.push({name:'程序员的自我修养',complete:true, teacher:'XX1', semaster:'春',time:'周一 123',campus:'玉泉',room:'曹西-204',id:'000001'});
course.push({name:'论程序员的把妹精神',complete:false, teacher:'XX2', semaster:'春夏',time:'周一 123 周二 345',campus:'玉泉',room:'曹西-101',id:'000002'});
course.push({name:'程序员的自我修养',complete:true, teacher:'XX1', semaster:'春',time:'周一 123',campus:'玉泉',room:'曹西-204',id:'000001'});
course.push({name:'论程序员的把妹精神',complete:false, teacher:'XX2', semaster:'春夏',time:'周一 123 周二 345',campus:'玉泉',room:'曹西-101',id:'000002'});
router.get('/course', function(req, res, next) {
  console.log(course.ejs);
  res.render('select/course', {
    type:0,//manager
  	name: '程序员', 
  	image: 'images/avatars/avatar3.jpg',
  	total_a:'12',
  	a:'2,3,1,2,3,1,0',
  	total_b:'24',
  	b:'4,6,2,4,6,2,0',
  	total_credits:'24',
  	credits:'4,6,2,4,6,2,0',
  	course_data: course
  });
});
router.post('/course_search', function(req, res, next) {
  console.log(req.body); 
  id = req.body;
  name_list = id.course_name.split(',');
  teacher_list = id.course_teacher.split(',');
  cond = [];
  all = [];
  if (id.course_number!="")
    all.push({courseid:id.course_number});
  nameall = [];
  for (var i=3; i>=0; i--)
  {
    nameall.push({coursename: new RegExp(name_list[i], 'i')});
  }
  if (id.course_name!=""){
    if (id.name=="and")
      all.push({"$and":nameall});
    else 
      all.push({"$or":nameall});
  }
  teacherall = [];
  for (var i=3; i>=0; i--)
  {
    teacherall.push({teacher: new RegExp(teacher_list[i], 'i')});
  }
  if (id.course_teacher!=""){
    if (id.teacher=="and")
      all.push({"$and":teacherall});
    else
      all.push({"$or":teacherall});
  }
  cond.push({"$and":all});

  var Model = require('../../db/group1db/CourseModel');  
  Model.find(cond[0], function(error,raw_result){
      if(error) {
          console.log(error);
      } else {
          console.log(raw_result);
      }
      result = [];

      for (var i=0; i<raw_result.length; i++)
        result.push({courseid:raw_result[i].courseid, name:raw_result[i].coursename, 
                     semester:raw_result[i].courseterm, time:raw_result[i].coursetime, 
                     teacher:raw_result[i].teacher, room:raw_result[i].room, 
                     campus:raw_result[i].campus});
      console.log(result);
      //关闭数据库链接
      res.render('select/course', {
        type:2,//manager
        name: '程序员', 
        image: 'images/avatars/avatar3.jpg',
        total_a:'12',
        a:'2,3,1,2,3,1,0',
        total_b:'24',
        b:'4,6,2,4,6,2,0',
        total_credits:'24',
        credits:'4,6,2,4,6,2,0',
        course_data: result
      });
  });  
});
module.exports = router;