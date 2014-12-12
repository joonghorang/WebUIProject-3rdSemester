//모듈을 추출한다.
var express = require('express');
var formidable = require('formidable'); 
var fs = require('fs');

// localDB가 아니라 서버에 저장되어있는 DB로 하려면....?
// var mysql = require('mysql');
// var connection = mysql.createConnection({
//  host :'localhost',
//  user : 'joong',
//  password : 'db1004',
//  database : 'joongdb'
// });
// connection.connect(function(err){
//  if(err){
//      console.error('mysql connection error');
//      console.error(err);
//      throw err;
//  }
// });

//express 모듈을 사용해 웹서버를 생성한다.
var app = express();

//static폴더 위치를 찾는다.
var static = __dirname + '/static';
app.use(express.static(static)); 

app.set('views', __dirname + '/view');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function(request, response){
    response.render('index.html');
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
                        // colorLab로직 
                        // 그리고 받은 데이터 전부를 DB에 삽입. 
                        console.log('redirecting');
//                        response.redirect('/output');
                    }
                });
            });
        }
    });
});

// 여기 코드 합쳐주세요. 
// app.post('/rgbDB', function (req, res){

//  var form =  new formidable.IncomingForm();
//  form.parse(req, function(err, fields, files){
//         if(err){
//             console.log(err);
//         }else{
//          // var RGBA = {
//          //  'r' : fields.r,
//          //  'g' : fields.g,
//          //  'b' : fields.b,
//          //  'a' : fields.a
//          // };
//          connection.query('insert into RGBA values(' + fields.r + ','
//                                                                  + fields.g + ','
//                                                                  + fields.b + ','
//                                                                  + fields.a + ');', function(err, result){
//              if(err) throw err;
//          });
//             connection.query('SELECT * FROM RGBA' , function(err, result){
//                 if(err) throw err;
//                 var stringifyResult = JSON.stringify(result);
//                 res.send(stringifyResult);
//             });
//         }
//     });
// });

//웹서버를 실행한다.
app.listen(3000, function(){
    console.log('server running at port 3000...');
});