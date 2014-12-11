var http = require("http");
var express = require("express");
var formidable = require("formidable");
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
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

var __dirname = "";
var app = express();
app.use(express.static('static')); 

app.post('/upload', function(req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        if(err){
            console.log(err);
        } else {
            //console.log(files.image.path);
            console.log(files);
            console.log(files.image);
            fs.readFile(files.image.path, function(err, data){
                var uploadFileName = __dirname + 'image/uploads/' + files.image.name;
                fs.writeFile(uploadFileName, data, function(err){
                    if(err){
                        console.log(err);
                        throw err;
                    } else {
                        // colorLab함수를 호출.
                        // 그리고 받은 데이터 전부를 mysql에 삽입. 
                        console.log("it will be redirect");
                        //res.redirect('/output');
                    }
                });
            });
        }
    })
});
app.post('/output', function(req, res){

})

// 여기 코드 합쳐주세요. 
// app.post('/rgbDB', function (req, res){

// 	var form =  new formidable.IncomingForm();
// 	form.parse(req, function(err, fields, files){
//         if(err){
//             console.log(err);
//         }else{
//         	// var RGBA = {
//         	// 	'r' : fields.r,
//         	// 	'g' : fields.g,
//         	// 	'b' : fields.b,
//         	// 	'a' : fields.a
//         	// };
//         	connection.query('insert into RGBA values(' + fields.r + ','
//         															+ fields.g + ','
//         															+ fields.b + ','
//         															+ fields.a + ');', function(err, result){
//         		if(err) throw err;
//         	});
//             connection.query('SELECT * FROM RGBA' , function(err, result){
//                 if(err) throw err;
//                 var stringifyResult = JSON.stringify(result);
//                 res.send(stringifyResult);
//             });
//         }
//     });
// });

http.createServer(app).listen(3000, function(){
	console.log('Server Running at port 3000');
})