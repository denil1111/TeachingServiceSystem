var mongoose = require('mongoose');
// Schema 结构
var personSchema = new mongoose.Schema({
    username	: {type : String, default : '匿名用户'},
    status		: {type : String, default : '学生'},
    sex			: {type : String},
    age			: {type : Number},
    college		: {type : String},
    tel			: {type : String},
    email		: {typr : String},
    time     : {type : Date, default: Date.now}
    
});
/*
personSchema.methods.insertByEntity = function(PersonEntity, callback) {
    return this.model('mongoose').find({username: username}, callback);
}

mongooseSchema.statics.findbytitle = function(title, callback) {
    return this.model('mongoose').find({title: title}, callback);
}
*/
module.exports=personSchema;