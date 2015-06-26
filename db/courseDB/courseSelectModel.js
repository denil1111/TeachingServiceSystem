var mongoose = require('mongoose');
var courseModel = require('../../db/group1db/CourseModel');
var course = require('../group1db/CourseModel');
var courseSelectSchema = new mongoose.Schema({
	id:{type:String},
	remain:{type:Number},
	all:{type:Number},
	waiting:{type:Number}
});

var courseSelectModel = mongoose.model('courseSelectModel',courseSelectSchema,'coursesSelects');

course.schema.post('save', function(doc) {
   console.log("hook course");
   console.log(doc);
   courseSelectModel.create({
       id : doc._id,
       remain: 50,
       all: 50,
       waiting: 0
   }); 
});



module.exports=courseSelectModel;
