var mongoose = require('mongoose');
// Schema 结构
var majorSchema = new mongoose.Schema({
	name:String,
	field:[String]
});

var majorModel = mongoose.model('majorModel',majorSchema,'major');
module.exports=majorModel;