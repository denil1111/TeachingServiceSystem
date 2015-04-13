
var express = require('express');
var router = express.Router();
var mongo = require('../settings');
var dbb = new mongo();
var db = dbb.module();
var mongoose=require('mongoose')
var Schema = new mongoose.Schema({
       name: String,
       score:String
});

var gradesDB = db.model('grades',Schema);


router.get('/', function(req, res, next) {
  grades.find(function(error,docs){
    if(error){
        console.log(error);
        return;
    }
  
  
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

module.exports = router;
