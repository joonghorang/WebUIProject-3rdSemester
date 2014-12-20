//모듈을 추출한다.
var express = require('express');
var formidable = require('formidable'); 
var fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');
var Impressive = require('impressive');

//impressive(image).toRgb();
var Canvas = require('canvas');
var Image = Canvas.Image;
var mytools = require("./controllers/mytools.js");
var colorClassifier = require("./controllers/colorClassifier.js");

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

//port 설정.
app.set('port', (process.env.PORT || 3000));

/* DB Connection Setting */
//var connection = mysql.createConnection({
//    host :'us-cdbr-iron-east-01.cleardb.net',
//    user : 'bf67c12c853ddc',
//    password : '16d5ce5e',
//    database : 'heroku_7081e1ce7ec12df'
//});

var pool = mysql.createPool({
    host :'us-cdbr-iron-east-01.cleardb.net',
    user : 'bf67c12c853ddc',
    password : '16d5ce5e',
    database : 'heroku_7081e1ce7ec12df'
});

/* Router */
app.get('/', function(request, response){
    /*DB SELECT : data for momentsBar(color only)*/
    /*//DB SELECT : data for momentsBar*/
//    connection.connect(function(err){
//        if(err){
//            console.error('sql connection err');
//            console.error(err);
//            throw err;
//        }
//    });
    var mainData;
//    var mainData = connection.query('',function(err, res){
//                                if(err) {
//                                    console.log('main select error');
//                                   throw err;
//                                }
//                            });
//    connection.end();
    response.render('main',mainData);
});

/*/moment/picId 형태 라우터로 이동*/
app.get('/moment/:id', function(request, response){
    var targetId = request.param('id');
    
    pool.getConnection(function(err, connection){
        if(err){
            connection.release();
            throw err;
        }
        connection.release();
    });
    
//    connection.connect(function(err){
//        if(err){
//            console.error('sql connection err');
//            console.error(err);
//            throw err;
//        }
//    });
//    connection.end();
    
    /*DB SELECT : all data(bgImg, img, color, text, date)*/
    /*//DB SELECT : all data(bgImg, img, color, text, date)*/
    var momentData = {

    };
    
    response.render('moment',momentData);
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
                /*colorLab logic*/
                var img = new Image();
                img.src = data;
                var colorList = Impressive(img).toHexString();
                var bgColor = colorClassifier(colorList).bgColorHex();
                var textColor = colorClassifier(colorList).textColorHex();
                /*DB INSERT : timeStamp + color data*/    
           
                response.send(
                    {
                        "bgColor" : bgColor[0],
                        "textColor" : textColor
                    });
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
            var date = new Date();
            var id = mytools.genId(date);
            var fileName = id + ".jpg";
            var uploadFileName = __dirname + '/uploads/' + fileName;
            
            fs.readFile(files.image.path, function(error, data){
                fs.writeFile(uploadFileName, data, function(error){
                    if(error){
                        console.log('file saving error');
                        throw error;
                    }
                    else {
                        var img = new Image();
                        img.src = data;
                        var colorList = Impressive(img).toHexString();
                        
                        var moment = {
                            id : id,
                            file : fileName,
                            text : fields.textInput,
                            bgColor : colorClassifier(colorList).bgColorHex(),
                            textColor : colorClassifier(colorList).textColorHex(),
                            date : date
                        }
                        
                        /*DB INSERT*/
                        
//                        for(var i=0; i<moment.bgColor.length ; i++){
//                            var connection = mysql.createConnection({
//                                host :'us-cdbr-iron-east-01.cleardb.net',   
//                                user : 'bf67c12c853ddc',
//                                password : '16d5ce5e',
//                                database : 'heroku_7081e1ce7ec12df'
//                            });
//                            connection.connect(function(err){
//                                if(err){
//                                    console.error('sql connection err');
//                                    console.error(err);
//                                    throw err;
//                                }
//                                connection.query('INSERT INTO bgColor VALUES("'
//                                                 + moment.id + '","' 
//                                                 + (i+1) + '","' 
//                                                 + moment.bgColor[i] +'");',
//                                                 function(err, res){
//                                    if(err) {
//                                        console.log('bgColor insert error');
//                                        throw err;
//                                    }
//                                });
//                                connection.end();
//                            });
//                        }
                        
                        pool.getConnection(function(err, connection){
                            connection.query('INSERT INTO moment VALUES("'+ 
                                             moment.id + '","'+ moment.textColor +'","'+ 
                                             moment.text +'","'+ moment.file +'","'+ 
                                             moment.date+ '")', function(err, res){
                                               if(err) {
                                                   console.log('moment insert error');
                                                   throw err;
                                               }
                                connection.release();
                            });
                        });
                        
                        
//                        connection.connect(function(err){
//                            if(err){
//                                console.error('sql connection err');
//                                console.error(err);
//                                throw err;
//                            }
//                        });
//                        
//                        /*DB INSERT*/
//                        connection.query('INSERT INTO moment VALUES("'+ moment.id + '","'+ moment.textColor +'","'+ moment.text +'","'+ moment.file +'","'+ moment.date+ '")', function(err, res){
//                           if(err) {
//                               console.log('moment insert error');
//                               throw err;
//                           }
//                        });
                        console.log('bgColor Num : '+moment.bgColor.length);
                                                
                        for(var i=0; i<moment.bgColor.length ; i++){
                            console.log('>>>>>>>>'+moment.bgColor[i]);
                            pool.getConnection(function(err, connection){
                                connection.query('INSERT INTO bgColor VALUES("'+ 
                                                 moment.id + '",' + i + ',"' + 
                                                 moment.bgColor[i] +'");',function(err, res){
                                                    if(err) {
                                                        console.log('bgColor insert error');
                                                       throw err;
                                                    }
                                    connection.release();
                                });    
                            });                        
                        };
                        

                        
                        
//                        for(var i=0; i<moment.bgColor.length ; i++){
//                            connection.query('INSERT INTO bgColor VALUES("'+ moment.id + '",' + (i+1) + ',"' + moment.bgColor[i] +'");',function(err, res){
//                                if(err) {
//                                    console.log('bgColor insert error');
//                                   throw err;
//                                }
//                            });
//                        }            
//                        connection.end();
                        /*//DB INSERT*/                         
                        
                        var result = {
                            "id" : id,
                            "bgColor" : moment.bgColor[0],
                            "textColor" : moment.textColor
                        };
                        response.send(result);
                        response.end();
                    }
                });
            });
        }
    });
});

//웹서버를 실행한다.
app.listen(app.get("port"), function(){
    console.log('server running at port '+app.get("port")+'...');
});


