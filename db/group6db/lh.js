var mongoose = require('mongoose');

// var Schema = new mongoose.Schema({
// courseNumber: String,
// courseName:String,
// score:Number,
// credit:Number,
// gradePoint:Number,
// secondScore:Number
// });


var motionsSchema = new mongoose.Schema({
teacherid   : String,  
studentid   : String,  
courseid    : Number,
time        :{ type: Date, default: Date.now },
oldvalue    : Number,
newvalue    : Number,
reason      : String,
status      : String,
feedback    : { admin : String, comment : String}
});

motionsSchema.statics.findbyid = function(req, callback) {
    return this.model('motions').find(
        { 
            teacherid: req.teacherid, 
            studentid: req.studentid, 
            courseid: req.courseid
        }, 
        callback);
}
motionsSchema.statics.findbyteacherid = function(req, callback) {
    return this.model('motions').find(
        { 
            teacherid: req.teacherid
        }, 
        callback);
}
motionsSchema.statics.findbystatus = function(status, callback) {
    return this.model('motions').find({ status: status}, callback);
}
motionsSchema.statics.acceptbyid = function(req, callback) {
    this.model('motions').update(
        {teacherid:req.teacherid, studentid:req.studentid, courseid:req.courseid},
        {
            $set:{
                status:"accepted",
                feedback:{admin:req.admin,comment: req.comment}
            }
        }
    )
    return this.model('grades').update(
         {studentid:req.id},
         {
            $set:{
                grade: req.val
            }
         },
         callback);
}

motionsSchema.statics.rejectbyid = function(req, callback) {
    return this.model('motions').update(
        {teacherid:req.teacherid, studentid:req.studentid, couresid:req.course.id},
        {
            $set:{
                status:"rejected",
                feedback:{admin:req.admin,comment: req.comment}
            }
        },
        callback);
}

motionsSchema.statics.create = function(req, callbck) {
    return this.model('motions').insert(
        {
            teacherid:req.teacherid,
            studentid:req.studentid,
            courseid:req.courseid,
            time: req.time,
            oldvalue: req.oldvalue,
            newvalue:req.newvalue,
            reason:req.reason,
            status:"pending",
            feedback:{}
        },
        callback);
}

motionsSchema.statics.removebyid = function(req, callback) {
    return this.model('motions').remove(
        { 
            teacherid: req.teacherid, 
            studentid: req.studentid, 
            courseid: req.courseid
        }, 
        callback);
}
var motionsModel = mongoose.model('grades',motionsSchema);
module.exports=motionsModel;
