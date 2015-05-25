var express = require('express');
var router = express.Router();
var mongoose = require('mongoose/');

var PersonModel = require('../../db/group1db/PersonModel');

router.get('/personinfo', function(req, res, next) {
    if(!req.session.user){return res.redirect('login');}
    var localuser=req.session.user[0];
    PersonModel.findbyid(localuser.userid,function (err, user) {
        localuser = user[0];
        res.render('info/personinfo',{
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

module.exports = router;

