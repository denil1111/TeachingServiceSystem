var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var tmp=[];
tmp.push({couresname:'initial_name',teacher:'initial_teacher',exametime:'initial_exametime',room:'initial_room',college:'initial_college'});





router.get('/courseselect', function(req, res, next) {
    res.render('courseselect',{
    	course_data:tmp,
        selectresult:'请提交表单'
    });
});


router.post('/courseselect',function(req, res, next){
	console.log("post:courseselect");
	var db = mongoose.createConnection('mongodb://127.0.0.1:27017/course');
	var CourseSchema = require('../db/group1db/CourseSchema');
	var CollectionName = 'class';
	var CourseModel = db.model('CourseModel',CourseSchema,CollectionName);

	CourseModel.findbyname(req.body.coursename, function(error, data){
		if(error) {
			console.log('find error!'+error);
		} else {
			console.log('find ok!'+data);
		}
		console.log('data : '+data);
		console.log('room : '+data[0].room);
		res.render('courseselect',{
			selectresult:'搜索结果：',
			course_data: data
		});
	});
});

module.exports = router;

