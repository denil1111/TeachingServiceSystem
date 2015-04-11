var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
//var bodyParser = require('body-parser');
//var multer = require('multer');

//var  mongodb = require('mongodb');
//var  server  = new mongodb.Server('localhost', 27017, {auto_reconnect:true});
//var  db = new mongodb.Db('mydb', server, {safe:true});

//app.set('views',__dirname);
//app.set('view engine','html');
//app.engine('.html',require('ejs').__express);

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(multer());

app.use('/',course);

router.get('/insert', function(req, res) {
    res.render('insert',{
        username,
        status:'学生',
        age,
        college,
        tel,
        email
    });
});

app.post('/insert',function(req,res){
    console.log("post");
    var db = mongoose.createConnection('mongodb://127.0.0.1:27017/mydb');
    var personSchema = require('../db/group1db/newSchema');
    var personModel = db.model('person',personSchema);
    var personEntity = new personModel({
        username : req.body.username,
        status : req.body.status,
        age : req.body.age,
        college : req.body.college,
        tel : req.body.tel,
        email : req.body.email
    });
    
    personModel.insertByModel('');
});

var server =app.listen(3000,function(){
    console.log('Listening on port %d',server.address().port);
});

