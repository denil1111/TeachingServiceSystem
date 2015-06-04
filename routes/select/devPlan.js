var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//培养方案页面
var userType=0;//student
var selectedMajor = "专业1";//默认专业为当期用户的专业
//////////////////////////专业培养方案//////////////////////////
/*var major = [];//专业
var selectedMajor;
var majorModel = require('../../db/courseDB/majorSchema');

var dev_plan_elec_class = [];
var dev_plan_gen_class=[];
var dev_plan_gen = [];
var dev_plan_req = [];
var dev_plan_elec = new Array();
var dev_plan_elec_tmp = [];
var courseModel = require('../../db/courseDB/courseSchema_hyx');*/

//需要定义一个函数

router.get('/dev_plan', function (req, res, next) {
  console.log(course.ejs);
  
  //course: id, name, credit, recTime, type, subType, major
  //major: name
  //plan: studentId, p1, isC1, p2, isC2, p3, isC3
  
  //将数据读入内存
  //专业
  //var selectedMajor = "专业1";//默认专业为当期用户的专业
  var major = [];//专业
  var majorModel = require('../../db/courseDB/majorSchema');
  majorModel.find({}, function(error, result) {
    if (error) console.log(error);
    else console.log(result);
    
    for(var i=0;i<result.length;i++){
      major.push(result[i].name);
    }
  });
  //专业方向
  var dev_plan_elec_class = [];
  majorModel.find({name:selectedMajor}, function(error, result) {
    if (error) console.log(error);
    else console.log(result);
    
    if(result!=1)
      console.log("ERROR: The length of result is not one!");//为啥不为1??!!
      
    for(var i=0;i<(result[0].field).length;i++)
      //dev_plan_elec_class=result[0].field;
      dev_plan_elec_class.push({classification: (result[0].field)[i], min_credits: "20", credits: "18"});
  });
  
  //课程
  var dev_plan_gen_class=[];//公共课类别
  dev_plan_gen_class.push({name:"通识类课程",min_credits:"10",credits:"12"});//格式 课程类别，培养方案要求学分，已修学分
  dev_plan_gen_class.push({name:"思政类课程",min_credits:"12",credits:"2"});
  dev_plan_gen_class.push({name:"体育类课程",min_credits:"8",credits:"9"});
  dev_plan_gen_class.push({name:"语言类课程",min_credits:"8",credits:"2"});
 
  var dev_plan_gen = [];
  var dev_plan_req = [];
  var dev_plan_elec = new Array();
  var dev_plan_elec_tmp = [];
  var courseModel = require('../../db/courseDB/courseSchema_hyx');
  courseModel.find({major: {$in: [selectedMajor, '']} }, function(error, result) {
  //courseModel.find({}, function(error, result) {
    if (error) console.log(error);
    else console.log(result);

    for (var i = 0; i < result.length; i++) {
      if (result[i].type == 1) {//公共课, dev_plan页面似乎不用公共课的list
        dev_plan_gen.push({
          ID: result[i].id,
          name: result[i].name,
          time: result[i].time,
          credit: result[i].credit,
          complete: false
        });
      } else if (result[i].type == 2) {//专业必修
        dev_plan_req.push({
          ID: result[i].id,
          name: result[i].name,
          time: result[i].time,
          credit: result[i].credit,
          complete: false
        });
      } else {//3, 专业选修
        //数据存入内存
        dev_plan_elec_tmp.push({
          ID: result[i].id,
          name: result[i].name,
          time: result[i].time,
          credit: result[i].credit,
          complete: false,
          subtype: result[i].subtype
        });
      }
    }
    
    //专业选修分类
    for (var m = 0; m < dev_plan_elec_class.length; m++) {
      var tmp = [];
      for (var i = 0; i < dev_plan_elec_tmp.length; i++) { //每个子类一一匹配，好麻烦
        if (dev_plan_elec_tmp[i].subtype == dev_plan_elec_class[m].classification) {
          tmp.push({
            ID: dev_plan_elec_tmp[i].ID,
            name: dev_plan_elec_tmp[i].name,
            time: dev_plan_elec_tmp[i].time,
            credit: dev_plan_elec_tmp[i].credit,
            complete: dev_plan_elec_tmp[i].complete
          });
        }
      }
      dev_plan_elec.push(tmp);
    }

    res.render('select/dev_plan', {
      type: userType, 
      name: '程序员',
      image: 'images/avatars/avatar3.jpg',
      total_a: '12',
      a: '2,3,1,2,3,1,0',
      total_b: '24',
      b: '4,6,2,4,6,2,0',
      total_credits: '24',
      credits: '4,6,2,4,6,2,0',
      major: major,
      dev_plan_gen: dev_plan_gen_class,
      dev_plan_elec: dev_plan_elec,
      dev_plan_elec_class: dev_plan_elec_class,
      dev_plan_req: dev_plan_req
    });
    
  });
  
  /*
  //选修课变量,所有的选修课（二维数组）
  var dev_plan_elec = new Array()
  var dev_plan_tmp = [];
  dev_plan_tmp.push({ ID: "0012345", name: "如何正确的转行卖烧烤", time: "大三 夏", credit: "2.5", complete: false });
  dev_plan_tmp.push({ ID: "0012346", name: "产品经历撕逼学", time: "大三 春", credit: "1.5", complete: true });
  dev_plan_elec.push(dev_plan_tmp);
  dev_plan_tmp = [];
  dev_plan_tmp.push({ ID: "0012347", name: "烫烫烫", time: "大三 夏", credit: "1.5", complete: false });
  dev_plan_tmp.push({ ID: "0012348", name: "面向对象的编程", time: "大三 春", credit: "3", complete: true });
  dev_plan_elec.push(dev_plan_tmp);
  //选修课类别
  var dev_plan_elec_class = [];
  dev_plan_elec_class.push({ classification: "程序员卖蠢系列", min_credits: "20", credits: "18" });
  dev_plan_elec_class.push({ classification: "奇技淫巧", min_credits: "20", credits: "22" });

  //必修课变量
  var dev_plan_req = [];
  dev_plan_req.push({ ID: "0011345", name: "如何正确的把妹", time: "大三 秋冬", credit: "4.5", complete: false });
  dev_plan_req.push({ ID: "0011346", name: "如何正确的犯蠢", time: "大三 秋冬", credit: "4.5", complete: false });
  
  res.render('select/dev_plan', {
    type: 2,//manager
    name: '程序员',
    image: 'images/avatars/avatar3.jpg',
    total_a: '12',
    a: '2,3,1,2,3,1,0',
    total_b: '24',
    b: '4,6,2,4,6,2,0',
    total_credits: '24',
    credits: '4,6,2,4,6,2,0',
    major: major,
    dev_plan_gen: dev_plan_gen,
    dev_plan_elec: dev_plan_elec,
    dev_plan_elec_class: dev_plan_elec_class,
    dev_plan_req: dev_plan_req
  });*/
  
});

//获取专业信息
router.post('/dev_plan', function (req, res, next) {//有个问题 由于所有变量都定义在router.get里了 这就导致router.post里的变量未定义 难道要我再扫一遍数据库?!
  console.log(req.body);
  var selectedMajor = req.body.major_name;
  var major = [];//专业
  var majorModel = require('../../db/courseDB/majorSchema');
  majorModel.find({}, function(error, result) {
    if (error) console.log(error);
    else console.log(result);
    
    for(var i=0;i<result.length;i++){
      major.push(result[i].name);
    }
  });
  //专业方向
  var dev_plan_elec_class = [];
  majorModel.find({name:selectedMajor}, function(error, result) {
    if (error) console.log(error);
    else console.log(result);
    
    if(result!=1)
      console.log("ERROR: The length of result is not one!");//为啥不为1??!!
      
    for(var i=0;i<(result[0].field).length;i++)
      //dev_plan_elec_class=result[0].field;
      dev_plan_elec_class.push({classification: (result[0].field)[i], min_credits: "20", credits: "18"});
  });
  
  //课程
  var dev_plan_gen_class=[];//公共课类别
  dev_plan_gen_class.push({name:"通识类课程",min_credits:"10",credits:"12"});//格式 课程类别，培养方案要求学分，已修学分
  dev_plan_gen_class.push({name:"思政类课程",min_credits:"12",credits:"2"});
  dev_plan_gen_class.push({name:"体育类课程",min_credits:"8",credits:"9"});
  dev_plan_gen_class.push({name:"语言类课程",min_credits:"8",credits:"2"});
 
  var dev_plan_gen = [];
  var dev_plan_req = [];
  var dev_plan_elec = new Array();
  var dev_plan_elec_tmp = [];
  var courseModel = require('../../db/courseDB/courseSchema_hyx');
  courseModel.find({major: {$in: [selectedMajor, '']} }, function(error, result) {
  //courseModel.find({}, function(error, result) {
    if (error) console.log(error);
    else console.log(result);

    for (var i = 0; i < result.length; i++) {
      if (result[i].type == 1) {//公共课, dev_plan页面似乎不用公共课的list
        dev_plan_gen.push({
          ID: result[i].id,
          name: result[i].name,
          time: result[i].time,
          credit: result[i].credit,
          complete: false
        });
      } else if (result[i].type == 2) {//专业必修
        dev_plan_req.push({
          ID: result[i].id,
          name: result[i].name,
          time: result[i].time,
          credit: result[i].credit,
          complete: false
        });
      } else {//3, 专业选修
        //数据存入内存
        dev_plan_elec_tmp.push({
          ID: result[i].id,
          name: result[i].name,
          time: result[i].time,
          credit: result[i].credit,
          complete: false,
          subtype: result[i].subtype
        });
      }
    }
    
    //专业选修分类
    for (var m = 0; m < dev_plan_elec_class.length; m++) {
      var tmp = [];
      for (var i = 0; i < dev_plan_elec_tmp.length; i++) { //每个子类一一匹配，好麻烦
        if (dev_plan_elec_tmp[i].subtype == dev_plan_elec_class[m].classification) {
          tmp.push({
            ID: dev_plan_elec_tmp[i].ID,
            name: dev_plan_elec_tmp[i].name,
            time: dev_plan_elec_tmp[i].time,
            credit: dev_plan_elec_tmp[i].credit,
            complete: dev_plan_elec_tmp[i].complete
          });
        }
      }
      dev_plan_elec.push(tmp);
    }

    res.render('select/dev_plan', {
      type: userType,
      name: '程序员',
      image: 'images/avatars/avatar3.jpg',
      total_a: '12',
      a: '2,3,1,2,3,1,0',
      total_b: '24',
      b: '4,6,2,4,6,2,0',
      total_credits: '24',
      credits: '4,6,2,4,6,2,0',
      major: major,
      dev_plan_gen: dev_plan_gen_class,
      dev_plan_elec: dev_plan_elec,
      dev_plan_elec_class: dev_plan_elec_class,
      dev_plan_req: dev_plan_req
    });
    
  });
  
});

//////////////////////////我的培养方案//////////////////////////

//my_dev_plan中给出的是dev_plan类变量为我的培养方案，其中dev_plan四个变量与专业培养方案含义相同，但是为加入自己培养方案的内容
//credits的含义为培养方案中已包含的总学分数量
//增加变量my_dev_plan_gen，其含义为我的培养方案中制定的通识课

router.get('/my_dev_plan', function (req, res, next) {
  console.log(course.ejs);
  var currentId = "0001";
  var planModel = require('../../db/courseDB/planSchema');
  var courseModel = require('../../db/courseDB/courseSchema_hyx');

  var dev_plan_gen_class=[];//公共课类别
  dev_plan_gen_class.push({name:"通识类课程",min_credits:"10",credits:"0"});//格式 课程类别，培养方案要求学分，已修学分
  dev_plan_gen_class.push({name:"思政类课程",min_credits:"12",credits:"0"});
  dev_plan_gen_class.push({name:"体育类课程",min_credits:"8",credits:"0"});
  dev_plan_gen_class.push({name:"语言类课程",min_credits:"1",credits:"0"});
 
  var my_dev_plan_gen = [];
  var my_dev_plan_req = [];
  var my_dev_plan_elec = [];
  /*var a=[]; 
  my_dev_plan_elec.push(a);*/
  var my_dev_plan_elec_class = [];

  //查询 & 显示
  planModel.find({id: currentId}, function(error, result) {
    if (error) console.log(error);
    else console.log(result);

    if (result.length != 1) {
      console.log("ERROR: result.length!=1");
      return;
    }

    //公共课
    var ok1=false;
    var credit1_1 = 0;
    var credit1_2 = 0;
    var credit1_3 = 0;
    var credit1_4 = 0;
    //console.log((result[0].p1).length);//1 输出对的!!!
    for (var i = 0; i < (result[0].p1).length; i++) {
      //嵌套查询
      //console.log((result[0].p1)[i]);//输出对的!!!
      (function(i) {
        courseModel.find({id: (result[0].p1)[i]}, function(error, nresult) {
          if (error) console.log(error);
          else console.log(nresult);

          if (nresult.length == 1){
            if(nresult[0].subtype=="通识类课程")
              credit1_1 += nresult[0].credit;
            else if(nresult[0].subtype=="思政类课程")
              credit1_2 += nresult[0].credit;
            else if(nresult[0].subtype=="体育类课程")
              credit1_3 += nresult[0].credit;
            else
              credit1_4 += nresult[0].credit;
            my_dev_plan_gen.push({
              ID: nresult[0].id,
              name: nresult[0].name,
              time: nresult[0].time,
              credit: nresult[0].credit,
              complete: result[0].isC1[i],
              classi: nresult[0].subtype
            });
          }//if end
          if(i==(result[0].p1).length-1){
            ok1=true;
          }
        });//find end
      })(i);
    }
    /*dev_plan_gen_class[0].credits=credit1_1.toString();
    dev_plan_gen_class[1].credits=credit1_2.toString();
    dev_plan_gen_class[2].credits=credit1_3.toString();
    dev_plan_gen_class[3].credits=credit1_4.toString();*/
    /*console.log(credit1_1);
    console.log(credit1_2);
    console.log(credit1_3);
    console.log(credit1_4);*/
    console.log(1);

    //专业选修课

    var ok2=false;
    var credit3 = 0;
    var my_dev_plan_elec_tmp = [];
    function fn1(){
      for (var i = 0; i < (result[0].p3).length; i++) {
      //嵌套查询
      (function(i) {
        courseModel.find({id: result[0].p3[i]}, function(error, nresult) {
          if (error) console.log(error);
          else console.log(nresult);

          if (nresult.length == 1) {
            var flag = 0;
            for (var j = 0; j < my_dev_plan_elec_class.length; j++) {
              if (nresult[0].subtype == my_dev_plan_elec_class[j].classification) {
                flag = 1;
                break;
              }
            }
            if (flag == 0) {
              my_dev_plan_elec_class.push({classification:nresult[0].subtype, min_credits: "20", credits: "18"});//min_credit和credits没用的！！
            }
            //把所有专业选修课的数据读进内存
            my_dev_plan_elec_tmp.push({
              ID: nresult[0].id,
              name: nresult[0].name,
              time: nresult[0].time,
              credit: nresult[0].credit,
              complete: result[0].isC2[i],
              classi: nresult[0].subtype
            });
            credit3 += nresult[0].credit;
          }
          if(i==(result[0].p3).length-1){
            ok2=true;
          }
        });//find end
      })(i);
    }
    console.log(my_dev_plan_elec_class);
    console.log(my_dev_plan_elec_tmp);
    }
    
    function fn2(){
       /*console.log("**********"); 
    console.log(my_dev_plan_elec_tmp);
    console.log("**********");*/
    for (var m = 0; m < my_dev_plan_elec_class.length; m++) {
      var tmp = [];
      for (var i = 0; i < my_dev_plan_elec_tmp.length; i++) { //每个子类一一匹配，好麻烦
        if (my_dev_plan_elec_tmp[i].classi == dev_plan_elec_class[m]) {
          tmp.push(my_dev_plan_elec_tmp[i]);
        }
      }
      my_dev_plan_elec.push(tmp);
    }
    console.log(2);
    }

    fn1();//不需要这样 你可以删了。。
    fn2();
   

    //专业必修
    var credit2 = 0;
    for (var i = 0; i < (result[0].p2).length; i++) {
      //嵌套查询
      (function(i) {
        courseModel.find({id: result[0].p2[i]}, function(error, nresult) {
          if (error) console.log(error);
          else console.log(nresult);

          if (nresult.length == 1)
            my_dev_plan_req.push({
              ID: nresult[0].id,
              name: nresult[0].name,
              time: nresult[0].time,
              credit: nresult[0].credit,
              complete: result[0].isC2[i]
            });
          credit2 += result[0].credit;
          if (i == (result[0].p2).length-1 && ok1 && ok2) {//放里面就会报一个很恶心的error
            dev_plan_gen_class[0].credits=credit1_1.toString();//请一定在这里赋值好么T T，同步异步拎不清啊啊啊。。
            dev_plan_gen_class[1].credits=credit1_2.toString();
            dev_plan_gen_class[2].credits=credit1_3.toString();
            dev_plan_gen_class[3].credits=credit1_4.toString();
            console.log("~~~~~~~~~~~~~~~~");
            console.log(dev_plan_gen_class);
            console.log("~~~~~~~~~~~~~~~~"); 
            console.log(my_dev_plan_elec);
            console.log("~~~~~~~~~~~~~~~~"); 
            console.log(my_dev_plan_elec_tmp);
            console.log("~~~~~~~~~~~~~~~~");
            console.log(my_dev_plan_elec_class);
            console.log("~~~~~~~~~~~~~~~~");
            console.log(my_dev_plan_req);
            console.log("~~~~~~~~~~~~~~~~");
            console.log(my_dev_plan_gen);
            var isEmpty=true;
            for (var m = 0; m < my_dev_plan_elec_class.length; m++) {
              var tmp = [];
              for (var j = 0; j < my_dev_plan_elec_tmp.length; j++) { //每个子类一一匹配，好麻烦
                if (my_dev_plan_elec_tmp[j].classi == my_dev_plan_elec_class[m].classification) {
                  tmp.push(my_dev_plan_elec_tmp[j]);
                }
              }
              my_dev_plan_elec.push(tmp);
              isEmpty=false;
            }
            if(isEmpty){
              var tmp = [];
              my_dev_plan_elec.push(tmp);
            }
            console.log("~~~~~~~~~~~~~~~~"); 
            console.log(my_dev_plan_elec);
            console.log("~~~~~~~~~~~~~~~~"); 

            res.render('select/my_dev_plan', {
              type: userType,
              name: '程序员',
              image: 'images/avatars/avatar3.jpg',
              total_a: '12',
              a: '2,3,1,2,3,1,0',
              total_b: '24',
              b: '4,6,2,4,6,2,0',
              total_credits: '24',
              credits: '4,6,2,4,6,2,0',
              dev_plan_gen: dev_plan_gen_class,
              dev_plan_elec: my_dev_plan_elec,
              dev_plan_elec_class: my_dev_plan_elec_class,
              dev_plan_req: my_dev_plan_req,
              my_dev_plan_gen: my_dev_plan_gen,
              is_checked: true //这样要改成这样，待审核时可以修改，其他时候不能修改
            });
          }
        });
      })(i);
    }
    console.log(3);

    /*res.render('select/my_dev_plan', {
      type: userType,
      name: '程序员',
      image: 'images/avatars/avatar3.jpg',
      total_a: '12',
      a: '2,3,1,2,3,1,0',
      total_b: '24',
      b: '4,6,2,4,6,2,0',
      total_credits: '24',
      credits: '4,6,2,4,6,2,0',
      dev_plan_gen: dev_plan_gen_class,
      dev_plan_elec: my_dev_plan_elec,
      dev_plan_elec_class: my_dev_plan_elec_class,
      dev_plan_req: my_dev_plan_req,
      my_dev_plan_gen: my_dev_plan_gen,
      is_checked: true //这样要改成这样，待审核时可以修改，其他时候不能修改
    });*/

  });//find end
});//get end

//修改我的培养方案
router.post('/my_dev_plan_add', function (req, res, next) {
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
    major:major,
    dev_plan_gen:dev_plan_gen,
    dev_plan_elec:dev_plan_elec,
    dev_plan_elec_class:dev_plan_elec_class,
    dev_plan_req:dev_plan_req
  });
  
  var currentId = "0001";
  var planModel = require('../../db/courseDB/planSchema');
  var courseModel = require('../../db/courseDB/courseSchema_hyx');

  var dev_plan_gen_class=[];//公共课类别
  dev_plan_gen_class.push({name:"通识类课程",min_credits:"10",credits:"0"});//格式 课程类别，培养方案要求学分，已修学分
  dev_plan_gen_class.push({name:"思政类课程",min_credits:"12",credits:"0"});
  dev_plan_gen_class.push({name:"体育类课程",min_credits:"8",credits:"0"});
  dev_plan_gen_class.push({name:"语言类课程",min_credits:"8",credits:"0"});
 
  var my_dev_plan_gen = [];
  var my_dev_plan_req = [];
  var my_dev_plan_elec = new Array();
  var my_dev_plan_elec_class = [];

  

  courseModel.find({id: req.body.course_number}, function(error, result) {
    if (error) console.log(error);
    else console.log(result);

    //找到了一个course
    if (result.length != 1) {
      console.log("ERROR:result.length!=1");
      return;
    }

    //将这门课放进currentId的plan列表 
    //!!加课的时候要判断是否已存在在plan中
    //!!是否为本专业  
    // 修改记录
    if(result[0].major!=selectedMajor && result[0].major!=""){
      console.log("Wrong Major!");
      return;
    }

    planModel.find({id: currentId}, function(err, plan) {
      if(plan.length!=1){
        console.log("ERROR:plan.length!=1");
        return;
      }

      if (result[0].type == 1) { //如果是公共课
        var isExisted=false;
        for(var j=0;j<plan[0].p1.length;j++){
          if(result[0].id==plan[0].p1[j]){
            if(req.body.type=="2"){//删除
              plan[0].p1.splice(j, 1);
              plan[0].isC1.splice(j, 1);
            }
            isExisted=true;
            break;
          } 
        }
        if(req.body.type=="1" && !isExisted){//添加
          plan[0].p1.push(result[0].id);
          plan[0].isC1.push(0);
        }
      } else if (result[0].type == 2) { //如果是专业必修课
        var isExisted=false;
        for(var j=0;j<plan[0].p2.length;j++){
          if(result[0].id==plan[0].p2[j]){
            if(req.body.type=="2"){
              plan[0].p2.splice(j, 1);
              plan[0].isC2.splice(j, 1);
            }
            isExisted=true;
            break;
          } 
        }
        if(req.body.type=="1" && !isExisted){
          plan[0].p2.push(result[0].id);
          plan[0].isC2.push(0);
        }
      } else { //专业选修课
        var isExisted=false;
        for(var j=0;j<plan[0].p3.length;j++){
          if(result[0].id==plan[0].p3[j]){
            if(req.body.type=="2"){
              plan[0].p3.splice(j, 1);
              plan[0].isC3.splice(j, 1);
            }
            isExisted=true;
            break;
          } 
        }
        if(req.body.type=="1" && !isExisted){
          plan[0].p3.push(result[0].id);
          plan[0].isC3.push(0);
        }
      }
      plan[0].save(function(err) {});
      
      //公共课
    var ok1=false;
    var credit1_1 = 0;
    var credit1_2 = 0;
    var credit1_3 = 0;
    var credit1_4 = 0;
    //console.log((plan[0].p1).length);//1 输出对的!!!
    for (var i = 0; i < (plan[0].p1).length; i++) {
      //嵌套查询
      //console.log((plan[0].p1)[i]);//输出对的!!!
      (function(i) {
        courseModel.find({id: (plan[0].p1)[i]}, function(error, nresult) {
          if (error) console.log(error);
          else console.log(nresult);

          if (nresult.length == 1){
            if(nresult[0].subtype=="通识类课程")
              credit1_1 += nresult[0].credit;
            else if(nresult[0].subtype=="思政类课程")
              credit1_2 += nresult[0].credit;
            else if(nresult[0].subtype=="体育类课程")
              credit1_3 += nresult[0].credit;
            else
              credit1_4 += nresult[0].credit;
            my_dev_plan_gen.push({
              ID: nresult[0].id,
              name: nresult[0].name,
              time: nresult[0].time,
              credit: nresult[0].credit,
              complete: plan[0].isC1[i],
              classi: nresult[0].subtype
            });
          }//if end
          if(i==(plan[0].p1).length-1){
            ok1=true;
          }
        });//find end
      })(i);
    }
    /*dev_plan_gen_class[0].credits=credit1_1.toString();
    dev_plan_gen_class[1].credits=credit1_2.toString();
    dev_plan_gen_class[2].credits=credit1_3.toString();
    dev_plan_gen_class[3].credits=credit1_4.toString();*/
    /*console.log(credit1_1);
    console.log(credit1_2);
    console.log(credit1_3);
    console.log(credit1_4);*/
    console.log(1);

    //专业选修课

    var ok2=false;
    var credit3 = 0;
    var my_dev_plan_elec_tmp = [];
    function fn1(){
      for (var i = 0; i < (plan[0].p3).length; i++) {
      //嵌套查询
      (function(i) {
        courseModel.find({id: plan[0].p3[i]}, function(error, nresult) {
          if (error) console.log(error);
          else console.log(nresult);

          if (nresult.length == 1) {
            var flag = 0;
            for (var j = 0; j < my_dev_plan_elec_class.length; j++) {
              if (nresult[0].subtype == my_dev_plan_elec_class[j].classification) {
                flag = 1;
                break;
              }
            }
            if (flag == 0) {
              my_dev_plan_elec_class.push({classification:nresult[0].subtype, min_credits: "20", credits: "18"});//min_credit和credits没用的！！
            }
            //把所有专业选修课的数据读进内存
            my_dev_plan_elec_tmp.push({
              ID: nresult[0].id,
              name: nresult[0].name,
              time: nresult[0].time,
              credit: nresult[0].credit,
              complete: plan[0].isC2[i],
              classi: nresult[0].subtype
            });
            credit3 += nresult[0].credit;
          }
          if(i==(plan[0].p3).length-1){
            ok2=true;
          }
        });//find end
      })(i);
    }
    console.log(my_dev_plan_elec_class);
    console.log(my_dev_plan_elec_tmp);
    }
    
    function fn2(){
       /*console.log("**********"); 
    console.log(my_dev_plan_elec_tmp);
    console.log("**********");*/
    for (var m = 0; m < my_dev_plan_elec_class.length; m++) {
      var tmp = [];
      for (var i = 0; i < my_dev_plan_elec_tmp.length; i++) { //每个子类一一匹配，好麻烦
        if (my_dev_plan_elec_tmp[i].classi == dev_plan_elec_class[m]) {
          tmp.push(my_dev_plan_elec_tmp[i]);
        }
      }
      my_dev_plan_elec.push(tmp);
    }
    console.log(2);
    }

    fn1();//不需要这样 你可以删了。。
    fn2();
   

    //专业必修
    var credit2 = 0;
    for (var i = 0; i < (plan[0].p2).length; i++) {
      //嵌套查询
      (function(i) {
        courseModel.find({id: plan[0].p2[i]}, function(error, nresult) {
          if (error) console.log(error);
          else console.log(nresult);

          if (nresult.length == 1)
            my_dev_plan_req.push({
              ID: nresult[0].id,
              name: nresult[0].name,
              time: nresult[0].time,
              credit: nresult[0].credit,
              complete: plan[0].isC2[i]
            });
          credit2 += plan[0].credit;
          if (i == (plan[0].p2).length-1 && ok1 && ok2) {
            dev_plan_gen_class[0].credits=credit1_1.toString();//请一定在这里赋值好么，同步异步拎不清啊啊啊。。
            dev_plan_gen_class[1].credits=credit1_2.toString();
            dev_plan_gen_class[2].credits=credit1_3.toString();
            dev_plan_gen_class[3].credits=credit1_4.toString();
            console.log("~~~~~~~~~~~~~~~~");
            console.log(dev_plan_gen_class);
            console.log("~~~~~~~~~~~~~~~~"); 
            console.log(my_dev_plan_elec);
            console.log("~~~~~~~~~~~~~~~~"); 
            console.log(my_dev_plan_elec_tmp);
            console.log("~~~~~~~~~~~~~~~~");
            console.log(my_dev_plan_elec_class);
            console.log("~~~~~~~~~~~~~~~~");
            console.log(my_dev_plan_req);
            console.log("~~~~~~~~~~~~~~~~");
            console.log(my_dev_plan_gen);
            var isEmpty=true;
            for (var m = 0; m < my_dev_plan_elec_class.length; m++) {
              var tmp = [];
              for (var j = 0; j < my_dev_plan_elec_tmp.length; j++) { //每个子类一一匹配，好麻烦
                if (my_dev_plan_elec_tmp[j].classi == my_dev_plan_elec_class[m].classification) {
                  tmp.push(my_dev_plan_elec_tmp[j]);
                }
              }
              my_dev_plan_elec.push(tmp);
              isEmpty=false;
            }
            if(isEmpty){
              var tmp = [];
              my_dev_plan_elec.push(tmp);
            }
            console.log("~~~~~~~~~~~~~~~~"); 
            console.log(my_dev_plan_elec);
            console.log("~~~~~~~~~~~~~~~~"); 

            res.render('select/my_dev_plan', {
              type: userType,
              name: '程序员',
              image: 'images/avatars/avatar3.jpg',
              total_a: '12',
              a: '2,3,1,2,3,1,0',
              total_b: '24',
              b: '4,6,2,4,6,2,0',
              total_credits: '24',
              credits: '4,6,2,4,6,2,0',
              dev_plan_gen: dev_plan_gen_class,
              dev_plan_elec: my_dev_plan_elec,
              dev_plan_elec_class: my_dev_plan_elec_class,
              dev_plan_req: my_dev_plan_req,
              my_dev_plan_gen: my_dev_plan_gen,
              is_checked: true //这样要改成这样，待审核时可以修改，其他时候不能修改
            });
          }
        });
      })(i);
    }
    console.log(3);

    });

  });//find end - course
});


var dev_plan_gen_class=[];
dev_plan_gen_class.push({name:"通识类课程",min_credits:"10",credits:"0"});//格式 课程类别，培养方案要求学分，已修学分
dev_plan_gen_class.push({name:"思政类课程",min_credits:"12",credits:"0"});
dev_plan_gen_class.push({name:"体育类课程",min_credits:"8",credits:"0"});
dev_plan_gen_class.push({name:"语言类课程",min_credits:"1",credits:"0"});

var dev_plan_elec_class=[];
dev_plan_elec_class.push({classification:"把妹技巧1", min_credits: "20", credits: "18"});
dev_plan_elec_class.push({classification:"把妹技巧2", min_credits: "20", credits: "18"});

var dev_plan_req=[];
dev_plan_req.push({ID:"0123412",name:"bengkui",time:"大二 春夏",credit:2.5});
dev_plan_req.push({ID:"0123412",name:"bengkui",time:"大二 春夏",credit:2.5});
dev_plan_req.push({ID:"0123412",name:"bengkui",time:"大二 春夏",credit:2.5});

var dev_plan_elec_tmp=[];
dev_plan_elec_tmp.push({ID:"0123412",name:"bengkui",time:"大二 春夏",credit:2.5});
dev_plan_elec_tmp.push({ID:"0123412",name:"bengkui",time:"大二 春夏",credit:2.5});

var dev_plan_elec=[];
dev_plan_elec.push(dev_plan_elec_tmp);
dev_plan_elec.push(dev_plan_elec_tmp);

var major=[];
major.push("计算机科学与技术");
major.push("软件工程");



router.get('/edit_dev_plan', function(req, res, next){
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
    dev_plan_gen:dev_plan_gen_class,
    dev_plan_elec:dev_plan_elec,
    dev_plan_elec_class:dev_plan_elec_class,
    dev_plan_req:dev_plan_req
  });
});

router.post('/edit_dev_plan', function(req, res, next){
    console.log(req.body);
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
    dev_plan_gen:dev_plan_gen_class,
    dev_plan_elec:dev_plan_elec,
    dev_plan_elec_class:dev_plan_elec_class,
    dev_plan_req:dev_plan_req
  });
});




module.exports = router;