var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var PersonModel = require('../../db/group1db/PersonModel');
var CourseModel = require('../../db/group1db/CourseModel');
var ClassroomModel = require('../../db/group2db/ClassroomModel');

router.get('/timetable_teacher',function(req,res,next){
	// if(!req.session.user){return res.redirect('../info/login');}
	var localuser=req.session.user;
	console.log("teacher_course: pass user test.");
	CourseModel.findbyteacher(localuser.username,function(error,data){
		if(error){
			console.log('find error:'+error);
		}
		else{
			console.log('find ok:'+data);
		}
		res.render('arrange/timetable_teacher',{
			name: '程序员', 
            image: 'images/avatars/avatar3.jpg',
            total_a:'12',
            a:'2,3,1,2,3,1,0',
            total_b:'24',
            b:'4,6,2,4,6,2,0',
            total_credits:'24',
            credits:'4,6,2,4,6,2,0',
            course_data: data
		});
	});
});

module.exports = router;