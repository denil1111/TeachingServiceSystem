var mongoose = require('mongoose');
// Schema 结构
var userSchema = new mongoose.Schema({
	name:{type:String},
	id:{type:String},
	points:{type:Number},
	selectedCourse:[{id:{type:String},points:{type:Number}}],
	confirmedCourse:[{id:{type:String}}],
	major:String
});

var userModel = mongoose.model('userModel',userSchema,'users');
module.exports=userModel;