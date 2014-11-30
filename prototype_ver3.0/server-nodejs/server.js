var express = require("express");
var formidable = require("formidable");
var pickColors = require("./controllers/pickImpColor.js");
var Canvas = require("canvas");
var Image = Canvas.Image;
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
    
    var form = new formidable.IncomingForm();
    
    form.parse(req, function(err, fields, files){
        if(err){
            console.log(err);
        }else{
            var imageFile = fs.readFileSync(files.image.path);
            var img = new Image();
            img.src = imageFile;
            console.log(img.width);
            console.log(img.height);
            var canvas = new Canvas(img.width, img.height);
            var ctx = canvas.getContext('2d');
            
            ctx.drawImage(img, 0, 0);
//            ctx.getImageData(0,
            res.send(pickColors.pickColors(canvas));
            
        }
        
//        console.log("Parsing Done."); 
//        var outputData = {"text" : fields.text};
//        console.log(files.image.path);
//        fs.writeFileSync('./uploads/output.jpg', fs.readFileSync(files.image.path));
////        fs.readFile(files.image.path, function(err, data){
////            console.log("Read File.");
////            fs.writeFile('./uploads/output.jpg', data, function(err){
////                console.log("Write File.");
////            });
////        });
////        
//        //var colorDatas = imageProcess.getColors();
//        fs.writeFile('./uploads/output.json', JSON.stringify(outputData, null, 4), function(err) {
//            if(err) {
//                console.log(err);
//            }else{
//                console.log("JSON saved to " + "output.json");
//            }    
//        }); 
    });
});
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}