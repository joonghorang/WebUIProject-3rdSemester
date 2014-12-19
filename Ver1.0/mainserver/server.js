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
var connection = mysql.createConnection({
    host :'us-cdbr-iron-east-01.cleardb.net',
    user : 'bf67c12c853ddc',
    password : '16d5ce5e',
    database : 'heroku_7081e1ce7ec12df'
});

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
//    var query = connection.query('select * from moment');
    var mainData;
    response.render('main',mainData);
});

/*/moment/picId 형태 라우터로 이동*/
app.get('/moment/:id', function(request, response){
    var targetId = request.param('id');
    
    /* connection 타임아웃이 있어서 
    필요할때마다 커넥트를하고, end를 해주어야 할거같습니다 신영님.*/
    
//    connection.connect(function(err){
//        if(err){
//            console.error('sql connection err');
//            console.error(err);
//            throw err;
//        }
//    });
    
    // SELECT m.momentId, m.imgPath, m.text, c.color
    // FROM momentList m 
    // INNER JOIN color c
    // ON m.momentId=c.momentId AND m.momentId=targetId;
    
    //connection.end();
    
    /*DB SELECT : all data(bgImg, img, color, text, date)*/
    /*//DB SELECT : all data(bgImg, img, color, text, date)*/
    var momentData; //SELECT 결과 

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
                        "bgColor" : bgColor,
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
                        //    connection.connect(function(err){
                        //        if(err){
                        //            console.error('sql connection err');
                        //            console.error(err);
                        //            throw err;
                        //        }
                        //    });

                        /*DB INSERT : text, filePath*/
                        /*//DB INSERT : text*/                         
                        
                        //connection.end();

                        var result = {
                            "id" : id,
                            "bgColor" : moment.bgColor,
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


