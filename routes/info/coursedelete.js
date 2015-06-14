var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
var CourseModel = require('../../db/group1db/CourseModel');
var PersonModel = require('../../db/group1db/PersonModel');

router.get('/', function(req, res,next) {
    res.render('info/coursedelete',{
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

router.post('/',function(req,res,next){
    CourseModel.findbyid(req.body.courseid2, function(error, data){
        if(error) {
            console.log('find error!'+error);
        } else {
            console.log('find ok!'+data);
        }
        console.log('data : '+data.length);
        if(!data | data ==''){
            res.render('info/coursedelete',{
                name: '程序员', 
                image: 'images/avatars/avatar3.jpg',
                total_a:'12',
                a:'2,3,1,2,3,1,0',
                total_b:'24',
                b:'4,6,2,4,6,2,0',
                total_credits:'24',
                credits:'4,6,2,4,6,2,0',

                deleteresult:'课程ID不存在'
            });
        }
        else{
            CourseModel.deletebyid(req.body.courseid2, function(error, data2){
                if(error) {
                    console.log('find error!'+error);
                    res.render('info/coursedelete',{
                        name: '程序员', 
                        image: 'images/avatars/avatar3.jpg',
                        total_a:'12',
                        a:'2,3,1,2,3,1,0',
                        total_b:'24',
                        b:'4,6,2,4,6,2,0',
                        total_credits:'24',
                        credits:'4,6,2,4,6,2,0',

                        deleteresult:'课程删除失败'
                    });
                } 
                else {
                    // console.log('find ok!'+data2);
                    console.log('data[0]._id.toString() '+data[0]._id.toString());
                    
                    for(j=0;j<data.length;j++){
                    PersonModel.update(
                        {userid:data[j].teacher},
                        {
                            $pop:{
                                'cstlist':data[j]._id.toString()
                            }
                        },
                        function(err,data3){
                            if(err){
                                console.log('update err');

                            }
                        }
                    );
                    }

                    res.render('info/coursedelete',{
                        name: '程序员', 
                        image: 'images/avatars/avatar3.jpg',
                        total_a:'12',
                        a:'2,3,1,2,3,1,0',
                        total_b:'24',
                        b:'4,6,2,4,6,2,0',
                        total_credits:'24',
                        credits:'4,6,2,4,6,2,0',

                        deleteresult:'课程删除成功'
                    });
                }
            });
        }
    }); 
});

module.exports = router;