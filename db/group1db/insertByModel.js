var mongoose = require('mongoose');
var db       = mongoose.createConnection('mongodb://127.0.0.1:27017/mydb');// 链接错误
var personSchema = require('./newSchema');
var personModel = db.model('mongoose', personSchema);
db.on('error', function(error) {
    console.log(error);
});
db.once('open', function (callback) {
	// 增加记录 基于model操作
	var doc = {	username : 'model_demo_username',
				status : 'model_demo_status',
				age : 'model_demo_age',
				college : 'model_demo_college',
				tel : 'model_demo_tel',
				email : 'model_demo_email'
				};
	personModel.create(doc, function(error){
	    if(error) {
	        console.log(error);
	    } else {
	        console.log('saved by model ok!');
	    }
	    // 关闭数据库链接
	    db.close();
	});
});
