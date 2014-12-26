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
//colorLabData
app.set('colorLabData', "/colorLab_image_data");

/* DB Connection Setting */
var pool = mysql.createPool({
    host :'us-cdbr-iron-east-01.cleardb.net',
    user : 'bf67c12c853ddc',
    password : '16d5ce5e',
    database : 'heroku_7081e1ce7ec12df',
    connectionLimit:20,
    waitForConnections:true //이 속성이 커넥션이 없을 경우 커넥션이 반납될 때까지 기다리라는 속성이기는 한데.....잘 작동을 안하나?? -신영
});

// connection요청을 10개 밖에 못보내니까 임시로 써두는 queue.
var MAX_USER_CONNECTION = 10;
var queriedCount = 0;
function connectionWaiting(getConnection){
    if( queriedCount > 9 ){
        setTimeout(connectionWaiting.bind(this, getConnection), 500);
        return ;
    }
    console.log("queriedCount : ", queriedCount);
    getConnection();
}

app.get('/', function(request, response){
    var mainData = {};

    connectionWaiting(function(){
    queriedCount++; // mysql queue
    pool.getConnection(function(err, connection){
        connection.query('SELECT m.date, m.id, m.text, m.file, c.bgColor '+
                         'FROM moment m INNER JOIN bgColor c ON m.id=c.momentId AND c.num=0 ORDER BY date DESC;', function(err, result){
            if(err) {
                console.log('mainPage select error');
                throw err;
            }
//            console.log(result);
            mainData.moments = result;
//            console.log(mainData);
            response.render('main',mainData);
            connection.release();
            setTimeout(function(){ queriedCount--; }, 500); //임시방편
        });
    });
    });
});

//pageNum에 따라 데이터를 7개씩 뽑아준다. pageNum=2 이면 최근순서 정렬로, 8~14번째 데이터를 전달한다.
app.get('/page/:pageNum', function(request, response){
    var pageNum = request.param('pageNum');
    //console.log(pageNum); 페이지 넘버는 맞게 들어갔는데 왜 로딩부터 에러가 뜨는지 이해불가 ㅠ
    var pageData = {};
    connectionWaiting(function(){
    queriedCount++; // mysql queue                      
    pool.getConnection(function(err, connection){
        if(err){
            console.log("Error~!! pageNum err입니당");
            throw err;
        }
        connection.query('SELECT m.date, m.id, m.text, m.file, c.bgColor '+
                         'FROM moment m INNER JOIN bgColor c ON m.id=c.momentId AND c.num=0 ORDER BY date DESC LIMIT '+ 7*(pageNum-1) +',7;', function(err, result){
            if(err){
                console.log('pageNum data select error');
                throw err;
            }else if(result.length === 0){
                console.log('Error~!! no Result about PageNum. 너무 큰 pageNum을 넣으셨네요 히읗');
                response.send(400);
            }else{
                pageData.moments = result;
                response.json(pageData);

            }
            connection.release();
            setTimeout(function(){ queriedCount--; }, 500); //임시방편
        });
    });
    });
});


/*/moment/picId 라우터로 이동*/
app.get('/moment/:id', function(request, response){
    var targetId = request.param('id');
    console.log(targetId + '라우터로 이동하였습니다');
    var momentData = {};

    //comment : 콜백 지옥에 오신것을 환영합니다. -덕성
    //comment : 콜백 지옥에서 벗어나기 위한 해결책을 찾아보려 합니다 - 신영 
    
    //moment table select
    pool.getConnection(function(err, connection){
        connection.query('SELECT * FROM moment WHERE id="'+targetId+'";', 
                         function(err, result){
            if(err){
                console.log('moment inputData select error');
                throw err; //종종 여기에서 에러가 나는데........왜지요?
            }
            momentData.textColor = result[0].textColor;
            momentData.text = result[0].text;
            momentData.file = result[0].file;
            momentData.date = result[0].date;
            momentData.prevId = result[0].prevId;
            momentData.nextId = result[0].nextId;

            connection.release();
            
            //color table select
            pool.getConnection(function(err, connection){
                connection.query('SELECT c.num, c.bgColor FROM moment m JOIN bgColor c ON m.id=c.momentId AND m.id="'+targetId+'";', function(err, result){
                    if(err){
                        console.log('moment bgColor select error');
                        throw err;
                    }
                    momentData.bgColor = [];
                    for(var i =0; i<result.length; ++i){
                        momentData.bgColor[i] = result[i].bgColor;
                    }
                    connection.release();
                    console.log(momentData);
                    response.render("moment", momentData);
                });
            });
        });
    });
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
                fs.writeFile( uploads + app.get("colorLabData"), data, function(err){
                   console.log('>>>> /upload-image : colorLabData saved.'); 
                });
                var img = new Image();
                img.src = data;
                /* impressive Usage */
                var imp = Impressive(img);
                var pickedColorAll = imp.pickedColors.toHexString();
                var highSatColors = imp.highSatColors.toHexString();
                var chromaColors = imp.chromaColors.toHexString();
                var achromaColors = imp.achromaColors.toHexString();
                var dominatColors = imp.dominantColors.toHexString();
                
                console.log(pickedColorAll, highSatColors, chromaColors, achromaColors, dominatColors);
                
                var colorCf = colorClassifier(imp);
                var textColors = colorCf.textColors.toHexString();
                var bgColors = colorCf.bgColors.toHexString();
                console.log(textColors, bgColors);
                   
                response.send(
                    {
                        "bgColor" : bgColors[0],
                        "textColor" : textColors[0]
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
            var text = fields.textInput;
            var date = new Date();
            var timeStamp = mytools.toYYYYMMDDHHmmSSsss(date);
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
                        var imp = Impressive(img);
                
                        var colorCf = colorClassifier(imp);
                        var textColors = colorCf.textColors.toHexString();
                        var bgColors = colorCf.bgColors.toHexString();
                        
                        var moment = {
                            date : timeStamp,
                            id : id,
                            file : fileName,
                            text : fields.textInput,
                            bgColor : bgColors,
                            textColor : textColors[0],
                        }
                        
                        var latestId;
                        pool.getConnection(function(err, connection){
                            //가장 최근에 추가한 모멘트의 id, nextId select
                            connection.query("SELECT id FROM moment ORDER BY date DESC LIMIT 1",function(err, result){
                                if(err){
                                    console.log('select latest moment error');
                                    throw err;
                                }
                                if(typeof result[0]!=="undefined"){
                                    latestId = result[0].id;
                                    moment.prevId = latestId;
                                    connection.release();
                                    
                                    pool.getConnection(function(err, connection){
                                        connection.query("UPDATE moment SET nextId='"+id+"' WHERE id='"+ latestId +"'",function(err,result){
                                            if(err){
                                                console.log('update nextId error');
                                                throw err;
                                            }
                                            connection.release();
                                        });
                                    });
                                }
                                else{//맨처음 업로드할 경우.
                                    moment.prevId = null;
                                    connection.release();
                                }
                                moment.nextId = null;
                                
                                var momentQuery = sq.INSERT_INTO("moment", "(date, id, prevId, nextId, file, text, textColor)", moment);
                                pool.getConnection(function(err, connection){
                                    connection.query(momentQuery, function(err, res){
                                        if(err) {
                                            console.log('moment insert error');
                                            //문제 : 텍스트에 ' 가 들어갈 경우 에러가 납니다.
                                            throw err;
                                        }
                                        connection.release();
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
                                            console.log('>>>inserted');

                                            var result = {
                                                "id" : id,
                                                "bgColor" : moment.bgColor[0],
                                                "textColor" : moment.textColor,
                                            };

                                            response.send(result);
                                            response.end();
                                        });
                                    });

                                });

                            });
                        });
                        
                    }
                });
            });
        }
    });
}); 

app.get('/colorLab', function(req, res){
    var imageData = fs.readFileSync(uploads + app.get("colorLabData")); 
    var image = new Image();
    image.src = imageData;
    res.render('colorLab.html',{
        imageSrc : app.get("colorLabData"),
        pickedColors : Impressive(image).toHexString()
    });
});

//웹서버를 실행한다.
app.listen(app.get("port"), function(){
    console.log('server running at port '+app.get("port")+'...');
});


