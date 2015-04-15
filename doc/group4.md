# Group4 文档

Group4 内部共享信息

> 1. 修改时添加修订说明
> 2. 修改完确认本文档能正常渲染显示之后再 push
> 3. 本文使用 Markdown 写作，请熟悉之后再修改

# 修订说明

- `2015.4.14`**Gnnng**:创建文档
- `2015.4.14`**lyt9304**:添加当前路由说明
- `2015.4.15`**Gnnng**:修改路由说明，简化文本，增加"Git 使用"和“代码规范”

# 路由说明

> 按照这样的格式修改，不要太冗长，只是简单说明

- `/resource`
    - `/` 默认路由，保留用作跳转
    - `/cloud`
        - `/` 个人网盘页面
        - `/search` 公开资源搜索页面，热门资源展示
    - `/course` 
        - `/` 课程资源，上传下载
        - `/info` 课程信息
        - `/homework` 作业提交
        - `/feedback` 反馈信息
    - `/config` 

#### 注：
1. 上述只是确定大致结构，具体路由和代码实现有关
2. 本周的两个工作
    1. GridFS, 在 `/cloud` 下完成
    2. 基本完成 `/course` 下的内容

<!-- 

    To lyt: 按照格式修改补充到上面的路由说明之后，可以删除掉这些内容

## 访问小组主页
http://localhost:3000/resource

会跳转到courseInfo.ejs这个界面

## 资源共享主界面
目前只有软工这个课程作为演示界面

1. 课程信息 http://localhost:3000/resource/info
2. 课程资源 http://localhost:3000/resource/resource
3. 作业提交 http://localhost:3000/resource/homework
4. 我的资源管理 http://localhost:3000/resource/myresource
5. 课程反馈 http://localhost:3000/resource/feedback

## 管理员操作
1. 修改课程信息 http://localhost:3000/resource/admin_changeinfo
2. 管理资源 http://localhost:3000/resource/admin_resource
3. 批改作业 http://localhost:3000/resource/admin_homework
4. 查看反馈 http://localhost:3000/resource/admin_feedback

## 资源搜索
http://localhost:3000/resource/search
 -->

# Git 使用

## 注意事项

1. 在 `git push` 之前，确认以下事项：
    1. 确认当前版本代码已经经过测试
    2. 不要上传过大的资源文件
    3. 无关文件不要添加

# 代码规范

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



