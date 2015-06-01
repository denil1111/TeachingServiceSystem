var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
var ClassroomModel = require('../../db/group2db/ClassroomModel');

var tmp = {
    classid2 : "教7-201",
    campus : "玉泉",
    capacity : "100",
    facility : "习近平"    
};

router.get('/classroommodify', function(req, res,next) {
//    if(!req.session.user){return res.redirect('../info/login');}
    res.render('arrange/classroommodify',{
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
    console.log("post:classroominsert");
    var doc = {
        classid2 : req.body.classid2,
        campus : req.body.campus,
        capacity : req.body.capacity,
        facility : req.body.facility,
    };
    
    var classidErr= '';
    var capacityErr = '';
    var facilityErr = '';
    console.log("doc length : "+doc.length);
    console.log("doc : "+doc);
    console.log("doc courseid2: "+doc.classid2);
    
    if(doc.classid2 == '')
    {
        classidErr = 'Classroom Name empty!';
    }
    else if(doc.facility == '')
    {
        facilityErr = 'Facility empty!';
    }
    else if(doc.capacity == '')
    {
        capacityErr = 'Capacity empty!';
    }
    
    for(var i = 0, capacity = doc.capacity; i < capacity.length; i++){
        if(capacity.charAt(i)>'9' || capacity.charAt(i) < '0'){
            capacityErr = 'Capacity is not a number!';
            break;
        }
    }
    
    if(capacityErr == '')
    {
        var capacity = doc.capacity;
        if(capacity > 500)
        {
            capacityErr = 'Capacity is too large';
        }
    }
    if(classidErr!= '' || facilityErr !='' || capacityErr !='')
    {
       res.render('arrange/classroominsert',{
            name: '程序员', 
            image: 'images/avatars/avatar3.jpg',
            total_a:'12',
            a:'2,3,1,2,3,1,0',
            total_b:'24',
            b:'4,6,2,4,6,2,0',
            total_credits:'24',
            credits:'4,6,2,4,6,2,0',
            data:doc,
            insertresult:'表单解析失败'
        });
        return;
    }
    else
    {
        ClassroomModel.findbyid(doc.classid2,function (err, data)
        {
            if (err)
            {
                console.log('find error!'+err);
            }
            if (data == '' )
            {
                classidErr = "Classroom doesn't exist.";
            }
            if(classidErr !=''){
                    res.render('arrange/classroominsert',{
                    name: '程序员', 
                    image: 'images/avatars/avatar3.jpg',
                    total_a:'12',
                    a:'2,3,1,2,3,1,0',
                    total_b:'24',
                    b:'4,6,2,4,6,2,0',
                    total_credits:'24',
                    credits:'4,6,2,4,6,2,0',
                    data:doc,
                    insertresult: '表单提交失败'
                    });
                return;
            }
            else{
                ClassroomModel.modifybyid(doc,function(err,data){
                    if(err){
                        console.log("modify err : "+err);
                    }
                    else{
                        console.log(data);
                        res.render('arrange/classroommodify',{
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
              }
        });
    }

//    db.close();
});

module.exports = router;