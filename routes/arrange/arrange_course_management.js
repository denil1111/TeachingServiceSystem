var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var PersonModel = require('../../db/group1db/PersonModel');
var CourseModel = require('../../db/group1db/CourseModel');
var ClassroomModel = require('../../db/group2db/ClassroomModel');
var CourseApplicationModel = require('../../db//group2db/CourseApplicationModel');

//var mongo = require('mongodb').MongoClient;
//var uri = "mongodb://segroup2:segroup2@ds041168.mongolab.com:41168/group2"


/*mongo.connect(uri.function(err,db))
 {
 if (err) {
 console.log("�����ݿ�ʧ����");
 return ;
 }
 }
 */
/*
var tmp = {
    courseid2	: "J523001",	//�γ�ID
    coursename  : "�������",	//�γ�����
    courseterm  : "2014�ﶬ",  //�γ�ѧ��
    coursetime	: "1,2,3",	//�Ͽ�ʱ�� ?!
    coursescore	: "4.5",	//�γ�ѧ��
    status      : "pending", //����״̬�� ���ڴ�����Ϊ on�� ���������Ϊoff
    teacher     : "MR.J",	//�ڿ���ʦ
    examtime	: "2014-7-10",	//����ʱ��
    room        : "��7-501",	//�Ͽν���
    campus      : "��ȪУ��",  //�Ͽ�У��
    college     : "�����ѧԺ",	//����ѧԺ
    time     :  Date.now	//����ʱ��

};*/
var tmp;
/*
 db.CourseApplication.save(
 {courseid2:'J523001',coursename:'�������', courseterm:'2014��' , coursetime:'��һ1,2', coursescore:'4.5', status:'pending', teacher:'MR.J',
 examtime:'2015-7-10', room:'��7-501',campus:'��ȪУ��',college:'�����ѧԺ',time:'2015-2-3'})
 */

router.get('/arrange_course_management', function(req, res,next) {
//    if(!req.session.user){return res.redirect('../info/login');}
    console.log("�¿�management");
    CourseApplicationModel.findbystatus('pending',function(error,data1){
        CourseApplicationModel.findbystatus('accept',function(error,data2){
            CourseApplicationModel.findbystatus('deny',function(error,data3){
                //console.log('pending:' + data1);
               // console.log('accept:' + data2);
               // console.log('deny:' + data3);
                res.render('arrange/arrange_course_management',{
                    name: '����Ա',
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
                   // insertresult:'���ύ��'
                });
            })
        })
    })
});

router.post('/arrange_course_management',function(req,res,next){
    console.log("post:arrange_course_management");
    console.log("WTF?!?!");


    console.log(req.body.type);
    console.log('{"_id":ObjectId("'+req.body.type.substring(1,100)+'")}');
    if (req.body.type[0]=='y')
    {
        console.log('accept')
        CourseApplicationModel.find({_id: req.body.type.substring(1,100)},function(err,dataa) {
            CourseApplicationModel.update({_id: req.body.type.substring(1, 100)}, {$set: {status: 'accept'}}, function (err, data) {
                if (err) console.log(err);
                else {
                    //   console.log(data);
                    //����ͬ���Ŀγ�����ֱ����Ϊdeny��
                    //����course
                    CourseModel.update({courseid2:dataa[0].courseid2},{$set:{coursetime: dataa[0].coursetime,campus:dataa[0].campus,room:dataa[0].room}},function(xxx,zzz){
                        if (xxx) console.log(xxx);
                            else console.log(zzz);
                    })
                    console.log("trying to update others!!!!!")
                    console.log(dataa);
                    console.log(dataa[0].courseid2);
                    CourseApplicationModel.update({
                            courseid2: dataa[0].courseid2,
                            status: 'pending'
                        }, {$set: {status: 'deny'}},{multi:true}, function (a, b) {
                            if (a) console.log(a);
                            else console.log(b);
                        }
                    );

                    /* //�����µģ�ɾ���ɵ�
                     dataa.status = "accept";
                     console.log(dataa.status);
                     console.log("start updating!!");
                     console.log(dataa);
                     var tmp   = dataa;
                     tmp.status='accept';

                     console.log(tmp);

                     CourseApplicationModel.remove({_id: req.body.type.substring(1,100)},function(err2,doc2){
                     if (err2) console.log(err2);
                     else console.log(doc2);
                     });
                     /*
                     CourseApplicationModel.create(dataa,function(err1,doc1){
                     if (err1) console.log(err1);
                     else console.log(doc1);
                     });


                     CourseApplicationModel.create(tmp,function(err1,doc1){
                     if (err1) console.log(err1);
                     else console.log(doc1);
                     });
                     */

                }
            });
        });
    }
        else
                {
                    console.log('deny');
                    CourseApplicationModel.update({_id: req.body.type.substring(1, 100)}, {$set: {status: 'deny'}}, function (err, data) {});
                }
    CourseApplicationModel.findbystatus('pending',function(error,data1){
        CourseApplicationModel.findbystatus('accept',function(error,data2){
            CourseApplicationModel.findbystatus('deny',function(error,data3){
                //console.log('pending:' + data1);
                // console.log('accept:' + data2);
                // console.log('deny:' + data3);
                res.render('arrange/arrange_course_management',{
                    name: '����Ա',
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
                    // insertresult:'���ύ��'
                });
            })
        })
    })
});

module.exports = router;

