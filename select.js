var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');

var  mongodb = require('mongodb');
var  server  = new mongodb.Server('localhost', 27017, {auto_reconnect:true});
var  db = new mongodb.Db('mydb', server, {safe:true});

var session=require('express-session');


app.set('views',__dirname);
app.set('view engine','html');
app.engine('.html',require('ejs').__express);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*10  //过期时间设置(单位毫秒)
    }
}));

app.get('/select', function(req, res) {
    res.render('select');
});

app.post('/select',function(req, res){
	console.log("post:select");
	var tmp={userid:req.body.userid};
	console.log(tmp);

	db.open(function(err,db){
		if(!err){
			console.log("open db ok!");
			db.collection('mycoll',{safe:true},function(err,collection){
				if(err){
					console.log("open mycoll err!");
				}
				else{
					console.log("open collection ok!");
					collection.find({userid:tmp.userid},{safe:true},function(err,result){
						if(err){
							console.log("select err!");
							response.send(404);
						}
						else
						{
							console.log("select ok!");
							req.session.error="result";
							res.send(404);
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
