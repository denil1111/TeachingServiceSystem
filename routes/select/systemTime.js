var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//选课时间确定
choose_time=[];
choose_time.push({start_time:"2015/01/01",end_time:"2015/02/02",isChoose:true,isCancell:true,ID:1});
choose_time.push({start_time:"2015/03/01",end_time:"2015/04/02",isChoose:true,isCancell:false,ID:2});
//ID为主键
router.get('/time', function(req, res, next) {
  console.log(course.ejs);
  res.render('select/time', {
    type:2,//manager
    name: '程序员', 
    image: 'images/avatars/avatar3.jpg',
    choose_time:choose_time
  });
});
router.post('/time', function(req, res, next) {
  console.log(req.body);
  res.render('select/time', {
    type:2,//manager
    name: '程序员', 
    image: 'images/avatars/avatar3.jpg',
    choose_time:choose_time
  });
});

module.exports = router;