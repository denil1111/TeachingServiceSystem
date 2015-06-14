var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//course.push({teacher:"xxx",campus:"玉泉",time:"周一12 周三345",room:"曹西502",language:"双语",remain:20,all:40,waiting:30,courseid:1});
//course.push({teacher:"xxx",campus:"玉泉",time:"周一12 周三345",room:"曹西502",language:"双语",remain:20,all:40,waiting:30,courseid:2});
//course.push({teacher:"xxx",campus:"玉泉",time:"周一12 周三345",room:"曹西502",language:"双语",remain:20,all:40,waiting:30,courseid:3});
stu_data=[];
stu_data.push({stu_name:"Henry",major:"计算机科学与技术"});

router.get('/manual_add', function(req, res, next) {
  var course=[];
  var status;
  switch (req.session.user.status.toString()){
    case '学生':status=0;break;
    case '教师':status=1;break;
    case '系统管理员':status=2;break;
  }
  console.log(course.ejs);
  res.render('select/manual', {
    type:status,//manager
    course:course,
    name: req.session.user.username.toString(), 
    image: 'images/avatars/avatar3.jpg',
   // choose_time:choose_time
  });
});
router.post('/manual_add', function(req, res, next) {
  var courseData=[];
  var courseModel = require('../../db/group1db/CourseModel');
  console.log(req.body);
  var status;
  switch (req.session.user.status.toString()){
    case '学生':status=0;break;
    case '教师':status=1;break;
    case '系统管理员':status=2;break;
  }
  if (req.body.type=='search'){
      courseModel.find({courseid2:req.body.course_id.toString()},function(err,result){
          if (err)
          {
              console.log(err);
              res.json({status:"err",error:err});
          }            
          else
            console.log(result);
          if (result.length==0)
          {
              res.json({status:"err",error:"No such course"});
          }
          for (var i=0;i<result.length;i++){              
              courseData.push({teacher:result[i].teacher,campus:result[i].campus,time:result[i].coursetime,room:result[i].room,remain:result[i].remain,all:result[i].all,waiting:result[i].waiting,courseid:result[i]._id});
          }
      });
  }
  res.render('select/manual', {
    type:status,//manager
    course:course,
    name: req.session.user.username.toString(), 
    image: 'images/avatars/avatar3.jpg',
  //  choose_time:choose_time
  });
});

module.exports = router;