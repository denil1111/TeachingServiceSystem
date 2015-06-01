var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//培养方案页面

var dev_plan_gen=[];//通识课变量
dev_plan_gen.push({name:"通识核心课程",min_credits:"10",credits:"12"});//格式 课程类别，培养方案要求学分，已修学分
dev_plan_gen.push({name:"沟通与领导类课程",min_credits:"2",credits:"2"});
dev_plan_gen.push({name:"体育类课程",min_credits:"8",credits:"9"});
dev_plan_gen.push({name:"语言类课程",min_credits:"8",credits:"2"});

var dev_plan_elec=new Array()//选修课变量,所有的选修课（二维数组）
var dev_plan_tmp=[];
dev_plan_tmp.push({ID:"0012345",name:"如何正确的转行卖烧烤",time:"大三 夏",credit:"2.5",complete:false});
dev_plan_tmp.push({ID:"0012346",name:"产品经历撕逼学",time:"大三 春",credit:"1.5",complete:true});
dev_plan_elec.push(dev_plan_tmp);
dev_plan_tmp=[];
dev_plan_tmp.push({ID:"0012347",name:"烫烫烫",time:"大三 夏",credit:"1.5",complete:false});
dev_plan_tmp.push({ID:"0012348",name:"面向对象的编程",time:"大三 春",credit:"3",complete:true});
dev_plan_elec.push(dev_plan_tmp);
var dev_plan_elec_class=[];//选修课类别
dev_plan_elec_class.push({classification:"程序员卖蠢系列",min_credits:"20",credits:"18"});
dev_plan_elec_class.push({classification:"奇技淫巧",min_credits:"20",credits:"22"});

var dev_plan_req=[];//必修课变量
dev_plan_req.push({ID:"0011345",name:"如何正确的把妹",time:"大三 秋冬",credit:"4.5",complete:false});
dev_plan_req.push({ID:"0011346",name:"如何正确的犯蠢",time:"大三 秋冬",credit:"4.5",complete:false});
var major=[];//专业
major.push("计算机科学与技术");
major.push("软件工程");
major.push("自动化控制");
router.get('/dev_plan', function(req, res, next) {
  console.log(course.ejs);
  res.render('select/dev_plan', {
    type:2,//manager
    name: '程序员', 
    image: 'images/avatars/avatar3.jpg',
    total_a:'12',
    a:'2,3,1,2,3,1,0',
    total_b:'24',
    b:'4,6,2,4,6,2,0',
    total_credits:'24',
    credits:'4,6,2,4,6,2,0',
    major:major,
    dev_plan_gen:dev_plan_gen,
    dev_plan_elec:dev_plan_elec,
    dev_plan_elec_class:dev_plan_elec_class,
    dev_plan_req:dev_plan_req
  });
});
//获取专业信息
router.post('/dev_plan', function(req, res, next) {
  console.log(req.body);
  res.render('select/dev_plan', {
    type:2,//manager
    name: '程序员', 
    image: 'images/avatars/avatar3.jpg',
    total_a:'12',
    a:'2,3,1,2,3,1,0',
    total_b:'24',
    b:'4,6,2,4,6,2,0',
    total_credits:'24',
    credits:'4,6,2,4,6,2,0',
    major:major,
    dev_plan_gen:dev_plan_gen,
    dev_plan_elec:dev_plan_elec,
    dev_plan_elec_class:dev_plan_elec_class,
    dev_plan_req:dev_plan_req
  });
});

//my_dev_plan中给出的是dev_plan类变量为我的培养方案，其中dev_plan四个变量与专业培养方案含义相同，但是为加入自己培养方案的内容
//credits的含义为培养方案中已包含的总学分数量
//增加变量my_dev_plan_gen，其含义为我的培养方案中制定的通识课
var my_dev_plan_gen=[];
my_dev_plan_gen.push({ID:"c001",name:"Java应用基础",time:"大三 夏",credit:"2.5",complete:false,classi:"沟通与领导类"});
my_dev_plan_gen.push({ID:"0015345",name:"B/S软件设计",time:"大三 夏",credit:"1.5",complete:false,classi:"体育"});

router.get('/my_dev_plan', function(req, res, next) {
  console.log(course.ejs);
  res.render('select/my_dev_plan', {
    type:0,//tearcher
    name: '程序员', 
    image: 'images/avatars/avatar3.jpg',
    total_a:'12',
    a:'2,3,1,2,3,1,0',
    total_b:'24',
    b:'4,6,2,4,6,2,0',
    total_credits:'24',
    credits:'4,6,2,4,6,2,0',
    dev_plan_gen:dev_plan_gen,
    dev_plan_elec:dev_plan_elec,
    dev_plan_elec_class:dev_plan_elec_class,
    dev_plan_req:dev_plan_req,
    my_dev_plan_gen:my_dev_plan_gen,
    is_checked:true //该培养方案是否通过审核
  });
});

router.post('/my_dev_plan_add', function(req, res, next) {
    console.log(req.body);
    res.render('select/my_dev_plan', {
        type:2,//manager 
        name: '程序员', 
        image: 'images/avatars/avatar3.jpg',
        total_a:'12',
        a:'2,3,1,2,3,1,0',
        total_b:'24',
        b:'4,6,2,4,6,2,0',
        total_credits:'24',
        credits:'4,6,2,4,6,2,0',
        dev_plan_gen:dev_plan_gen,
        dev_plan_elec:dev_plan_elec,
        dev_plan_elec_class:dev_plan_elec_class,
        dev_plan_req:dev_plan_req,
        my_dev_plan_gen:my_dev_plan_gen,
        is_checked:true //该培养方案是否通过审核
      });
});

//修改培养方案
router.get('/edit_dev_plan', function(req, res, next) {
  console.log(course.ejs);
  res.render('select/edit_dev_plan', {
    type:2,//manager
    name: '程序员', 
    image: 'images/avatars/avatar3.jpg',
    total_a:'12',
    a:'2,3,1,2,3,1,0',
    total_b:'24',
    b:'4,6,2,4,6,2,0',
    total_credits:'24',
    credits:'4,6,2,4,6,2,0',
    major:major,
    dev_plan_gen:dev_plan_gen,
    dev_plan_elec:dev_plan_elec,
    dev_plan_elec_class:dev_plan_elec_class,
    dev_plan_req:dev_plan_req
  });
});
router.post('/edit_dev_plan', function(req, res, next) {
  console.log(req.body);
  res.render('select/dev_plan', {
    type:2,//manager
    name: '程序员', 
    image: 'images/avatars/avatar3.jpg',
    total_a:'12',
    a:'2,3,1,2,3,1,0',
    total_b:'24',
    b:'4,6,2,4,6,2,0',
    total_credits:'24',
    credits:'4,6,2,4,6,2,0',
    major:major,
    dev_plan_gen:dev_plan_gen,
    dev_plan_elec:dev_plan_elec,
    dev_plan_elec_class:dev_plan_elec_class,
    dev_plan_req:dev_plan_req
  });
});
module.exports = router;