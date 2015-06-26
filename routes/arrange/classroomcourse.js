var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var PersonModel = require('../../db/group1db/PersonModel');
var CourseModel = require('../../db/group1db/CourseModel');
var ClassroomModel = require('../../db/group2db/ClassroomModel');

var tmp=[];
router.get('/classroomcourse',function(req,res,next){
//	if(!req.session.user){return res.redirect('../info/login');}
//	var classroom;//=req.session.user[0];
//	ClassroomModel.findall(function(err,classroom_total_info){
//		classroom = classroom_total_info;
		res.render('arrange/classroomcourse',{
        course_data:tmp
    });
});

router.post('/classroomcourse',function(req,res,next){
	console.log("post:classroomcourse");
	CourseModel.findbyclassroom(req.body.campus,req.body.classroom,function(error,data){
		if(error){
			console.log('find error!' + error);
		}
		else{
			console.log('find succeed!' + error);
		}
		res.render('arrange/classroomcourse',{

		course_data : data
		});
	});
});

module.exports = router;
