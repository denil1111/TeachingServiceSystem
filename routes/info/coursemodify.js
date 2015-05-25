var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
var CourseModel = require('../../db/group1db/CourseModel');
var tmp = {
    courseid2 : "123456",
    coursename : "软件工程",
    coursetime : "周一第1、2节",
    teacher : "王章野",
    examtime : "2015.07.01 8:00-10:00",
    room : "教7-602",
    college : "计算机学院"
};

router.get('/coursemodify', function(req, res,next) {
    if(!req.session.user){return res.redirect('login');}
    res.render('info/coursemodify',{
        name: '程序员', 
        image: 'images/avatars/avatar3.jpg',
        total_a:'12',
        a:'2,3,1,2,3,1,0',
        total_b:'24',
        b:'4,6,2,4,6,2,0',
        total_credits:'24',
        credits:'4,6,2,4,6,2,0',

        data : tmp,
        modifyresult:'请提交表单'
    });
});

router.post('/coursemodify',function(req,res,next){
    var doc = {
            courseid2: req.body.courseid2,
            coursename  : req.body.coursename,
            courseterm : req.body.courseterm,
            coursetime : req.body.time,
            coursescore : req.body.coursescore,
            teacher : req.body.teacher,
            examtime : req.body.examtime,
            room : req.body.room,
            campus : req.body.campus,
            college : req.body.college,
        };

    CourseModel.modifybyid(doc,function(err,data){
        if(err){
            console.log("modify err : "+err);
        }
        else{
            console.log(data);
            res.render('info/coursemodify',{
                name: '程序员', 
                image: 'images/avatars/avatar3.jpg',
                total_a:'12',
                a:'2,3,1,2,3,1,0',
                total_b:'24',
                b:'4,6,2,4,6,2,0',
                total_credits:'24',
                credits:'4,6,2,4,6,2,0',

                data : doc,
                modifyresult:'表单提交成功！'
            });
        }
    });
//    db.close();
});

module.exports = router;