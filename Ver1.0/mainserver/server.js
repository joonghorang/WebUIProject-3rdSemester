//모듈을 추출한다.
var express = require('express');
var formidable = require('formidable'); 
var fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');
var Canvas = require('canvas');
var Image = Canvas.Image;
var imgP = require("./controllers/pickImpColor.js");

//express 모듈을 사용해 웹서버를 생성한다.
var app = express();

//static폴더 위치를 찾는다.
var static = __dirname + '/static';
app.use(express.static(static)); 

//upload Img가져올 폴더 찾기 위한 static설정
var uploads = __dirname + '/uploads';
app.use(express.static(uploads));

//view engine은 ejs로 설정한다. view engine=template engine (ex)jade, ejs, mustache
app.set('view engine', 'ejs');
//views(template파일들이 위치하는 폴더)를 지정한다.
app.set('views', __dirname + '/view');
app.engine('html', require('ejs').renderFile);

//DB connect

app.get('/', function(request, response){
    /*DB SELECT : data for momentsBar(color)*/
    /*//DB SELECT : data for momentsBar*/
    var mainData = {
        "color1" : "#ffffff",
        "color2" : "#ffffff",
        "color3" : "#ffffff"
    };
    
    response.render('main',mainData);
});

app.get('/output', function(request, response){
    /*DB SELECT : all data(bgImg, img, color, text, date)*/
    /*//DB SELECT : all data(bgImg, img, color, text, date)*/
    var outputData = {
        "image-src" : "./uploads/test.jpg"    
    };

    response.render('output',outputData);
});

//fileInput에서 받아온 데이터 처리(confirm상태) : 이미지 읽어서 colorData DB에 저장, 클라에 전달
app.post('/upload-image', function(request, response){
    //formidable. parse uploaded file.
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
               
        if(error){
            console.log('form parsing error');
            throw error;
        }
        else{
            //readFile : 업로드된 파일을 tmp디렉토리에 저장한다.
            fs.readFile(files.image.path, function(error, data){
                /* 덕성 comment
                Color 로직 
                readFile되었을 때 data를 읽고 적절한 칼라를 뽑아 pickedColors에 저장하고 send해줍니다.
                뽑은 pickedColors를 클라이언트로 보내는 작업과는 비동기적으로 writeFile을 진행합니다.
                client가 받은 pickedColors가 json으로 잘 작동하지 않으면 
                response.send(JSON.stringify(pickedColors));로 대체해서 시도해보세요.
                */
                var img = new Image();
                img.src = data;
                var canvas = new Canvas(img.width, img.height);
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                
                var pickedColors = imgP.pickColors(canvas);
                
                /*DB INSERT : date + RGB data*/    
                /*//DB INSERT*/
                
                response.send(pickedColors);
                response.end();
            });
        }
    });
});

//textInput에서 받아온 데이터 처리(submit상태) : 이미지 다시 읽어서 파일 최종 저장, 다른 데이터도 저장
app.post('/upload-text', function(request, response){
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files){
    
        if(error){
            console.log('form parsing error');
            throw error;
        }
        else{
            //클라이언트에서 입력한 text data
            var text = fields.textInput;
            var fileName = ;
            var uploadFileName = __dirname + '/uploads/' + fileName;
            
            fs.readFile(files.image.path, function(error, data){
                fs.writeFile(uploadFileName, data, function(error){
                    if(error){
                        console.log('file saving error');
                        throw error;
                    }
                    else {
                        /*DB INSERT : text, filePath*/
                        /*//DB INSERT : text*/

                        response.end();
                    }
                });
            });
        }
    });
});

//웹서버를 실행한다.
app.listen(3000, function(){
    console.log('server running at port 3000...');
});

//DB connect : .db로 추후 수정
//var connection = mysql.createConnection({
// host :'localhost',
// user : 'joong',
// password : 'db1004',
// database : 'joongdb'
//});
//connection.connect(function(err){
// if(err){
//     console.error('mysql connection error');
//     console.error(err);
//     throw err;
// }
//});
                /*DB INSERT : date + RGB data*/    
//                        var d = new Date();
//                        var dateTime = d.getFullYear() + '-'
//                                        + d.getMonth() + '-'
//                                        + d.getDate() + '  ' 
//                                        + d.getHours() + ':'
//                                        + d.getMinutes() + ':'
//                                        + d.getSeconds(); 
//                                                               
//                        connection.query('INSERT INTO filePath (path, date) VALUES(' //+ PID + ',' 
//                                                                        + '"' + files.image.path.toString() + '"' 
//                                                                        + ',"' + files.image.lastModifiedDate.toString() + '");', function(err, res){
//                            if(err) {
//                                throw err;
//                            }
//                           // console.log(res);
//                        });
//                        
//                        connection.query('SELECT * FROM filePath', function(err, mysqlRes){
//                            if(err) {
//                                throw err;
//                            }
//                            var stringifyResult = JSON.stringify(mysqlRes);
//                            response.send(stringifyResult);
//                            console.log(stringifyResult);
//                        });
//              /*//DB INSERT*/