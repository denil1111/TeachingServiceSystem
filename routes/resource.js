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
  req.busboy.on('file', function(fieldname, readStream, filename, encoding, mimetype){
    debug('a file is posted: ' + filename);
    var ws = gfs.createWriteStream({
      mode: 'w',
      content_type: mimetype,
      filename: filename,
      metadata: {}
    });
    readStream.pipe(ws);
  });

  //TODO: should not allow any other field to be post to the upload route
  req.busboy.on('field', function(key, value, keyTruncated, valueTruncated){
    debug('Field is ' + key + value);
  });

  req.busboy.on('finish', function(){
    res.redirect('/resource/cloud');
  });

  req.pipe(req.busboy);
});

/*

  file download api

 */

router.get('/cloud/download/:filename', function(req, res, next) {
  var dlfileName = req.params['filename'];
  debug('a file will be download: ' +  req.params['filename']);

  //TODO: the search option may have more fields than 'filename' only, because GridFS allow files with the same name.
  var opts = {
    filename: dlfileName
  };
  gfs.exist(opts, function (err, found) {
    if (err)
      return next(err);
    if (found) {
      var rs = gfs.createReadStream(opts);

      res.setHeader('Content-disposition', 'attachment; filename=' + dlfileName);
      res.setHeader('Content-type', 'text/plain');
      rs.pipe(res);
    } else {
      next(new Error('File ' + dlfileName + ' not found'));
    }
  });
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
