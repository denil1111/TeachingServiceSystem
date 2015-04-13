var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
	res.render('OnlineTest/teaManage',{
		name: '老程序猿',
		image: 'images/avatars/avatar1.jpg'
	});
});

module.exports = router;