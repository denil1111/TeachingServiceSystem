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
//培养方案页面

var dev_plan_gen=[];//通识课变量
dev_plan_gen.push({name:"通识核心课程",min_credits:"10",credits:"12"});//格式 课程类别，培养方案要求学分，已修学分
dev_plan_gen.push({name:"沟通与领导类课程",min_credits:"2",credits:"2"});
dev_plan_gen.push({name:"体育类课程",min_credits:"8",credits:"9"});
dev_plan_gen.push({name:"语言类课程",min_credits:"8",credits:"2"});

var dev_plan_elec=new Array()//选修课变量,所有的选修课（二维数组）
var dev_plan_tmp=[];
dev_plan_tmp.push({ID:"0012345",name:"如何正确的转行卖烧烤",time:"大三 夏",credit:"2.5",complete:false});
dev_plan_tmp.push({ID:"0012346",name:"产品经历撕逼学",time:"大三 春",credit:"1.5",complete:true});
dev_plan_elec.push(dev_plan_tmp);
dev_plan_tmp=[];
dev_plan_tmp.push({ID:"0012347",name:"烫烫烫",time:"大三 夏",credit:"1.5",complete:false});
dev_plan_tmp.push({ID:"0012348",name:"面向对象的编程",time:"大三 春",credit:"3",complete:true});
dev_plan_elec.push(dev_plan_tmp);
var dev_plan_elec_class=[];//选修课类别
dev_plan_elec_class.push({classification:"程序员卖蠢系列",min_credits:"20",credits:"18"});
dev_plan_elec_class.push({classification:"奇技淫巧",min_credits:"20",credits:"22"});

var dev_plan_req=[];//必修课变量
dev_plan_req.push({ID:"0011345",name:"如何正确的把妹",time:"大三 秋冬",credit:"4.5",complete:false})
dev_plan_req.push({ID:"0011346",name:"如何正确的犯蠢",time:"大三 秋冬",credit:"4.5",complete:false})
router.get('/dev_plan', function(req, res, next) {
  console.log(course.ejs);
  res.render('dev_plan', {
    name: '程序员', 
    image: 'images/avatars/avatar3.jpg',
    total_a:'12',
    a:'2,3,1,2,3,1,0',
    total_b:'24',
    b:'4,6,2,4,6,2,0',
    total_credits:'24',
    credits:'4,6,2,4,6,2,0',
    dev_plan_gen:dev_plan_gen,
    dev_plan_elec:dev_plan_elec,
    dev_plan_elec_class:dev_plan_elec_class,
    dev_plan_req:dev_plan_req
  });
});

//my_dev_plan中给出的是dev_plan类变量为我的培养方案，其中dev_plan四个变量与专业培养方案含义相同，但是为加入自己培养方案的内容
//credits的含义为培养方案中已包含的总学分数量
//增加变量my_dev_plan_gen，其含义为我的培养方案中制定的通识课
var my_dev_plan_gen=[];
my_dev_plan_gen.push({ID:"0015345",name:"人生哲学漫谈",time:"大三 夏",credit:"2.5",complete:false,classi:"沟通与领导类"});
my_dev_plan_gen.push({ID:"0015345",name:"脊椎病的预防与治疗",time:"大三 夏",credit:"1.5",complete:false,classi:"体育"});

router.get('/my_dev_plan', function(req, res, next) {
  console.log(course.ejs);
  res.render('my_dev_plan', {
    name: '程序员', 
    image: 'images/avatars/avatar3.jpg',
    total_a:'12',
    a:'2,3,1,2,3,1,0',
    total_b:'24',
    b:'4,6,2,4,6,2,0',
    total_credits:'24',
    credits:'4,6,2,4,6,2,0',
    dev_plan_gen:dev_plan_gen,
    dev_plan_elec:dev_plan_elec,
    dev_plan_elec_class:dev_plan_elec_class,
    dev_plan_req:dev_plan_req,
    my_dev_plan_gen:my_dev_plan_gen,
    is_checked:true //该培养方案是否通过审核
  });
});

router.post('/my_dev_plan_add', function(req, res, next) {
    console.log(req.body);
    res.render('my_dev_plan', { 
        name: '程序员', 
        image: 'images/avatars/avatar3.jpg',
        total_a:'12',
        a:'2,3,1,2,3,1,0',
        total_b:'24',
        b:'4,6,2,4,6,2,0',
        total_credits:'24',
        credits:'4,6,2,4,6,2,0',
        dev_plan_gen:dev_plan_gen,
        dev_plan_elec:dev_plan_elec,
        dev_plan_elec_class:dev_plan_elec_class,
        dev_plan_req:dev_plan_req,
        my_dev_plan_gen:my_dev_plan_gen,
        is_checked:true //该培养方案是否通过审核
      });
});

router.post('/choose', function(req, res, next) {
  console.log(req.body);
  res.render('choose', {
    name: '程序员', 
    image: 'images/avatars/avatar3.jpg',
    total_a:'12',
    a:'2,3,1,2,3,1,0',
    total_b:'24',
    b:'4,6,2,4,6,2,0',
    total_credits:'24',
    credits:'4,6,2,4,6,2,0',
    dev_plan_gen:dev_plan_gen,
    dev_plan_elec:dev_plan_elec,
    dev_plan_elec_class:dev_plan_elec_class,
    dev_plan_req:dev_plan_req,
    my_dev_plan_gen:my_dev_plan_gen,
    is_checked:true //该培养方案是否通过审核
  });
});

module.exports = router;
