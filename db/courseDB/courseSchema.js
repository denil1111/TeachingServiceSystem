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
	name_list = id.course_name.split(',');
	teacher_list = id.course_teacher.split(',');
	cond = [];
	all = [];
	all.push({id:id.course_number});
	nameall = [];
	for (var i=3; i>=1; i--)
	{
		nameall.push({name: new RegExp(name_list[i], 'i')});
	}
	console.log(nameall);
	if (id.name=="and")
		all.push({"$and":nameall});
	else 
		all.push({"$or":nameall});

	teacherall = [];
	for (var i=3; i>=1; i--)
	{
		teacherall.push({name: new RegExp(teacher_list[i], 'i')});
	}
	if (id.teacher=="and")
		all.push({"$and":teacherall});
	else
		all.push({"$or":teacherall});

	cond.push({"$and":all});

	console.log(cond);
    return this.model('course').find(cond[0], callback);
    //else
    	//return this.model('course').find({id:id.course_number, {'$or':[{name: new RegExp(list[0], 'i'), name: new RegExp(list[1], 'i')}]}}, callback);
}

mongooseSchema.statics.findByName = function (name, cb) {
  return this.model('course').find({ name: new RegExp(name, 'i') }, cb);
}

module.exports=mongooseSchema;