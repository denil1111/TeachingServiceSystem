var express = require('express');
var router = express.Router();
var mongoose = require('mongoose/');

var PersonModel = require('../db/group1db/PersonModel');

router.get('/personinfo', function(req, res, next) {
    if(!req.session.user){return res.redirect('login');}
    var localuser=req.session.user[0];
    PersonModel.findbyname(localuser.username,function (err, user) {
        localuser = user[0];
        res.render('personinfo',{
            name: '程序员', 
            image: 'images/avatars/avatar3.jpg',
            total_a:'12',
            a:'2,3,1,2,3,1,0',
            total_b:'24',
            b:'4,6,2,4,6,2,0',
            total_credits:'24',
            credits:'4,6,2,4,6,2,0',

            person_data: localuser
        });
    }); 
});

// router.post('/personselect',function(req, res, next){
//     console.log("post:personselect");

//     var username = req.body.username;
//     console.log(username);


//     PersonModel.findbyname(username,function (err, user) {
//         if (err) {
//             console.log('find error!'+error);
//         }
//         if (!user) {
//             console.log('user not found!');
//         }
//         console.log("user : "+user.length);
//         console.log('user : '+user);
//         res.render('personselect',{
//             name: '程序员', 
//             image: 'images/avatars/avatar3.jpg',
//             total_a:'12',
//             a:'2,3,1,2,3,1,0',
//             total_b:'24',
//             b:'4,6,2,4,6,2,0',
//             total_credits:'24',
//             credits:'4,6,2,4,6,2,0',

//             person_data: user
//         });
//     });
// });

module.exports = router;

