
var express = require('express');
var router = express.Router();
var mongoose=require('mongoose')
var Schema = new mongoose.Schema({
       courseNumber: String,
       courseName:String,
       score:Number,
       credit:Number,
       gradePoint:Number,
       secondScore:Number
});



router.get('/grades', function(req, res, next) {

var gradesDB = global.db.model('grades',Schema);
gradesDB.find(function(error,docs){
    if(error){
        console.log(error);
        return;
    }
  
  //console.log(docs[0]);
  
  res.render('grades', {
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

router.get('/grades_analysis',function(req, res, next) {

var gradesDB = global.db.model('grades',Schema);
gradesDB.find(function(error,docs){
    if(error){
        console.log(error);
        return;
    }
  
  res.render('grades_analysis', {
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





module.exports = router;
