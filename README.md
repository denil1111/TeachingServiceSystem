# TeachingServiceSystem Group2 自动排课

## 使用说明

### 1.依赖关系安装

npm install

### 2.运行

npm start

### 3.运行前将下面的内容复制到目录下的settings.js文件

```javascript
  module.exports = {
    db : {
      // modify the line below
      connect : 'mongodb://segroup2:segroup2@ds041168.mongolab.com:41168/group2'
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
