var express = require("express");
var formidable = require("formidable");
//var imgP = require("./controllers/pickImpColor.js");
var imgP = require("./static/js/colorLab/pickImpColor.js");
var Canvas = require("canvas");
var Image = Canvas.Image;
var fs = require("fs");
var mime = require("mime");
var tinycolor = require("tinycolor2");
var path = require("path");

var app = express();

var __basename = path.basename(__filename);
//static 폴더 위치
var static = __dirname + '/static';
app.use(express.static(static));
//동일출처문젠가? 다른 url에서도 이 서버의 url로 ajax요청을 보낼 수 있게함.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//render할 파일을 어디서 읽어올거냐
app.set('views', __dirname + '/views');
//render할 파일 엔진이 뭐냐
app.engine('.html', require('ejs').__express);
//app.set('view engine', 'jade');

//Route
app.get(['/', '/index'], function(req, res){
    res.render("index_sy.html");
});
app.get('/colorLab', function(req, res){
    var fileName = "colorLab-current-image";
    var imageFile = fs.readFileSync(static + '/image/' +fileName);
    
    var img = new Image();
    img.src = imageFile;
    var imageCanvas = imgP.createCanvasByImage(img);
    var colors = imgP.pickColors(imageCanvas);
    var hsvHistData = imgP.histogram("hsv", imageCanvas);
    var pickedHues = imgP.pickPeaks(imgP.smoothing(hsvHistData, 7));
    var pickedColors = [];

    for(var i = 0; i< pickedHues.length; ++i){
        pickedColors[i] = tinycolor({h : pickedHues[i], s :100, v:100}).toHexString();
    }
    
    console.log(JSON.stringify(pickedColors));
    res.render("colorLab.html", {
        "colors" : colors,
        "imageSrc" : '/image/' + fileName, 
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
            //get Image from client
            var imageFile = fs.readFileSync(files.image.path);
            var img = new Image();
            img.src = imageFile;
            
            var pickedColors = imgP.pickColors(img);
            res.send(JSON.stringify(pickedColors));
        
            //for colorLab
            var fileImageData = fs.readFileSync(files.image.path);
            fs.writeFile(static + "/image/colorLab-current-image", fileImageData, function(err){
                if(err){ 
                    console.log( __basename + " [err]  - test for ColorLab image save Err");
                }else{
                    console.log( __basename + " [good] - test for ColorLab image saved");
                }
            });
            fs.writeFile(static + "/image/uploaded/" + files.image.name, fileImageData, function(err){
                if(err){
                    console.log(__basename + " [err]  - test for ColorLab image save Err");
                }else{
                    console.log(__basename + " [good] - test for ColorLab image saved");
                }
            });          
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