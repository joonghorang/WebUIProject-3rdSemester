var express = require('express');
var app = express();

// this middleware will not allow the request to go beyond it
app.use(function(req, res, next) {
  res.send('Hello World');
})

// requests will never reach this route
app.get('/', function (req, res) {
  res.send('Welcome');
})
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});