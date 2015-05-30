var express = require('express');
var router = express.Router();
var mongoose = require('mongoose/');
var PersonModel = require('../../db/group1db/PersonModel');
var CourseModel = require('../../db/gourp1db/CourseModel');
var ClassroomModel = require('../../db/group2db/ClassroomModel');

router.get('/classroomcourse',function(req,res,next){
	if(!res.session.user){return res.redirect('../info/login');}
	var localuser=req.session.user[0];
	ClassroomModel.findall(function(err,classroom_total_info){
		classroom = classroom_total_info;
		res.render('arrange/classroomcourse',{
        name: '程序员', 
        image: 'images/avatars/avatar3.jpg',
        total_a:'12',
        a:'2,3,1,2,3,1,0',
        total_b:'24',
        b:'4,6,2,4,6,2,0',
        total_credits:'24',
        credits:'4,6,2,4,6,2,0',

        classroom_data: classroom,
        classroom_arrange:'',
    	});
	});
});

router.post('/classroomcourse',function(req,res,next){
	console.log("post:classroomcourse");
	CourseModel.findbyclassroom(req.body.campus,req.body.classroom,function(error,data){
		if(error){
			console.log('find error!' + error);
		}
		else{
			console.log('find succeed!' + error);
		}

		ClassroomModel.findall(function(err,classroom_total_info){
			var classroom = classroom_total_info;
    	});

		var classroomcourse_info = new Array(2);	//classroomcourse_info[0]\[1] means single week or double week
		//classroomcourse_info[0][0] the second index means the day
		//classroomcourse_info[0][0][0] the third index means the time
		//the times is {1,2,3},{4,5},{6,7,8},{7,8},{9,10},{11,12,13},{11,12}


		for(var i=0;i<classroomcourse_info.length;i++)
			classroomcourse_info[i]=new Array(7);
		for(i=0;i<classroomcourse_info[0].length;i++)
			classroomcourse_info[0][i]=new Array(7);
		for(i=0;i<classroomcourse_info[1].length;i++)
			classroomcourse_info[1][i]=new Array(7);

		data.each(function(err,doc){
			assert.equal(err,null);
			var temps=doc.coursetime;
			var times=temps.split(";");
			times.each(function(i,item){
				var index3;
				var index2;
				if(item[0]=="O"){
					index2=item[1];
					if(item[4]!="1"){
						if(item[3]=="1"){
							index3=0;
						}
						else if(item[3]=="4"){
							index3=1;
						}
						else if(item[3]=="6"){
							index3=2;
						}
						else if(item[3]=="7"){
							index3=3;
						}
						else{
							index3=4;
						}
					}
					else{
						if(item[10]=="3"){			//Ox-11,12,13
							index3=5;
						}	
						else{
							index3=6;
						}
					}
					classroomcourse_info[0][index2][index3]=doc.coursename+doc.room;
				}
				else if(item[0]=="E"){
					index2=item[1];
					if(item[4]!="1"){
						if(item[3]=="1"){
							index3=0;
						}
						else if(item[3]=="4"){
							index3=1;
						}
						else if(item[3]=="6"){
							index3=2;
						}
						else if(item[3]=="7"){
							index3=3;
						}
						else{
							index3=4;
						}
					}
					else{
						if(item[10]=="3"){			//Ox-11,12,13
							index3=5;
						}	
						else{
							index3=6;
						}
					}
					classroomcourse_info[1][index2][index3]=doc.coursename+doc.room;
				}
				else{
					index2=item[0];
					if(item[3]!="1"){
						if(item[2]=="1"){
							index3=0;
						}
						else if(item[2]=="4"){
							index3=1;
						}
						else if(item[2]=="6"){
							index3=2;
						}
						else if(item[2]=="7"){
							index3=3;
						}
						else{
							index3=4;
						}
					}
					else{
						if(item[9]=="3"){			//Ox-11,12,13
							index3=5;
						}	
						else{
							index3=6;
						}
					}
					classroomcourse_info[1][index2][index3]=doc.coursename+doc.room;
					classroomcourse_info[0][index2][index3]=doc.coursename+doc.room;
				}
			});
			res.render('arrange/classroomcourse',{
        	name: '程序员', 
        	image: 'images/avatars/avatar3.jpg',
       		total_a:'12',
      		a:'2,3,1,2,3,1,0',
        	total_b:'24',
       		b:'4,6,2,4,6,2,0',
        	total_credits:'24',
        	credits:'4,6,2,4,6,2,0',

        	classroom_data: classroom,
        	classroom_arrange: classroomcourse_info,
			});
		});
	});
});

module.exports = router;
