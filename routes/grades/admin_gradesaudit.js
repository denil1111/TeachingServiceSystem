var express = require('express');
var router = express.Router();

var PersonModel = require('../../db/group1db/PersonModel');
var CourseModel = require('../../db/group1db/CourseModel');
var gradesDB = require('../../db/group6db/gradesDB.js');


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