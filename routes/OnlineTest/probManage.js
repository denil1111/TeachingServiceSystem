var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	//连接数据库
	//var db = mongoose.createConnection('mongodb://127.0.0.1:27017/NodeJS');// 链接错误
	var mongooseSchema = require('../../db/OnlineTestDB/problemSchema');	
	var mongooseModel = global.db.model('ProblemDB', mongooseSchema);

	//渲染页面，其中problems是数据库中查询得到的内容
	mongooseModel.find({}, function(err, problems){
		if(err)
			return next(err);
		res.render('OnlineTest/probManage', {name: '老程序猿', image: 'images/avatars/avatar1.jpg', problems: problems});
		//db.close();
	});
  //res.render('teaTestManage', { title: 'Online Test System - Teacher' });
});


router.post('/', function(req, res, next) {
	//连接数据库
	//var db = mongoose.createConnection('mongodb://127.0.0.1:27017/NodeJS');// 链接错误
	var mongooseSchema = require('../../db/OnlineTestDB/problemSchema');	
	var mongooseModel = global.db.model('ProblemDB', mongooseSchema);
	
	if(req.body.choice1){
		//获得表单内容
		var stem = req.body.stem;
		var answer = req.body.answer;
		var choice = [];
		choice.push(req.body.choice1);
		choice.push(req.body.choice2);
		choice.push(req.body.choice3);
		choice.push(req.body.choice4);

		// 增加记录 基于 entity 操作
	 	var mongooseEntity = new mongooseModel();
	 	mongooseEntity.stem = stem;
	 	mongooseEntity.answer = answer;
	 	mongooseEntity.choice = choice;
	 	mongooseEntity.type = 0;
		mongooseEntity.save(function(error) {
		    if(error) {
		        console.log(error);
		    } else {
		        console.log('saved OK!');
		    }
		    //db.close();
		});
	}

	else{
		var stem = req.body.stem;
		var answer = req.body.answer;

		// 增加记录 基于 entity 操作
	 	var mongooseEntity = new mongooseModel();
	 	mongooseEntity.stem = stem;
	 	mongooseEntity.answer = answer;
	 	mongooseEntity.type = 1;
		mongooseEntity.save(function(error) {
		    if(error) {
		        console.log(error);
		    } else {
		        console.log('saved OK!');
		    }
		});
	}
	res.redirect('/OnlineTest/probManage');
});

//router.deletePro = function(req, res, next){
router.get('/delete/:id', function(req, res, next){
	//获取题目ID
	var thisId = req.params.id;
	//连接数据库
	//var db = mongoose.createConnection('mongodb://127.0.0.1:27017/NodeJS');// 链接错误
	var mongooseSchema = require('../../db/OnlineTestDB/problemSchema');	
	var mongooseModel = global.db.model('ProblemDB', mongooseSchema);

	//删除记录
	//删除题目的时候要删除试卷的相应内容【还没有实现
	var conditions = {_id: thisId};
	mongooseModel.remove(conditions, function(error){
	    if(error) {
	        console.log(error);
	    } else {
	        console.log('delete ok!');
	    }
	    //关闭数据库链接
	    //db.close();
	});

	res.redirect('/OnlineTest/probManage');
});

module.exports = router;