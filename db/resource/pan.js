var mongoose = require('mongoose');
// Schema 结构
var mongooseSchema = new mongoose.Schema({
    uid : {type : String},
    tree : {type : mongoose.Schema.Types.Mixed}
/*    tree:
        {
            text : string means file name
            isFolder: 1/0
            fid: file ID
        }
*/
});
mongooseSchema.statics.findbyuser = function(uid, callback) {
    return this.model('tree').find({uid: uid}, callback);
};
mongooseSchema.statics.updatetree = function(uid, newtree, callback) {
    var conditions = {uid: uid};
	var update     = {$set : {tree: newtree}};
	var options    = {upsert : true};
    return this.model('tree').updatate(conditions,update,options,callback);
};
var mongooseModel = mongoose.model('tree', mongooseSchema);
module.exports=mongooseModel;