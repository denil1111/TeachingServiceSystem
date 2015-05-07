var mongoose = require('mongoose');
// Schema 结构
var mongooseSchema = new mongoose.Schema({
    student	: {type : String},
    paperId	: {type : String},
    choices : {type : [String]},
    point 	: {type : Number},
    time 	: {type : String}
});

mongooseSchema.methods.findBySID_PID = function(StuID, PaperID, callback) {
    return this.model('mongoose').find({student: StuID, paperId: paperID}, callback);
}

module.exports=mongooseSchema;