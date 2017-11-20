var fs = require('fs');
var path = require('path');
var url1 = require('url');
var template = require('art-template');
var formidable = require('formidable');
var form = require('./form.js');
var modal = require('./model.js');
var path = require('path');

//导入自定义的两个模块
var readAtoA1 = require('./readAtoA');
var render1 = require('./render');

module.exports.showhero = function (req,res) {
  readAtoA = readAtoA1;
  render = render1;
}
module.exports.addhero = function (req,res) {
  form(req,function (obj) {
    modal(res, obj, function (err) {
      //1.function 实参   err形参
      res.end(err);
    });
  })
}

