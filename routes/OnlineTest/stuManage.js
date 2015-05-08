var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var done = false;
var point = 0;
var time = "00:00:00";

var student = "001";
var classId = "001";

router.get('/', function(req, res, next) {
	//连接数据库
	//var db = mongoose.createConnection('mongodb://127.0.0.1:27017/NodeJS');// 链接错误
	var mongooseSchema = require('../../db/OnlineTestDB/paperSchema');	
	var mongooseModel = global.db.model('PaperDB', mongooseSchema);

	//渲染页面，其中papers是数据库中查询得到的内容
	mongooseModel.find({}, function(err, papers){
		if(err)
			return next(err);
		var papers_valid = [];
		for(var i = 0; i < papers.length; i++){
			if(papers[i].deliver.indexOf(classId) != -1){
				papers_valid.push(papers[i]);
			}
		}
		res.render('OnlineTest/stuManage', {papers: papers_valid});
		//db.close();
	});
  //res.render('teaTestManage', { title: 'Online Test System - Teacher' });
});


router.post('/answer=:paperId', function(req, res, next) {
	//获取试卷ID
	
	var thisId = req.params.paperId;

	var choices = [];

	//连接数据库
	//var db = mongoose.createConnection('mongodb://127.0.0.1:27017/NodeJS');// 链接错误
	var mongooseSchema = require('../../db/OnlineTestDB/paperSchema');	
	var mongooseModel = global.db.model('PaperDB', mongooseSchema);

	var mongooseSchema_pro = require('../../db/OnlineTestDB/problemSchema');	
	var mongooseModel_pro = global.db.model('ProblemDB', mongooseSchema_pro);

	var recordSchema = require('../../db/OnlineTestDB/recordSchema');
	var recordModel = global.db.model('RecordDB', recordSchema);

	//渲染页面，其中problems是数据库中查询得到的内容
	mongooseModel.findOne({_id: thisId}, function(err, paper){
		if(err)
			return next(err);
		mongooseModel_pro.find({_id: {$in: paper.problems}}, function(err, problemsInPaper){
			if(err)
				return next(err);
			var getPoint = 0;
			for(var i = 0; i < problemsInPaper.length; i++){
				var thisAnswer = req.body[problemsInPaper[i]._id];
				//console.log(thisAnswer);
				choices.push(thisAnswer);
				if(thisAnswer == problemsInPaper[i].answer){
					getPoint++;
				}
			}
			//db.close();

			var recordEntity = new recordModel();
			recordEntity.student = student;
			recordEntity.paperId = thisId;
			recordEntity.choices = choices;
			recordEntity.point = getPoint;
			recordEntity.time = req.body.clock;

			done = true;
			point = getPoint;
			time = req.body.clock;
			console.log(recordEntity);
			recordEntity.save(function(error){
				if(error) {
			        console.log(error);
			    } else {
			        console.log('saved OK!');
			    }
			    res.redirect('/OnlineTest/student/answer='+thisId);
			});
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

	var recordSchema = require('../../db/OnlineTestDB/recordSchema');
	var recordModel = global.db.model('RecordDB', recordSchema);

	//渲染页面，其中problems是数据库中查询得到的内容
	recordModel.findOne({student: student, paperId: thisId}, function(err, result){
		//没有查询到答题记录，渲染答题页面
		if(!result){
			mongooseModel.findOne({_id: thisId}, function(err, paper){
				if(err)
					return next(err);
				mongooseModel_pro.find({_id: {$in: paper.problems}}, function(err, problemsInPaper){
					if(err)
						return next(err);
					res.render('OnlineTest/paperAnswer', {done: done, point: point, paper: paper, problemsInPaper: problemsInPaper, time:time});
				});	
			});
		}
		//查询到答题记录，用户不能再次答题
		else{
			res.render('OnlineTest/paperAnswer', {done: true, point: result.point, paper: result.paperId, problemsInPaper: [], time: result.time});
		}
	});
});

module.exports = router;