var express = require('express');

var static = __dirname + '/static';
var app = express();

app.use(express.static(static));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function(req, res){
  res.render('index');
});

if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}