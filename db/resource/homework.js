// created by gaotao
var mongoose = require('mongoose');
// Schema 结构
var mongooseSchema = new mongoose.Schema({
    courseid : {type : String},
    homework : [], //{homework:"hw1",uploadfile:[{stid:"std1",fileid:"fid"}]}
});
mongooseSchema.statics.findbycourseid = function(courseid, callback) {
    return this.model('homework').find({courseid: courseid}, callback);
};

var mongooseModel = mongoose.model('homework',mongooseSchema);
module.exports=mongooseModel;