var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.post('/choose', function(req, res, next) {
  console.log(req.body);
  res.render('select/choose', {
    type:2,//manager
    name: '程序员', 
    image: 'images/avatars/avatar3.jpg',
    total_a:'12',
    a:'2,3,1,2,3,1,0',
    total_b:'24',
    b:'4,6,2,4,6,2,0',
    total_credits:'24',
    credits:'4,6,2,4,6,2,0',
    dev_plan_gen:dev_plan_gen,
    dev_plan_elec:dev_plan_elec,
    dev_plan_elec_class:dev_plan_elec_class,
    dev_plan_req:dev_plan_req,
    my_dev_plan_gen:my_dev_plan_gen,
    is_checked:true //该培养方案是否通过审核
  });
});



//进入选课系统
var course1=[];//该课程号对应的所有不同老师、时间段的课程
course1.push({teacher:"xxx",campus:"玉泉",time:"周一12 周三345",room:"曹西502",language:"双语",remain:20,all:40,waiting:30});
course1.push({teacher:"xxx",campus:"玉泉",time:"周一12 周三345",room:"曹西502",language:"双语",remain:20,all:40,waiting:30});
course1.push({teacher:"xxx",campus:"玉泉",time:"周一12 周三345",room:"曹西502",language:"双语",remain:20,all:40,waiting:30});
router.get('/choose_course/:courseID', function(req, res, next){
	//课程号
	var course_id = req.params.courseID;
  var courseModel = require('../../db/group1db/CourseModel');
  var userModel = require('../../db/courseDB/userSchema'); 
  var courseSelectModel = require('../../db/courseDB/courseSelectModel'); 
  var selectedCourse=[];
  var selectedCourseP=[];
  var remainedP=0;
  userModel.find({id:"u001"},function(error,result){
      if(error) {
          console.log(error);
      } else {
          console.log(result);
      }
      remainedP=result[0].points;
      for (var i=0;i<result[0].selectedCourse.length;i++)
      {
          selectedCourse.push(result[0].selectedCourse[i].id);
          selectedCourseP.push(result[0].selectedCourse[i].points);
      }
  });
  courseModel.find({ courseid: req.params.courseID }, function(error,result){
      if(error) {
          console.log(error);
      } else {
          console.log(result);
      }
      var name=result.length==0?'N/A':result[0].coursename;
      var credits=result.length==0?-1:result[0].coursescore;
      var id=result.length==0?'N/A':result[0].id;
      var course=[];
      var choice=-1;
      var oldPoint=0;

      for (var i=0;i<result.length;i++)
      {
          var index=selectedCourse.indexOf(result[i]._id.toString());
          if (index!=-1)
          {
              choice=i;
              oldPoint=selectedCourseP[index];
          }
         // course.push({teacher:result[i].teacher,campus:result[i].campus,time:result[i].time,room:result[i].room,remain:20,all:40,waiting:30});
      }
     
      var render=function(){
        res.render('select/choose', {
        course_id:id,
        course_name:name,
        credits:credits,
        course:course,
        my_choice:choice,//记录登陆人员选择的是哪个选项
        remain_points:remainedP,//该学生剩余的点数
        old_point:oldPoint,//该学生原来分配的点数
        name: '程序员', 
        image: '../images/avatars/avatar3.jpg'
        });
      }
      for (var i=0;i<result.length;i++)
      {
          var index=selectedCourse.indexOf(result[i]._id.toString());
          if (index!=-1)
          {
              choice=i;
              oldPoint=selectedCourseP[index];
          }
          console.log(result[i]._id);
          (function(i){ 
            courseSelectModel.find({id:result[i]._id.toString()},function(error,nresult){
              if(error) {
                  console.log(error);
              } else {
                  console.log(nresult);
              }              
              if (nresult.length!=0)
                  course.push({teacher:result[i].teacher,campus:result[i].campus,time:result[i].coursetime,room:result[i].room,remain:nresult[0].remain,all:nresult[0].all,waiting:nresult[0].waiting});
              console.log(i);
              console.log(i==result.length);
              if (i==result.length-1)
                  render();
            });
          })(i);       
      }
      
  });
 
});

router.post('/choose_course/:courseID', function(req, res, next){
	console.log(req.body);
  //课程号
	var course_id = req.params.courseID;
  res.render('select/choose', {
    course_id:course_id,
    course_name:"软件工程",
    credits:2.5,
    course:course1,
    my_choice:1,//记录登陆人员选择的是哪个选项
    remain_points:100,
    old_point:10,
    name: '程序员', 
    image: '../images/avatars/avatar3.jpg'
  });
}); 
module.exports = router;