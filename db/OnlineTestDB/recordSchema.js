var mongoose = require('mongoose');
// Schema 结构
var mongooseSchema = new mongoose.Schema({
    student	: {type : String},
    paperId	: {type : String},
    choices : {type : [String]},
    point 	: {type : Number},
    time 	: {type : String}
});

module.exports=mongooseSchema;