var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var CourseModel = require('../../db/group1db/CourseModel');
var tmp=[];
// tmp.push({couresname:'initial_name',teacher:'initial_teacher',exametime:'initial_exametime',room:'initial_room',college:'initial_college'});
var fs = require('fs');
var PersonModel = require('../../db/group1db/PersonModel');

router.get('/', function(req, res, next) {

    // fs.readFile('public/person.txt','utf-8',function(err,data){
    //   if(err) console.log(err);
    //   else{
    //     var data2 = data.split('\n');
    //     for(i=0;i<data2.length;i++){
    //       var data3 = data2[i].split(',');
    //       var doc={
    //           userid  : data3[0],
    //           username : data3[1],
    //           password : data3[2],
    //           status : data3[3],
    //           sex : data3[4],
    //           age : data3[5],
    //           major : data3[6],
    //           college : data3[7],
    //           title : data3[8],
    //           tel : data3[9],
    //           email : data3[10],
    //       }
    //       PersonModel.create(doc,function(err,data4){
    //         if(err){
    //             console.log(err);

    //         }
    //         else{
    //             console.log("create ok"+data4.userid);
    //         }
    //       });
    //     }
    //   }
    // });


    // fs.readFile('public/course.txt','utf-8',function(err,data){
    //   if(err) console.log(err);
    //   else{
    //     var data2 = data.split('\n');

    //     for(i=0;i<data2.length;i++){
    //       var data3 = data2[i].split(',');
    //       var doc={
    //           courseid2  : data3[0],
    //           coursename : data3[1],
    //           courseterm : data3[2],
    //           coursescore : data3[3],
    //           year : data3[4],
    //           all : data3[5],
    //           remain : data3[6],
    //           waiting : data3[7],
    //           campus : data3[8],
    //           college : data3[9],
    //           teacher : data3[10],
    //           examtime : data3[11],
    //           courseid : "123"
    //       }
    //       CourseModel.create(doc,function(err,data4){
    //         if(err){
    //             console.log(err);

    //         }
    //         else{
    //             console.log("create ok"+data4.courseid2);
    //             CourseModel.update(
    //                 {'_id' : data4._id},
    //                 { $set:{ 'courseid' : data4._id.toString() } },
    //                 function(err,data5){
    //                     if(err)
    //                         console.log('update courseid err');
    //                 }
    //             );

    //             PersonModel.update(
    //               {userid:data4.teacher},
    //                 { $push:{ 'cstlist':data4._id.toString() } },
    //                 function(err,data5){
    //                     if(err)
    //                         console.log('update cstlist err');
    //                 }
    //             );
    //         }
    //       });
    //     }
    //   }
    // });


    res.render('info/courseselect',{
    	name: '程序员', 
		image: 'images/avatars/avatar3.jpg',
		total_a:'12',
		a:'2,3,1,2,3,1,0',
		total_b:'24',
		b:'4,6,2,4,6,2,0',
		total_credits:'24',
		credits:'4,6,2,4,6,2,0',

    	data:tmp,
    	selectresult:''
    });
});

router.post('/',function(req, res, next){
	console.log("post:courseselect");

	CourseModel.findbyid(req.body.courseid2, function(error, data){
		if(error) {
			console.log('find error!'+error);
		} else {
			console.log('find ok!'+data);
		}
		for(i=0;i<data.length;i++)
			console.log('data id : '+data[i].courseid);
		if(!data | data ==''){
			res.render('info/courseselect',{
				data: tmp,
				selectresult:'课程不存在'
			});
		}
		else{
			res.render('info/courseselect',{
				data: data,
				selectresult:''
			});
		}
	});
});

module.exports = router;

