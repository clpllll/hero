var fs = require('fs');
var path = require('path');
var url1 = require('url');
var query = require('querystring');
//引入controller
var container = require('./controller.js');


module.exports = function (req, res) {
  req.url = decodeURI(req.url);
  // console.log(req.url);
  container.showhero(req,res);


  // console.log(url1.parse(req.url, true));
  //url模块获取url数据 
  var nowurl = url1.parse(req.url, true);
  // console.log(req.url);
  // console.log(nowurl);
  /**Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '',
  query: {},
  pathname: '/heroEdit.html',
  path: '/heroEdit.html',
  href: '/heroEdit.html' }
  */
  if (req.url === '/') {
    var htmlName = 'heroList.html';
    render(res,htmlName);
    
  } else if (req.url.indexOf('/node_modules') === 0&& req.method ==="GET") {
    // console.log(path.join(__dirname, req.url));
    readAtoA(req,res);
    
  } else if (req.url.indexOf('/public') === 0 && req.method ==="GET") {
    readAtoA(req,res);
  } else if (req.url === "/add" && req.method === "GET") {
    htmlName ='heroAdd.html'
    render(res,htmlName);
  } else if (nowurl.pathname === '/getadd' && req.method === "GET") {
    // console.log('heheh');
    // console.log(JSON.stringify(nowurl.query));
    res.end("请用post");
  } else if (nowurl.pathname === '/getadd' && req.method === "POST") {
    container.addhero(req,res);

   
  } else if (nowurl.pathname === "/heroEdit.html" && req.method === "GET") {
    //提供修改的需要的数据
    // console.log('hh');
  } else if (nowurl.pathname === "/heroEdit.html" && req.method === "POST") {
    //修改完成
  } else if (nowurl.pathname === "/heroinfo.html" && req.method === "GET") {
    //提供英雄的详细数据
  }
  
}