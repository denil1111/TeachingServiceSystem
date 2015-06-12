var express = require('express');
var router = express.Router();
var mongoose = require('mongoose/');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var PersonModel = require('../../db/group1db/PersonModel');

router.get('/login',function(req,res,next){
  res.render('info/login',{
    loginerror:""
  });
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
