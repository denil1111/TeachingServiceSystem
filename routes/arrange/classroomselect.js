var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ClassroomModel = require('../../db/group2db/ClassroomModel');
var tmp=[];
// tmp.push({couresname:'initial_name',teacher:'initial_teacher',exametime:'initial_exametime',room:'initial_room',college:'initial_college'});



router.get('/classroomselect', function(req, res, next) {
	if(!req.session.user){return res.redirect('../info/login');}
    res.render('arrange/classroomselect',{
    	name: '程序员', 
		image: 'images/avatars/avatar3.jpg',
		total_a:'12',
		a:'2,3,1,2,3,1,0',
		total_b:'24',
		b:'4,6,2,4,6,2,0',
		total_credits:'24',
		credits:'4,6,2,4,6,2,0',

    	classroom_data:tmp,
    });
});

router.post('/classroomselect',function(req, res, next){
	console.log("post:classroomselect");

	ClassroomModel.findbyid(req.body.classid2, function(error, data){
		if(error) {
			console.log('find error!'+error);
		} else {
			console.log('find ok!'+data);
		}
		console.log('data : '+data.length);
		res.render('arrange/classroomselect',{
			name: '程序员', 
			image: 'images/avatars/avatar3.jpg',
			total_a:'12',
			a:'2,3,1,2,3,1,0',
			total_b:'24',
			b:'4,6,2,4,6,2,0',
			total_credits:'24',
			credits:'4,6,2,4,6,2,0',

			classroom_data: data
		});
	});
});

module.exports = router;

