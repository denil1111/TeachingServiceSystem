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

function filedowloadbyname(fileName,res,next,callback) {
  var opts = {
    filename: fileName
  };
  gfs.exist(opts, function(err, found) {
    if (err)
      return next(err);
    if (found) {
      var rs = gfs.createReadStream(opts);
      console.log(rs);      
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'text/plain');
      rs.pipe(res);
    } else {
      next(new Error('File ' + fileName + ' not found'));
    }
  });
};

function filedowloadbyid(fileid,filename,res,next,callback) {
  var opts = {
    _id: fileid
  };
  gfs.exist(opts, function(err, found) {
    if (err)
      return next(err);
    if (found) {
      var rs = gfs.createReadStream(opts);
      console.log(rs);      
      res.setHeader('Content-disposition', 'attachment; filename=' + filename);
      res.setHeader('Content-type', 'text/plain');
      rs.pipe(res);
    } else {
      next(new Error('File id:' + fileid + ' not found'));
    }
  });
}; 

var FILE = {};
FILE.upload = fileupload;
FILE.dowloadbyname = filedowloadbyname;
FILE.dowloadbyid = filedowloadbyid;
module.exports = FILE;