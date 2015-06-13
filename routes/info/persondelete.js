var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
var PersonModel = require('../../db/group1db/PersonModel');

router.get('/persondelete', function(req, res,next) {
    res.render('info/persondelete',{
        name: '程序员', 
        image: 'images/avatars/avatar3.jpg',
        total_a:'12',
        a:'2,3,1,2,3,1,0',
        total_b:'24',
        b:'4,6,2,4,6,2,0',
        total_credits:'24',
        credits:'4,6,2,4,6,2,0',

        deleteresult:'请提交表单'
    });
});

router.post('/persondelete',function(req,res,next){
    console.log("post:persondelete");
    PersonModel.deletebyid(req.body.userid, function(error, data){
        if(error) {
            console.log('find error!'+error);
        } else {
            console.log('find ok!'+data);
        }
        console.log('data : '+data);
        res.render('info/persondelete',{
            name: '程序员', 
            image: 'images/avatars/avatar3.jpg',
            total_a:'12',
            a:'2,3,1,2,3,1,0',
            total_b:'24',
            b:'4,6,2,4,6,2,0',
            total_credits:'24',
            credits:'4,6,2,4,6,2,0',

            deleteresult:'用户删除成功'
        });
    });
    //    db.close();
});

module.exports = router;