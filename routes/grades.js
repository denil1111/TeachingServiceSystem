
var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');

//这里require数据库
var gradesDB = require('../db/group6db/gradesDB.js');
var tutorialDB= require('../db/group6db/tutorialDB.js');
var PersonModel = require('../db/group1db/PersonModel');
var CourseModel = require('../db/group1db/CourseModel');
// var session = require('express-session');





router.get('/grades', function(req, res, next) {
if(!req.session.user){return res.redirect('../info/login');}

var criteria = {userid : '3120102300'};
criteria.userid = req.session.user[0].userid;

// console.log(req.session.user[0].userid);

if(req.session.user[0].status=="student"){
//这里使用数据库
 gradesDB.find(criteria,function(error,docs){
     if(error){
         console.log(error);
         return;
     }
   
   res.render('grades/student_grades', {
   	name: '程序员', 
   	image: 'images/avatars/avatar1.jpg',
   	total_a:'12',
   	a:'2,3,1,2,3,1,0',
   	total_b:'24',
   	b:'4,6,2,4,6,2,0',
   	total_credits:'24',
   	credits:'4,6,2,4,6,2,0',
    data:docs
   });
 });
}
else if (req.session.user[0].status=="teacher"){
 
 CourseModel.findbylist(req.session.user[0].cstlist,function(error,clist){
    if(error){
         console.log(error);
         return;
     }
    var cliston=[];
    var clistoff=[]; 
    
    for(var i=0;i<clist.length;i++){
      if(clist[i].status=="on"){
        cliston.push(clist[i]);
      }
      else if(clist[i].status=="off"){
        clistoff.push(clist[i]);
      }
    }
   
    res.render('grades/teacher_classlist', {
    name: '程序员', 
    image: 'images/avatars/avatar1.jpg',
    total_a:'12',
    a:'2,3,1,2,3,1,0',
    total_b:'24',
    b:'4,6,2,4,6,2,0',
    total_credits:'24',
    credits:'4,6,2,4,6,2,0',
    cliston: cliston,
    clistoff:clistoff
   });  
   
 });
 

 
}

else if(req.session.user[0].status=="admin"){
  
  res.render('grades/admin_gradesaudit', {
    name: '程序员', 
    image: 'images/avatars/avatar1.jpg',
    total_a:'12',
    a:'2,3,1,2,3,1,0',
    total_b:'24',
    b:'4,6,2,4,6,2,0',
    total_credits:'24',
    credits:'4,6,2,4,6,2,0'
   });
}


});  

router.get('/gradesAnalysis',function(req, res, next) {

if(!req.session.user){return res.redirect('../info/login');}


gradesDB.find(function(error,docs){
    if(error){
        console.log(error);
        return;
    }

  res.render('grades/student_analysis', {
  	name: '程序员', 
  	image: 'images/avatars/avatar1.jpg',
  	total_a:'12',
  	a:'2,3,1,2,3,1,0',
  	total_b:'24',
  	b:'4,6,2,4,6,2,0',
  	total_credits:'24',
  	credits:'4,6,2,4,6,2,0'
  });
  }); 
});  


router.get('/testSearch',function(req, res, next) {


if(!req.session.user){return res.redirect('../info/login');}


gradesDB.find(function(error,docs){
    if(error){
        console.log(error);
        return;
    }
  
  res.render('grades/student_test', {
  	name: '程序员', 
  	image: 'images/avatars/avatar1.jpg',
  	total_a:'12',
  	a:'2,3,1,2,3,1,0',
  	total_b:'24',
  	b:'4,6,2,4,6,2,0',
  	total_credits:'24',
  	credits:'4,6,2,4,6,2,0',
    data:docs
  });
  }); 
}); 



router.get('/tutorial',function(req, res, next) {

if(!req.session.user){return res.redirect('../info/login');}

/*gradesDB.find(function(error,docs){
    if(error){
        console.log(error);
        return;
    }
    var dev_plan_req=[];//必修课变量
    dev_plan_req.push({ID:"0011345",name:"如何正确的把妹",time:"大三 秋冬",credit:"4.5",complete:false});
    dev_plan_req.push({ID:"0011346",name:"如何正确的犯蠢",time:"大三 秋冬",credit:"4.5",complete:false});

  res.render('grades/student_guide', {
  	name: '程序员', 
  	image: 'images/avatars/avatar1.jpg',
  	total_a:'12',
  	a:'2,3,1,2,3,1,0',
  	total_b:'24',
  	b:'4,6,2,4,6,2,0',
  	total_credits:'24',
  	credits:'4,6,2,4,6,2,0',
    data:docs,
	dev_plan:dev_plan_req
  });
  }); 
*/

tutorialDB.find(function(error, tData){
  if(error){
      console.log(error);
      return;
  }
  //得到tutorial表中的所有数据

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

router.get('/classLists',function(req, res, next) {

if(!req.session.user){return res.redirect('../info/login');}


CourseModel.findbylist(req.session.user[0].cstlist,function(error,clist){
    if(error){
         console.log(error);
         return;
     }
    var cliston=[];
    var clistoff=[]; 
    
    for(var i=0;i<clist.length;i++){
      if(clist[i].status=="on"){
        cliston.push(clist[i]);
      }
      else if(clist[i].status=="off"){
        clistoff.push(clist[i]);
      }
    }
   
    res.render('grades/teacher_classlist', {
    name: '程序员', 
    image: 'images/avatars/avatar1.jpg',
    total_a:'12',
    a:'2,3,1,2,3,1,0',
    total_b:'24',
    b:'4,6,2,4,6,2,0',
    total_credits:'24',
    credits:'4,6,2,4,6,2,0',
    cliston: cliston,
    clistoff:clistoff
   });  
   
 });
}); 


router.post('/classManagement',function(req, res, next) {

if(!req.session.user){return res.redirect('../info/login');}

var criteria = {courseid : req.body.courseid};

   // console.log("what is req:"+req.body.courseid);



gradesDB.find(criteria,function(error,grades){
    if(error){
        console.log(error);
        return;
    }
    
    var studentList=[];
    
    for(var i=0;i<grades.length;i++){
      studentList.push(grades[i].userid);
    }
    
    
   PersonModel.findbylist(studentList,function(error,persons){
     
        // console.log("what is" + persons);
   CourseModel.findbyid(req.body.courseid,function(error,courses){
     
     
     // console.log("what is persons:" + persons);
      //console.log("what is courses:" + courses);
      //console.log("what is grades:" + grades);
    res.render('grades/teacher_classmanage', {
  	name: '程序员', 
  	image: 'images/avatars/avatar1.jpg',
  	total_a:'12',
  	a:'2,3,1,2,3,1,0',
  	total_b:'24',
  	b:'4,6,2,4,6,2,0',
  	total_credits:'24',
  	credits:'4,6,2,4,6,2,0',
    data:grades,
    studentslist:persons,
    courses:courses
  });   
   });
   });
    
  }); 
}); 

router.get('/gradesAudit',function(req, res, next) {

if(!req.session.user){return res.redirect('../info/login');}


gradesDB.find(function(error,docs){
    if(error){
        console.log(error);
        return;
    }
  
  res.render('grades/admin_gradesaudit', {
  	name: '程序员', 
  	image: 'images/avatars/avatar1.jpg',
  	total_a:'12',
  	a:'2,3,1,2,3,1,0',
  	total_b:'24',
  	b:'4,6,2,4,6,2,0',
  	total_credits:'24',
  	credits:'4,6,2,4,6,2,0',
    data:docs
  });
  }); 
}); 




module.exports = router;
