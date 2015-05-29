var express = require('express');
var router = express.Router();


//这里require数据库
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
  //得到tutorial表中的所有数据
    console.log(tData);
    var courseid1=[];//大类必修id
    var courseid2=[];//大类选修id
    var courseid3=[];//通识id
    var courseid4=[];//专业必修id
    var courseid5=[];//专业选修id
    var courseyear1=[];//大类必修year
    var courseyear2=[];//大类选修year
    var courseyear3=[];//通识year
    var courseyear4=[];//专业必修year
    var courseyear5=[];//专业选修year
    for (var i = 0; i < tData.length; i++) {
      var courseid = tData[i].courseid;
      var type=tData[i].type;
      var year=tData[i].year;
 /*     if(type==1){*/
        courseid1.push(courseid);
        courseyear1.push(year);
/*      }else if(type==2){
      	courseid1.push(courseid);
      	courseyear2.push(year);
      }else if(type==3){
      	courseid1.push(courseid);
      	courseyear3.push(year);
      }else if(type==4){
      	courseid1.push(courseid);
      	courseyear4.push(year);
      }else if(type==5){
      	courseid1.push(courseid);
      	courseyear5.push(year);
      }
*/    }

    console.log(courseid1);
    var id1={courseid: {$in: courseid1}};

    //查看B表中这条数据  
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
            var item = gradeData[i];
            var grade=item._id.score;
            if(grade>=60){
              complete.push(true);
              getPoint+=item._id.courseid.gradePoint;
            }else{
              complete.push(false);
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
         	dev_plan:dev_plan,
          total_point:total_point,
          gradeData:gradeData,
          complete:complete,
          getpoint:getPoint,
          data:tData
         });
     }); 


}); 
}); 
}); 

module.exports = router;