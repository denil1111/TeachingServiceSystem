# Group4 文档

Group4 内部共享信息

> 1. 修改时添加修订说明
> 2. 修改完确认本文档能正常渲染显示之后再 push
> 3. 本文使用 Markdown 写作，请熟悉之后再修改
> 4. 请关注“进度情况”

# 1 修订说明

- `2015.4.14`**Gnnng**:创建文档
- `2015.4.14`**lyt9304**:添加当前路由说明
- `2015.4.15`**Gnnng**:修改路由说明，简化文本，增加"Git 使用"和"代码规范""
- `2015.4.17`**Gnnng**:增加"进度情况"，"如何测试"和"GridFS说明"
- `2015.4.19`**Gnnng**:补充细节到"如何测试"
- `2015.4.20`**Gnnng**:删除冗余信息，增加第二周任务

# 2 路由说明

> 按照这样的格式修改，不要太冗长，只是简单说明

- `/resource`
    - `/` 默认路由，保留用作跳转
    - `/cloud`
        - `/` 个人网盘页面
        - `/search` 公开资源搜索页面，热门资源展示
    - `/course` 默认跳转`/data`
        - `/data` 课程资源，上传下载
        - `/info` 课程信息
        - `/homework` 作业提交
        - `/feedback` 反馈信息
    - `/config` 

#### 注：
1. 上述只是确定大致结构，具体路由和代码实现有关

# 3 Git 使用

## 注意事项

1. 在 `git push` 之前，确认以下事项：
    1. 确认当前版本代码已经经过测试
    2. 不要上传过大的资源文件
    3. 无关文件不要添加

# 4 代码规范

## 缩进

1. js 文件统一缩进单位为2个空格
2. 其它文件暂不要求，如果需要别人按照自己的要求修改，在这里列出

## 注释

1. 多写注释
1. `//TODO need to be done`，用这样的注释来表示功能未完成
2. `//FIXME need to be fixed`，表示有bug需要修复

## 修改他人代码

1. 不能确定别人代码是否无用，暂时将其注释
2. 经过他人同意，再直接删除


# 5 进度情况

## 第一周(4.13-4.19)

### 任务1 GridFS

> gdl

- 两个API接口
    - `/resource/cloud/upload` POST 简单实现demo
    - `/resource/cloud/download/:filename` GET 简单实现demo
- cloud页面后台
    - `/resource/cloud/` GET 
- cloud上传测试页面
    - `/resource/cloud/upload` GET 用于文件上传测试
- 如何验证
    - 访问测试页面上传文件
    - 访问cloud页面检查内容
    - 点击下载按钮下载
- 存在问题
    1. GridFS 中可以存入相同名字的文件，目前都会显示在cloud上
    2. 没有登录验证
    
### 任务2 前端页面

- 基础页面设计

> 请 lyt 补充页面设计的内容

## 第二周(4.20-4.27)

### 任务1 需求报告

任务分配:

- gdl

### 任务2 页面改进

任务分配:

- lyt

内容:

1. 改侧栏，课程列表+资源库按钮 
2. cloud页面（加强：文件夹）
3. 页面冗余结构，前端小组讨论
4. 加上ejs和后台交互

### 任务3 文件上传下载-进阶

任务分配：

- zyh
- gt

内容：

1. **完成**多文件上传测试
    - 在`resource/cloud/upload`有一个测试页面，在此处完成
2. **确定**GridFS中文件的`metadata`内容
    - 即属性
    - 包含权限，创建日期，虚拟路径等
3. **初步完成**`resource/cloud`页面
    - 即个人网盘页面
    - 配合前端修改
4. **初步完成**`resource/course`页面
    - 暂时不区分“教师”和“学生”两个角色
    - `/data` 课件显示，课件上传，下载
    - `/homework` 已上传作业显示，作业上传，下载
    - `/feedback` 反馈提交
    - `/info` 课程信息显示（暂缓）

# 6 如何测试

## mocha

这是一个测试框架，首页<http://mochajs.org/>有不少例子可以看。

## 运行测试

> 确保已经 `npm install`

`make` 或者 `mocha`


## 如何编写测试

所有的测试文件都放在`test`目录下，文件名称自定，但是扩展名为`.js`。每个文件都是一个独立的测试集合。

mocha 提供了几个基本的测试方法`describe`, `it`，具体用法可以参考`test_route_of_resource.js`以及官网文档

```
var should = require('should'); //一个断言库
var request = require('request'); //一个用来模拟发起HTTP请求的库
var async = require('async'); //略

describe('These is a test subject', function() {
  it('a test case under current subject', function(done){
    // do some test with 'should'
    
    // then call done() to end this test
    done();
  });
});

```

## 添加路由可用性测试

参考`test_route_of_resource.js`，基本不需要太大的改动。

```javascript
// 直接按照格式添加路由到该文件的数组中
    [
      '/resource',
      '/resource/cloud',
      '/resource/course',
      '/resource/config',
      '/resource/newroute'
    ]
```
# 7 GridFS 说明

官方文档在<https://github.com/aheckmann/gridfs-stream>



