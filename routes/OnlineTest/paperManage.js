var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	//连接数据库
	var db = mongoose.createConnection('mongodb://127.0.0.1:27017/NodeJS');// 链接错误
	var mongooseSchema = require('../../db/OnlineTestDB/paperSchema');	
	var mongooseModel = db.model('PaperDB', mongooseSchema);

	//渲染页面，其中papers是数据库中查询得到的内容
	mongooseModel.find({}, function(err, papers){
		if(err)
			return next(err);
		res.render('OnlineTest/paperManage', {papers: papers});
		db.close();
	});
  //res.render('teaTestManage', { title: 'Online Test System - Teacher' });
});

router.post('/', function(req, res, next) {
	//连接数据库
	var db = mongoose.createConnection('mongodb://127.0.0.1:27017/NodeJS');// 链接错误
	var mongooseSchema = require('../../db/OnlineTestDB/paperSchema');	
	var mongooseModel = db.model('PaperDB', mongooseSchema);
	
	//获得表单内容
	var title = req.body.paperTitle;

	// 增加记录 基于 entity 操作
 	var mongooseEntity = new mongooseModel();
 	mongooseEntity.title = title;
	mongooseEntity.save(function(error) {
	    if(error) {
	        console.log(error);
	    } else {
	        console.log('saved OK!');
	    }
	    db.close();
	});

	res.redirect('/OnlineTest/paperManage');
});

router.get('/delete/:id', function(req, res, next){
	//获取试卷ID
	var thisId = req.params.id;
	//连接数据库
	var db = mongoose.createConnection('mongodb://127.0.0.1:27017/NodeJS');// 链接错误
	var mongooseSchema = require('../../db/OnlineTestDB/paperSchema');	
	var mongooseModel = db.model('PaperDB', mongooseSchema);

	//删除记录
	var conditions = {_id: thisId};
	mongooseModel.remove(conditions, function(error){
	    if(error) {
	        console.log(error);
	    } else {
	        console.log('delete ok!');
	    }
	    //关闭数据库链接
	    db.close();
	});

	res.redirect('/OnlineTest/paperManage');
});

router.get('/update/:id', function(req, res, next){
	//获取试卷ID
	var thisId = req.params.id;
	//连接数据库
	var db = mongoose.createConnection('mongodb://127.0.0.1:27017/NodeJS');// 链接错误
	var mongooseSchema = require('../../db/OnlineTestDB/paperSchema');	
	var mongooseModel = db.model('PaperDB', mongooseSchema);

	var mongooseSchema_pro = require('../../db/OnlineTestDB/problemSchema');	
	var mongooseModel_pro = db.model('ProblemDB', mongooseSchema_pro);

	//渲染页面，其中problems是数据库中查询得到的内容
	mongooseModel.findOne({_id: thisId}, function(err, paper){
		if(err)
			return next(err);
		mongooseModel_pro.find({_id: {$in: paper.problems}}, function(err, problemsInPaper){
			if(err)
				return next(err);
			mongooseModel_pro.find({}, function(err, allProblems){
				if(err)
					return next(err);
				res.render('OnlineTest/paperEdit', {paper: paper, problemsInPaper: problemsInPaper, allProblems: allProblems});
				db.close();
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
	var db = mongoose.createConnection('mongodb://127.0.0.1:27017/NodeJS');// 链接错误
	var mongooseSchema = require('../../db/OnlineTestDB/paperSchema');	
	var mongooseModel = db.model('PaperDB', mongooseSchema);

	mongooseModel.findOne({_id: paperId}, function(err,paper){
		if(err)
			return next(err);

		paper.problems.push(problemId);

		var conditions = {_id : paperId};
		var update     = {$set : {problems : paper.problems}};
		var options    = {upsert : true};
		mongooseModel.update(conditions, update, options, function(error){
	    	if(error) {
	    	    console.log(error);
	    	} else {
	    	    console.log('update ok!');
	    	}
	    	//关闭数据库链接
	    	db.close();
		});
	});

	res.redirect('/OnlineTest/paperManage/update/'+paperId);
});

router.get('/deleteProblem/:paperId/:problemId', function(req, res, next){
	//获取试卷和题目ID
	var paperId = req.params.paperId;
	var problemId = req.params.problemId;

	//连接数据库
	var db = mongoose.createConnection('mongodb://127.0.0.1:27017/NodeJS');// 链接错误
	var mongooseSchema = require('../../db/OnlineTestDB/paperSchema');	
	var mongooseModel = db.model('PaperDB', mongooseSchema);

	mongooseModel.findOne({_id: paperId}, function(err,paper){
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
		mongooseModel.update(conditions, update, options, function(error){
	    	if(error) {
	    	    console.log(error);
	    	} else {
	    	    console.log('update ok!');
	    	}
	    	//关闭数据库链接
	    	db.close();
		});
	});

	res.redirect('/OnlineTest/paperManage/update/'+paperId);
});
module.exports = router;