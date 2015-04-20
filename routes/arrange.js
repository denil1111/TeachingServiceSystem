var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var course=[];
course.push({name:'程序员的自我修养',complete:true, teacher:'XX1', semaster:'春',time:'周一 123',campus:'玉泉',room:'曹西-204'});
course.push({name:'论程序员的把妹精神',complete:false, teacher:'XX2', semaster:'春夏',time:'周一 123 周二 345',campus:'玉泉',room:'曹西-101'});
course.push({name:'程序员的自我修养',complete:true, teacher:'XX1', semaster:'春',time:'周一 123',campus:'玉泉',room:'曹西-204'});
course.push({name:'论程序员的把妹精神',complete:false, teacher:'XX2', semaster:'春夏',time:'周一 123 周二 345',campus:'玉泉',room:'曹西-101'});
course.push({name:'程序员的自我修养',complete:true, teacher:'XX1', semaster:'春',time:'周一 123',campus:'玉泉',room:'曹西-204'});
course.push({name:'论程序员的把妹精神',complete:false, teacher:'XX2', semaster:'春夏',time:'周一 123 周二 345',campus:'玉泉',room:'曹西-101'});
course.push({name:'程序员的自我修养',complete:true, teacher:'XX1', semaster:'春',time:'周一 123',campus:'玉泉',room:'曹西-204'});
course.push({name:'论程序员的把妹精神',complete:false, teacher:'XX2', semaster:'春夏',time:'周一 123 周二 345',campus:'玉泉',room:'曹西-101'});
course.push({name:'程序员的自我修养',complete:true, teacher:'XX1', semaster:'春',time:'周一 123',campus:'玉泉',room:'曹西-204'});
course.push({name:'论程序员的把妹精神',complete:false, teacher:'XX2', semaster:'春夏',time:'周一 123 周二 345',campus:'玉泉',room:'曹西-101'});
/* GET home page. */
router.get('/course', function(req, res, next) {
  console.log(course.ejs);
  res.render('course', {
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
  var Schema = require('../db/courseDB/courseSchema');  
  var Model = global.db.model('course', Schema);
  Model.findbyid(req.body, function(error, result){
      if(error) {
          console.log(error);
      } else {
          console.log(result);
      }
      //关闭数据库链接
      res.render('course', {
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
var my_course=[];
my_course.push({
  ID:"00001",
  name:'程序员的自我修养',
  teacher:'XX1',
  semaster:'春',
  time:'周一 345',
  campus:'玉泉',
  room:'曹西-204'
});
//注意所有课程的time日期格式，多个上课时间之间以空格分隔，共有以下情况：
//晚上的课程格式为 Mon night
//其余为 周一 123 或 周一 12 以此类推
my_course.push({ID:"00002",name:'论程序员的把妹精神',teacher:'XX2', semaster:'春夏',time:'周一 12 周二 345',campus:'玉泉',room:'曹西-101'});
/* GET home page. */
router.get('/my_course', function(req, res, next) {
  console.log(my_course.ejs);
  res.render('my_course', {
    name: '程序员', 
    image: 'images/avatars/avatar3.jpg',
    total_a:'12',
    a:'2,3,1,2,3,1,0',
    total_b:'24',
    b:'4,6,2,4,6,2,0',
    total_credits:'24',
    credits:'4,6,2,4,6,2,0',
    course_data: my_course,
    start_year:'2013',/*入学年份*/
    this_year:'2015',/*今年的年份*/
    this_semester:'春',
  });
});
router.post('/my_course_search', function(req, res, next) {
  console.log(req.body);
  // var db     = mongoose.createConnection('mongodb://127.0.0.1:27017/NodeJS');// 链接错误
  // var mongooseSchema = require('../db/courseDB/courseSchema');  
  // var mongooseModel = db.model('course', mongooseSchema);
  // mongooseModel.findbyid(req.body, function(error, result){
  //     if(error) {
  //         console.log(error);
  //     } else {
  //         console.log(result);
  //     }
      //关闭数据库链接
  res.render('my_course', {
    name: '程序员', 
    image: 'images/avatars/avatar3.jpg',
    total_a:'12',
    a:'2,3,1,2,3,1,0',
    total_b:'24',
    b:'4,6,2,4,6,2,0',
    total_credits:'24',
    credits:'4,6,2,4,6,2,0',
    course_data: my_course,
    start_year:'2013',/*入学年份*/
    this_year:'2015',/*今年的年份*/
    this_semester:'春',
  });
      // db.close();
});
module.exports = router;
