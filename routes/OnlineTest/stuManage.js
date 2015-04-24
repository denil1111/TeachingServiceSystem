var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var done = false;
var total = 0;
var point = 0;

router.get('/', function(req, res, next) {
	//连接数据库
	//var db = mongoose.createConnection('mongodb://127.0.0.1:27017/NodeJS');// 链接错误
	var mongooseSchema = require('../../db/OnlineTestDB/paperSchema');	
	var mongooseModel = global.db.model('PaperDB', mongooseSchema);

	//渲染页面，其中papers是数据库中查询得到的内容
	mongooseModel.find({}, function(err, papers){
		if(err)
			return next(err);
		res.render('OnlineTest/stuManage', {papers: papers});
		//db.close();
	});
  //res.render('teaTestManage', { title: 'Online Test System - Teacher' });
});


router.post('/answer=:paperId', function(req, res, next) {
	//获取试卷ID
	
	var thisId = req.params.paperId;

	//连接数据库
	//var db = mongoose.createConnection('mongodb://127.0.0.1:27017/NodeJS');// 链接错误
	var mongooseSchema = require('../../db/OnlineTestDB/paperSchema');	
	var mongooseModel = global.db.model('PaperDB', mongooseSchema);

	var mongooseSchema_pro = require('../../db/OnlineTestDB/problemSchema');	
	var mongooseModel_pro = global.db.model('ProblemDB', mongooseSchema_pro);

	//渲染页面，其中problems是数据库中查询得到的内容
	mongooseModel.findOne({_id: thisId}, function(err, paper){
		if(err)
			return next(err);
		mongooseModel_pro.find({_id: {$in: paper.problems}}, function(err, problemsInPaper){
			if(err)
				return next(err);
			var totalPoint = problemsInPaper.length;
			var getPoint = 0;
			for(var i = 0; i < problemsInPaper.length; i++){
				var thisAnswer = req.body[problemsInPaper[i]._id];
				//console.log(thisAnswer);
				if(thisAnswer == problemsInPaper[i].answer){
					getPoint++;
				}
			}
			//res.send(getPoint + '/' + totalPoint);
			//db.close();
			done = true;
			point = getPoint;
			total = totalPoint;
			res.redirect('/OnlineTest/student/answer='+thisId);
		});		
	});
});

router.get('/answer=:paperId', function(req, res, next) {
	//获取试卷ID
	var thisId = req.params.paperId;
	//连接数据库
	//var db = mongoose.createConnection('mongodb://127.0.0.1:27017/NodeJS');// 链接错误
	var mongooseSchema = require('../../db/OnlineTestDB/paperSchema');	
	var mongooseModel = global.db.model('PaperDB', mongooseSchema);

	var mongooseSchema_pro = require('../../db/OnlineTestDB/problemSchema');	
	var mongooseModel_pro = global.db.model('ProblemDB', mongooseSchema_pro);

	//渲染页面，其中problems是数据库中查询得到的内容
	mongooseModel.findOne({_id: thisId}, function(err, paper){
		if(err)
			return next(err);
		mongooseModel_pro.find({_id: {$in: paper.problems}}, function(err, problemsInPaper){
			if(err)
				return next(err);
			// var sec = 0;
			// var min = 0;
			// var hour = 0;
			res.render('OnlineTest/paperAnswer', {done: done, point: point, total: total, paper: paper, problemsInPaper: problemsInPaper});
		});	
	});
});

module.exports = router;