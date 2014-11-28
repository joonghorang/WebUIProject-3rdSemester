var express = require('express');
var multer = require('multer');
var app = express();
app.use(multer({
 
          dest: './uploads/'
 
}));

var uploads = require('./routes/uploads.js');
app.use('/uploads', uploads);