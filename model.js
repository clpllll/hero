var fs = require('fs');
var path = require('path');

//封装读取json的函数
function getJsonData(callback) {
                    //形参
  fs.readFile('./hero.json', 'utf-8', function (err, data) {
    var olddata = JSON.parse(data)
    // console.log(olddata)
    callback(err, olddata);
    //形参    实参

  })
}

//添加数据的模块
function addHero(res, obj, callback) {
                                            //形参
  getJsonData(function (err, olddata) {
              //实参    形参
    obj.id = olddata.heros.length + 1;
    // console.log(olddata)
    // console.log(obj);
    olddata.heros.push(obj);
   
    //重新写入回json中
    savehero(olddata, function (err) {
      if (err) {
        err = {
          err_code: 500,
          err_message:err.message 
        }
        callback(JSON.stringify(err));
      }
      err = {
        success_code: 0,
        err_message:null
      } 
      callback(JSON.stringify(err));
    })
  })
}

function savehero(olddata,callback) {
  var newdata = JSON.stringify(olddata);
  fs.writeFile( path.join(__dirname,'hero.json'),newdata,function (err) {

    callback(err);

  })
}
module.exports.getJsonData = getJsonData;
module.exports.addHero = addHero;
module.exports.savehero = savehero;