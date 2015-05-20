var express = require('express');
var router = express.Router();
var dbtest = require('./dbtest');
/* GET home page. */
router.get('/',function(req, res, next) {
  res.send('this is a test');
});
router.use('/dbtest',dbtest);
//router.use('/findByModel',findByModel);
module.exports = router;
