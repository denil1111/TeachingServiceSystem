var mongoose = require('mongoose');

var tutorialSchema = new mongoose.Schema({
    courseid       : {type :String},//课程号
    type      : {type : Number},  //模块类型
    year	: {type : String},   //修读年份
})

var tutorialModel = mongoose.model('tutorial',tutorialSchema);
module.exports=tutorialModel;