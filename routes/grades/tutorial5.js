//专业选修模块
var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');

//这里require数据库
var gradesDB = require('../db/group6db/gradesDB.js');
var tutorialDB= require('../db/group6db/tutorialDB.js');
var PersonModel = require('../db/group1db/PersonModel');
var CourseModel = require('../db/group1db/CourseModel');

router.get('/tutorial',function(req, res, next) {

if(!req.session.user){return res.redirect('../info/login');}

tutorialDB.find(function(error, tData){
  if(error){
      console.log(error);
      return;
  }
  //得到tutorial表中的所有数据

    var courseid5=[];//大类必修id
    var courseyear5=[];//大类必修year
    for (var i = 0; i < tData.length; i++) {
      var courseid = tData[i].courseid;
      var type=tData[i].type;
      var year=tData[i].year;
      if(type==5){
        courseid5.push(courseid);
        courseyear5.push(year);
      }
    }

    console.log(courseid5);
    var id5={courseid: {$in: courseid5}};

    //查看B表中这条数据  
    CourseModel.find(id5,{},function(error,dev_plan){
       if(error){
          console.log(error);
          return;
       }
       var total_point=0;
       for (var i = 0; i < dev_plan.length; i++) {
        total_point+=dev_plan[i].coursescore;
       }

      gradesDB.find(id5,{},function(error,gradeData){
       if(error){
          console.log(error);
          return;
       }
       var complete=[];
       var getPoint=0;
       for (var i = 0; i < gradeData.length; i++) {
            var grade=gradeData[i].score;
            if(grade>=60){
              complete.push(1);
              getPoint+=dev_plan[i].coursescore;
            }else{
              complete.push(0);
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
         	dev_plan5:dev_plan,
          total_point5:total_point,
          gradeData5:gradeData,
          complete5:complete,
          getpoint5:getPoint,
          year5:courseyear3
         });
     }); 


}); 
}); 
}); 
module.exports = router;