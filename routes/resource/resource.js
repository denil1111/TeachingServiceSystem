/**
 * Created by Gnnng on 4/10/15.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var debug = require('debug')('resource');
var fileTree = require("../../db/resource/pan")
var File = require("./basicfileop");
var Tree = require("./basictreeop");
var gfs = Grid(mongoose.connection.db, mongoose.mongo);
var fs = require('fs');


// TODO: wait to split those routes into separate files
router.get('/', function(req, res, next) {
  res.redirect('/resource/cloud');
  // res.render('courseInfo',{});
});

//TODO: simply find all files from gfs.files and display them
// router.get('/cloud', function(req, res, next) {
//   gfs.files.find({}).toArray(function (err, files) {
//     if (err)
//       return next(err);
//     res.render('myresource', { title: 'Cloud' , fileList: files.map(function (val) {
//       return {//FIXME: require ext and courseName
//         name: val.filename,
//         size: val.length + 'B',
//         ext: '',
//         courseName: '软工'
//       }
//     })});
//   });

// });
/*
  show cloud file 
  created by zyh
*/
router.get('/cloud', function(req, res, next) {
  req.session.user = {
    userid: "zyh"
  };
  var nowUserId = req.session.user.userid;
  console.log("ok");
  fileTree.findbyuser(nowUserId, function(err, result) {
    console.log("in findbyuser");
    if (err) {
      console.log("in err");
      console.log(err);
    } else {
      console.log("before render");
      req.session.treeD = result[0].tree;
      req.session.treeP = result[0].tree;
      console.log(req.session.treeP);
      res.render('myresource', {
        title: 'Cloud',
        fileTree: req.session.treeP
      });
    }
  });
});
/*
  new folder api
*/
// foldername path
router.post('/cloud/newfolder', function(req, res, next) {
  var nowUserId = req.session.user.userid;
  var ws={};
  ws.filename=req.body.folderName;
  ws.isFolder=1;
  console.log(req.body.path);
  Tree.newnode(req.body.path,ws,req.session.treeD,req.session.treeP,function(){
    console.log(req.session.treeP);
    var newdata = {
      uid : req.session.user.userid,
      tree : req.session.treeD
    }
    fileTree.update(nowUserId, newdata, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log(req.session.treeP);
        res.json({code:200,newTree: req.session.treeP});
      }
    });  
  });
  
});

/*
  new file api
*/

//par: datafile, path(xx.xx.xx)
router.post('/cloud/newfile', function(req, res, next) {
  req.busboy.on('field',function(a,b){
    req.body[a]=b;
    File.upload(req, function(ws) {
      console.log("upload suc");
      ws.isFolder = 0;
      Tree.newnode(req.body.path, ws, req.session.treeD, req.session.treeP, function(){
        var newdata = {
          uid : req.session.user.userid,
          tree : req.session.treeD
        }
        fileTree.update(req.session.user.userid, newdata, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log(req.session.treeP);
            res.json({code:200,newTree: req.session.treeP});
          }
        });  
      });
    });
  });
  req.pipe(req.busboy);
});
/*

  A temporary upload page for test purpose

*/
router.get('/cloud/upload', function(req, res, next) {
  var html = '<form action="/resource/cloud/upload"enctype="multipart/form-data" method="post"> ' +
    '<h1> Upload your file </h1> ' +
    'Please specify a file, or a set of files:<br> ' +
    '<input type="file" name="file" size="40" multiple="multiple">  ' +
    '<div> <input type="submit" > </div> </form>';
  res.send(html);
  res.end();
});
router.get('/cloud/upload2', function(req, res, next) {
 res.render("testup")
  res.end();
});
/*

  file upload api

 */
router.post('/cloud/upload', function(req, res, next) {
  File.upload(req,function (id) {
    console.log(id);
  });
  console.log(req);
//  req.busboy.on('file', function(fieldname, readStream, filename, encoding, mimetype) {
//    debug('a file is posted: ' + filename);
//    var ws = gfs.createWriteStream({
//      mode: 'w',
//      content_type: mimetype,
//      filename: filename,
//      metadata: {}
//    });
//    console.log(ws.id);
//    readStream.pipe(ws);
//  });

  //TODO: should not allow any other field to be post to the upload route
  req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
    debug('Field is ' + key + value);
  });

  req.busboy.on('finish', function() {
    res.redirect('/resource/cloud');
  });
//
//  req.pipe(req.busboy);
});

/*

  file download api

 */

router.get('/cloud/download/:filename', function(req, res, next) {
  var dlfileName = req.params['filename'];
  debug('a file will be download: ' + req.params['filename']);

  //FIXME: the search option may have more fields than the 'filename', because GridFS allow files with the same name.
  var opts = {
    filename: dlfileName
  };
  gfs.exist(opts, function(err, found) {
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

router.get('/cloud/iddownload/:fid', function(req, res, next) {
  File.infobyid(req.params.fid, function(err,fileinfo) {
    console.log(fileinfo);
    File.dowloadbyid(req.params.fid, fileinfo.filename, req, res, next);
  });
  
});

router.post('/cloud/deletenode', function(req, res, next) {
  Tree.delnode(req.body.url, req.body.name, req.session.treeD, req.session.treeP, function() {
    var newdata = {
      uid : req.session.user.userid,
      tree : req.session.treeD
    };
    fileTree.update(req.session.user.userid, newdata, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log(req.session.treeP);
        res.json({code:200,newTree: req.session.treeP});
      }
    });  
  });
});

router.get('/course', function(req, res, next) {
  res.render('index', {
    title: 'Course'
  });
});

router.get('/config', function(req, res, next) {
  res.render('index', {
    title: 'Config'
  });
});

// file tree post data
router.post('/tree_data', function(req, res, next) {

  var options = {
    root: '../public',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };
  console.log("haha");
  res.sendFile('tree_data.json', options, function(err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    } else {
      console.log('Sent:');
    }
  });
});
/* 

  These routes below are under test

*/
router.get('/myresource', function(req, res, next) {
  res.render('myresource', {});
});

router.get('/info', function(req, res, next) {
  res.render('courseInfo', {});
});

router.get('/feedback', function(req, res, next) {
  res.render('feedback', {});
});

router.get('/homework', function(req, res, next) {
  var homework = [];
  var db = mongoose.connection;
  var homeWorkSchema = require('./module/homeWorkModule');
  var homeworkModel = db.model('homework', homeWorkSchema);
  var idd = mongoose.Schema.Types.ObjectId;

  homework.push({
    homework: 'work5',
    ddl: Date.now(),
    describe: '1'
  });
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
  var id = '555837a11c3eb0cb470e8d5d';
  homeworkModel.find({
    _id: id
  }, function(error, result) {
    if (error) {
      console.log(error);
    } else {
      homework = result;
      console.log(result);
    }
    res.render('homework', {
      homeWorkList: homework
    });
  });
});

router.get('/homeworkupload/:homework', function(req, res, next) {
  res.render('homeworkupload', {});
});

router.get('/coursewares', function(req, res, next) {
  var course = 'course1';
  var coursewares = [];
  var db = mongoose.connection;
  var courseWareSchema = require('./module/courseWareModule');
  var courseWareModel = db.model('coursewares', courseWareSchema);
  //TODO req.course                                          
  courseWareModel.findbycourse(course, function(error, result) {
    if (error) {
      console.log(error);
    } else {
      var cws = result[0].courseware;
      var num = 0;
      cws.forEach(function(cw) {
        gfs.findOne({
          _id: cw.id
        }, function(error, file) {
          if (error) {
            console.log(error);
          } else {
            coursewares.push(file);
            num++;
            if (num >= cws.length) {
              console.log(coursewares);
              console.log('read file ok!');
              res.render('coursewares', {
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
  res.render('resource', {});
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