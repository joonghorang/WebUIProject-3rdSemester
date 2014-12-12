//모듈을 추출한다.
var express = require('express');
var formidable = require('formidable'); 
var fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');

//express 모듈을 사용해 웹서버를 생성한다.
var app = express();

//static폴더 위치를 찾는다.
var static = __dirname + '/static';
app.use(express.static(static)); 

//view engine은 ejs로 설정한다. view engine=template engine (ex)jade, ejs, mustache
app.set('view engine', 'ejs');
//views(template파일들이 위치하는 폴더)를 지정한다.
app.set('views', __dirname + '/view');
app.engine('html', require('ejs').renderFile);

//DB connect : .db로 추후 수정
var connection = mysql.createConnection({
 host :'localhost',
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

app.get('/', function(request, response){
    
    /*DB SELECT : data for momentsBar(color)*/
    /*//DB SELECT : data for momentsBar*/
    
//    response.render('main',data);
});

app.get('/output', function(request, response){
    
    /*DB SELECT : all data(bgImg, img, color, text, date)*/
    /*//DB SELECT : all data(bgImg, img, color, text, date)*/
    
//    response.render('output',data);
});

//fileInput에서 받아온 데이터 처리
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
                
                //writeFile : tmp디렉토리에 저장된 파일을 다른 디렉토리로 복사(저장)해준다.
                //파일을 저장할 경로 설정. image/uploads 폴더 안에 uploadImage의 이름대로 저장된다. 
                var uploadFileName = __dirname + '/uploads/' + files.image.name;
                fs.writeFile(uploadFileName, data, function(error){
                    if(error){
                        console.log('file saving error');
                        throw error;
                    }
                    else {
                        /*colorLab로직 : 더크성크 tools로직 사용 - 2-3개 색 JSON으로 뱉어낸다*/
//                        var RGB = {
//                            "colorA" : "#FFFFFF",
//                            "colorB" : "#FFFFFF"
//                        };
                        /*//colorLab로직*/
                        
                        /*DB INSERT : imageFile path + date + RGB data*/    
                        var d = new Date();
                        var dateTime = d.getFullYear() + '-'
                                        + d.getMonth() + '-'
                                        + d.getDate() + '  ' 
                                        + d.getHours() + ':'
                                        + d.getMinutes() + ':'
                                        + d.getSeconds(); 
                                                               
                        connection.query('INSERT INTO filePath (path, date) VALUES(' //+ PID + ',' 
                                                                        + '"' + files.image.path.toString() + '"' 
                                                                        + ',"' + files.image.lastModifiedDate.toString() + '");', function(err, res){
                            if(err) {
                                throw err;
                            }
                           // console.log(res);
                        });
                        
                        connection.query('SELECT * FROM filePath', function(err, mysqlRes){
                            if(err) {
                                throw err;
                            }
                            var stringifyResult = JSON.stringify(mysqlRes);
                            response.send(stringifyResult);
                            console.log(stringifyResult);
                        });
                        /*//DB INSERT*/
                        
                        //클라이언트에 RGBdata 전달. 
                        //textInput페이지 배경을 위한 colorData만 넘기면 되는 거죠? 나머지는 DB INSERT하면 끝.
                        response.end(JSON.stringify({"rgb" : "#FFFFFF"}));
                    }
                });
            });
        }
    });
});

//textInput에서 받아온 데이터 처리
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
            
            /*DB INSERT : text*/
            /*//DB INSERT : text*/
            
            response.end();
        }
    });
});

//웹서버를 실행한다.
app.listen(3000, function(){
    console.log('server running at port 3000...');
});