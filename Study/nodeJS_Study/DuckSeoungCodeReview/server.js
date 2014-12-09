var express = require("express");                               // express 객체를 생성한다. 
var formidable = require("formidable");                         // formidable 객체도 생성한다. - form에서 데이터를 읽어오는 것과 관련된 라이브러리
var imgP = require("./controllers/pickImpColor.js");            // 이건 덕성ㅇ이가 만들어 놓은 컬럭픽하는 js코드를 소환. 
//var imgP = require("./static/js/colorLab/pickImpColor.js");
var Canvas = require("canvas");                                 // 노드에 따로 설치한 canvas모듈를 소환 
var Image = Canvas.Image;                                       // Image라는 변수를 하나 만들어서, Canvas.image를 삽입한다. 이 image는 HTML5에서의 캔버스역할 
var fs = require("fs");                                         // fs모듈의 생성한다. file System즉 파일을 읽거나 저장할 때 쓰인다. 바이너리로 읽거나 쓴다. 
var mime = require("mime");                                     // mime 모듈 생성
var tinycolor = require("tinycolor2");                          // tinycolor2 모듈 생성
var path = require("path");                                     // path모듈 생성

var app = express();                                            // express생성자로 app이란 객체를 만든다. 

var __basename = path.basename(__filename);                     // 기본 파일 경로 변수를 만든다. 
//static 폴더 위치
var static = __dirname + '/static';                             // 스타틱 폴더를 메인주소 이후에 /static으로 맵핑한다. 
app.use(express.static(static));                                // 익스프레스에서 사용할 미들웨어는 static으로 설정. 
//동일출처문젠가? 다른 url에서도 이 서버의 url로 ajax요청을 보낼 수 있게함.
app.use(function(req, res, next) {                              // 동일출처 정책을 열어준다. 같은 url이 아니면 기본적으로 막지만, 그걸 열어준다. 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//render할 파일을 어디서 읽어올거냐
app.set('views', __dirname + '/views');                         // render할 html파일은 veiws폴더안에 있는 파일들. 
//render할 파일 엔진이 뭐냐
app.engine('.html', require('ejs').__express);                  // ejs를 jade대신 쓰기로 하여 엔진으로 ejs를 쓴다. 얘는 문법이 완전히 html문법과 같다. 따로 문법을 추가로 배울 필요가 없음. 
//app.set('view engine', 'jade');

//Route
app.get(['/', '/index'], function(req, res){                    // 기본루트로 접속할때 "index_sy.html"을 보여준다. 
    res.render("index_sy.html");
});
app.get('/colorLab', function(req, res){                        // colorLab을 접속하면 칼라 분석페이지를 보여주도록 선언. 
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
if (!module.parent) {   // 얘가 메인이면 실행. 이런건 서버파일이 계층적으로 여러개로 나뉘고, 각각의 모듈불러온게 다를 때, 가장 부모가 로드되야 하므로 있는 코드이다. 
  app.listen(3000);
  console.log('Express started on port 3000');
}