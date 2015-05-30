var express = require('express');
var router = express.Router();

var PersonModel = require('../../db/group1db/PersonModel');
var CourseModel = require('../../db/group1db/CourseModel');
var gradesDB = require('../../db/group6db/gradesDB.js');


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

module.exports = router;