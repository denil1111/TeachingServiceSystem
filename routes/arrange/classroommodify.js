var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
var ClassroomModel = require('../../db/group2db/ClassroomModel');

router.get('/classroommodify', function(req, res,next) {
    if(!req.session.user){return res.redirect('login');}
    res.render('/classroommodify',{
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

router.post('/classroommodify',function(req,res,next){
    var doc = {
            classid2 : req.body.classid2,
            campus : req.body.campus,
            capacity : req.body.capacity,
            facility : req.body.facility,
        };

    ClassroomModel.modifybyid(doc,function(err,data){
        if(err){
            console.log("modify err : "+err);
        }
        else{
            console.log(data);
            res.render('/classroommodify',{
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