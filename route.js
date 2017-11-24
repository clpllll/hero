var fs = require('fs');
var path = require('path');
var url1 = require('url');
var query = require('querystring');
//引入controller
var container = require('./controller.js');


module.exports = function (req, res) {
  req.url = decodeURI(req.url);
  console.log(req.url);
  console.log(req.method);
  container.showhero(req, res);
 


  // console.log(url1.parse(req.url, true));
  //url模块获取url数据 
  var nowurl = url1.parse(req.url, true);
  console.log(nowurl.pathname);
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
    render(res,htmlName,'hero.json');
    
  } else if (req.url.indexOf('/node_modules') === 0&& req.method ==="GET") {

    readAtoA(req,res);
    
  } else if (req.url.indexOf('/public') === 0 && req.method ==="GET") {
    readAtoA(req,res);
  } else if (req.url === "/add" && req.method === "GET") {
    htmlName ='heroAdd.html'
    render(res,htmlName);
  } else if (nowurl.pathname === '/getadd' && req.method === "GET") {

    res.end("请用post");
  } else if (nowurl.pathname === '/getadd' && req.method === "POST") {
    container.addhero(req,res);

   
  } else if (nowurl.pathname === "/heroEdit.html" && req.method === "GET") {
    //提供修改的需要的数据
    container.heroEdit(req,res, nowurl.query.id);
    
  } else if (nowurl.pathname === "/heroEdit.html" && req.method === "POST") {
    //修改完成
    container.updatehero(req, res, function (err) {
      res.end(err);
    });
  } else if (nowurl.pathname === "/heroInfo.html" && req.method === "GET") {
   //接收id 查询对应的数据 渲染页面
    container.infohero(req,res, nowurl.query.id);


  } else if (nowurl.pathname === '/delete' && req.method === 'GET') {
    console.log('hhh');
    container.delhero(req, res, nowurl.query.id, function (err) {
      if (err) {
        throw err;
      } else {
        htmlName = 'heroList.html';
        render(res,htmlName,'hero.json'); 
     }
    })

  }
  
}