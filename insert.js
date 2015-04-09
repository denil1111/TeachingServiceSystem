var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');

var  mongodb = require('mongodb');
var  server  = new mongodb.Server('localhost', 27017, {auto_reconnect:true});
var  db = new mongodb.Db('mydb', server, {safe:true});

app.set('views',__dirname);
app.set('view engine','html');
app.engine('.html',require('ejs').__express);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.get('/insert', function(req, res) {
    res.render('insert');
});

app.post('/insert',function(req,res){
    console.log("post");
    var tmp = {userid: req.body.userid, password: req.body.password};
    console.log(tmp);
    
    var tmp = {userid:req.body.userid,username:req.body.username,userdegree:req.body.userdegree,
    	usercolledge:req.body.usercolledge,usertel:req.body.usertel,useremial:req.body.useremial};
    db.open(function(err,db){
        if(!err){
            console.log("open db ok!");
            db.collection('mycoll',{safe:true},function(err,collection){
                if(err){
                    console.log("open mycoll err!");
                }
                else{
                    console.log("open collection ok!");
                    collection.insert([tmp],{safe:true},function(err,result){
                    	if(err){
                    		console.log("insert err!");
                    	}
                    	else{
                    		console.log("insert ok!");
                    		console.log(result);
                    	}
                    });
                }
            });
        }
        else{
            console.log("open db err");
        }
    });
});

var server =app.listen(3000,function(){
    console.log('Listening on port %d',server.address().port);
});

