var express = require('express');
var router = express.Router();
var mongoose = require('mongoose/');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var app = express();

var PersonModel = require('../../db/group1db/PersonModel');

router.get('/login',function(req,res,next){
  console.log("login get");
  console.log("app.get('env')"+app.get('env'));
  if (app.get('env') == 'development'){
    console.log("development module");

    passport.authenticate('local',function(err,user2,info){
      //use your own admin account here
      var user={
        userid:'312',    
        password:'wtf'
      };
      // var user;
      // PersonModel.findbyid(localuser.userid,function (err, user) {
      //   if(err){console.log("development router login findbyid error!")}
      //   else if(!user | user == ''){console.log("development router login findbyid find NULL!")}
      //   else {user = user[0];console.log("user : "+user);}
      // }); 

      if(err){return(err);}
      
      else if(user=="" | !user){
        console.log("user : NULL");
        res.render('info/login',{
          loginerror:"学号/密码错误"
        });
      }
      else{
        req.logIn(user, function(err){
          console.log(user);
          req.session.user=user;
          console.log(req.isAuthenticated());
          if(user.status == "系统管理员"){
            res.redirect('/info/personinsert');
          }
          else{
            res.redirect('/info/personinfo');
          }
        })
      }
    })(req,res,next);
  } else {
    res.render('info/login',{
      loginerror:""
    });
  }

});

router.post('/login',function(req, res, next){
  passport.authenticate('local',function(err,user,info){
    if(err){return(err);}
    if(user=="" | !user){
      console.log("user : NULL");
      res.render('info/login',{
        loginerror:"学号/密码错误"
      });
    }
    else{
      req.logIn(user, function(err){
        console.log(user);
        req.session.user=user;
        console.log(req.isAuthenticated());
        if(user.status == "系统管理员"){
          res.redirect('/info/personinsert');
        }
        else{
          res.redirect('/info/personinfo');
        }
      }) 
    }
  })(req,res,next);
});

module.exports = router;
