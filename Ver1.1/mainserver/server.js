//모듈을 추출한다.
var express = require('express');
var formidable = require('formidable'); 
var fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');
var async = require('async');

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
    user : 'b9142df70e9d74',
    password : '0f6c4870',
    database : 'heroku_90cbdb405fb3ec7',
    connectionLimit:10,
    waitForConnections:true 
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

function connectionHandler(queryString, errMessage, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log('connection error');
            throw err;
        }
        connection.query(queryString ,function(err, result){
            if(err){
                console.log(errMessage);
                throw err;
            }
            callback(connection, result);
        });
    });
};

/*
[메인페이지 렌더]
온로드 시점에 /getmoments로 클라이언트에서 요청을 보내서 그린다.
*/
app.get('/', function(request, response){
    response.render('main');
});

/*
[추가데이터 요청]
입력 : 현재 가지고 있는 모멘트 개수, 요청 데이터 개수를 데이터로 받는다. 
출력 : momentsData JSON객체. momentId, text, bgColorList, textColorList 를 포함한다. 
*/
app.get('/getmoments', function(request, response){

    var index = request.query.index; //현재 모멘트 개수
    var num = request.query.num; //요청받은 데이터 개수    
    console.log('>>>>>>>'+index, num);
    var cnt = 0; //데이터 개수 임시카운트.
    var momentsData = {};
    
    async.waterfall([
        function(callback){
            var getIdTextQ = 'SELECT id, text FROM moment ORDER BY date DESC LIMIT ' + index + ',' + num + ';'; //index부터 num개를 가져온다.
            connectionHandler(getIdTextQ, 'get (id, text) error', function(connection, result){            
                momentsData = result;
                connection.release();
                var currentMoment;
                var targetId;
                var bgcolorResult = [];
                var textcolorResult = [];
                callback(null, currentMoment, targetId, bgcolorResult, textcolorResult);
            });
        },
        function(currentMoment, targetId, bgcolorResult, textcolorResult, callback){
             for(var i=0; i<momentsData.length ; i++){
                currentMoment = momentsData[i];
                targetId = currentMoment.id;
                var getBgcolorsQ = 'SELECT bgcolor FROM bgcolor WHERE momentId="'+targetId+'" ORDER BY num;';
                var getTextcolorsQ = 'SELECT textcolor FROM textcolor WHERE momentId="'+targetId+'" ORDER BY num;';
                connectionHandler(getBgcolorsQ, 'getBgcolorQ error', function(connection, result){ 
                    bgcolorResult[bgcolorResult.length] = result;
                    console.log('>>>>>bgcolor');
                    connection.release();
                });   
                callback(null, getTextcolorsQ, bgcolorResult, textcolorResult);
             }
        },
        function(getTextcolorsQ, bgcolorResult, textcolorResult, callback){     //문제사항 : 이 지점에서 targetId가 계속 같음.
            connectionHandler(getTextcolorsQ, 'getTextcolorQ error', function(connection, result){
                textcolorResult[textcolorResult.length] = result;
                console.log('>>>>>textcolor');
                connection.release();
                callback(null, bgcolorResult, textcolorResult);
            });
        }], function(err, bgcolorResult, textcolorResult){
        if(err){
            console.log(err);
        }
        cnt++;
        console.log('카운트 : '+cnt);
        if(momentsData.length === cnt){
            for(var i =0; i < momentsData.length; ++i){
                momentsData[i].bgColor = [];
                for(var bgIdx = 0; bgIdx < bgcolorResult[i].length; ++bgIdx){
                    momentsData[i].bgColor[momentsData[i].bgColor.length] = bgcolorResult[i][bgIdx].bgcolor;
                }

                momentsData[i].textColor = [];
                for(var textIdx = 0; textIdx < textcolorResult[i].length; ++textIdx){
                    momentsData[i].textColor[momentsData[i].textColor.length] = textcolorResult[i][textIdx].textcolor;
                }
            }
            console.log('>>>>>>>>>결과'+JSON.stringify(momentsData, null, 4));
            response.send(momentsData);
        }
    });
});

/*
[moment 페이지로 이동]
*/
app.get('/moment/:id', function(request, response){
    var targetId = request.param('id');
    console.log(targetId + ' 라우터로 이동하였습니다');
    var momentData = {};

    //moment table select
    var momentSelectQ ='SELECT * FROM moment WHERE id="'+targetId+'";';
    connectionHandler(momentSelectQ , 'moment inputData select error', function(connection, result){
        momentData.text = result[0].text;
        momentData.file = result[0].file;
        momentData.date = result[0].date;
        momentData.prevId = result[0].prevId;
        momentData.nextId = result[0].nextId;
        momentData.bgColor = [];
        momentData.textColor = [];
        
        connection.release();
        
        var bgColorSelectQ = 'SELECT c.num, c.bgColor FROM moment m JOIN bgColor c ON m.id=c.momentId AND m.id="'+targetId+'";';
        connectionHandler(bgColorSelectQ , 'moment bgColor select error', function(connection, result){
            for(var i =0; i< (result.length<5 ? result.length : 5) ; ++i){
                momentData.bgColor[i] = result[i].bgColor;
            }
            connection.release();
            
            var textColorSelectQ = 'SELECT c.num, c.textColor FROM moment m JOIN textcolor c ON m.id=c.momentId AND m.id="'+targetId+'";';
            connectionHandler(textColorSelectQ, 'moment textColor select error', function(connection, result){
                for(var i=0 ; i< (result.length<5 ? result.length : 5) ; ++i){
                    momentData.textColor[i] = result[i].textColor;
                }
                response.render("moment", momentData);
                connection.release();
            });
        });
    });
});

/*
[fileInput에서 받아온 데이터 처리(confirm상태) : 이미지 읽어서 클라에 전달]
*/
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
                var colorCf = colorClassifier(imp);
                var textColors = colorCf.textColors.toHexString();
                var bgColors = colorCf.bgColors.toHexString();        
                response.send({
                        "bgColor" : bgColors[0],
                        "textColor" : textColors[0]
                    });
                response.end();
            });
        }
    });
});

/*
[textInput에서 받아온 데이터 처리(submit상태) : 이미지 다시 읽어서 파일 최종 저장, 다른 데이터도 저장]
*/
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
                        var hueData = imp.pickedHues;
                        
                        var colorCf = colorClassifier(imp);
                        var textColors = colorCf.textColors.toHexString();
                        var bgColors = colorCf.bgColors.toHexString();
                        
                        var moment = {
                            date : timeStamp,
                            id : id,
                            file : fileName,
                            text : fields.textInput,
                            bgColor : bgColors,
                            textColor : textColors
                        }
                        
                        var latestId;    
                        var latestSelectQ = "SELECT id FROM moment ORDER BY date DESC LIMIT 1";//가장 최근에 추가한 모멘트의 id, nextId select
                        connectionHandler(latestSelectQ, 'select latest moment error', function(connection,result){

                            if(typeof result[0]!=="undefined"){
                                latestId = result[0].id;
                                moment.prevId = latestId;

                                var setNextIdToLatestQ = "UPDATE moment SET nextId='"+id+"' WHERE id='"+ latestId +"'";
                                connectionHandler(setNextIdToLatestQ, 'update nextId error', function(connection, result){
                                    connection.release();
                                });
                            }
                            else{//맨처음 업로드할 때
                                moment.prevId = null;
                            }

                            connection.release();
                            moment.nextId = null;

                            var insertMomentQ = sq.INSERT_INTO("moment", "(date, id, prevId, nextId, file, text)", moment);
                            connectionHandler(insertMomentQ, 'moment insert error', function(connection, result){
                                connection.release();

                                pool.getConnection(function(err, connection){

                                    for(var i=0; i<moment.bgColor.length ; i++){

                                        connection.query(sq.INSERT_INTO("bgColor", "(momentId, num, bgcolor)", 
                                                                        [moment.id, i, moment.bgColor[i]]),function(err, res){
                                            if(err) {
                                                console.log('bgColor insert error');
                                                throw err;
                                            }
                                        });  
                                    }


                                    for(var i=0; i<moment.textColor.length ; i++){

                                        connection.query(sq.INSERT_INTO("textColor", "(momentId, num, textcolor)", 
                                                                        [moment.id, i, moment.textColor[i]]),function(err, res){
                                            if(err) {
                                                console.log('textColor insert error');
                                                throw err;
                                            }
                                        });  
                                    }


                                    connection.release();
                                    console.log('>>>inserted');

                                    var result = {
                                        "id" : id,
                                        "bgColor" : moment.bgColor, //colorlist 그대로 넘김.
                                        "textColor" : moment.textColor
                                    };

                                    response.send(result);
                                    response.end();
                                });
                            });
                            //pool.getConnection(function(err, connection){
                            //     for(var i =0; i<hueData.length; ++i){
                            //         connection.query(sq.INSERT_INTO("hue", "(momentId, num, hue, hueLeft, hueRight, rate)", [moment.id, i, hueData[i].hue, hueData[i].rangeL, hueData[i].rangeR, hueData[i].rate]), function(err, res){
                            //             if(err) {
                            //                 console.log('hue insert error');
                            //                 throw err;
                            //             }
                            //         });
                            //     }
                            //     connection.release();
                            //     console.log('>>> hue inserted');
                            // });
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
    console.log(Impressive);
    var imp = Impressive(image);
    var colorCf =  colorClassifier(imp);
    res.render('colorLab.html',{
        imageSrc : app.get("colorLabData"),
        pickedColors : imp.pickedColors.toHexString(),
        highSatColors : imp.highSatColors.toHexString(),
        chromaColors : imp.chromaColors.toHexString(),
        achromaColors : imp.achromaColors.toHexString(),
        dominantColors : imp.dominantColors.toHexString(),
        bgColors : colorCf.bgColors.toHexString(),
        textColors : colorCf.textColors.toHexString(),
        middleColors : colorCf.middleColors.toHexString()
    });
});
var intervalId = setInterval(fadingImage, 1000*60);
function fadingImage(){
                                                                 
}

//웹서버를 실행한다.
app.listen(app.get("port"), function(){
    console.log('server running at port '+app.get("port")+'...');
});


