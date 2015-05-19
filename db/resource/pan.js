var mongoose = require('mongoose');
// Schema 结构
var mongooseSchema = new mongoose.Schema({
    uid : {type : String},
    tree : {type : mongoose.Schema.Types.Mixed}
});
mongooseSchema.statics.findbyuser = function(uid, callback) {
    return this.model('tree').find({uid: uid}, callback);
}

var mongooseModel = mongoose.model('tree', mongooseSchema);
module.exports=mongooseModel;