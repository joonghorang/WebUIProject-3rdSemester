var http = require("http");
var express = require("express");
var formidable = require("formidable");
var router = express.Router();
var bodyParser = require("body-parser");
var mysql = require('mysql');
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

var app = express();
app.use(express.static('static')); 

app.post('/rgbDB', function (req, res){

	var form =  new formidable.IncomingForm();
	form.parse(req, function(err, fields, files){
        if(err){
            console.log(err);
        }else{
        	// var RGBA = {
        	// 	'r' : fields.r,
        	// 	'g' : fields.g,
        	// 	'b' : fields.b,
        	// 	'a' : fields.a
        	// };
        	connection.query('insert into RGBA values(' + fields.r + ','
        															+ fields.g + ','
        															+ fields.b + ','
        															+ fields.a + ');', function(err, result){
        		if(err) throw err;
        	});
            connection.query('SELECT * FROM RGBA' , function(err, result){
                if(err) throw err;
                var stringifyResult = JSON.stringify(result);
                res.send(stringifyResult);
            });
        }
    });
});

http.createServer(app).listen(3000, function(){
	console.log('Server Running at port 3000');
})