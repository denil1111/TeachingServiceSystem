var express = require('express');
var router = express.Router();

//这里require数据库
var CourseModel = require('../../db/group1db/CourseModel');
var gradesDB = require('../../db/group6db/gradesDB');
var motionModel = require('../../db/group6db/motion');

router.get('/grades', function(req, res, next) {
if(!req.session.user){return res.redirect('../info/login');}
var criteria = {userid : '3120102300'};
criteria.userid = req.session.user[0].userid;

// console.log(req.session.user[0].userid);

if(req.session.user[0].status=="student"){
//这里使用数据库
 gradesDB.find(criteria,function(error,docs){
     if(error){
         console.log(error);
         return;
     }
   
   res.render('grades/student_grades', {
   	name: '程序员', 
   	image: 'images/avatars/avatar1.jpg',
   	total_a:'12',
   	a:'2,3,1,2,3,1,0',
   	total_b:'24',
   	b:'4,6,2,4,6,2,0',
   	total_credits:'24',
   	credits:'4,6,2,4,6,2,0',
    data:docs
   });
 });
}
else if (req.session.user[0].status=="teacher"){
 
 CourseModel.findbylist(req.session.user[0].cstlist,function(error,clist){
    if(error){
         console.log(error);
         return;
     }
    var cliston=[];
    var clistoff=[]; 
    
    for(var i=0;i<clist.length;i++){
      if(clist[i].status=="on"){
        cliston.push(clist[i]);
      }
      else if(clist[i].status=="off"){
        clistoff.push(clist[i]);
      }
    }
   
    res.render('grades/teacher_classlist', {
    name: '程序员', 
    image: 'images/avatars/avatar1.jpg',
    total_a:'12',
    a:'2,3,1,2,3,1,0',
    total_b:'24',
    b:'4,6,2,4,6,2,0',
    total_credits:'24',
    credits:'4,6,2,4,6,2,0',
    cliston: cliston,
    clistoff:clistoff
   });  
   
 });
 

 
}

else if(req.session.user[0].status=="admin"){
    var rejected = {
        "status" : "rejected"
    }

    var accepted = {
        "status" : "accepted"
    }
    resultOfrejected = {"length":0};
    resultOfaccepted = {"length":0};
    motionModel.findbystatus(rejected,function(error,motions){
        if(error){
            console.log(error);
            return;
        }
        resultOfrejected = motions;
    });
    motionModel.findbystatus(accepted,function(error,motions){
        if(error){
            console.log(error);
            return;
        }
        resultOfaccepted = motions;
    });
    var query = {
        "status":"pending"
    }
    motionModel.findbystatus(query, function(error,motions){
        if(error){
            console.log(error);
            return;
        }

        console.log('Form admin_grades')
        res.render('grades/admin_gradesaudit', {
            name: '程序员', 
            image: 'images/avatars/avatar1.jpg',
            total_a:'12',
            a:'2,3,1,2,3,1,0',
            total_b:'24',
            b:'4,6,2,4,6,2,0',
          total_credits:'24',
            credits:'4,6,2,4,6,2,0',
            pending:motions,
            accepted:resultOfaccepted,
            rejected:resultOfrejected
        });
    }); 
}


});  

router.get('/gradesAnalysis',function(req, res, next) {

if(!req.session.user){return res.redirect('../info/login');}


gradesDB.find(function(error,docs){
    if(error){
        console.log(error);
        return;
    }

  res.render('grades/student_analysis', {
  	name: '程序员', 
  	image: 'images/avatars/avatar1.jpg',
  	total_a:'12',
  	a:'2,3,1,2,3,1,0',
  	total_b:'24',
  	b:'4,6,2,4,6,2,0',
  	total_credits:'24',
  	credits:'4,6,2,4,6,2,0'
  });
  }); 
});  


module.exports =router;
