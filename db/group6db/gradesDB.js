var mongoose = require('mongoose');

var studentGradeSchema = new mongoose.Schema({
courseid    : String,  
userid      : String,  
score       : Number,
gradePoint  : Number,
secondScore : Number
});
studentGradeSchema.statics.findbyid = function(courseid, callback) {
    return this.model('gradesDB').find({courseid: courseid}, callback);
}

var gradesModel = mongoose.model('gradesDB',studentGradeSchema,'grades');
module.exports=gradesModel;