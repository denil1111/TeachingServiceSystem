var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var done = false;
var point = 0;
var time = "00:00:00";

//假定只有一个学生，一个班级。在合体之后需要通过别的方法获取这些信息
var student = "001";
var classId = "001";

router.get('/', function(req, res, next) {
	//连接数据库
	//var db = mongoose.createConnection('mongodb://127.0.0.1:27017/NodeJS');// 链接错误
	var paperSchema = require('../../db/OnlineTestDB/paperSchema');	
	var paperModel = mongoose.model('PaperDB', paperSchema);

	var recordSchema = require('../../db/OnlineTestDB/recordSchema');
	var recordModel = mongoose.model('RecordDB', recordSchema);

	//渲染页面，其中papers是数据库中查询得到的内容
	paperModel.find({}, function(err, papers){
		if(err)
			return next(err);
		var papers_valid = [];
		for(var i = 0; i < papers.length; i++){
			if(papers[i].deliver.indexOf(classId) != -1){
				papers_valid.push(papers[i]);
			}
		}
		recordModel.find({student: student}, function(err, records){
			var titles = [];
			for(var i = 0; i < records.length; i++){
				titles.push(records[i].title);
			}
			res.render('OnlineTest/stuManage', {papers: papers_valid, records: records, titles: titles, name: '老程序猿',
		image: 'images/avatars/avatar1.jpg'});
		});
		
	});
  //res.render('teaTestManage', { title: 'Online Test System - Teacher' });
});


router.post('/answer=:paperId', function(req, res, next) {
	//获取试卷ID
	
	var thisId = req.params.paperId;

	var choices = [];

	//连接数据库
	//var db = mongoose.createConnection('mongodb://127.0.0.1:27017/NodeJS');// 链接错误
	var paperSchema = require('../../db/OnlineTestDB/paperSchema');	
	var paperModel = mongoose.model('PaperDB', paperSchema);

	var problemSchema = require('../../db/OnlineTestDB/problemSchema');	
	var problemModel = mongoose.model('ProblemDB', problemSchema);

	var recordSchema = require('../../db/OnlineTestDB/recordSchema');
	var recordModel = mongoose.model('RecordDB', recordSchema);

	//渲染页面，其中problems是数据库中查询得到的内容
	paperModel.findOne({_id: thisId}, function(err, paper){
		if(err)
			return next(err);
		problemModel.find({_id: {$in: paper.problems}}, function(err, problemsInPaper){
			if(err)
				return next(err);
			var getPoint = 0;
			for(var i = 0; i < problemsInPaper.length; i++){
				var thisAnswer = req.body[problemsInPaper[i]._id];
				if(!thisAnswer){
					res.render('OnlineTest/onlineTestErr',{message: '答题未完成！'});
					return;
				}
				//console.log(thisAnswer);
				choices.push(thisAnswer);
				if(thisAnswer == problemsInPaper[i].answer){
					getPoint = getPoint + problemsInPaper[i].point;
				}
			}
			//db.close();

			var recordEntity = new recordModel();
			recordEntity.student = student;
			recordEntity.paperId = thisId;
			recordEntity.choices = choices;
			recordEntity.point = getPoint;
			recordEntity.time = req.body.clock;
			recordEntity.title = paper.title;

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
	var paperSchema = require('../../db/OnlineTestDB/paperSchema');	
	var paperModel = mongoose.model('PaperDB', paperSchema);

	var problemSchema = require('../../db/OnlineTestDB/problemSchema');	
	var problemModel = mongoose.model('ProblemDB', problemSchema);

	var recordSchema = require('../../db/OnlineTestDB/recordSchema');
	var recordModel = mongoose.model('RecordDB', recordSchema);

	//渲染页面，其中problems是数据库中查询得到的内容
	recordModel.findOne({student: student, paperId: thisId}, function(err, result){
		//没有查询到答题记录，渲染答题页面
		if(!result){
			paperModel.findOne({_id: thisId}, function(err, paper){
				if(err)
					return next(err);
				problemModel.find({_id: {$in: paper.problems}}, function(err, problemsInPaper){
					if(err)
						return next(err);
					res.render('OnlineTest/paperAnswer', {name: '老程序猿', image: 'images/avatars/avatar1.jpg', done: done, point: point, paper: paper, problemsInPaper: problemsInPaper, time:time});
				});	
			});
		}
		//查询到答题记录，用户不能再次答题
		else{
			res.render('OnlineTest/paperAnswer', {name: '老程序猿', image: 'images/avatars/avatar1.jpg', done: true, point: result.point, paper: result.paperId, problemsInPaper: [], time: result.time});
		}
	});
});

module.exports = router;