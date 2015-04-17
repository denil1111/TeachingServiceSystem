/**
 * Created by Gnnng on 4/10/15.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var debug = require('debug')('resource');

var gfs = Grid(mongoose.connection.db, mongoose.mongo);
var fs = require('fs');

// TODO: wait to split those routes into separate files
router.get('/', function(req, res, next) {
  res.redirect('/resource/cloud');
  // res.render('courseInfo',{});
});

router.get('/cloud', function(req, res, next) {
  res.render('myresource', { title: 'Cloud' });
});
/*

  A temporary upload page for test purpose

*/
router.get('/cloud/upload', function(req, res, next) {
  var html = '<form action="/resource/cloud/upload"enctype="multipart/form-data" method="post"> ' +
    '<h1> Upload your file </h1> ' +
    'Please specify a file, or a set of files:<br> ' +
    '<input type="file" name="datafile" size="40">  ' +
    '<div> <input type="submit" value="Send"> </div> </form>';
  res.send(html);
  res.end();
});

/*

  file upload api

*/
router.post('/cloud/upload', function(req, res, next) {
  debug('enter upload');
  req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype){
    var ws = gfs.createWriteStream({
      mode: 'w',
      content_type: mimetype,
      filename: filename,
      metadata: {}
    });
    debug(fieldname);

    file.pipe(ws);
  });

  req.busboy.on('field', function(key, value, keyTruncated, valueTruncated){
    debug(key);
  });

  req.busboy.on('finish', function(){
    res.redirect('/resource/cloud');
  })

  req.pipe(req.busboy);
});

router.get('/course', function(req, res, next) {
  res.render('index', { title: 'Course' });
});

router.get('/config', function(req, res, next) {
  res.render('index', { title: 'Config' });
});

/* 

  These routes below are under test

*/
router.get('/myresource', function(req, res, next) {
  res.render('myresource',{});
});

router.get('/info', function(req, res, next) {
  res.render('courseInfo',{});
});

router.get('/feedback', function(req, res, next) {
  res.render('feedback',{});
});

router.get('/homework', function(req, res, next) {
  res.render('homework',{});
});

router.get('/resource', function(req, res, next) {
  res.render('resource',{});
});

router.get('/search', function(req, res, next) {
  res.render('search', {});
});

router.get('/admin_changeinfo', function(req, res, next) {
  res.render('admin_changeInfo', {});
});

router.get('/admin_feedback', function(req, res, next) {
  res.render('admin_feedback', {});
});

router.get('/admin_homework', function(req, res, next) {
  res.render('admin_homework', {});
});

router.get('/admin_resource', function(req, res, next) {
  res.render('admin_resource', {});
});



module.exports = router;
