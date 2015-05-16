var mongoose = require('mongoose');
// Schema 结构
var PersonSchema = new mongoose.Schema({
    userid      : {type : String},  //学工号 unique
    username	: {type : String, default : '匿名用户'},   //用户名
    status		: {type : String, default : '学生'},      //用户身份 系统管理员/教务管理员/教师/学生
    sex			: {type : String},    //性别
    cstlist     : [],   //课程列表
    age			: {type : Number},    //年龄
    major       : {type : String},  //专业
    college		: {type : String}, //学院
    title       : {type : String, default : '无'},   //职称
    tel			: {type : String},    //电话
    email		: {type : String},   //邮件
    time     : {type : Date, default: Date.now} //创建时间
});
/*
personSchema.methods.insertByEntity = function(PersonEntity, callback) {
    return this.model('mongoose').find({username: username}, callback);
}
*/
// var db = mongoose.createConnection('mongodb://127.0.0.1:27017/person');
// var PersonSchema = require('../db/group1db/PersonSchema');
// var CollectionName = 'people';
// var PersonModel = db.model('PersonModel',PersonSchema,CollectionName);
// var PersonModel = mongoose.model('PersonSchema',PersonSchema);

PersonSchema.statics.findbyname = function(username, callback) {
    // return this.model('PersonModel').find({username: username}, callback);
    this.find({username:username},callback);
}

PersonSchema.statics.deletebyname = function(username, callback) {
    return this.model('PersonModel').remove({username: username}, callback);
}

PersonSchema.statics.modifybyname = function(req, callback) {
    return this.model('PersonModel').update(
        {username: req.username},
        {
            $set:{
                status : req.status,
                sex : req.sex,
                age : req.age,
                major : req.major,
                college : req.college,
                title : req.title,
                tel : req.tel,
                email : req.email
            }//,
 //           $currentDate : { lastModified: true }
        },
        callback);
}

var PersonModel = mongoose.model('PersonSchema',PersonSchema);
module.exports=PersonModel;