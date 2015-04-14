# Group4 文档

Group4 内部共享信息

> 修改时添加修订说明

# 修订说明

- `2015.4.14`**Gnnng**:创建文档
- `2015.4.14`**lyt9304**:添加当前路由说明


# 路由说明

- /resource
  - /route1
    - /subroute1-1
  - /route2
    - /subroute1-2


为了测试方便，直接在routes/resource.js中自己随便编造了点0 0

##访问小组主页
http://localhost:3000/resource

会跳转到courseInfo.ejs这个界面

##资源共享主界面
目前只有软工这个课程作为演示界面

1. 课程信息 http://localhost:3000/resource/info
2. 课程资源 http://localhost:3000/resource/resource
3. 作业提交 http://localhost:3000/resource/homework
4. 我的资源管理 http://localhost:3000/resource/myresource
5. 课程反馈 http://localhost:3000/resource/feedback

##管理员操作
1. 修改课程信息 http://localhost:3000/resource/admin_changeinfo
2. 管理资源 http://localhost:3000/resource/admin_resource
3. 批改作业 http://localhost:3000/resource/admin_homework
4. 查看反馈 http://localhost:3000/resource/admin_feedback

##资源搜索
http://localhost:3000/resource/search



