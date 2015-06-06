var mongoose = require('mongoose');
// Schema 结构
var mongooseSchema = new mongoose.Schema({
    stem 	: {type : String},
    answer 	: {type : Number},
    choice 	: {type : [String]},
    type	: {type : Number},//0 选择题， 1 判断题

    point 	: {type : Number}
});

module.exports=mongooseSchema;