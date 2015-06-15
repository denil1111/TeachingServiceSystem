//成绩表

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
studentGradeSchema.statics.findbycourseid= function(courseid, callback) {
	console.log("findbycourseid");
   var result=[];
   for(var i=0;i<courseid.length;i++){
        this.model('gradesDB').findOne({userid:courseid[i]},function(err,data){
            if(err){
                console.log(err);
                return NULL;
            }
            else{
                result.push(data);
            }
        });
	}
	return result;
}

var gradesModel = mongoose.model('gradesDB',studentGradeSchema);
module.exports=gradesModel;