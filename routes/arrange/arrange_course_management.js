var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var PersonModel = require('../../db/group1db/PersonModel');
var CourseModel = require('../../db/group1db/CourseModel');
var ClassroomModel = require('../../db/group2db/ClassroomModel');
var CourseApplicationModel = require('../../db//group2db/CourseApplicationModel');


var BSON = require('mongodb').BSONPure;




//var mongo = require('mongodb').MongoClient;
//var uri = "mongodb://segroup2:segroup2@ds041168.mongolab.com:41168/group2"


/*mongo.connect(uri.function(err,db))
 {
 if (err) {
 console.log("读数据库失败啦");
 return ;
 }
 }
 */
/*
var tmp = {
    courseid2	: "J523001",	//课程ID
    coursename  : "软件工程",	//课程名称
    courseterm  : "2014秋冬",  //课程学期
    coursetime	: "1,2,3",	//上课时间 ?!
    coursescore	: "4.5",	//课程学分
    status      : "pending", //申请状态； 尚在处理中为 on， 处理结束改为off
    teacher     : "MR.J",	//授课老师
    examtime	: "2014-7-10",	//考试时间
    room        : "教7-501",	//上课教室
    campus      : "玉泉校区",  //上课校区
    college     : "计算机学院",	//开课学院
    time     :  Date.now	//创建时间

};*/
var tmp;
/*
 db.CourseApplication.save(
 {courseid2:'J523001',coursename:'软件工程', courseterm:'2014秋' , coursetime:'周一1,2', coursescore:'4.5', status:'pending', teacher:'MR.J',
 examtime:'2015-7-10', room:'教7-501',campus:'玉泉校区',college:'计算机学院',time:'2015-2-3'})
 */

router.get('/arrange_course_management', function(req, res,next) {
//    if(!req.session.user){return res.redirect('../info/login');}
    console.log("新开management");
    CourseApplicationModel.findbystatus('pending',function(error,data1){
        CourseApplicationModel.findbystatus('accept',function(error,data2){
            CourseApplicationModel.findbystatus('deny',function(error,data3){
                //console.log('pending:' + data1);
               // console.log('accept:' + data2);
               // console.log('deny:' + data3);
                console.log('start!');
                res.render('arrange/arrange_course_management',{
                    name: '程序员',
                    image: 'images/avatars/avatar3.jpg',
                    total_a:'12',
                    a:'2,3,1,2,3,1,0',
                    total_b:'24',
                    b:'4,6,2,4,6,2,0',
                    total_credits:'24',
                    credits:'4,6,2,4,6,2,0',
                    pending: data1,
                    accepted: data2,
                    deny: data3
                   // insertresult:'请提交表单'
                });
            })
        })
    })
});

router.post('/arrange_course_management',function(req,res,next){
    console.log("post:arrange_course_management");
    console.log(req.body.type.substring(1,100));
    console.log('1');
    if (req.body.type[0]=='y')
    {
        console.log('2');
        console.log('accept')
        CourseApplicationModel.find({_id: req.body.type.substring(1,100)},function(err,dataa) {
            CourseApplicationModel.update({_id: req.body.type.substring(1, 100)}, {$set: {status: 'accept'}}, function (err, data) {
                if (err) console.log(err);
                else {
                    //   console.log(data);
                    //其他同样的课程申请直接判为deny！
                    //更改course
                    console.log('3');
                    console.log('same or not');
                    console.log(data._id);
                    CourseModel.update({courseid2:dataa[0].courseid2},{$set:{coursetime: dataa[0].coursetime,campus:dataa[0].campus,room:dataa[0].room}},function(xxx,zzz){
                        if (xxx) console.log(xxx);
                            else
                        {
                            console.log(zzz);
                            console.log("trying to update others!!!!!")
                            console.log(dataa);
                            console.log(dataa[0].courseid2);
                            CourseApplicationModel.update({
                                    courseid2: dataa[0].courseid2,
                                    status: 'pending'
                                }, {$set: {status: 'deny'}},{multi:true}, function (a, b) {
                                    if (a) console.log(a);
                                    else
                                    {
                                        console.log(b);
                                        CourseApplicationModel.findbystatus('pending',function(error,data11){
                                            CourseApplicationModel.findbystatus('accept',function(error,data22){
                                                CourseApplicationModel.findbystatus('deny',function(error,data33){
                                                    console.log('pending:' + data11.length);
                                                    console.log('accept:' + data22.length);
                                                    console.log('deny:' + data33.length);
                                                    console.log('5');
                                                    res.render('arrange/arrange_course_management',{
                                                        name: '程序员',
                                                        image: 'images/avatars/avatar3.jpg',
                                                        total_a:'12',
                                                        a:'2,3,1,2,3,1,0',
                                                        total_b:'24',
                                                        b:'4,6,2,4,6,2,0',
                                                        total_credits:'24',
                                                        credits:'4,6,2,4,6,2,0',
                                                        pending: data11,
                                                        accepted: data22,
                                                        deny: data33
                                                        // insertresult:'请提交表单'
                                                    });
                                                })
                                            })
                                        });
                                    }
                                }
                            );
                        }
                    })

                }
            });
        });
    }
        else
             if (req.body.type[0]=='n')
                {
                    console.log('deny');
                    CourseApplicationModel.update({_id: req.body.type.substring(1, 100)}, {$set: {status: 'deny'}}, function (err, data) {
                        CourseApplicationModel.findbystatus('pending',function(error,data11){
                            CourseApplicationModel.findbystatus('accept',function(error,data22){
                                CourseApplicationModel.findbystatus('deny',function(error,data33){
                                    console.log('pending:' + data11.length);
                                    console.log('accept:' + data22.length);
                                    console.log('deny:' + data33.length);
                                    console.log('5');
                                    res.render('arrange/arrange_course_management',{
                                        name: '程序员',
                                        image: 'images/avatars/avatar3.jpg',
                                        total_a:'12',
                                        a:'2,3,1,2,3,1,0',
                                        total_b:'24',
                                        b:'4,6,2,4,6,2,0',
                                        total_credits:'24',
                                        credits:'4,6,2,4,6,2,0',
                                        pending: data11,
                                        accepted: data22,
                                        deny: data33
                                        // insertresult:'请提交表单'
                                    });
                                })
                            })
                        });
                    });
                }
            else
             {
                 console.log('delete');
                 console.log(req.body.type);
                 //var obj_id = BSON.ObjectID.createFromHexString(req.body.type);
                 //console.log(obj_id);
                 CourseApplicationModel.remove({_id:req.body.type},function(txt1,txtb) {
                     if (txt1) {
                         console.log(txt1);
                         console.log('fail?');
                     } else {
                         console.log(txtb);
                         console.log('删除啦');
                         CourseApplicationModel.update({_id: req.body.type.substring(1, 100)}, {$set: {status: 'deny'}}, function (err, data) {
                             CourseApplicationModel.findbystatus('pending',function(error,data11){
                                 CourseApplicationModel.findbystatus('accept',function(error,data22){
                                     CourseApplicationModel.findbystatus('deny',function(error,data33){
                                         console.log('pending:' + data11.length);
                                         console.log('accept:' + data22.length);
                                         console.log('deny:' + data33.length);
                                         console.log('5');
                                         res.render('arrange/arrange_course_management',{
                                             name: '程序员',
                                             image: 'images/avatars/avatar3.jpg',
                                             total_a:'12',
                                             a:'2,3,1,2,3,1,0',
                                             total_b:'24',
                                             b:'4,6,2,4,6,2,0',
                                             total_credits:'24',
                                             credits:'4,6,2,4,6,2,0',
                                             pending: data11,
                                             accepted: data22,
                                             deny: data33
                                             // insertresult:'请提交表单'
                                         });
                                     })
                                 })
                             });
                         });
                     }
                 });
             }
/*
    console.log( req.body.type.substring(1,100));
    CourseApplicationModel.find({_id: req.body.type.substring(1,100)},function(errr,tmpdata) {
        console.log('just give a try');
        console.log('4');
        if (errr) console.log('fail');
            else console.log(tmpdata);
    });*/

});

module.exports = router;

