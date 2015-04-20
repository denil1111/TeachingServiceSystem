var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 

router.get('/courseinsert', function(req, res,next) {
    res.render('courseinsert',{
        coursename : 'name',
        teacher : '教师',
        examtime : ' ',
        room : ' ',
        college : ' ',
        insertresult:'请提交表单'
    });
});

router.post('/courseinsert',function(req,res,next){
    console.log("post:courseinsert");
    var db = mongoose.createConnection('mongodb://127.0.0.1:27017/course');
    var CourseSchema = require('../db/group1db/CourseSchema');
    var CollectionName = 'class';
    var CourseModel = db.model('CourseModel',CourseSchema,CollectionName);
    var doc = {
        coursename : req.body.coursename,
        teacher : req.body.teacher,
        examtime : req.body.examtime,
        room : req.body.room,
        college : req.body.college
    };

    console.log("doc:"+doc.room);
    
    CourseModel.create(doc,function(err,data){
        console.log('err'+err);
        console.log('data'+data);
        if(err){
            console.log("create err : "+err);
        }
        else{
            console.log('Saved by Model OK!');
            console.log(doc.coursename);
            res.render('courseinsert',{
                coursename : data.coursename,
                teacher : data.teacher,
                examtime : data.examtime,
                room : data.room,
                college : data.college,
                insertresult:'表单提交成功！'
            });
        }
    });
//    db.close();
});

module.exports = router;