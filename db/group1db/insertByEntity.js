var mongoose = require('mongoose');
var db       = mongoose.createConnection('mongodb://127.0.0.1:27017/mydb');// 链接错误
var personSchema = require('./newSchema');	
var personModel = db.model('mongoose', personSchema);
db.on('error', function(error) {
    console.log(error);
});
db.once('open', function (callback) {
	// 增加记录 基于 entity 操作
	var doc = {	username : 'entity_demo_username',
				status : 'entity_demo_status',
				age : 'entity_demo_cage',
				college : 'entity_demo_college',
				tel : 'entity_demo_tel',
				email : 'entity_demo_email'
				};
 	var personEntity = new personModel(doc);
	personEntity.save(function(error) {
	    if(error) {
	        console.log(error);
	    } else {
	        console.log('saved by entity ok!');
	    }
	    db.close();
	});
});

