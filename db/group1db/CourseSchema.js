var mongoose = require('mongoose');
// Schema 结构
var CourseSchema = new mongoose.Schema({
    coursename  : {type : String},
    teacher     : {type : String},
    examtime	: {type : String},
    room        : {type : String},
    college     : {type : String},
    time     : {type : Date, default: Date.now}
    
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