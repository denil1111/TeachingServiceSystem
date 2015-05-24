
var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');

var gradesDB = require('../db/group6db/gradesDB.js');
var PersonModel = require('../db/group1db/PersonModel');
var CourseModel = require('../db/group1db/CourseModel');

// var session = require('express-session');





router.get('/grades', function(req, res, next) {
  // if(!req.session.user){return res.redirect('../info/login');}

var criteria = {userid : '3120102300'};
// criteria.userid = req.session.user[0].userid;

// console.log(req.session.user[0].userid);

 gradesDB.find(criteria,function(error,docs){
     if(error){
         console.log(error);
         return;
     }
   
   res.render('grades/grades', {
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

router.get('/gradesAnalysis',function(req, res, next) {

gradesDB.find(function(error,docs){
    if(error){
        console.log(error);
        return;
    }
  
  res.render('grades/gradesAnalysis', {
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


router.get('/testSearch',function(req, res, next) {

gradesDB.find(function(error,docs){
    if(error){
        console.log(error);
        return;
    }
  
  res.render('grades/testSearch', {
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

gradesDB.find(function(error,docs){
    if(error){
        console.log(error);
        return;
    }
  
  res.render('grades/tutorial', {
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

router.get('/classLists',function(req, res, next) {

gradesDB.find(function(error,docs){
    if(error){
        console.log(error);
        return;
    }
  
  res.render('grades/classLists', {
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


router.get('/classManagement',function(req, res, next) {

gradesDB.find(function(error,docs){
    if(error){
        console.log(error);
        return;
    }
  
  res.render('grades/classManagement', {
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

router.get('/gradesAudit',function(req, res, next) {

gradesDB.find(function(error,docs){
    if(error){
        console.log(error);
        return;
    }
  
  res.render('grades/gradesAudit', {
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
