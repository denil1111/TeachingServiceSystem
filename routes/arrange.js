var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var Schema = new mongoose.Schema({
  Single_1_2_ID  : String, Single_1_2_Name  : String,
  Double_1_2_ID  : String, Double_1_2_Name  : String,
  Single_3_4_ID  : String, Single_3_4_Name  : String,
  Double_3_4_ID  : String, Double_3_4_Name  : String,
  Single_5_ID  	 : String, Single_5_Name    : String,
  Double_5_ID  	 : String, Double_5_Name    : String,
  Single_6_ID  	 : String, Single_6_Name    : String,
  Double_6_ID  	 : String, Double_6_Name    : String,
  Single_7_8_ID  : String, Single_7_8_Name  : String,
  Double_7_8_ID  : String, Double_7_8_Name  : String,
  Single_9_10_ID : String, Single_9_10_Name : String,
  Double_9_10_ID : String, Double_9_10_Name : String,
  Single_11_12_ID: String, Single_11_12_Name: String,
  Double_11_12_ID: String, Double_11_12_Name: String,
  Single_13_ID   : String, Single_13_Name   : String,
  Double_13_ID   : String, Double_13_Name   : String
});
/*       courseNumber: String,
       courseName:String,
       score:Number,
       credit:Number,
       gradePoint:Number, 
       secondScore:Number
});*/

router.get('/arrange', function(req, res, next) {

var gradesDB = global.db.model('classroom',Schema);
gradesDB.find(function(error,docs){
    if(error){
        console.log(error);
        return;
    }

  res.render('arrange', {
    name: '程序员', 
    image: 'images/avatars/avatar2.jpg',
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


router.get('/arrange_course_information',function(req, res, next) {

var gradesDB = global.db.model('classroom', Schema);
gradesDB.find(function(error, docs){
    if(error){
        console.log(error);
        return;
    }
  
  res.render('arrange_course_information', {
    name: '程序员', 
    image: 'images/avatars/avatar2.jpg',
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


router.get('/arrange_course_management',function(req, res, next) {

var gradesDB = global.db.model('classroom', Schema);
gradesDB.find(function(error, docs){
    if(error){
        console.log(error);
        return;
    }
  
  res.render('arrange_course_management', {
    name: '程序员', 
    image: 'images/avatars/avatar2.jpg',
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


router.get('/arrange_classroom_information',function(req, res, next) {

var gradesDB = global.db.model('classroom', Schema);
gradesDB.find(function(error, docs){
    if(error){
        console.log(error);
        return;
    }

//console.log(docs);

  res.render('arrange_classroom_information', {
    name: '程序员', 
    image: 'images/avatars/avatar2.jpg',
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


module.exports = router;
