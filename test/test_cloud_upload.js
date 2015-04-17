/**
 * Created by Gnnng on 4/17/15.
 */
var should = require('should');
var request = require('request');
var async = require('async');
var fs = require('fs');

var serverHost = 'http://localhost:3000';

describe('POST /resource/cloud/upload', function () {
  it('upload a file', function (done) {
    var formData = {
      file: fs.createReadStream(__dirname + '/../Makefile')
    };
    request.post({
      url: serverHost + '/resource/cloud/upload',
      formData: formData
    }, function (err, res, body) {
      should.not.exists(err);
      done();
    })
  })
});