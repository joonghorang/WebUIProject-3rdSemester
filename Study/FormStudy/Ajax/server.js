var express = require("express");
var app = express();
var routes = require("routes");
app.use('/uploads', function bodyParser(req, res, next){
    next();
});

//     express.bodyParser({
//         keepExtensions: true, uploadDir: __dirname + "/uploads/uploads/" 
//     })
// );
// app.use('/foo', function fooMiddleware(req, res, next) {
//   // req.url starts with "/foo"
//   next();
// });
app.post('/photoUpload', routes.photoHandler);

exports.photoHandler = function(req, res) {
    var photoInfo = req.files.photo;
    var dummyJSON = {"name" : photoInfo.name, "size" : photoInfo.size, "path" : "/uploads/" + photoInfo.name};
    var strJSON = JSON.stringify(dummyJSON);
    res.end(strJSON);
};