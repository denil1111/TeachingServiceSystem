var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 

router.get('/personinsert', function(req, res,next) {
    res.render('personinsert',{
        username : 'name',
        status : '学生',
        sex : ' ',
        age : ' ',
        major : ' ',
        college : ' ',
        title : ' ',
        tel : ' ',
        email : ' ',
        insertresult:'请提交表单'
    });
});

router.post('/personinsert',function(req,res,next){
    console.log("post:personinsert");
    var db = mongoose.createConnection('mongodb://127.0.0.1:27017/person');
    var PersonSchema = require('../db/group1db/PersonSchema');
    var CollectionName = 'people';
    var PersonModel = db.model('PersonModel',PersonSchema,CollectionName);
    var doc = {
        username : req.body.username,
        
        status : req.body.status,
        sex : req.body.sex,
        age : req.body.age,
        college : req.body.college,
        tel : req.body.tel,
        email : req.body.email
    };

    console.log("doc:"+doc.username);
    
    PersonModel.create(doc,function(err,data){
        console.log('err'+err);
        console.log('data'+data);
        if(err){
            console.log("create err : "+err);
            res.render('personinsert',{
                username : 'name',
                status : '学生',
                sex : ' ',
                age : ' ',
                major : ' ',
                college : ' ',
                title : ' ',
                tel : ' ',
                email : ' ',
                insertresult:'表单提交失败！'
            });


        }
        else{
            console.log('Saved by Model OK!');
            console.log(doc.username);
            res.render('personinsert',{
                username : data.username,
                status : data.status,
                sex : data.sex,
                age : data.age,
                major : data.major,
                college : data.college,
                title : data.title,
                tel : data.tel,
                email : data.email,
                insertresult:'表单提交成功！'
            });
        }
    });
//    db.close();
});

module.exports = router;