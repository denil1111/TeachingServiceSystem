var mongoose = require('mongoose');
// Schema 结构
var mongooseSchema = new mongoose.Schema({
    id 		: {type : Number},
    stem 	: {type : String},
    answer 	: {type : String}
});

module.exports=mongooseSchema;