var mongoose = require('mongoose');
// Schema 结构
var mongooseSchema = new mongoose.Schema({
    title 	: 	String,
    problems: 	[],
    //deliver	: 	[]//用来记录发送给哪个班级，暂时不用
});

mongooseSchema.methods.findbyId = function(ID, callback) {
    return this.model('mongoose').find({_id: ID}, callback);
}

module.exports=mongooseSchema;