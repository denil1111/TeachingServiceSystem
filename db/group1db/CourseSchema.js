var mongoose = require('mongoose');
// Schema 结构
var CourseSchema = new mongoose.Schema({
	courseid	: {type : String},	//课程id
    coursename  : {type : String},	//课程名称
    courseterm  : {type : String},  //课程学期
    coursetime	: {type : String},	//上课时间
    coursescore	: {type : Number},	//课程学分
    teacher     : {type : String},	//授课老师
    examtime	: {type : String},	//考试时间
    room        : {type : String},	//上课教室
    campus      : {type : String},  //上课校区
    college     : {type : String},	//开课学院
    time     : {type : Date, default: Date.now}	//创建时间
    
});
/*
personSchema.methods.insertByEntity = function(PersonEntity, callback) {
    return this.model('mongoose').find({username: username}, callback);
}
*/
CourseSchema.statics.findbyname = function(coursename, callback) {
    return this.model('CourseModel').find({coursename: coursename}, callback);
}

module.exports=CourseSchema;