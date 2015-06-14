var mongoose = require('mongoose');
var courseModel = require('../../db/group1db/CourseModel');
var courseSelectSchema = new mongoose.Schema({
	id:{type:String},
	remain:{type:Number},
	all:{type:Number},
	waiting:{type:Number}
});

// courseModel.schema.post('save', function(doc) {
//    console.log("hook");
//    console.log(doc);
//    courseSelectSchema.create({
//        uid : doc.userid,
//        tree : []
//    }); 
// });

var courseSelectModel = mongoose.model('courseSelectModel',courseSelectSchema,'coursesSelects');
module.exports=courseSelectModel;
