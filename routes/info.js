var express = require('express');
var info = express.Router();

var personinsert = require('./personinsert');
var personselect = require('./personselect');
var courseinsert = require('./courseinsert');
var courseselect = require('./courseselect');
var login =require('./login');

info.use('/', personinsert);
info.use('/', personselect);
info.use('/', courseinsert);
info.use('/', courseselect);
info.use('/',login);

module.exports = info;
