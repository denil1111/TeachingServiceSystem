var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');

//这里require数据库
var gradesDB = require('../db/group6db/gradesDB.js');
var tutorialDB= require('../db/group6db/tutorialDB.js');
var PersonModel = require('../db/group1db/PersonModel');
var CourseModel = require('../db/group1db/CourseModel');

router.get('/tutorial',function(req, res, next) {

if(!req.session.user){return res.redirect('../info/login');}

/*gradesDB.find(function(error,docs){
    if(error){
        console.log(error);
        return;
    }
    var dev_plan_req=[];//必修课变量
    dev_plan_req.push({ID:"0011345",name:"如何正确的把妹",time:"大三 秋冬",credit:"4.5",complete:false});
    dev_plan_req.push({ID:"0011346",name:"如何正确的犯蠢",time:"大三 秋冬",credit:"4.5",complete:false});

  res.render('grades/student_guide', {
  	name: '程序员', 
  	image: 'images/avatars/avatar1.jpg',
  	total_a:'12',
  	a:'2,3,1,2,3,1,0',
  	total_b:'24',
  	b:'4,6,2,4,6,2,0',
  	total_credits:'24',
  	credits:'4,6,2,4,6,2,0',
    data:docs,
	dev_plan:dev_plan_req
  });
  }); 
*/
//得到tutorial表中的所有数据
tutorialDB.find({}, {}, function(err, tdata){
    if (err) return callback(err);

    var len = tdata.length;
    var courseid1=[];//大类必修id
    var courseid2=[];//大类选修id
    var courseid3=[];//通识id
    var courseid4=[];//专业必修id
    var courseid5=[];//专业选修id
    var courseyear1=[];//大类必修year
    var courseyear2=[];//大类选修year
    var courseyear3=[];//通识year
    var courseyear4=[];//专业必修year
    var courseyear5=[];//专业选修year
    for (var i = 0; i < len; i++) {
      var item = tdata[i];
      var courseid = item._id.courseid;
      var type=item._id.type;
      var year=item._id.year;
      if(type==1){
        courseid1.push(courseid);
        courseyear1.push(year);
      }else if(type==2){
      	courseid2.push(courseid);
      	courseyear2.push(year);
      }else if(type==3){
      	courseid3.push(courseid);
      	courseyear3.push(year);
      }else if(type==4){
      	courseid4.push(courseid);
      	courseyear4.push(year);
      }else if(type==5){
      	courseid5.push(courseid);
      	courseyear5.push(year);
      }
    }
    var id1 = {courseid: {$in: courseid1}};
    //查看B表中这条数据  
    CourseModel.findbyid(courseid1,function(error,dev_plan){
       if(error){
          console.log(error);
          return;
       }
         res.render('grades/student_guide', {
         	name: '程序员', 
         	image: 'images/avatars/avatar1.jpg',
         	total_a:'12',
         	a:'2,3,1,2,3,1,0',
         	total_b:'24',
         	b:'4,6,2,4,6,2,0',
         	total_credits:'24',
         	credits:'4,6,2,4,6,2,0',
         	dev_plan:dev_plan
         });
     }); 
  })

}); 

module.exports = router;