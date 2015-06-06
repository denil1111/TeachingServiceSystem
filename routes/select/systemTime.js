var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//选课时间确定
choose_time=[];
choose_time.push({start_time:"2015/01/01",end_time:"2015/02/02",isChoose:true,isCancell:true,ID:"1"});
choose_time.push({start_time:"2015/03/01",end_time:"2015/04/02",isChoose:true,isCancell:false,ID:"2"});
//ID为主键
Date.prototype.format = function(format)
{
 var o = {
 "M+" : this.getMonth()+1, //month
 "d+" : this.getDate(),    //day
 "h+" : this.getHours(),   //hour
 "m+" : this.getMinutes(), //minute
 "s+" : this.getSeconds(), //second
 "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
 "S" : this.getMilliseconds() //millisecond
 }
 if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
 (this.getFullYear()+"").substr(4 - RegExp.$1.length));
 for(var k in o)if(new RegExp("("+ k +")").test(format))
 format = format.replace(RegExp.$1,
 RegExp.$1.length==1 ? o[k] :
 ("00"+ o[k]).substr((""+ o[k]).length));
 return format;
}
router.get('/time', function(req, res, next) {
  var choose_time=[];
  var courseTimeModel = require('../../db/courseDB/selectTimeModel');
  var error="";
  courseTimeModel.find({},function(err,cre){
      if (err)
          console.log(err);
      else
          console.log(cre);
      console.log("jinlaile2");
      for (var i=0;i<cre.length;i++)
      {
          choose_time.push({start_time:cre[i].stTime.format('yyyy-MM-dd'),
                            end_time:cre[i].edTime.format('yyyy-MM-dd'),
                            isChoose:cre[i].select,
                            isCancell:cre[i].unselect,
                            ID:cre[i]._id});
          }
          console.log(choose_time);
          res.render('select/time', {
              type:2,//manager
              name: '程序员', 
              image: 'images/avatars/avatar3.jpg',
              choose_time:choose_time,
              error:error
          });
  });
});
router.post('/time', function(req, res, next) {
  console.log(req.body);
  var choose_time=[];
  var courseTimeModel = require('../../db/courseDB/selectTimeModel');
  var stDate=new Date();
  var edDate=new Date();
  var isChoose=false;
  var isCancell=false;
  var error="";
  var render=function(){
      res.render('select/time', {
          type:2,//manager
          name: '程序员', 
          image: 'images/avatars/avatar3.jpg',
          choose_time:choose_time,
          error:error
      });
  }
  if (req.body.type=='add')
  {   
      console.log("jinlaile");
      stDate=new Date(req.body.start_year,req.body.start_month.substring(0,req.body.start_month.length-1),req.body.start_day);
      edDate=new Date(req.body.end_year,req.body.end_month.substring(0,req.body.end_month.length-1),req.body.end_day);
      isChoose='true'==req.body.isChoose?true:false;
      isCancell='true'==req.body.isCancell?true:false;
      if (stDate>edDate)
      {
          error='时序错误';
          render();
      }
      console.log(stDate,edDate);
      courseTimeModel.find({},function(err,cre){
          if (err)
          {
              console.log(err);
              error='搜索错误';
              render();
          }                  
          else
              console.log(cre);
          console.log("jinlaile2");
          var flag=1;
          for (var i=0;i<cre.length;i++)
          {
              choose_time.push({start_time:cre[i].stTime.format('yyyy-MM-dd'),
                                end_time:cre[i].edTime.format('yyyy-MM-dd'),
                                isChoose:cre[i].select,
                                isCancell:cre[i].unselect,
                                ID:cre[i]._id});
              if (stDate>=cre[i].stTime && stDate<=cre[i].edTime ||edDate>=cre[i].stTime && edDate<=cre[i].edTime )
                  flag=0;
          }
          console.log(flag);
          if (flag==0)
          {
              error="时段交叉";
              render();
          }
          courseTimeModel.create({stTime:stDate,edTime:edDate,select:isChoose,unselect:isCancell},function(err,re){
              if (err)
              {
                  console.log(err);
                  error="搜索错误";
                  render();
              }              
              else
                  console.log(re);
              choose_time.push({start_time:stDate.format('yyyy-MM-dd'),end_time:edDate.format('yyyy-MM-dd'),isChoose:isChoose,isCancell:isCancell,ID:re._id});
              console.log(choose_time);
              render();
          });         

      });     
  }
  else if (req.body.type=='delete')
  {
      courseTimeModel.delete({_id:req.body.id},function(err,re){
          if (err)
          {
              error="搜索错误";
              console.log(err);
              render();
          }
          else
            console.log(re);
          courseTimeModel.find({},function(err,cre){
              if (err)
              {
                  console.log(err);
                  error='搜索错误';
                  render();
              }                  
              else
                  console.log(cre);             
              for (var i=0;i<cre.length;i++)
              {
                  choose_time.push({start_time:cre[i].stTime.format('yyyy-MM-dd'),
                                    end_time:cre[i].edTime.format('yyyy-MM-dd'),
                                    isChoose:cre[i].select,
                                    isCancell:cre[i].unselect,
                                    ID:cre[i]._id});
              }
              console.log(choose_time);
              render();
          });

      });
  }
  else
  render();


});

module.exports = router;