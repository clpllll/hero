var path = require('path');
var fs = require('fs');
var template = require('art-template');
//函数
module.exports = function (res, htmlName, json) {

  // console.log(path.join(__dirname, 'views', htmlName));
  fs.readFile(path.join(__dirname,'views',htmlName), 'utf-8', function (err, htmldata) {
    // console.log(path.join(__dirname, 'views/heroList.html'));
    if (err) {
      res.end('404 no found');
    }
    // res.end(data);
    console.log("json" + json);
    console.log(typeof (json));
    if (typeof (json) !== 'string') {
      console.log('bbb');
      res.end(template.compile(htmldata)(json));
      // return;
    } else {
      console.log('aa');
      fs.readFile(path.join(__dirname, json),'utf-8', function (err,jsondata) {
        if (err) {
          res.end('404 no found json');
        }
        // console.log(JSON.parse(jsondata));
        // res.end(jsondata)
      res.end(template.compile(htmldata)(JSON.parse(jsondata)));
      })
    }

  })
  
}