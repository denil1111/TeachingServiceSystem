var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 


router.get('/insert', function(req, res,next) {
    res.render('insert',{
        username:'name',
        status:'学生',
        sex:' ',
        age:' ',
        college:' ',
        tel:' ',
        email:' ',
        insertresult:'请提交表单'
    });
});

router.post('/insert',function(req,res,next){
    console.log("post");
    var db = mongoose.createConnection('mongodb://127.0.0.1:27017/mydb');
    var PersonSchema = require('../db/group1db/PersonSchema');
    var PersonModel = db.model('person',PersonSchema);
    var doc = {
        username : req.body.username,
        status : req.body.status,
        sex : req.body.sex,
        age : req.body.age,
        college : req.body.college,
        tel : req.body.tel,
        email : req.body.email
    };
    
    personModel.create(doc,function(err){
        if(err){
            console.log(err);
        }
        else{
            cosole.log('Saved by Model OK!');
            res.render('insert',{
                username:doc.username,
                status:'学生',
                sex:doc.sex,
                age:doc.age,
                college:doc.college,
                tel:doc.tel,
                email:doc.email,
                insertresult:'表单提交成功！'
            });
        }
    });
    db.clode();
});

