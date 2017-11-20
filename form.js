var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
  module.exports = function(req,callback) {
    //接收form表单提交的数据
  //创建form实例
  var form = new formidable.IncomingForm();
  //把临时图片保存下来
  form.uploadDir = path.join(__dirname, '/public/images');
  //保持文件的后缀名
  form.keepExtensions = true;
  //解析form的数据
  form.parse(req, function (err, fields, files) {

    var oldpath = files.icon.path;
    var newpath = path.join(form.uploadDir, files.icon.name);
    fs.rename(oldpath, newpath, function (err) {
      if (err) {
        throw err;
      }
      var obj = {
        name: fields.name,
        gender: fields.gender,
        icon:path.join('/public/images',files.icon.name)
      }
      callback(obj);
    })
  })
}
