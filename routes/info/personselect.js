var express = require('express');
var router = express.Router();
var mongoose = require('mongoose/');

var tmp=[];

var PersonModel = require('../../db/group1db/PersonModel');

router.get('/personselect', function(req, res, next) {
    res.render('info/personselect',{
		name: '程序员', 
		image: 'images/avatars/avatar3.jpg',
		total_a:'12',
		a:'2,3,1,2,3,1,0',
		total_b:'24',
		b:'4,6,2,4,6,2,0',
		total_credits:'24',
		credits:'4,6,2,4,6,2,0',

		person_data: tmp,
		selectresult:''
	});
});

router.post('/personselect',function(req, res, next){
	console.log("post:personselect");
	PersonModel.findbyid(req.body.userid,function (err, user) {
		if (err) {
			console.log('find error!'+ err);
		}
		if (!user | user == '') {
			console.log('user not found!');
			res.render('info/personselect',{
				name: '程序员', 
				image: 'images/avatars/avatar3.jpg',
				total_a:'12',
				a:'2,3,1,2,3,1,0',
				total_b:'24',
				b:'4,6,2,4,6,2,0',
				total_credits:'24',
				credits:'4,6,2,4,6,2,0',

				person_data: user,
				selectresult:"用户不存在"
			});
		}
		console.log("user : "+user.length);
		console.log('user : '+user);
		res.render('info/personselect',{
			name: '程序员', 
			image: 'images/avatars/avatar3.jpg',
			total_a:'12',
			a:'2,3,1,2,3,1,0',
			total_b:'24',
			b:'4,6,2,4,6,2,0',
			total_credits:'24',
			credits:'4,6,2,4,6,2,0',

			person_data: user,
			selectresult:""
		});
	});
});

module.exports = router;

