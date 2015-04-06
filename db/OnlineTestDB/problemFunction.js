var mongoose = require('mongoose');
var db       = mongoose.createConnection('mongodb://127.0.0.1:27017/NodeJS');// 链接错误
var mongooseSchema = require('./problemSchema');
var problem = db.model('onlineTestDB', mongooseSchema);

exports.addProblem = function(stem, answer){
	var newProblem = new problem();
	newProblem.stem = stem;
	newProblem.id = 0;
	newProblem.answer = answer;
	newProblem.save(function(err){
		console.log(error);
	});
	db.close();
}