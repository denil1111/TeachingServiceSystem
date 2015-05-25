var express = require('express');
var info = express.Router();

var personinsert = require('./personinsert');
var personselect = require('./personselect');
var persondelete = require('./persondelete');
var personmodify = require('./personmodify');
var personinfo = require('./personinfo');
var personpassword = require('./personpassword');
var courseinsert = require('./courseinsert');
var courseselect = require('./courseselect');
var coursedelete = require('./coursedelete');
var coursemodify = require('./coursemodify');

var login =require('./login');
// var group = require('./group');

info.use('/',login);
info.use('/', personinsert);
info.use('/', personselect);
info.use('/', persondelete);
info.use('/', personmodify);
info.use('/', personinfo);
info.use('/', personpassword);
info.use('/', courseinsert);
info.use('/', courseselect);
info.use('/', coursedelete);
info.use('/', coursemodify);
// info.use('/',group);


module.exports = info;
