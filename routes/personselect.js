var express = require('express');
var router = express.Router();
var mongoose = require('mongoose/');

var tmp=[];
//tmp.push({username:'',status:'',sex:'',age:'',major:'',college:'',title:'',tel:'',email:''});
var PersonModel = require('../db/group1db/PersonModel');

// var PersonModel = mongoose.model('Person',PersonSchema);


router.get('/personselect', function(req, res, next) {
	// if(!req.session.user){return res.redirect('login');}
    res.render('personselect',{
    	name: '程序员', 
    	image: 'images/avatars/avatar3.jpg',
    	total_a:'12',
    	a:'2,3,1,2,3,1,0',
    	total_b:'24',
    	b:'4,6,2,4,6,2,0',
    	total_credits:'24',
    	credits:'4,6,2,4,6,2,0',

    	person_data:tmp
    });
});

router.post('/personselect',function(req, res, next){
	console.log("post:personselect");
	// var db = mongoose.createConnection('mongodb://127.0.0.1:27017/person');

	// var CollectionName = 'people';
	// var PersonModel = db.model('PersonModel',PersonSchema,CollectionName);

	var username = req.body.username;
	console.log(username);

	PersonModel.findbyname(username, function (err, user) {
		if (err) {
			console.log('find error!'+error);
		}
		if (!user) {
			console.log('user not found!');
		}
		console.log("user : "+user.length);
		res.render('personselect',{
			name: '程序员', 
			image: 'images/avatars/avatar3.jpg',
			total_a:'12',
			a:'2,3,1,2,3,1,0',
			total_b:'24',
			b:'4,6,2,4,6,2,0',
			total_credits:'24',
			credits:'4,6,2,4,6,2,0',

			person_data: user
		});
	});


	// PersonModel.findbyname(req.body.username, function(err, data){
	// 	if(error) {
	// 		console.log('find error!'+error);
	// 	} else {
	// 		console.log('find ok!'+data);
	// 	}
	// 	console.log('data : '+data);
	// 	res.render('personselect',{
	// 		name: '程序员', 
	// 		image: 'images/avatars/avatar3.jpg',
	// 		total_a:'12',
	// 		a:'2,3,1,2,3,1,0',
	// 		total_b:'24',
	// 		b:'4,6,2,4,6,2,0',
	// 		total_credits:'24',
	// 		credits:'4,6,2,4,6,2,0',

	// 		person_data: data
	// 	});
	// });
});

module.exports = router;

