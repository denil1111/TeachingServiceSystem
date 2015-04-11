var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/personselect', function(req, res, next) {
    res.render('personselect',{
    	person_data:'',
        selectresult:'请提交表单'
    });
});

router.post('/personselect',function(req, res, next){
	console.log("post:personselect");
	var db = mongoose.createConnection('mongodb://127.0.0.1:27017/person');
	var PersonSchema = require('../db/group1db/PersonSchema');
	var CollectionName = 'people';
	var PersonModel = db.model('PersonModel',PersonSchema,CollectionName);

	PersonModel.findbyname(req.body.username1, function(error, data){
		if(error) {
			console.log('find error!'+error);
		} else {
			console.log('find ok!'+data);
		}
		console.log('data : '+data);
		res.render('personselect',{
			selectresult:'搜索结果：',
			person_data: data
		});
	});
});

module.exports = router;

