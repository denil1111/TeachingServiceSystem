var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var tmp=[];
//tmp.push({username:'',status:'',sex:'',age:'',major:'',college:'',title:'',tel:'',email:''});


router.get('/personselect', function(req, res, next) {
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
	var db = mongoose.createConnection('mongodb://127.0.0.1:27017/person');
	var PersonSchema = require('../db/group1db/PersonSchema');
	var CollectionName = 'people';
	var PersonModel = db.model('PersonModel',PersonSchema,CollectionName);

	PersonModel.findbyname(req.body.username, function(error, data){
		if(error) {
			console.log('find error!'+error);
		} else {
			console.log('find ok!'+data);
		}
		console.log('data : '+data);
		res.render('personselect',{
			name: '程序员', 
			image: 'images/avatars/avatar3.jpg',
			total_a:'12',
			a:'2,3,1,2,3,1,0',
			total_b:'24',
			b:'4,6,2,4,6,2,0',
			total_credits:'24',
			credits:'4,6,2,4,6,2,0',

			person_data: data
		});
	});
});

module.exports = router;

