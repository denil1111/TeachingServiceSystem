//成绩表

var mongoose = require('mongoose');

var studentGradeSchema = new mongoose.Schema({
courseid    : String,  
userid      : String,  
score       : Number,
gradePoint  : Number,
secondScore : Number
});


var gradesModel = mongoose.model('grades',studentGradeSchema);
module.exports=gradesModel;