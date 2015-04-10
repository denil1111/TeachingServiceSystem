var mongoose = require('mongoose');
// Schema 结构
var mongooseSchema = new mongoose.Schema({
    stem 	: {type : String},
    answer 	: {type : Number},
    choice 	: {type : [String]}
});

module.exports=mongooseSchema;