var mongoose = require('mongoose');

var tutorialSchema = new mongoose.Schema({
    courseid  : String,
    type      : Number,  
    year	  : String

});

var tutorialModel = mongoose.model('tutorials',tutorialSchema);
module.exports=tutorialModel;