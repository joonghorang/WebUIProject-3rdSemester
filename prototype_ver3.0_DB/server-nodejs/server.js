
var express = require("express");
//var routes = require("./routes");

//var rgbDB = require("./rgbDB");
var http = require("http");
var path = require("path");

var mysql = require("mysql");
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'joong',
    password : 'db1004',
    database : 'joongdb'
});
connection.connect(function(err){
    if(err){
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }
});
var PID = 0;

var formidable = require("formidable");
var imgP = require("./controllers/pickImpColor.js");
//var imgP = require("./static/js/colorLab/pickImpColor.js");
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

    console.log("itemFactory In");
    var form = new formidable.IncomingForm();
    
    form.parse(req, function(err, fields, files){
        if(err){
            console.log(err);
        } else {
            fs.readFile(files.image.path, function(err, data){
                if( err) throw err;
                var img = new Image();
                img.src = data;
                
                var pickedColors = imgP.pickColors(img);
                var stringfyPickedColors = JSON.stringify(pickedColors);
                res.send(stringfyPickedColors);

                var jsonParsedColors = JSON.parse(stringfyPickedColors);
                //console.log(JSON.parse(stringfyPickedColors)[0]["r"]);
                for(var i = 0; i < jsonParsedColors.length; i++){
                    connection.query('INSERT INTO RGB values(' + PID
                    + ',' + jsonParsedColors[0]["r"]
                    + ',' + jsonParsedColors[0]["g"]
                    + ',' + jsonParsedColors[0]["b"]
                    + ',' + jsonParsedColors[0]["a"]
                    + ');');
                    PID++;
                }
                connection.query('SELECT * FROM RGB', function(err, result){
                    if(err) throw err;
                    console.log(result);
                });
            });
        }    
    });
});

app.post('/itemFactory/image', function(req, res){
    
    var form = new formidable.IncomingForm();
    
    form.parse(req, function(err, fields, files){
        if(err){
            console.log(err);
        } else {
            fs.readFile(files.image.path, function(err, data){
                if( err) throw err;
                var img = new Image();
                img.src = data;
                
                var pickedColors = imgP.pickColors(img);
                var stringfyPickedColors = JSON.stringify(pickedColors);
                res.send(stringfyPickedColors);
            });


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
                         
    });
});

app.post('/textDB', function(req, res){

    // for Converting UTF-8
    // var Iconv  = require('iconv').Iconv;
    // var euckr2utf8 = new Iconv('EUC-KR', 'UTF-8');
    // var utf82euckr = new Iconv('UTF-8', 'EUC-KR');
    var form = new formidable.IncomingForm();
    
    form.parse(req, function(err, fields, files){
        if(err){
            console.log(err);
        } else {
            // console.log(fields.text);
            // var textData = euckr2utf8.convert(fields.text);
            //console.log(textData);
            connection.query('INSERT INTO textDB values(' + PID
                            + ',' + "'" + fields.text + "'"
                            + ');', function(err, result){
                if(err) throw err;
            });

            connection.query('SELECT * FROM textDB', function(err, result){
                if(err) throw err;
                console.log(result);
            });
        }    
    });
});
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}

// app.get('/rgbDB', function(req, res){
//     connection.query('SELECT * FROM RGB', function(err, result){
//         if(err) throw err;
//         console.log(result);
//         res.send(result);
//     });
// });
