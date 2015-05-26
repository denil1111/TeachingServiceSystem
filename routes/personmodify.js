var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var formidable = require('formidable');
var fs = require('fs');

router.get('/personmodify', function(req, res,next) {
    if(!req.session.user){return res.redirect('login');}
    res.render('personmodify',{
        name: '程序员', 
        image: 'images/avatars/avatar3.jpg',
        total_a:'12',
        a:'2,3,1,2,3,1,0',
        total_b:'24',
        b:'4,6,2,4,6,2,0',
        total_credits:'24',
        credits:'4,6,2,4,6,2,0',

        modifyresult:'请提交表单'
    });
});

router.post('/personmodify',function(req,res,next){
    console.log("post:personmodify");
    // var db = mongoose.createConnection('mongodb://127.0.0.1:27017/person');
    var PersonModel = require('../db/group1db/PersonModel');
    // var CollectionName = 'people';
    // var PersonModel = db.model('PersonModel',PersonSchema,CollectionName);
    var form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8';		//设置编辑
    form.uploadDir = 'public/images';//设置上传目录
    form.keepExtensions = true;	 // 保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;//文件大小
    form.parse(req, function(err, fields, files)
    {
        if (err) {
            res.locals.error = err;
            console.log("Err:formidable.parse fail");
            res.render('personmodify',{
                name: '程序员',
                image: 'images/avatars/avatar3.jpg',
                total_a:'12',
                a:'2,3,1,2,3,1,0',
                total_b:'24',
                b:'4,6,2,4,6,2,0',
                total_credits:'24',
                credits:'4,6,2,4,6,2,0',
                insertresult:'表单解析失败'
            });
            fs.unlink(files.fulAvatar.path);
            return;
        }
        var extName = '';//后缀名
        switch (files.fulAvatar.type)
        {
            case 'image/pjpeg':				extName = 'jpg';break;
            case 'image/jpeg':				extName = 'jpg';break;
            case 'image/png':				extName = 'png';break;
            case 'image/x-png':				extName = 'png';break;
        }
        if(extName.length == 0){
            console.log("Err:invalid image type");
            res.render('personmodify',{
                name: '程序员',
                image: 'images/avatars/avatar3.jpg',
                total_a:'12',
                a:'2,3,1,2,3,1,0',
                total_b:'24',
                b:'4,6,2,4,6,2,0',
                total_credits:'24',
                credits:'4,6,2,4,6,2,0',
                insertresult:'只支持png和jpg格式图片'
            });
            fs.unlink(files.fulAvatar.path);
            return;
        }
        //console.log(files.fulAvatar);
        if(files.fulAvatar.size > 1000000){
            console.log("Err:Too large image ");
            res.render('personmodify',{
                name: '程序员',
                image: 'images/avatars/avatar3.jpg',
                total_a:'12',
                a:'2,3,1,2,3,1,0',
                total_b:'24',
                b:'4,6,2,4,6,2,0',
                total_credits:'24',
                credits:'4,6,2,4,6,2,0',
                insertresult:'图片大小不能超过1000,000'
            });
            fs.unlink(files.fulAvatar.path);
            return;
        }
        var data = fs.readFileSync(files.fulAvatar.path);
        var b64data="data:image/gif;base64,"+data.toString('base64');
        fs.unlink(files.fulAvatar.path);
        var doc = {
            photo: b64data,
            username : fields.username,
            status : fields.status,
            sex : fields.sex,
            age : fields.age,
            major : fields.major,
            college : fields.college,
            title : fields.title,
            tel : fields.tel,
            email : fields.email
        };
        console.log("doc:"+doc.username);
        PersonModel.modifybyname(doc,function(err,data){
            if(err){
                console.log("modify err : "+err);
                res.render('personmodify',{
                    name: '程序员',
                    image: 'images/avatars/avatar3.jpg',
                    total_a:'12',
                    a:'2,3,1,2,3,1,0',
                    total_b:'24',
                    b:'4,6,2,4,6,2,0',
                    total_credits:'24',
                    credits:'4,6,2,4,6,2,0',

                    modifyresult:'用户修改失败！'
                })
            }
            else{
                console.log('data'+data);
                console.log('Update Model OK!');
                console.log(doc.username);
                res.render('personmodify',{
                    name: '程序员',
                    image: 'images/avatars/avatar3.jpg',
                    total_a:'12',
                    a:'2,3,1,2,3,1,0',
                    total_b:'24',
                    b:'4,6,2,4,6,2,0',
                    total_credits:'24',
                    credits:'4,6,2,4,6,2,0',

                    modifyresult:'用户修改成功！'
                });
            }
        });
    });



});

module.exports = router;