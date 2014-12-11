/*1209- */

//모듈을 추출한다.
/*
formidable : A node.js module for parsing form data, especially file uploads
*/
var formidable = require('formidable'); 
var fs = require('fs');

//express 모듈을 사용해 웹서버를 생성한다.
var express = require('express');
var app = express();

//static폴더 위치를 찾는다. __dirname은 현재 폴더 위치
var static = __dirname + '/static';
app.use(express.static(static));    //static폴더 안에 index.html로 찾아간다.

app.set('views', __dirname + '/view');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/error', function(request, response){
    response.render('error.html');
});

app.get('/output', function(request, response){
    response.render('output.html');
});

app.post('/upload', function(request, response){
    //formidable. parse uploaded file.
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
               
        if(error){
            console.log('form parsing error');
            throw error;
        }
        else{
            //readFile : 업로드된 파일을 tmp디렉토리에 저장한다.
            console.log(files, fields);
            fs.readFile(files.inputImage.path, function(error, data){
                
                //writeFile : tmp디렉토리에 저장된 파일을 다른 디렉토리로 복사(저장)해준다.
                //파일을 저장할 경로 설정. image/uploads 폴더 안에 uploadImage의 이름대로 저장된다. 
                var uploadFileName = __dirname + '/image/uploads/' + files.inputImage.name;
                fs.writeFile(uploadFileName, data, function(error){
                    if(error){
                        console.log('file saving error');
                        throw error;
                    }
                    else {
                        response.redirect('/output');
                        //output페이지에 필요한 데이터 : 사진. 색. 텍스트. 
                        //url을 /output:fileName으로 각각 고유하게...??
                    }
                });
            });
        }
    });
});


//웹서버를 실행한다.
app.listen(3000, function(){
    console.log('서버가 실행중입니다...');
});