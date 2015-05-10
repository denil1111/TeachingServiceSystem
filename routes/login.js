var express = require('express');
var router = express.Router();
var mongoose = require('mongoose/');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//var session =require('express-session');

var db = mongoose.createConnection('mongodb://127.0.0.1:27017/person');
var PersonSchema = require('../db/group1db/PersonSchema');
var CollectionName = 'people';
var PersonModel = db.model('PersonModel',PersonSchema,CollectionName);

router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy(
    function(username,passport, done) {
      console.log('passport')
    PersonModel.findOne({
     'username': username
    }, function (err, user) {
     if (err) {
       return done(err);
     }
     if (!user) {
       return done(null, false);
     }
     // if (user.password != password) {
     //   return done(null, false);
     // }
     return done(null, user);
    });
}));



router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/info/personinsert',
    failureRedirect: '/info/login'
  })
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

router.get('/login',function(req,res){
  res.render('login');
});


module.exports = router;
