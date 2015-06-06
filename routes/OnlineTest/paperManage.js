var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var classId = "001";

/* GET home page. */
router.get('/', function(req, res, next) {
	//连接数据库
	//var db = mongoose.createConnection('mongodb://127.0.0.1:27017/NodeJS');// 链接错误
	var paperSchema = require('../../db/OnlineTestDB/paperSchema');	
	var paperModel = mongoose.model('PaperDB', paperSchema);

	//渲染页面，其中papers是数据库中查询得到的内容
	paperModel.find({}, function(err, papers){
		if(err)
			return next(err);
		res.render('OnlineTest/paperManage', {papers: papers, name: '老程序猿', image: 'images/avatars/avatar1.jpg'});
		//db.close();
	});
  //res.render('teaTestManage', { title: 'Online Test System - Teacher' });
});

router.post('/', function(req, res, next) {
	//连接数据库
	//var db = mongoose.createConnection('mongodb://127.0.0.1:27017/NodeJS');// 链接错误
	var paperSchema = require('../../db/OnlineTestDB/paperSchema');	
	var paperModel = mongoose.model('PaperDB', paperSchema);
	
	//获得表单内容
	var title = req.body.paperTitle;

	// 增加记录 基于 entity 操作
 	var paperEntity = new paperModel();
 	paperEntity.title = title;
	paperEntity.save(function(error) {
	    if(error) {
	        console.log(error);
	    } else {
	        console.log('saved OK!');
	    }
	    //db.close();
	});

	res.redirect('/OnlineTest/paperManage');
});

router.get('/delete/:id', function(req, res, next){
	//获取试卷ID
	var thisId = req.params.id;
	//连接数据库
	//var db = mongoose.createConnection('mongodb://127.0.0.1:27017/NodeJS');// 链接错误
	var paperSchema = require('../../db/OnlineTestDB/paperSchema');	
	var paperModel = mongoose.model('PaperDB', paperSchema);

	//删除记录
	var conditions = {_id: thisId};
	paperModel.remove(conditions, function(error){
	    if(error) {
	        console.log(error);
	    } else {
	        console.log('delete ok!');
	    }
	    //关闭数据库链接
	    //db.close();
	});

	res.redirect('/OnlineTest/paperManage');
});

router.get('/update/:id', function(req, res, next){
	//获取试卷ID
	var thisId = req.params.id;
	//连接数据库
	//var db = mongoose.createConnection('mongodb://127.0.0.1:27017/NodeJS');// 链接错误
	var paperSchema = require('../../db/OnlineTestDB/paperSchema');	
	var paperModel = mongoose.model('PaperDB', paperSchema);

	var problemSchema = require('../../db/OnlineTestDB/problemSchema');	
	var problemModel = mongoose.model('ProblemDB', problemSchema);

	//渲染页面，其中problems是数据库中查询得到的内容
	paperModel.findOne({_id: thisId}, function(err, paper){
		if(err)
			return next(err);
		problemModel.find({_id: {$in: paper.problems}}, function(err, problemsInPaper){
			if(err)
				return next(err);
			problemModel.find({}, function(err, allProblems){
				if(err)
					return next(err);
				res.render('OnlineTest/paperEdit', {name: '老程序猿', image: 'images/avatars/avatar1.jpg', paper: paper, problemsInPaper: problemsInPaper, allProblems: allProblems});
				//db.close();
			});
			
			//console.log(problems);
		});		
	});
});

router.get('/add/:paperId/:problemId', function(req, res, next){
	//获取试卷和题目ID
	var paperId = req.params.paperId;
	var problemId = req.params.problemId;

	//连接数据库
	//var db = mongoose.createConnection('mongodb://127.0.0.1:27017/NodeJS');// 链接错误
	var paperSchema = require('../../db/OnlineTestDB/paperSchema');	
	var paperModel = mongoose.model('PaperDB', paperSchema);

	paperModel.findOne({_id: paperId}, function(err,paper){
		if(err)
			return next(err);
		
		if(paper.problems.indexOf(problemId) == -1){
			paper.problems.push(problemId);
		}

		var conditions = {_id : paperId};
		var update     = {$set : {problems : paper.problems}};
		var options    = {upsert : true};
		paperModel.update(conditions, update, options, function(error){
	    	if(error) {
	    	    console.log(error);
	    	} else {
	    	    console.log('update ok!');
	    	}
	    	//关闭数据库链接
	    	//db.close();
		});
	});

	res.redirect('/OnlineTest/paperManage/update/'+paperId);
});

router.get('/deleteProblem/:paperId/:problemId', function(req, res, next){
	//获取试卷和题目ID
	var paperId = req.params.paperId;
	var problemId = req.params.problemId;

	//连接数据库
	//var db = mongoose.createConnection('mongodb://127.0.0.1:27017/NodeJS');// 链接错误
	var paperSchema = require('../../db/OnlineTestDB/paperSchema');	
	var paperModel = mongoose.model('PaperDB', paperSchema);

	paperModel.findOne({_id: paperId}, function(err,paper){
		if(err)
			return next(err);

		//paper.problems.push(problemId);
		for(var i = 0; i < paper.problems.length; i++){
			console.log(paper.problems[i]);
			console.log(problemId);
			if(paper.problems[i] == problemId){
				paper.problems.splice(i, 1);
			}
		}

		var conditions = {_id : paperId};
		var update     = {$set : {problems : paper.problems}};
		var options    = {upsert : true};
		paperModel.update(conditions, update, options, function(error){
	    	if(error) {
	    	    console.log(error);
	    	} else {
	    	    console.log('update ok!');
	    	}
	    	//关闭数据库链接
	    	//db.close();
		});
	});

	res.redirect('/OnlineTest/paperManage/update/'+paperId);
});

router.get('/deliver/:paperId', function(req, res, next){
	var paperId = req.params.paperId;
	var paperSchema = require('../../db/OnlineTestDB/paperSchema');	
	var paperModel = mongoose.model('PaperDB', paperSchema);

	paperModel.findOne({_id: paperId}, function(err,paper){
		if(err)
			return next(err);

		if(paper.deliver.indexOf(classId) == -1){
			paper.deliver.push(classId);
		}

		var conditions = {_id : paperId};
		var update     = {$set : {deliver : paper.deliver}};
		var options    = {upsert : true};
		paperModel.update(conditions, update, options, function(error){
	    	if(error) {
	    	    console.log(error);
	    	} else {
	    	    console.log('update ok!');
	    	}
	    	//关闭数据库链接
	    	//db.close();
		});
	});

	res.redirect('/OnlineTest/paperManage');
});

module.exports = router;