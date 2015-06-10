var mongoose = require('mongoose');
// Schema 结构
var CourseApplicationSchema = new mongoose.Schema({
    courseid2	: {type : String},	//课程ID
    coursename  : {type : String},	//课程名称
    courseterm  : {type : String},  //课程学期
    coursetime	: {type : String},	//上课时间
    coursescore	: {type : Number},	//课程学分
    status      : {type : String, default : 'on'}, //申请状态； 尚在处理中为 on， 处理结束改为off
    teacher     : {type : String},	//授课老师
    examtime	: {type : String},	//考试时间
    room        : {type : String},	//上课教室
    campus      : {type : String},  //上课校区
    college     : {type : String},	//开课学院
    time     : {type : Date, default: Date.now}	//创建时间

});
var CollectionName = 'CourseApplications';

CourseApplicationSchema.statics.findbyid = function(courseid2, callback) {
    return this.model('CourseModel').find({courseid2: courseid2}, callback);
}
CourseApplicationSchema.statics.findbyname = function(coursename, callback) {
    return this.model('CourseModel').find({coursename: coursename}, callback);
}

CourseApplicationSchema.statics.findbyterm = function (term , callback) {
    return this.model ('CourseModel').find({courseterm : term},callback);
}

CourseApplicationSchema.statics.deletebyid = function(courseid2, callback) {
    return this.model('CourseModel').remove({courseid2: courseid2}, callback);
}

CourseApplicationSchema.statics.findbyteacher = function(teacher,callback){
    return this.model('CourseModel').find({teacher: teacher}, callback);
}

CourseApplicationSchema.statics.findbyclassroom = function(campus,room,callback){
    return this.model('CourseModel').find({campus: campus , room: room}, callback);
}

CourseApplicationSchema.statics.modifybyid = function(req, callback) {
    return this.model('CourseModel').update(
        {courseid2: req.courseid2},
        {
            $set:{
                coursename : req.coursename,
                courseterm : req.courseterm,
                coursetime :req.coursetime,
                coursescore : req.coursescore,
                status : req.status,
                teacher : req.teacher,
                examtime : req.examtime,
                room : req.room,
                campus : req.campus,
                college : req.college
            }//,
        },
        callback);
}


CourseApplicationSchema.statics.findbylist = function(cstlist, callback) {
    return this.model('CourseModel').find({courseid2: {$in:cstlist}}, callback);
}

CourseApplicationSchema.statics.statusoff = function(courseid2, callback) {
    return this.model('CourseModel').update(
        {courseid2: courseid2},
        {
            $set:{ status : 'off' }
        },
        callback);
}

var CourseApplicationModel = mongoose.model('CourseApplicationModel',CourseApplicationSchema,CollectionName);
module.exports=CourseApplicationModel;