var express = require('express');
var info = express.Router();

var personinsert = require('./personinsert');
var personselect = require('./personselect');
var courseinsert = require('./courseinsert');
var courseselect = require('./courseselect');
var login =require('./login');
var group = require('./group');

info.use('/',login);
// info.all('/',isLoggedIn);
info.use('/', personinsert);
info.use('/', personselect);
info.use('/', courseinsert);
info.use('/', courseselect);
info.use('/',group);

// function isLoggedIn(req,res,next){
// 	if(req.isAuthenticated())
// 		return next();
// 	res.redirect('/info/login');
// }

module.exports = info;
