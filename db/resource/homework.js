// created by gaotao
var mongoose = require('mongoose');
// Schema 结构
var upfileSchema = new mongoose.Schema({
    stid        : {type : String},
    filename    : {type : String},
    contentType : {type : String},
    id          : {type : String}
});

var homeworkSchema = new mongoose.Schema({
    homework : {type : String},
    uploadfile : [upfileSchema]
});

var mongooseSchema = new mongoose.Schema({
    courseid : {type : String},
    homeworklist : [homeworkSchema] //{homework:"hw1",uploadfile:[{stid:"std1",fileinfo:"fid"}]}
});
var collectionname = 'homework';

mongooseSchema.statics.insertdemo = function (callback) {
    var homework1 = {
        homework : 'hw1',
        uploadfile : []
    }
    var homework2 = {
        homework : 'hw2',
        uploadfile : []
    }
    var course = {
        courseid : 'g1',
        homeworklist : [homework1,homework2]
    }
    return this.model('homeworkModel').create(course,callback);
}

mongooseSchema.statics.findbycourseid = function(courseid, callback) {
    return this.model('homeworkModel').find({courseid: courseid}, callback);
};
mongooseSchema.statics.updatehw = function(cid, homework, callback) {
    console.log('update');
    var conditions = {courseid: cid};
	var update     = {$set : {homeworklist: homework}};
	var options    = {upsert : true};
    return this.model('homeworkModel').update(conditions,update,options,callback);
};
var mongooseModel = mongoose.model('homeworkModel',mongooseSchema,collectionname);
module.exports=mongooseModel;