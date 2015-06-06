var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//课程详细信息
var outline=[];
//因为难以把换行符直接处理，需后端将outline每一行处理后存为数组
outline.push("1.CRC卡");
outline.push("2.类图");
router.get('/course/:courseID', function(req, res, next){
	//课程号
	var course_id = req.params.courseID;
  res.render('select/course_data', {
    course_id:course_id,
    course_name:"软件工程",
    credits:2.5,
    English_name:"Software Engineering",
    academy:"计算机科学与技术学院",
    catagory:"工程技术类",
    course_data:"\"软件工程\"指导学生理解软件工程基本概念的重要性，介绍软件过程模型、方法与工具、以及软件管理这三大基础，讨论传统方法学与面向对象方法学。通过模拟案例，使学生在实践中体会软件的生命周期，包括需求分析、总体设计、详细设计、编码、测试、维护、以及团队合作。在实践中学生将学习使用传统工具，如数据流图、数据字典、实体-关联图、系统层次图；还有面向对象工具如脚本、事件跟踪图、状态迁移图、CRC卡等。",
    course_outline:outline,
    name: '程序员', 
    image: '../images/avatars/avatar3.jpg'
  });
});
module.exports = router;