/**
 * Created by Gnnng on 5/26/15.
 */
var mongoose = require('../node_modules/mongoose');
var settings = require('../settings');

var PersonModel = require('../db/group1db/PersonModel');

mongoose.connect(settings.db.connect);

var doc = {
  photo     : '',
  userid    : '312',
  username  : 'wtf',
  password  : '312',
  status    : '系统管理员',
  sex       : '',
  age       : '',
  major     : '',
  college   : '',
  title     : '',
  tel       : '',
  email     : ''
};

PersonModel.create(doc, function(err, data) {
  if (err)
    console.error(err);
  else
    console.log('Successfully add user: ' + doc.userid + ':' + doc.password);
  mongoose.disconnect();
});