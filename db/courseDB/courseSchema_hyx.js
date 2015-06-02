var mongoose = require('mongoose');
var courseSchema_hyx = new mongoose.Schema({
	id:{type:String},
	name:{type:String},
	time:{type:String},//推荐完成时间
	credit:{type:Number},
	type:{type:Number},//1-公共课；2-专业必修；3-专业选修
	subtype:{type:String},
	major:{type:String}
});
var courseModel_hyx = mongoose.model('courseModel_hyx',courseSchema_hyx,'course');
module.exports=courseModel_hyx;
