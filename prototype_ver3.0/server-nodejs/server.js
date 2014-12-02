var express = require("express");
var formidable = require("formidable");
var imgP = require("./controllers/pickImpColor.js");
var Canvas = require("canvas");
var Image = Canvas.Image;
var fs = require("fs");
var mime = require("mime");
var tinycolor = require("tinycolor2");

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
    res.render("index_sy.html");
});
app.get('/colorLab', function(req, res){
    var imageFile = fs.readFileSync(static + '/image/9.jpg');
    
    var img = new Image();
    img.src = imageFile;
    var imageCanvas = imgP.createCanvasByImage(img);
    var colors = imgP.pickColors(imageCanvas);
    var hsvHistData = imgP.histogram("hsv", imageCanvas);
    var pickedHues = imgP.pickPeaks(imgP.smoothing(hsvHistData, 7));
    var pickedColors = [];
    for(var i = 0; i< pickedHues.length; ++i){
        pickedColors.push(tinycolor({h : pickedHues[i], s :100, v:100}).toHexString());
//        pickedColors.push({"r":rgb.r,
//                           "g":rgb.g,
//                           "b":rgb.b,
//                           "a":rgb.a});
    }
    console.log(JSON.stringify(pickedColors));
    res.render("colorLab.html", 
               {"colors" : colors,
                "imageSrc" : '/image/9.jpg', 
                "histData" : hsvHistData,
                "pickedColors" : pickedColors });
    
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
            res.send(imgP.pickColors(canvas));
            
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