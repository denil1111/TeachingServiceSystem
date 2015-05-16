var mongoose = require('mongoose');
var db       = mongoose.createConnection('mongodb://127.0.0.1:27017/mydb');// 链接错误
var mongooseSchema = require('./newSchema');
var mongooseModel = db.model('mongoose', mongooseSchema);
db.on('error', function(error) {
    console.log(error);
});
db.once('open', function (callback) {
	// 基于静态方法的查询
	mongooseModel.findbyname('entity_demo_username', function(error, result){
	    if(error) {
	        console.log(error);
	    } else {
	        console.log(result);
	    }
	    //关闭数据库链接
	    db.close();
	});
});