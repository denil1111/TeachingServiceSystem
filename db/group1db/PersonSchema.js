var mongoose = require('mongoose');
// Schema 结构
var PersonSchema = new mongoose.Schema({
    username	: {type : String, default : '匿名用户'},
    status		: {type : String, default : '学生'},
    sex			: {type : String},
    cstlist     : [],//课程列表
    age			: {type : Number},
    major       : {type : String},  //专业
    college		: {type : String}, //学院
    title       : {type : String, default : '无'},   //职称
    tel			: {type : String},
    email		: {typr : String},
    time     : {type : Date, default: Date.now}
    
});
/*
personSchema.methods.insertByEntity = function(PersonEntity, callback) {
    return this.model('mongoose').find({username: username}, callback);
}
*/
PersonSchema.statics.findbyname = function(username, callback) {
    return this.model('PersonModel').find({username: username}, callback);
}

module.exports=PersonSchema;