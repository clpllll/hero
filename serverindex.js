//建立http服务
var http = require('http');
var server = http.createServer();
var fs = require('fs');
var path = require('path');
var url1 = require('url');
var template = require('art-template');
var query = require('querystring');
var formidable = require('formidable');
server.on('request', function (req, res) {
  req.url = decodeURI(req.url);
  // console.log(req.url);

  // console.log(url1.parse(req.url, true));
  var nowurl = url1.parse(req.url,true)
  // console.log(req.url);
  // console.log(nowurl);
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
    // console.log('aaa');
    // var data = "";
    // //介绍post提交的代码块
    // req.on('data', function(chunk){
    //   data += chunk;
    //   //代码块发完执行的函数
    //   req.on('end', function () {
    //     // console.log(data);
    //     //解析代码块
    //     console.log(query.parse(data));

        
    //   })
    // })
    //接收传递的数据 
    //把图片保全下来 
     //把数据保存到json中
    var form = new formidable.IncomingForm();
    //设置图片的保存路径
    form.uploadDir = path.join(__dirname, '/public/images');
    //添加
    form.keepExtensions = true;
    form.parse(req, function (err, fields, files) {
      // console.log(fields);
      // console.log(files);
      //改变图片的名字
      var oldpath = files.icon.path;
      var newpath = path.join(form.uploadDir,files.icon.name)
      // console.log(oldpath);
      fs.rename(oldpath, newpath, function (err) {
        if (err) {
          throw err;
        }
        //改完名字后把数据 取出json 修改后保存回json中
        fs.readFile('./hero.json', 'utf-8', function (err, data) {
          var olddata = JSON.parse(data)
          // console.log(olddata)
          var obj = {
            id: olddata.heros.length + 1,
            name: fields.name,
            gender: fields.gender,
            icon:path.join('/public/images',files.icon.name)
          }
          // console.log(obj);
          olddata.heros.push(obj);
          var newdata = JSON.stringify(olddata);
          //重新写入回json中
          fs.writeFile( path.join(__dirname,'hero.json'),newdata,function (err) {
            if (err) {
              res.end(JSON.stringify({
                err_code: 500,
               err_message:err.message 
             }))
            }
            res.end(JSON.stringify({
              success_code: 200
           }))
          })
        })
      })
    })
  }
  
});
//定义收到直接返回不用处理数据页面的函数
function readAtoA(req, res) {
  // console.log(path.join(__dirname, req.url));
  fs.readFile(path.join(__dirname, req.url), function (err, data) {
    if (err) {
      res.end('404 no found')
    }
    res.end(data);
  })
}
//函数
function render(res,htmlName) {
  // console.log(path.join(__dirname, 'views', htmlName));
  fs.readFile(path.join(__dirname,'views',htmlName), 'utf-8', function (err, htmldata) {
    // console.log(path.join(__dirname, 'views/heroList.html'));
    if (err) {
      res.end('404 no found');
    }
    // res.end(data);
    fs.readFile(path.join(__dirname, 'hero.json'),'utf-8', function (err,jsondata) {
      if (err) {
        res.end('404 no found json');
      }
      // console.log(JSON.parse(jsondata));
      // res.end(jsondata)
    res.end(template.compile(htmldata)(JSON.parse(jsondata)));
    })

  })
  
}
server.listen(3000,function (err) {
  if (err) {
    throw err
  }
  console.log('成功开启服务');
})