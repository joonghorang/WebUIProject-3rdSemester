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
var sq = require("./controllers/simpleQuery.js");
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
var pool = mysql.createPool({
    host :'us-cdbr-iron-east-01.cleardb.net',
    user : 'bf67c12c853ddc',
    password : '16d5ce5e',
    database : 'heroku_7081e1ce7ec12df',
    connectionLimit:20,
    waitForConnections:true
});

/* Router */
app.get('/', function(request, response){
    /*DB SELECT : momentId, text, bgColor[0]*/
    var mainData;
    pool.getConnection(function(err, connection){
        connection.query('SELECT m.id, m.text, c.bgColor '+
                         'FROM moment m INNER JOIN bgColor c ON m.id=c.momentId AND c.num=0;', function(err, result){
            if(err) {
                console.log('mainPage select error');
                throw err;
            }
            console.log(result);
            connection.release();
        });
    });
    response.render('main',mainData);
});

/*/moment/picId 라우터로 이동*/
app.get('/moment/:id', function(request, response){
    var targetId = request.param('id');
    
    //comment : 한꺼번에 해도 되는데, bgColor가 여러개일 경우 bgColor수만큼 중복된 열이 나와서, 그냥 따로 select해두었습니다 - 신영
    //moment table select
    pool.getConnection(function(err, connection){
        connection.query('SELECT * FROM moment WHERE id="'+targetId+'";', function(err, result){
            if(err){
                console.log('moment inputData select error');
                throw err;
            }
            console.log(result);
            connection.release();
        });
    });
    /*DB SELECT : all data(bgImg, img, color, text, date)*/
    var momentData = {

    };
    //color table select
    pool.getConnection(function(err, connection){
        connection.query('SELECT c.num, c.bgColor FROM moment m JOIN bgColor c ON m.id=c.momentId AND m.id="'+targetId+'";', function(err, result){
            if(err){
                console.log('moment bgColor select error');
                throw err;
            }
            console.log(result);
            connection.release();
        });
    });
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
                        
                        var momentQuery = sq.INSERT_INTO("moment", "(id, textColor, text, file, date)", moment);
                        pool.getConnection(function(err, connection){
                            connection.query(momentQuery, function(err, res){
                                               if(err) {
                                                   console.log('moment insert error');
                                                   throw err;
                                               }
                                connection.release();
                            });
                        });
                        
                        pool.getConnection(function(err, connection){
                            for(var i=0; i<moment.bgColor.length ; i++){
                                connection.query(sq.INSERT_INTO("bgColor", "(momentId, num, bgColor)", 
                                                                [moment.id, i, moment.bgColor[i]]),function(err, res){
                                                                if(err) {
                                                                    console.log('bgColor insert error');
                                                                   throw err;
                                                                }
                                });  
                            }
                            connection.release();
                        });
                        //DB transaction.....?
                        console.log('>>>inserted');
                        
                        var result = {
                            "id" : id,
                            "bgColor" : moment.bgColor[0],
                            "textColor" : moment.textColor
                            "hopeNumber" : moment.
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


