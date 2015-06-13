var PersonModel = require('./db/group1db/PersonModel');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
  passport.use('local', new LocalStrategy(
    function(userid,password, done) {
      console.log('passport');
      PersonModel.findbyid(userid, function (err, user) {
       if (err) {
         return done(err);
       }
       if (!user || user == '') {
        console.log('user empty!');
         return done(null, false);
       }
       console.log("user.password : "+user[0].password);
       console.log("password : "+password);
       if (user[0].password != password) {
         return done(null, false);
       }
       console.log('suc');
       return done(null, user[0]);
      });
  }));
  // Passport needs to be able to serialize and deserialize users to support persistent login sessions
  	passport.serializeUser(function(user, done) {
      console.log("in ser");
      done(null, user);
    });

// <<<<<<< HEAD
//     passport.deserializeUser(function(userid, done) {
//       console.log("in de",userid);
//       PersonModel.findbyid(userid, function (err, user) {
        
//         // console.log(user[0]);
//         done(null, user[0]);
//       });
// =======
    passport.deserializeUser(function(user, done) {
      done(null, user);
// >>>>>>> master
    });
};