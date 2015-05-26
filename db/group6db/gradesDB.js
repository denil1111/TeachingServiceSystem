var mongoose = require('mongoose');

// var Schema = new mongoose.Schema({
// courseNumber: String,
// courseName:String,
// score:Number,
// credit:Number,
// gradePoint:Number,
// secondScore:Number
// });


var studentGradeSchema = new mongoose.Schema({
courseid    : String,  
userid      : String,  
score       : Number,
gradePoint  : Number,
secondScore : Number
});


var gradesModel = mongoose.model('grades',studentGradeSchema);
module.exports=gradesModel;