var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mongoose = require('mongoose/');

var db = mongoose.createConnection('mongodb://127.0.0.1:27017/person');
var PersonSchema = require('../db/group1db/PersonSchema');
var CollectionName = 'people';
var PersonModel = db.model('PersonModel',PersonSchema,CollectionName);

router.get('/login',function(req,res){
  res.render('login');
});

router.use(passport.initialize());
router.use(passport.session());

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


passport.use(new LocalStrategy(function(username, password, done) {
  process.nextTick(function() {
    PersonModel.findOne({
      'username': username, 
    }, function(err, user) {
      if (err) {
        console.log('findOne err');
        return done(err);
      }

      if (!user) {
        console.log('Not find');
        return done(null, false);
      }

      // if (user.password != password) {
      //   return done(null, false);
      // }
      console.log("user : "+user);
      return done(null, user);
    });
  });
}));

module.exports = router;




// mongoose.connect('mongodb://localhost/MyData base');

// var Schema = mongoose.Schema;
// var UserDetail = new Schema({
//       username: String,
//       password: String
//     }, {
//       collection: 'userInfo'
//     });
// var UserDetails = mongoose.model('userInfo', UserDetail);

// router.get('/loginFailure', function(req, res, next) {
//   // res.send('Failed to authenticate');
//   res.render('personinsert');
// });

// router.get('/loginSuccess', function(req, res, next) {
//   // res.send('Successfully authenticated');
//   res.render('info/login');
// });




// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function(err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));

// router.post('/login',
//   passport.authenticate('local', { successRedirect: '/',
//    failureRedirect: '/login',
//    failureFlash: true })
// );


