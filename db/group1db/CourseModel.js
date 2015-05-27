var mongoose = require('mongoose');
// Schema 结构
var CourseSchema = new mongoose.Schema({
	courseid2	: {type : String},	//课程ID 不能直接用courseid或id，mongodb自动对应_id，不能由我们设置
    coursename  : {type : String},	//课程名称
    courseterm  : {type : String},  //课程学期
    coursetime	: {type : String},	//上课时间
    coursescore	: {type : Number},	//课程学分
    status      : {type : String, default : 'on'}, //课程状态，默认'on'，老师提交成绩后，为‘off’
    teacher     : {type : String},	//授课老师
    examtime	: {type : String},	//考试时间
    room        : {type : String},	//上课教室
    campus      : {type : String},  //上课校区
    college     : {type : String},	//开课学院
    time     : {type : Date, default: Date.now}	//创建时间
    
});
var CollectionName = 'courses';

CourseSchema.statics.findbyid = function(courseid2, callback) {
    return this.model('CourseModel').find({courseid2: courseid2}, callback);
}
CourseSchema.statics.findbyname = function(coursename, callback) {
    return this.model('CourseModel').find({coursename: coursename}, callback);
}

CourseSchema.statics.deletebyid = function(courseid2, callback) {
    return this.model('CourseModel').remove({courseid2: courseid2}, callback);
}

CourseSchema.statics.findbyteacher = function(teacher,callback){
    return this.model('CourseModel').find({teacher: teacher}, callback);
}

CourseSchema.statics.findbyclassroom = function(campus,room,callback){
    return this.model('CourseModel').find({campus: campus , room: room}, callback);
}

CourseSchema.statics.modifybyid = function(req, callback) {
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

//给出cstlist = ['1234','3120'],返回所有id符合cstlist(中一条)的course
CourseSchema.statics.findbylist = function(cstlist, callback) {
    return this.model('CourseModel').find({courseid2: {$in:cstlist}}, callback);
}

CourseSchema.statics.statusoff = function(courseid2, callback) {
    return this.model('CourseModel').update(
        {courseid2: courseid2},
        {
            $set:{ status : 'off' }
        },
        callback);
}

var CourseModel = mongoose.model('CourseModel',CourseSchema,CollectionName);
module.exports=CourseModel;