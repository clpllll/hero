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
    modal.addHero(res, obj, function (err) {
      //1.function 实参   err形参
      res.end(err);
    });
  })
}
module.exports.infohero = function (req,res,id) {
  //查询全部数据
  modal.getJsonData(function (err, data) {
    if (err) {
      res.end(JSON.stringify({
        err_code: 500,
        err_message:err_message
      }))
    }
    data.heros.some(function (item) {
      if (item.id == id) {
        //调用模板渲染数据 item
        var htmlName = "heroInfo.html";
        render1(res,htmlName,item);
        return true;
      }
    })
    // console.log(data.heros);
  })

  //查询对应id的数据
  //调用模板渲染数据

}

module.exports.heroEdit = function (req,res,id) {
  //获取数据填入页面
   //查询全部数据
   modal.getJsonData(function (err, data) {
    if (err) {
      res.end(JSON.stringify({
        err_code: 500,
        err_message:err_message
      }))
    }
    data.heros.some(function (item) {
      if (item.id == id) {
        //调用模板渲染数据 item
        var htmlName = "heroEdit.html";
        render1(res, htmlName, { hero: item });
        return true;
      }
    })
    // console.log(data.heros);
  })

  
}
module.exports.updatehero = function (req,res,callback) {
  form(req, function (obj) {
    //查询数据
    console.log(obj);
    modal.getJsonData(function (err,data) {
      if (err) {
        throw err;
      }
      
      data.heros.some(function (item) {
        if (item.id == obj.id) {
          data.heros.splice((item.id-1), 1, obj);
          console.log(data);
          
          return true;
        }
      })
      modal.savehero(data, function (err) {
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
  })
}
module.exports.delhero = function (req,res,id,callback) {
  //查询数据
  modal.getJsonData(function (err,data) {
    console.log(data);
    //删除对应id的数据
    data.heros.splice(id-1, 1);
    //之后的id前移一位
    data.heros.forEach(function (item) {
      if (item.id > id) {
        item.id -= 1;
      }
    });
    modal.savehero(data, function (err) {
      callback(err);
    })
    
  })
  
}

