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

/*
  file upload api return the _id
  creat by gaotao
*/
function fileupload(req,callback) {
  var id;
  req.busboy.on('file', function(fieldname, readStream, filename, encoding, mimetype){
    debug('a file is posted: ' + filename);
    var ws = gfs.createWriteStream({
      mode: 'w',
      content_type: mimetype,
      filename: filename,
      metadata: {}
    });
    id=ws.id;
    readStream.pipe(ws);
    callback(id);  
  });
};
// TODO: wait to split those routes into separate files
router.get('/', function(reqres, next) {
  res.redirect('/resource/cloud');
  // res.render('courseInfo',{});
});

//TODO: simply find all files from gfs.files and display them
router.get('/cloud', function(req, res, next) {
  gfs.files.find({}).toArray(function (err, files) {
    if (err)
      return next(err);
    res.render('myresource', { title: 'Cloud' , fileList: files.map(function (val) {
      return {//FIXME: require ext and courseName
        name: val.filename,
        size: val.length + 'B',
        ext: '',
        courseName: '软工'
      }
    })});
  });

});

/*

  A temporary upload page for test purpose

*/
router.get('/cloud/upload', function(req, res, next) {
  var html = '<form action="/resource/cloud/upload"enctype="multipart/form-data" method="post"> ' +
    '<h1> Upload your file </h1> ' +
    'Please specify a file, or a set of files:<br> ' +
    '<input type="file" name="datafile" size="40" multiple="multiple">  ' +
    '<div> <input type="submit" value="Send"> </div> </form>';
  res.send(html);
  res.end();
});

/*

  file upload api

 */
router.post('/cloud/upload', function(req, res, next) {
  /*uploadfile(req,function (id) {
    console.log(id);
  })*/
  req.busboy.on('file', function(fieldname, readStream, filename, encoding, mimetype){
    debug('a file is posted: ' + filename);
    var ws = gfs.createWriteStream({
      mode: 'w',
      content_type: mimetype,
      filename: filename,
      metadata: {}
    });
    console.log(ws.id);
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

  //FIXME: the search option may have more fields than the 'filename', because GridFS allow files with the same name.
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

// file tree post data
router.post('/tree_data',function(req,res,next){

  var options = {
    root: '../public',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };
  console.log("haha");
  res.sendFile('tree_data.json', options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:');
    }
  });
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
  var homework=[];
  var db = mongoose.connection;
  var homeWorkSchema = require('./module/homeWorkModule');
  var homeworkModel = db.model('homework', homeWorkSchema);
  var idd = mongoose.Schema.Types.ObjectId;
  
  homework.push({homework: 'work5', ddl: Date.now(),describe:'1'});
 // homework.push({homework: 'work2',ddl: Date.now(),describe:'2'});
 // homework.push({homework: 'work3',ddl: Date.now(),describe:'3'});
  var homeworkEntity = new homeworkModel(homework);
	        //console.log(homeworkEntity.id);                          
 /* homeworkEntity.save(function(error) {
    	if(error) {
	        console.log(error);
	    } else {
	        console.log('saved OK!');
	    }
  });*/
/*
  homeworkModel.create(homework,function (error) {
    	if(error) {
	        console.log(error);
	    } else {
	        console.log(homework.id);                        
	        console.log('save ok');
	    }
  });
  */
	// 增加记录 基于model操作
  var id='555837a11c3eb0cb470e8d5d';
	homeworkModel.find({_id:id}, function(error,result){
	  if(error) {
      console.log(error);
	  } else {
      homework=result;
	    console.log(result);            
	  }
    res.render('homework',{
      homeWorkList: homework
    });
	});
});

router.get('/homeworkupload/:homework',function(req, res, next){
  res.render('homeworkupload',{});
});

router.get('/coursewares',function(req, res, next){
  var course = 'course1';
  var coursewares = [];
  var db = mongoose.connection;
  var courseWareSchema = require('./module/courseWareModule');
  var courseWareModel = db.model('coursewares', courseWareSchema);
  //TODO req.course                                          
  courseWareModel.findbycourse(course,function (error,result) {
    if (error){
      console.log(error);
    } else {
      var cws = result[0].courseware;
      var num=0;
      cws.forEach(function (cw) {
        gfs.findOne({_id:cw.id},function (error,file) {
          if (error){
            console.log(error);        
          } else {
            coursewares.push(file);
            num++;
            if (num >= cws.length) {
              console.log(coursewares);
              console.log('read file ok!');
              res.render('coursewares',{
                coursewares: coursewares
              });
            }
          }
        });
      });
    }
  });
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
