var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//var PersonModel = require('../../db/group1db/PersonModel');
var CourseModel = require('../../db/group1db/CourseModel');
var ClassroomModel = require('../../db/group2db/ClassroomModel');

var tmp=[];

router.get('/timetable_classroom',function(req,res,next){
//	if(!req.session.user){return res.redirect('../info/login');}
	res.render('arrange/timetable_classroom',{
        name: '程序员', 
        image: 'images/avatars/avatar3.jpg',
        total_a:'12',
        a:'2,3,1,2,3,1,0',
        total_b:'24',
        b:'4,6,2,4,6,2,0',
        total_credits:'24',
        credits:'4,6,2,4,6,2,0',
        course_data : tmp
    });
});

router.post('/timetable_classroom', function(req, res, next) {
    console.log("post:timetable_classroom");
    CourseModel.findbyclassroom(req.body.campus,req.body.classid2, function(error,data){
        if(error)
    	{
    		console.log('find error!'+error);
    	}
    	else{
    		console.log('find ok!'+data);
    	}
    	console.log('data : '+data.length);
        res.render('arrange/timetable_classroom', {
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

router.post('/search_sem',function(req,res,next){
    console.log("search_sem");
    CourseModel.findbyterm(req.body.term,function (error,data) {
        if(error)
    	{
    		console.log('find error!'+error);
    	}
    	else{
    		console.log('find ok!'+data);
    	}
    	console.log('data : '+data.length);
        res.render('arrange/search_sem', {
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