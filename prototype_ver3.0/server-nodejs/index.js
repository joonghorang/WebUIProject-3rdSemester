var express = require("express");
var reqHandlers = require("./requestHandlers.js");
var formidable = require("formidable");
var fs = require("fs");

var app = express();

//static 폴더 위치
var static = __dirname + '/static';
app.use(express.static(static));
//render할 파일을 어디서 읽어올거냐
app.set('views', __dirname + '/views');
//render할 파일 엔진이 뭐냐
app.set('view engine', 'jade');

app.get(['/', '/index'], reqHandlers.index);
app.get('/colorLab', reqHandlers.colorLab);
app.post('/upload', reqHandlers.upload);

if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}