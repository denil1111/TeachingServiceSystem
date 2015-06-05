//培养方案模块
var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');

//数据库
var gradesDB = require('../../db/group6db/gradesDB.js');
var tutorialDB= require('../../db/group6db/tutorialDB.js');
var PersonModel = require('../../db/group1db/PersonModel');
var CourseModel = require('../../db/group1db/CourseModel');

router.get('/tutorial',function(req, res, next) {

if(!req.session.user){return res.redirect('../info/login');}

var courseid1=[];//大类必修课号
var courseyear1=[];//大类必修修读学年
var dev_plan1=[];//大类课程
var getPoint1=0;//大类获得学分
var total_point1=0;//大类总学分
var complete1=[];//大类修读状态

var courseid2=[];//大类选修课号
var courseyear2=[];//大类选修修读学年
var dev_plan2=[];//大类课程
var getPoint2=0;//大类获得学分
var total_point2=0;//大类总学分
var complete2=[];//大类修读状态

var courseid3=[];//通识课号
var courseyear3=[];//通识修读学年
var dev_plan3=[];//大类课程
var getPoint3=0;//大类获得学分
var total_point3=0;//大类总学分
var complete3=[];//大类修读状态

var courseid4=[];//专业必修课号
var courseyear4=[];//专业必修修读学年
var dev_plan4=[];//大类课程
var getPoint4=0;//大类获得学分
var total_point4=0;//大类总学分
var complete4=[];//大类修读状态

var courseid5=[];//专业选修课号
var courseyear5=[];//专业选修修读学年
var dev_plan5=[];//大类课程
var getPoint5=0;//大类获得学分
var total_point5=0;//大类总学分
var complete5=[];//大类修读状态

var my_major=req.session.user[0].major;
var my_userid=req.session.user[0].userid;
tutorialDB.find({"major":my_major},{},function(error, tData){
  if(error){
      console.log(error);
      return;
  }
  for (var i = 0; i < tData.length; i++) {
    var courseid = tData[i].courseid;
    var type=tData[i].type;
    var year=tData[i].year;
    if(type==1){
      courseid1.push(courseid);
      courseyear1.push(year);
    }else if(type==2){
      courseid2.push(courseid);
      courseyear2.push(year);
    }else if(type==3){
      courseid3.push(courseid);
      courseyear3.push(year);
    }else if(type==4){
      courseid4.push(courseid);
      courseyear4.push(year);
    }else if(type==5){
      courseid5.push(courseid);
      courseyear5.push(year);
    }
  }

var id1={courseid: {$in: courseid1}};
var id2={courseid: {$in: courseid2}};
var id3={courseid: {$in: courseid3}};
var id4={courseid: {$in: courseid4}};
var id5={courseid: {$in: courseid5}};
//大类必修
CourseModel.find(id1,function(error,dev_plan1){
  if(error){
    console.log(error);
    return;
  }
  for (var i = 0; i < dev_plan1.length; i++){
    total_point1+=dev_plan1[i].coursescore;
  }
 gradesDB.find(id1,function(error,gradeData1){
  if(error){
      console.log(error);
      return;
   }
   for (var i = 0; i < gradeData1.length; i++) {
       var grade1=gradeData1[i].score;
       
       if(grade1>=60){
         complete1.push(1);
         getPoint1+=dev_plan1[i].coursescore;
       }else{
         complete1.push(0);
       }
  }
//大类选修
CourseModel.find(id2,{},function(error,dev_plan2){
  if(error){
    console.log(error);
    return;
  }
  for (var i = 0; i < dev_plan2.length; i++){
    total_point2+=dev_plan2[i].coursescore;
  }
 gradesDB.find(id2,{},function(error,gradeData2){
  if(error){
      console.log(error);
      return;
   }
   for (var i = 0; i < gradeData2.length; i++) {
       var grade2=gradeData2[i].score;
       if(grade2>=60 ){
         complete2.push(1);
         getPoint2+=dev_plan2[i].coursescore;
       }else{
         complete2.push(0);
       }
  }
  //通识课程
  CourseModel.find(id3,{},function(error,dev_plan3){
  if(error){
    console.log(error);
    return;
  }
  console.log(dev_plan3);
  for (var i = 0; i < dev_plan3.length; i++){
    total_point3+=dev_plan3[i].coursescore;
  }
  gradesDB.find(id3,{},function(error,gradeData3){
  if(error){
      console.log(error);
      return;
   }
   console.log(gradeData3);
   for (var i = 0; i < gradeData3.length; i++) {
       var grade3=gradeData3[i].score;
       if(grade3>=60){
         complete3.push(1);
         getPoint3+=dev_plan3[i].coursescore;
       }else{
         complete3.push(0);
       }
  }
  //专业选修
  CourseModel.find(id4,{},function(error,dev_plan4){
  if(error){
    console.log(error);
    return;
  }
  for (var i = 0; i < dev_plan4.length; i++){
    total_point4+=dev_plan4[i].coursescore;
  }
  gradesDB.find(id4,{},function(error,gradeData4){
  if(error){
      console.log(error);
      return;
   }
   for (var i = 0; i < gradeData4.length; i++) {
       var grade4=gradeData4[i].score;
       if(grade4>=60){
         complete4.push(1);
         getPoint4+=dev_plan4[i].coursescore;
       }else{
         complete4.push(0);
       }
  }
  //专业必修
  CourseModel.find(id5,{},function(error,dev_plan5){
  if(error){
    console.log(error);
    return;
  }
  for (var i = 0; i < dev_plan5.length; i++){
    total_point5+=dev_plan5[i].coursescore;
  }
  gradesDB.find(id5,{},function(error,gradeData5){
  if(error){
      console.log(error);
      return;
   }
   for (var i = 0; i < gradeData5.length; i++) {
       var grade5=gradeData5[i].score;
       if(grade5>=60){
         complete5.push(1);
         getPoint5+=dev_plan5[i].coursescore;
       }else{
         complete5.push(0);
       }
  }
  res.render('grades/student_guide', {
  name: '程序员', 
  image: 'images/avatars/avatar1.jpg',
  total_a:'12',
  a:'2,3,1,2,3,1,0',
  total_b:'24',
  b:'4,6,2,4,6,2,0',
  total_credits:'24',
  credits:'4,6,2,4,6,2,0',
  dev_plan1:dev_plan1,
  total_point1:total_point1,
  complete1:complete1,
  getpoint1:getPoint1,
  year1:courseyear1,
  dev_plan2:dev_plan2,
  total_point2:total_point2,
  complete2:complete2,
  getpoint2:getPoint2,
  year2:courseyear2,
  dev_plan3:dev_plan3,
  total_point3:total_point3,
  complete3:complete3,
  getpoint3:getPoint3,
  year3:courseyear3,
  dev_plan4:dev_plan4,
  total_point4:total_point4,
  complete4:complete4,
  getpoint4:getPoint4,
  year4:courseyear4,
  dev_plan5:dev_plan5,
  total_point5:total_point5,
  complete5:complete5,
  getpoint5:getPoint5,
  year5:courseyear5
  });
}).sort( {"courseid":1} ).where("userid").equals(my_userid); 
}).sort( {"courseid":1} );
}).sort( {"courseid":1} ).where("userid").equals(my_userid); 
}).sort( {"courseid":1} );
}).sort( {"courseid":1} ).where("userid").equals(my_userid);
}).sort( {"courseid":1} );
}).sort( {"courseid":1} ).where("userid").equals(my_userid);
}).sort( {"courseid":1} );
}).sort( {"courseid":1} ).where("userid").equals(my_userid);
}).sort( {"courseid":1} );
}).sort( {"courseid":1} );
});

module.exports = router;