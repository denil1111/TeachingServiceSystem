var mongoose = require('mongoose');

var tutorialSchema = new mongoose.Schema({
<<<<<<< HEAD
    courseid:String,//课程号
    type:Number,  //模块类型
    year:String  //修读年份
=======
    courseid  : String,
    type      : Number,  
    year	  : String
>>>>>>> 7b033611f9a560f5817582f5699d33d0370dbe83
});

var tutorialModel = mongoose.model('tutorials',tutorialSchema);
module.exports=tutorialModel;