var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
var CourseModel = require('../../db/group1db/CourseModel');
var PersonModel = require('../../db/group1db/PersonModel');

var tmp = {
    courseid2 : "123456",
    coursename : "软件工程",
    coursetime : "周一第1、2节",
    all : 100,
    remain : 100,
    waiting : 0,
    teacher : "3120",
    examtime : "2015.07.01 8:00-10:00",
    room : "教7-602",
    college : "计算机学院"
};

router.get('/', function(req, res,next) {
    res.render('info/courseinsert',{
        name: '程序员', 
        image: 'images/avatars/avatar3.jpg',
        total_a:'12',
        a:'2,3,1,2,3,1,0',
        total_b:'24',
        b:'4,6,2,4,6,2,0',
        total_credits:'24',
        credits:'4,6,2,4,6,2,0',

        coursenameErr: '',
        courseidErr: '',
        teacherErr: '',
        roomErr: '',
        collegeErr: '',
        examtimeErr: '',
        data : tmp,
        insertresult:'请提交表单'
    });
});

router.post('/',function(req,res,next){
    console.log("post:courseinsert");
    var doc = {
        courseid : "333",
        courseid2: req.body.courseid2,
        coursename  : req.body.coursename,
        courseterm : req.body.courseterm,
        coursetime : req.body.time,
        coursescore : req.body.coursescore,
        year : req.body.year,
        all : req.body.all,
        remain : req.body.remain,
        waiting : req.body.waiting,
        teacher : req.body.teacher,
        examtime : req.body.examtime,
        room : req.body.room,
        campus : req.body.campus,
        college : req.body.college,
    };

    var courseidErr='';
    var coursenameErr='';
    var teacherErr='';
    var roomErr='';
    var collegeErr='';
    var examtimeErr='';
    //coursenameErr
    if(doc.coursename == '')
    coursenameErr = 'Course name empty';

    //teacherErr
    if(doc.teacher == '')
        teacherErr = 'Teacher name empty';

    //roomErr
    if(doc.room == '')
        roomErr = 'Room empty';

    //collegeErr
    if(doc.college == '')
        collegeErr = 'College empty';

    //courseidErr
    if(doc.courseid2 == "") {courseidErr = "ID empty";  }
    for(var i = 0, courseid = doc.courseid2; i < courseid.length; i++){
        if(courseid.charAt(i)>'9' || courseid.charAt(i)<'0'){
            courseidErr = "ID illegal";
            break;  
        }
    }

    if(doc.examtime == '') { examtimeErr = 'Exam time empty'; }

    if(courseidErr != '' || examtimeErr != '' || 
            roomErr != '' || teacherErr != '' || coursenameErr != '' || collegeErr != '' )
    {
        res.render('info/courseinsert',{
            name: '程序员', 
            image: 'images/avatars/avatar3.jpg',
            total_a:'12',
            a:'2,3,1,2,3,1,0',
            total_b:'24',
            b:'4,6,2,4,6,2,0',
            total_credits:'24',
            credits:'4,6,2,4,6,2,0',
    
            coursenameErr: coursenameErr,
            courseidErr: courseidErr,
            teacherErr: teacherErr,
            roomErr: roomErr,
            collegeErr: collegeErr,
            examtimeErr: examtimeErr,
            data : doc,
            insertresult:'表单解析失败！'
        });
    }
    else{
        console.log("doc : "+doc);
        console.log("doc courseid2: "+doc.courseid2);
        CourseModel.create(doc,function(err,data){
            if(err){
                console.log("create err : "+err);
            }
            else{
                // console.log("data"+data);
                // console.log("data.id"+data.id);
                CourseModel.findbyid(doc.courseid2,function(err,data2){
                    if(err){
                        console.log("find course err");
                    }
                    else{
                        CourseModel.update(
                            {'courseid2' : doc.courseid2},
                            {
                                $set:{
                                    'courseid' : data2[0]._id.toString()
                                }
                            },
                            function(err,data3){
                                if(err){
                                    console.log('update err');

                                }
                            }
                        );
                    }
                });
                PersonModel.update(
                    {userid:doc.teacher},
                    {
                        $push:{
                            'cstlist':data._id.toString()
                        }
                    },
                    function(err,data3){
                        if(err){
                            console.log('update err');

                        }
                    }
                );


                console.log('Saved by Model OK!');
                console.log(data);
                res.render('info/courseinsert',{
                    name: '程序员', 
                    image: 'images/avatars/avatar3.jpg',
                    total_a:'12',
                    a:'2,3,1,2,3,1,0',
                    total_b:'24',
                    b:'4,6,2,4,6,2,0',
                    total_credits:'24',
                    credits:'4,6,2,4,6,2,0',

                    coursenameErr: coursenameErr,
                    courseidErr: courseidErr,
                    teacherErr: teacherErr,
                    roomErr: roomErr,
                    collegeErr: collegeErr,
                    examtimeErr: examtimeErr,

                    data : doc,
                    insertresult:'表单提交成功！'
                });
            }
        });

    }
//    db.close();
});

module.exports = router;