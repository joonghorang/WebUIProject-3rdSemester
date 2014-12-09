var express = require("express");
var path = require("path");
var formidable = require("formidable");
var app = express();
var html = require("html");
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// app.get(['/'], function(req, res){
//     res.render("test.html");
// });

app.get(['/upload'], function(req, res){
    res.render("test1.html");
});

app.post('/upload',function(request,response){
    var form = new formidable.IncomingForm();
    form.parse(request, function(err, fields, files){
        if(err){
            console.log(err);
            console.log("error");
        }else{
            console.log(fields);
            console.log(files);
        }
    });
});
// app.post('/upload', function(req, res){
    
//     var form = new formidable.IncomingForm();
    
//     form.parse(req, function(err, fields, files){
//         if(err){
//             console.log(err);
//         }else{
//             console.log(fields);
//             console.log(files);
//             //get Image from client
//             // var imageFile = fs.readFileSync(files.image.path);
//             // var img = new Image();
//             // img.src = imageFile;
            
//             // var pickedColors = imgP.pickColors(img);
//             // res.send(JSON.stringify(pickedColors));
//         }
//     });
// });
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}