# TeachingServiceSystem Group2 自动排课

## 使用说明

### 1.依赖关系安装

npm install

### 2.运行

npm start
<<<<<<< HEAD
可以运行网站

## 默认的用户名和密码
ID:02
password:123456

## 选课
/course 访问选课页面

## 用户登录
/info/login

##用户添加
/info/personinsert

##用户删除(by username)
/info/persondelete

##用户查询(by username)
/info/personselect

##用户修改(by username)
/info/personmodify

session使用说明
session内带有user信息，直接使用req.session.user即可
例如，需要登录用户才能访问当前页面(否则重定向到login, infn/login)，可如下编程：
router.get('/personselect', function(req, res, next) {
	if(!req.session.user){return res.redirect('login');}
	...
}

PersonModel的使用：
1 原PersonSchema已经移除，现直接调用PersonModel即可；
2 具体使用方法
	var PersonModel = require('../db/group1db/PersonModel');	//在js的开头（不要再函数内部）require PersonModel
	PersonModel.findbyname(username,function (err, user) {		//调用PersonModel方法，username是输入参数，err,user分别是返回错误信息和用户信息
		...
	}
3 PersonModel静态在./db/group1db/PresonModel.js中有定义，如果各小组有其他方法需求，请联系A1小组组长葛现隆

CourseModel的使用：
1 原CourseSchema已经移除，现直接调用PersonModel即可；
2 具体使用方法
	var CourseModel = require('../db/group1db/CourseModel');	//在js的开头（不要再函数内部）require PersonModel
	CourseModel.findbyid(courseid,function (err, course) {		//调用PersonModel方法，username是输入参数，err,user分别是返回错误信息和用户信息
		...
	}
3 CourseModel静态在./db/group1db/CourseModel.js中有定义，如果各小组有其他方法需求，请联系A1小组组长葛现隆

实例请参考route下personinsert.js, courseinsert.js等文件

Person使用数据库 'mongodb://127.0.0.1:27017/info'下的persons collections
Course使用数据库 'mongodb://127.0.0.1:27017/info'下的courses collections
=======

### 3.运行前将下面的内容复制到目录下的settings.js文件

```javascript
  module.exports = {
    db : {
      // modify the line below
      connect : 'mongodb://127.0.0.1:27017/info'
    }
  }
```

### 4.数据库使用说明

* 使用了mongolab的云数据库服务，账号密码都是segroup2。可以利用命令行工具批量导入数据，方便测试。具体导入和导出方法可以参见mongolab网站。
* 目前`教室信息`里使用了segroup2数据库下的`classroom`Collection. 大家可暂时在mongolab上建立自己的collection来作测试。
* 查找和使用数据的例子可以参考 routes/arrange.js 与 views/arrange_classroom_information.ejs
* 更多例子可以参考 db/dbDemo/ 下的文件

### 5.Group2页面文件说明

* views/arrange 自动排课
* views/arrange_course_information 课程信息
* views/arrange_course_management 课程管理
* views/arrange_classroom_information 教室信息

模板元素参考 : http://beer2code.com/themes/core-admin-3/pages/dashboard/dashboard.html

### 6.其他文件说明

* routes/arrange.js  处理后端数据库连接与路由
* settings.js 连接数据库
>>>>>>> c4b3da3247712db836a7ab3297e916fd5c270869
