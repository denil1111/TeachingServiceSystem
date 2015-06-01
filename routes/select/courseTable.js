var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


var my_course=[];
my_course.push({
  course_id:"000000",
  ID:"00001",
  name:'计算机组成',
  teacher:'XX1',
  semaster:'春',
  time:'周一 345',
  campus:'玉泉',
  room:'曹西-204'
});
//注意所有课程的time日期格式，多个上课时间之间以空格分隔，共有以下情况：
//晚上的课程格式为 Mon night
//其余为 周一 123 或 周一 12 以此类推
//新增course_id为主键, 
my_course.push({course_id:"000001",ID:"00002",name:'软件工程',teacher:'XX2', semaster:'春夏',time:'周一 12 周二 345',campus:'玉泉',room:'曹西-101'});
/* GET home page. */
router.get('/my_course', function(req, res, next) {
  console.log(my_course.ejs);
  res.render('select/my_course', {
    type:1,//manager
    name: '程序员', 
    image: 'images/avatars/avatar3.jpg',
    total_a:'12',
    a:'2,3,1,2,3,1,0',
    total_b:'24',
    b:'4,6,2,4,6,2,0',
    total_credits:'24',
    credits:'4,6,2,4,6,2,0',
    course_data: my_course,
    start_year:'2013',/*入学年份*/
    this_year:'2015',/*今年的年份*/
    this_semester:'春',
  });
});

router.post('/my_course', function(req, res, next) {
    console.log(req.body);
    // var db     = mongoose.createConnection('mongodb://127.0.0.1:27017/NodeJS');// 链接错误
    // var mongooseSchema = require('../db/courseDB/courseSchema');  
    // var mongooseModel = db.model('course', mongooseSchema);
    // mongooseModel.findbyid(req.body, function(error, result){
    //     if(error) {
    //         console.log(error);
    //     } else {
    //         console.log(result);
    //     }
    //关闭数据库链接

    var userModel = require('../../db/courseDB/userSchema'); 
    userModel.find({id: "u001"}, function(error,raw_result){
    if(error) {
        console.log(error);
    } else {
        my_course_list = raw_result[0].confirmedCourse;
        console.log(my_course_list);
    }
    var courseModel = require('../../db/group1db/CourseModel'); 
    my_course = [];
    for (var i=0;i<my_course_list.length;i++)
    {
        console.log(my_course_list[i].id);
        (function(i){ 
            courseModel.find({_id:my_course_list[i].id},function(error,nresult){
            if(error) {
                console.log(error);
            } else {
                console.log(nresult);
            }              
            if (nresult.length!=0)
                my_course.push({course_id:"00010", ID:"00003", name:nresult[0].coursename, teacher:nresult[0].teacher, semaster:nresult[0].courseterm, time:nresult[0].coursetime, campus:nresult[0].campus, room:nresult[0].room});           
            
            console.log("!");
            if (i==my_course_list.length-1){
            console.log(my_course);
            res.render('select/my_course', {
                type:2,//manager
                name: '程序员', 
                image: 'images/avatars/avatar3.jpg',
                total_a:'12',
                a:'2,3,1,2,3,1,0',
                total_b:'24',
                b:'4,6,2,4,6,2,0',
                total_credits:'24',
                credits:'4,6,2,4,6,2,0',
                course_data: my_course,
                start_year:'2013',
                this_year:'2015',
                this_semester:'春'
            });
            }
        });
        })(i); 
    }
    /*res.render('select/my_course', {
            type:2,//manager
            name: '程序员', 
            image: 'images/avatars/avatar3.jpg',
            total_a:'12',
            a:'2,3,1,2,3,1,0',
            total_b:'24',
            b:'4,6,2,4,6,2,0',
            total_credits:'24',
            credits:'4,6,2,4,6,2,0',
            course_data: my_course,
            start_year:'2013',
            this_year:'2015',
            this_semester:'春',
    });*/
      // db.close();
    });
});

//课程人员列表
var students=[];
students.push({sId:"3130000027",sname:"桓神",classNo:"启真1301",major:"计算机科学与技术"});
students.push({sId:"3130000017",sname:"闻神",classNo:"启真1301",major:"计算机科学与技术"});
router.get('/course_list/:courseID', function(req, res, next){
  //课程号
  var course_id = req.params.courseID;
  res.render('select/course_list', {
    course_id:"000002",//注意这个课程ID不是这个主键ID 而是每一门课所对应的ID
    course_name:"软件工程",
    credits:2.5,
    course_time:"周一12 周二345",
    students:students,
    name: '程序员', 
    image: '../images/avatars/avatar3.jpg'
  });
});
module.exports = router;