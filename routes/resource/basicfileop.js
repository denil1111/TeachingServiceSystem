/*
  file upload api return the ws
  creat by gaotao
*/
var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var gfs = Grid(mongoose.connection.db, mongoose.mongo);
var debug = require('debug')('resource');

function fileupload(req, callback) {
  req.busboy.on('file', function(fieldname, readStream, filename, encoding, mimetype) {
    debug('a file is posted: ' + filename);
    var ws = gfs.createWriteStream({
      mode: 'w',
      content_type: mimetype,
      filename: filename,
      metadata: {}
    });
    readStream.pipe(ws);
    callback(ws);
  });
};

var FILE = {};
FILE.upload = fileupload;
module.exports = FILE;