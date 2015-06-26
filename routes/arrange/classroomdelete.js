var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
var ClassroomModel = require('../../db/group2db/ClassroomModel');

router.get('/classroomdelete', function(req, res,next) {
//    if(!req.session.user){return res.redirect('../info/login');}
    res.render('arrange/classroomdelete',{
        deleteresult:'请提交表单'
    });
});

router.post('/classroomdelete',function(req,res,next){
    ClassroomModel.deletebyic(req.body.classid2,req.body.campus, function(error, data){
        if(error) {
            console.log('find error!'+error);
        } else {
            console.log('find ok!'+data);
        }
        console.log('data : '+data);
        res.render('arrange/classroomdelete',{
            deleteresult:'教室删除成功'
        });
    });
});

module.exports = router;