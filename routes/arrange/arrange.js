var express = require('express');
var arrange = express.Router();

var classroominsert = require('./classroominsert');
var classroomdelete = require('./classroomdelete');
var classroommodify = require('./classroommodify');
var classroomselect = require('./classroomselect');
//var courseinsert = require('./courseinsert');
//var courseselect = require('./courseselect');
//var coursedelete = require('./coursedelete');
//var coursemodify = require('./coursemodify');

var login =require('../info/login');
// var group = require('./group');

arrange.use('/',login);
arrange.use('/', classroominsert);
arrange.use('/', classroomdelete);
arrange.use('/', classroommodify);
arrange.use('/', classroomselect);
//arrange.use('/', courseinsert);
//arrange.use('/', courseselect);
//arrange.use('/', coursedelete);
//arrange.use('/', coursemodify);
// arrange.use('/',group);


module.exports = arrange;
