var mongoose = require('mongoose');
// Schema �ṹ
var CourseApplicationSchema = new mongoose.Schema({
    courseid2	: {type : String},	//�γ�ID
    coursename  : {type : String},	//�γ�����
    courseterm  : {type : String},  //�γ�ѧ��
    coursetime	: {type : String},	//�Ͽ�ʱ��
    coursescore	: {type : Number},	//�γ�ѧ��
    status      : {type : String, default : 'on'}, //����״̬�� ���ڴ�����Ϊ on�� ���������Ϊoff
    teacher     : {type : String},	//�ڿ���ʦ
    examtime	: {type : String},	//����ʱ��
    room        : {type : String},	//�Ͽν���
    campus      : {type : String},  //�Ͽ�У��
    college     : {type : String},	//����ѧԺ
    time     : {type : Date, default: Date.now}	//����ʱ��

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