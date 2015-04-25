var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var Schema = new mongoose.Schema({
	Classroom_ID : String,	Classroom_Name: String,
	Single_1_Course_ID : String,	Single_1_Course_Name : String,
	Double_1_Course_ID : String,	Double_1_Course_Name : String,
	Single_2_Course_ID : String,	Single_2_Course_Name : String,
	Double_2_Course_ID : String,	Double_2_Course_Name : String,
	Single_3_Course_ID : String,	Single_3_Course_Name : String,
	Double_3_Course_ID : String,	Double_3_Course_Name : String,
	Single_4_Course_ID : String,	Single_4_Course_Name : String,
	Double_4_Course_ID : String,	Double_4_Course_Name : String,
	Single_5_Course_ID : String,	Single_5_Course_Name : String,
	Double_5_Course_ID : String,	Double_5_Course_Name : String,
	Single_6_Course_ID : String,	Single_6_Course_Name : String,
	Double_6_Course_ID : String,	Double_6_Course_Name : String,
	Single_7_Course_ID : String,	Single_7_Course_Name : String,
	Double_7_Course_ID : String,	Double_7_Course_Name : String
});

router.get('/classroom',function(req,res){

var gradesDB = global.db.model('classroom',Schema);
gradesDB.find(function(error,docs){
    if(error){
        console.log(error);
        return;
    }
  
  //console.log(docs[0]);
  
  res.render('classroom', {
  	name: '程序员', 
  	image: 'images/avatars/avatar1.jpg',
  	total_a:'12',
  	a:'2,3,1,2,3,1,0',
  	total_b:'24',
  	b:'4,6,2,4,6,2,0',
  	total_credits:'24',
  	credits:'4,6,2,4,6,2,0',
    data:docs
  });
});
});