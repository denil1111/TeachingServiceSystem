var mongoose = require('mongoose');
var person = require('../group1db/PersonModel');
var userSchema = new mongoose.Schema({
	name:{type:String},
	id:{type:String},
	points:{type:Number},
	selectedCourse:[{id:{type:String},points:{type:Number}}],
	confirmedCourse:[{id:{type:String}}],
	major:String
});

var userModel = mongoose.model('userModel',userSchema,'users');

person.schema.post('save', function(doc) {
   console.log("hook course");
   console.log(doc);
   userModel.create({
       id : doc._id,
       name: doc.username,
       points: 100,
       major:doc.major,
       selectedCourse:[],
       confirmedCourse:[]
   }); 
});

module.exports=userModel;