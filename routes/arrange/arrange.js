var express = require('express');
var arrange = express.Router();

var classroominsert = require('./classroominsert');
var classroomdelete = require('./classroomdelete');
var classroommodify = require('./classroommodify');
var classroomselect = require('./classroomselect');
var classroomcourse = require('./classroomcourse');
//var teachercourse = require('./teachercourse');

var login =require('../info/login');
// var group = require('./group');

arrange.use('/',login);
arrange.use('/', classroominsert);
arrange.use('/', classroomdelete);
arrange.use('/', classroommodify);
arrange.use('/', classroomselect);
arrange.use('/', classroomcourse);
//arrange.use('/', teachercourse);
// arrange.use('/',group);


module.exports = arrange;
