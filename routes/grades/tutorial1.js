//��������ģ��
var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');

//����require���ݿ�
var gradesDB = require('../../db/group6db/gradesDB.js');
var tutorialDB= require('../../db/group6db/tutorialDB.js');
var PersonModel = require('../../db/group1db/PersonModel');
var CourseModel = require('../../db/group1db/CourseModel');

router.get('/tutorial',function(req, res, next) {

if(!req.session.user){return res.redirect('../info/login');}

tutorialDB.find(function(error, tData){
  if(error){
      console.log(error);
      return;
  }
  //�õ�tutorial���е���������

    var courseid1=[];//��������id
    var courseyear1=[];//��������year
    for (var i = 0; i < tData.length; i++) {
      var courseid = tData[i].courseid;
      var type=tData[i].type;
      var year=tData[i].year;
      if(type==1){
        courseid1.push(courseid);
        courseyear1.push(year);
      }
    }

    console.log(courseid1);
    var id1={courseid: {$in: courseid1}};

    //�鿴B������������  
    CourseModel.find(id1,{},function(error,dev_plan){
       if(error){
          console.log(error);
          return;
       }
       var total_point=0;
       for (var i = 0; i < dev_plan.length; i++) {
        total_point+=dev_plan[i].coursescore;
       }

      gradesDB.find(id1,{},function(error,gradeData){
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
          name: '����Ա', 
          image: 'images/avatars/avatar1.jpg',
          total_a:'12',
          a:'2,3,1,2,3,1,0',
          total_b:'24',
          b:'4,6,2,4,6,2,0',
          total_credits:'24',
          credits:'4,6,2,4,6,2,0',
         	dev_plan1:dev_plan,
          total_point1:total_point,
          gradeData1:gradeData,
          complete1:complete,
          getpoint1:getPoint,
          year1:courseyear1
         });
     }); 


}); 
}); 
}); 
module.exports = router;