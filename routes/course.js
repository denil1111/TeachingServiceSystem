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
/* GET home page. */
router.get('/course', function(req, res, next) {
  console.log(course.ejs);
  res.render('select/course', {
    type:1,//tearcher
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
      res.render('select/course', {
        type:1,//tearcher
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
  name:'计算机组成',
  teacher:'XX1',
  semaster:'春',
  time:'周一 345',
  campus:'玉泉',
  room:'曹西-204'
});
//注意所有课程的time日期格式，多个上课时间之间以空格分隔，共有以下情况：
//晚上的课程格式为 Mon night
//其余为 周一 123 或 周一 12 以此类推
my_course.push({ID:"00002",name:'软件工程',teacher:'XX2', semaster:'春夏',time:'周一 12 周二 345',campus:'玉泉',room:'曹西-101'});
/* GET home page. */
router.get('/my_course', function(req, res, next) {
  console.log(my_course.ejs);
  res.render('select/my_course', {
    type:1,//tearcher
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
  res.render('select/my_course', {
    type:1,//tearcher
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
dev_plan_req.push({ID:"0011345",name:"如何正确的把妹",time:"大三 秋冬",credit:"4.5",complete:false});
dev_plan_req.push({ID:"0011346",name:"如何正确的犯蠢",time:"大三 秋冬",credit:"4.5",complete:false});
var major=[];//专业
major.push("计算机科学与技术");
major.push("软件工程");
major.push("自动化控制");
router.get('/dev_plan', function(req, res, next) {
  console.log(course.ejs);
  res.render('select/dev_plan', {
    type:1,//tearcher
    name: '程序员', 
    image: 'images/avatars/avatar3.jpg',
    total_a:'12',
    a:'2,3,1,2,3,1,0',
    total_b:'24',
    b:'4,6,2,4,6,2,0',
    total_credits:'24',
    credits:'4,6,2,4,6,2,0',
    major:major,
    dev_plan_gen:dev_plan_gen,
    dev_plan_elec:dev_plan_elec,
    dev_plan_elec_class:dev_plan_elec_class,
    dev_plan_req:dev_plan_req
  });
});
//获取专业信息
router.post('/dev_plan', function(req, res, next) {
  console.log(req.body);
  res.render('select/dev_plan', {
    type:1,//tearcher
    name: '程序员', 
    image: 'images/avatars/avatar3.jpg',
    total_a:'12',
    a:'2,3,1,2,3,1,0',
    total_b:'24',
    b:'4,6,2,4,6,2,0',
    total_credits:'24',
    credits:'4,6,2,4,6,2,0',
    major:major,
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
my_dev_plan_gen.push({ID:"c001",name:"Java应用基础",time:"大三 夏",credit:"2.5",complete:false,classi:"沟通与领导类"});
my_dev_plan_gen.push({ID:"0015345",name:"B/S软件设计",time:"大三 夏",credit:"1.5",complete:false,classi:"体育"});

router.get('/my_dev_plan', function(req, res, next) {
  console.log(course.ejs);
  res.render('select/my_dev_plan', {
    type:1,//tearcher
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
    res.render('select/my_dev_plan', {
        type:1,//tearcher 
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
  res.render('select/choose', {
    type:1,//tearcher
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

//进入选课系统
var course1=[];//该课程号对应的所有不同老师、时间段的课程
course1.push({teacher:"xxx",campus:"玉泉",time:"周一12 周三345",room:"曹西502",language:"双语",remain:20,all:40,waiting:30});
course1.push({teacher:"xxx",campus:"玉泉",time:"周一12 周三345",room:"曹西502",language:"双语",remain:20,all:40,waiting:30});
course1.push({teacher:"xxx",campus:"玉泉",time:"周一12 周三345",room:"曹西502",language:"双语",remain:20,all:40,waiting:30});
router.get('/choose_course/:courseID', function(req, res, next){
	//课程号
	var course_id = req.params.courseID;
  var courseSchema = require('../db/courseDB/courseSchema');  
  var courseModel = global.db.model('course', courseSchema);
  var userSchema = require('../db/courseDB/userSchema');  
  var userModel = global.db.model('user', userSchema);
  var selectedCourse=[];
  var selectedCourseP=[];
  var remainedP=0;
  userModel.find({id:"u001"},function(error,result){
      if(error) {
          console.log(error);
      } else {
          console.log(result);
      }
      remainedP=result[0].points;
      for (var i=0;i<result[0].selectedCourse.length;i++)
      {
          selectedCourse.push(result[0].selectedCourse[i].id);
          selectedCourseP.push(result[0].selectedCourse[i].points);
      }
  });
  courseModel.find({ id: req.params.courseID }, function(error,result){
      if(error) {
          console.log(error);
      } else {
          console.log(result);
      }
      var name=result.length==0?'N/A':result[0].name;
      var credits=2.5;
      var id=result.length==0?'N/A':result[0].id;
      var course=[];
      var choice=-1;
      var oldPoint=0;
      for (var i=0;i<result.length;i++)
      {
          var index=selectedCourse.indexOf(result[i]._id.toString());
          if (index!=-1)
          {
              choice=i;
              oldPoint=selectedCourseP[index];
          }
          course.push({teacher:result[i].teacher,campus:result[i].campus,time:result[i].time,room:result[i].room,remain:20,all:40,waiting:30});
      }
      res.render('select/choose', {
        course_id:id,
        course_name:name,
        credits:credits,
        course:course,
        my_choice:choice,//记录登陆人员选择的是哪个选项
        remain_points:remainedP,//该学生剩余的点数
        old_point:oldPoint,//该学生原来分配的点数
        name: '程序员', 
        image: '../images/avatars/avatar3.jpg'
      });
  });
 
});

router.post('/choose_course/:courseID', function(req, res, next){
	console.log(req.body);
  //课程号
	var course_id = req.params.courseID;
  res.render('select/choose', {
    course_id:course_id,
    course_name:"软件工程",
    credits:2.5,
    course:course1,
    my_choice:1,//记录登陆人员选择的是哪个选项
    remain_points:100,
    old_point:10,
    name: '程序员', 
    image: '../images/avatars/avatar3.jpg'
  });
}); 


//课程详细信息
var outline=[];
//因为难以把换行符直接处理，需后端将outline每一行处理后存为数组
outline.push("1.CRC卡");
outline.push("2.类图");
router.get('/course/:courseID', function(req, res, next){
	//课程号
	var course_id = req.params.courseID;
  res.render('select/course_data', {
    course_id:course_id,
    course_name:"软件工程",
    credits:2.5,
    English_name:"Software Engineering",
    academy:"计算机科学与技术学院",
    catagory:"工程技术类",
    course_data:"\"软件工程\"指导学生理解软件工程基本概念的重要性，介绍软件过程模型、方法与工具、以及软件管理这三大基础，讨论传统方法学与面向对象方法学。通过模拟案例，使学生在实践中体会软件的生命周期，包括需求分析、总体设计、详细设计、编码、测试、维护、以及团队合作。在实践中学生将学习使用传统工具，如数据流图、数据字典、实体-关联图、系统层次图；还有面向对象工具如脚本、事件跟踪图、状态迁移图、CRC卡等。",
    course_outline:outline,
    name: '程序员', 
    image: '../images/avatars/avatar3.jpg'
  });
});