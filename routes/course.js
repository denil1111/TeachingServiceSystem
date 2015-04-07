var express = require('express');
var router = express.Router();

var course=[];
course.push({course_name:'程序员的自我修养',complete:true, teacher:'XX1', semaster:'春',time:'周一 123',campus:'玉泉',room:'曹西-204'});
course.push({course_name:'论程序员的把妹精神',complete:false, teacher:'XX2', semaster:'春夏',time:'周一 123 周二345',campus:'玉泉',room:'曹西-101'});
course.push({course_name:'程序员的自我修养',complete:true, teacher:'XX1', semaster:'春',time:'周一 123',campus:'玉泉',room:'曹西-204'});
course.push({course_name:'论程序员的把妹精神',complete:false, teacher:'XX2', semaster:'春夏',time:'周一 123 周二345',campus:'玉泉',room:'曹西-101'});
course.push({course_name:'程序员的自我修养',complete:true, teacher:'XX1', semaster:'春',time:'周一 123',campus:'玉泉',room:'曹西-204'});
course.push({course_name:'论程序员的把妹精神',complete:false, teacher:'XX2', semaster:'春夏',time:'周一 123 周二345',campus:'玉泉',room:'曹西-101'});
course.push({course_name:'程序员的自我修养',complete:true, teacher:'XX1', semaster:'春',time:'周一 123',campus:'玉泉',room:'曹西-204'});
course.push({course_name:'论程序员的把妹精神',complete:false, teacher:'XX2', semaster:'春夏',time:'周一 123 周二345',campus:'玉泉',room:'曹西-101'});
course.push({course_name:'程序员的自我修养',complete:true, teacher:'XX1', semaster:'春',time:'周一 123',campus:'玉泉',room:'曹西-204'});
course.push({course_name:'论程序员的把妹精神',complete:false, teacher:'XX2', semaster:'春夏',time:'周一 123 周二345',campus:'玉泉',room:'曹西-101'});
/* GET home page. */
router.get('/course', function(req, res, next) {
  console.log(course.ejs);
  res.render('course', {
  	name: '程序员', 
  	image: 'images/avatars/avatar3.jpg',
  	total_a:'12',
  	a:'2,3,1,2,3,1,0',
  	total_b:'24',
  	b:'4,6,2,4,6,2,0',
  	total_credits:'24',
  	credits:'4,6,2,4,6,2,0',
  	course_data: course
  });
});
router.post('/course_search', function(req, res, next) {
  console.log(req);
  res.render('course', {
  	name: '程序员', 
  	image: 'images/avatars/avatar3.jpg',
  	total_a:'12',
  	a:'2,3,1,2,3,1,0',
  	total_b:'24',
  	b:'4,6,2,4,6,2,0',
  	total_credits:'24',
  	credits:'4,6,2,4,6,2,0',
  	course_data: course
  });
});

module.exports = router;
