# TeachingServiceSystem Group2
## 使用说明

### 1.依赖关系安装
 npm install

### 2.运行
 npm start

### 3.运行前将下面的内容复制到目录下的settings.js文件

  module.exports = {
    db : {
      // modify the line below
      connect : 'mongodb://tsgroup6:tsgroup6@ds061731.mongolab.com:61731/group6'
    }
  }

### 4.数据库使用说明    

* 使用了mongolab的云数据库服务，账号密码都是segroup2。可以利用命令行工具批量导入数据，方便测试。具体导入和导出方法可以参见mongolab网站。

* 目前成绩统计里使用了segroup2数据库下的grades Collection. 大家可暂时在mongolab上建立自己的collection来作测试。

* 查找和使用数据的例子可以参考 routes/grades.js 与 views/grades.ejs
* 更多例子可以参考 db/dbDemo/ 下的文件

### 5.Group2页面文件说明

  * views/classLists.ejs  课程列表（教师）
  * views/classManagement.ejs  课程管理(教师)
  * views/grades.ejs  成绩统计（学生）
  * views/gradesAnalysis.ejs  成绩分析（学生）
  * views/testSearch.ejs  考试查询（学生）
  * views/tutorial.ejs  培养方案（学生）
  * views/gradesAudit.ejs  成绩审核（管理员）
  * views/slide_grades.html  侧边栏
  * views/navbar.html  导航栏

  模板元素参考 : http://beer2code.com/themes/core-admin-3/pages/dashboard/dashboard.html

### 6.其他文件说明

routes/grads.js  处理后端数据库连接与路由
settings.js 连接数据库
