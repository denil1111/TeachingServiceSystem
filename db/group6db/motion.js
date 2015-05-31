//审核表

var mongoose = require('mongoose');
var gradesDB = require('./gradesDB');

var motionSchema = new mongoose.Schema({
teacherid   : String,  
teachername : String,
studentid   : String,  
courseid    : String,
time        :{ type: Date, default: Date.now },
oldvalue    : Number,
newvalue    : Number,
reason      : String,
status      : String,
feedback    : { admin : String, comment : String}
});

motionSchema.statics.findbyid = function(req, callback) {
    console.log("Motion:findbyid");
    return this.model('motions').find(
        { 
            teacherid: req.teacherid, 
            studentid: req.studentid, 
            courseid: req.courseid
        }, 
        callback);
}
motionSchema.statics.findbyteacherid = function(req, callback) {
    console.log("Motion:findbyteacherid");
    return this.model('motions').find(
        { 
            teacherid: req.teacherid
        }, 
        callback);
}
motionSchema.statics.findbystatus = function(req, callback) {
    console.log("Motion:findbystatus");
    return this.model('motions').find(
            { 
                status: req.status
            }, 
            callback);
}
motionSchema.statics.acceptbyid = function(req, callback) {
    console.log("Motion:accepbyid");
    gradesDB.update(
    {
        userid:req.studentid,
        courseid:req.courseid
    },
    {
        $set:{
           score:req.newvalue,
           gradePoint:(req.newvalue-45)/10
        }
    },function(error,other){
        if(error)
            console.log(error)
    });
    return this.model('motions').update(
        {
            teacherid:req.teacherid, 
            studentid:req.studentid,
            courseid:req.courseid
        },
        {
            $set:{
                status:"accepted",
                feedback:{admin:req.admin,comment: req.comment}
            }
        },function(error,motion){
            if(error)
                console.log(error);
            else
                console.log(motion);
       });
    
}

motionSchema.statics.rejectbyid = function(req, callback) {
    console.log("Motion:rejectbyid");
    console.log(req);
    return this.model('motions').update(
        {
            teacherid:req.teacherid, 
            studentid:req.studentid,
            courseid:req.courseid
        },
        {
            $set:{
                status:"rejected",
                feedback:{admin:req.admin,comment: req.comment}
            }
        },
        function(error,motion){
            if(error)
                console.log(error)
            else
                console.log(motion);
        }
        );
}

motionSchema.statics.insert = function(req, callback) {
    console.log("Motion:" + req.teacherid + " "+ req.oldvalue + " " + req.newvalue );
    var exist = 0;
    var origin = this
    this.model('motions').find(
        { 
            teacherid: req.teacherid, 
            studentid: req.studentid, 
            courseid: req.courseid
        }, function(error, motion) {
            if(error) {
                console.log(error);
                return false
            } else {
                console.log("exist:" + motion.length)
                if(motion.length){
                    return false;
                } else {
                    motionSchema.statics.doinsert(req, origin,callback);
                    return true;
                }
            }
        });
}

motionSchema.statics.doinsert = function(req,origin,callback) {

    console.log("Start create" )
    origin.model('motions').create(
    {
        teacherid:req.teacherid,
        teachername:req.teachername,
        studentid:req.studentid,
        courseid:req.courseid,
        time: new Date(),
        oldvalue: req.oldvalue,
        newvalue:req.newvalue,
        reason:req.reason,
        status:"pending",
        feedback:{"admin":"","comment":""}
    },
    callback);
    
}
motionSchema.statics.removebyid = function(req, callback) {
    return this.model('motions').remove(
        { 
            teacherid: req.teacherid, 
            studentid: req.studentid, 
            courseid: req.courseid
        }, 
        callback);
}
var motionModel = mongoose.model('motions',motionSchema);
module.exports=motionModel;
