// created by gaotao
var mongoose = require('mongoose');
// Schema 结构
var mongooseSchema = new mongoose.Schema({
    course   : {type : String},
    homework : [],
});
module.exports=mongooseSchema;