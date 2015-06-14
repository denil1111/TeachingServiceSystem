var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var PersonModel = require('../../db/group1db/PersonModel');
var CourseModel = require('../../db/group1db/CourseModel');
var ClassroomModel = require('../../db/group2db/ClassroomModel');
var CourseApplicationModel = require('../../db//group2db/CourseApplicationModel');
//mongoose.connect('mongodb://localhost/hello-world');

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

};
/*
db.CourseApplication.save(
    {courseid2:'J523001',coursename:'软件工程', courseterm:'2014秋' , coursetime:'周一1,2', coursescore:'4.5', status:'pending', teacher:'MR.J',
examtime:'2015-7-10', room:'教7-501',campus:'玉泉校区',college:'计算机学院',time:'2015-2-3'})
*/

router.get('/CourseApplicationInsert', function(req, res,next) {
//    if(!req.session.user){return res.redirect('../info/login');}
    res.render('arrange/CourseApplicationInsert',{
        name: '程序员',
        image: 'images/avatars/avatar3.jpg',
        total_a:'12',
        a:'2,3,1,2,3,1,0',
        total_b:'24',
        b:'4,6,2,4,6,2,0',
        total_credits:'24',
        credits:'4,6,2,4,6,2,0',
        data : tmp,
        insertresult:'请提交表单'
    });
});

router.post('/CourseApplicationInsert',function(req,res,next){
    console.log("post:CourseApplicationInsert");
    var doc = {
        courseid2: req.body.courseid2,
        coursetime : req.body.time,
        room : req.body.room,
        campus : req.body.campus,
        time : req.body.time
    };

    console.log("doc length : "+doc.length);
    console.log("doc : "+doc);
    console.log("doc courseid2: "+doc.courseid2);
    CourseApplicationModel.create(doc,function(err,data){
        if(err){
            console.log("create err : "+err);
            res.render('arrange/CourseApplicationInsert',{
                name: '程序员',
                image: 'images/avatars/avatar3.jpg',
                total_a:'12',
                a:'2,3,1,2,3,1,0',
                total_b:'24',
                b:'4,6,2,4,6,2,0',
                total_credits:'24',
                credits:'4,6,2,4,6,2,0',
                data : doc,
                insertresult:'错误的申请信息！'
            });
        }
        else{  // if ID号不存在COURSE数据库里，返回错误信息！ 这有问题，读不出course里的东西
           // console.log(CourseModel.find().count({courserid:doc.courseid2}));
            console.log(req.body.courseid2);
            CourseModel.findbyid(req.body.classid2, function(error, dataa){
                console.log(dataa);
                console.log(dataa.length);
                if(dataa=='')
                {
                    console.log('The course not exit!');
                    res.render('arrange/CourseApplicationInsert',{
                        name: '程序员',
                        image: 'images/avatars/avatar3.jpg',
                        total_a:'12',
                        a:'2,3,1,2,3,1,0',
                        total_b:'24',
                        b:'4,6,2,4,6,2,0',
                        total_credits:'24',
                        credits:'4,6,2,4,6,2,0',
                        data : doc,
                        insertresult:'不存在的课程！'
                    });
                }
                else{
                     console.log('Saved by Model OK!');
                     console.log(data);
                     res.render('arrange/CourseApplicationInsert',{
                     name: '程序员',
                     image: 'images/avatars/avatar3.jpg',
                        total_a:'12',
                         a:'2,3,1,2,3,1,0',
                         total_b:'24',
                         b:'4,6,2,4,6,2,0',
                         total_credits:'24',
                         credits:'4,6,2,4,6,2,0',
                         data : doc,
                         insertresult:'表单提交成功！'
                     });
                 }
           })
        }

    });
//    db.close();
});

module.exports = router;

