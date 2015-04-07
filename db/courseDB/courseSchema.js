var mongoose = require('mongoose');
// Schema 结构
var mongooseSchema = new mongoose.Schema({
	name:{type:String},
	id:{type:String},
	teacher:{type:String},
	complete:{type:Boolean},
	semaster:{type:String},
	time:{type:String},
	campus:{type:String},
	room:{type:String}
});
mongooseSchema.statics.findbyid = function(id, callback) {
    return this.model('course').find({id:id}, callback);
}

module.exports=mongooseSchema;