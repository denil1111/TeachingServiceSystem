var mongoose = require('mongoose');

var tutorialSchema = new mongoose.Schema({
    courseid:String,//课程号
    type:Number,  //模块类型
    year:String  //修读年份
});

var tutorialModel = mongoose.model('tutorials',tutorialSchema);
module.exports=tutorialModel;