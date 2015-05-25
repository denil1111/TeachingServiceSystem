var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 

router.get('/personmodify', function(req, res,next) {
    if(!req.session.user){return res.redirect('login');}
    res.render('personmodify',{
        name: '程序员', 
        image: 'images/avatars/avatar3.jpg',
        total_a:'12',
        a:'2,3,1,2,3,1,0',
        total_b:'24',
        b:'4,6,2,4,6,2,0',
        total_credits:'24',
        credits:'4,6,2,4,6,2,0',

        modifyresult:'请提交表单'
    });
});

router.post('/personmodify',function(req,res,next){
    console.log("post:personmodify");
    // var db = mongoose.createConnection('mongodb://127.0.0.1:27017/person');
    var PersonModel = require('../db/group1db/PersonModel');
    // var CollectionName = 'people';
    // var PersonModel = db.model('PersonModel',PersonSchema,CollectionName);
    var doc = {
        username : req.body.username,
        status : req.body.status,
        sex : req.body.sex,
        age : req.body.age,
        major : req.body.major,
        college : req.body.college,
        title : req.body.title,
        tel : req.body.tel,
        email : req.body.email
    };

    console.log("doc:"+doc.username);
    
    PersonModel.modifybyname(doc,function(err,data){
        if(err){
            console.log("modify err : "+err);
            res.render('personmodify',{
                name: '程序员', 
                image: 'images/avatars/avatar3.jpg',
                total_a:'12',
                a:'2,3,1,2,3,1,0',
                total_b:'24',
                b:'4,6,2,4,6,2,0',
                total_credits:'24',
                credits:'4,6,2,4,6,2,0',

                modifyresult:'用户修改失败！'
            })
        }
        else{
            console.log('data'+data);
            console.log('Update Model OK!');
            console.log(doc.username);
            res.render('personmodify',{
                name: '程序员', 
                image: 'images/avatars/avatar3.jpg',
                total_a:'12',
                a:'2,3,1,2,3,1,0',
                total_b:'24',
                b:'4,6,2,4,6,2,0',
                total_credits:'24',
                credits:'4,6,2,4,6,2,0',

                modifyresult:'用户修改成功！'
            });
        }
    });
//    db.close();
});

module.exports = router;