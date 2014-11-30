var express = require('express');					// 1.express를 불러옴 
var app = express();								//  2.express를 생성함. 

app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(8888);									// 3000번 포트를 listen()
console.log('Express started on port 8888');		// 그리고 3000번 이라고 알려준다. 