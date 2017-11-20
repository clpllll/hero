//建立http服务
var http = require('http');
var server = http.createServer();
//引入controller
var container = require('./controller.js');
var route = require('./route.js');

server.on('request', function (req, res) {
  route(req,res);
});


server.listen(3000,function (err) {
  if (err) {
    throw err
  }
  console.log('成功开启服务');
})