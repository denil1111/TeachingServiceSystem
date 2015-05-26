# TeachingServiceSystem
## 使用说明
代码下载后
npm install
npm start
可以运行网站


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


#login具体使用
首先 我给各位所有的基本路由上都判定了是否登陆，所以大家这个可以不用加了，如果需要取消，可以在index.js里改！
其次，大家想保证登陆用户的类型的话，验证函数在routes／basic／auth里都有，请自己选择。
如果想获取当前用户的信息，就在req.session.user里。
在mongo里手动添加用户的collection是persons


