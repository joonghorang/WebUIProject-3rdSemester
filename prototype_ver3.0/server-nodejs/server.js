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
    var rawHistData = imgP.histogram("hue", imageCanvas, { sL : 0.3, vL : 0.3});
    var resultHistData = imgP.smoothing(rawHistData, 7);
    var cmpHistData = imgP.smoothing(rawHistData, 7, [1,4,6,4,1]);
    var pickedHues = imgP.pickPeaks(resultHistData);
    
    var pickedColors = [];
    for(var i = 0; i< pickedHues.length && i < 5; ++i){
        pickedColors[i] = tinycolor({h : pickedHues[i]["x"], 
                                     s : 
                                     (function(){
                                         var rawSatData = imgP.histogram("sat", imageCanvas, { hL : pickedHues[i]["rangeL"], hR : pickedHues[i]["rangeR"], sL : 0.3, vl : 0.3});
                                         var pickedSats = imgP.pickPeaks(rawSatData);
                                         console.log(pickedSats[0]["x"]);
                                         return pickedSats[0]["x"]; 
                                     })(), 
//                                     (function(){
//                                         var rawSatData = imgP.histogram("sat", imageCanvas, { hL : pickedHues[i]["rangeL"], hR : pickedHues[i]["rangeR"], sL : 0.3, vl : 0.3});
//                                         //console.log(rawSatData, rawSatData.length);
//                                         var resultSatData = rawSatData;
//                                         console.log(resultSatData, resultSatData.length);
//                                         var pickedSats = imgP.pickPeaks(resultSatData);
//                                         pickedSats.sort(function(f,b){
//                                            return b["x"] - f["x"];
//                                         });
//                                         return pickedSats[0]["x"]; 
//                                     })(), 
                                     v : 100}).toHexString();
    }
    console.log(JSON.stringify(pickedColors));
    res.render("colorLab.html", {
        "colors" : colors,
        "imageSrc" : '/image/' + fileName, 
        "histData1" : rawHistData,
        "histData2" : resultHistData,
        "histData3" : cmpHistData,
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