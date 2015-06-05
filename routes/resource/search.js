/**
 * Created by Gnnng on 6/5/15.
 */

var router = require('express').Router();
var cache_slide_course_data = require('./course').cache_slide_course_data;

router.get('/',
  require('./course').cache_courseList,
  require('./course').cache_slide_course_data,
  function (req, res, next) {
  var render_data = {
    //current_cid   : decodeURIComponent(req.query.cid),
    current_cid   : '',
    slide_course  : req.session.slide_course,
    path_prefix   : 'feedback'
  };
  res.render('resource/search', render_data);
});

exports.router = router;