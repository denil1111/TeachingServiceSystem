var mongoose = require('mongoose');
// Schema 结构
var course = require('../group1db/CourseModel');
var courseStudentSchema = new mongoose.Schema({
	id:{type:String},
	confirmedStudent:[{id:{type:String}}]
});

var courseStudentModel = mongoose.model('courseStudentModel',courseStudentSchema,'courseStudents');



course.schema.post('save', function(doc) {
   console.log("hook course");
   console.log(doc);
   courseStudentModel.create({
       id : doc._id,
       confirmedStudent:[]
   }); 
});


module.exports=courseStudentModel;