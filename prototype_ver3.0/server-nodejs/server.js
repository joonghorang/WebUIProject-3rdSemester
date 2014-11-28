var express = require("express");
var formidable = require("formidable");
var pickImpColor = require("./controllers/pickImpColor.js");
var fs = require("fs");
var mime = require("mime");

var app = express();

//static 폴더 위치
var static = __dirname + '/static';
app.use(express.static(static));
//render할 파일을 어디서 읽어올거냐
app.set('views', __dirname + '/views');
//render할 파일 엔진이 뭐냐
app.engine('.html', require('ejs').__express);
//app.set('view engine', 'jade');

app.get(['/', '/index'], function(req, res){
    res.render("index.html");
});
app.get('/colorLab', function(req, res){
    
});
app.post('/itemFactory', function(req, res){
    
});
app.post('/itemFactory/image', function(req, res){
    res.send(200);
});
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}