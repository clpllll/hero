//定义收到直接返回不用处理数据页面的函数
var fs = require('fs');
var path = require('path');
module.exports= function(req, res) {
  // console.log(path.join(__dirname, req.url));
  fs.readFile(path.join(__dirname, req.url), function (err, data) {
    if (err) {
      res.end('404 no found')
    }
    res.end(data);
  })
}