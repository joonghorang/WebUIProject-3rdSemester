var http = require("http");
var express = require("express");
var formidable = require("formidable");
var router = express.Router();
var bodyParser = require("body-parser");
var mysql = require('mysql');
var connection = mysql.createConnection({
	host :'localhost',
	user : 'root',
	password : 'rlacjsen08!',
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
        	var query = connection.query('insert into RGBA values(' + fields.r + ','
        															+ fields.g + ','
        															+ fields.b + ','
        															+ fields.a + ');', function(err, result){
        		console.log(result);
        	});

        	//RGBA, function(err, result){
        	// 	if(err){
        	// 		console.error(err);
        	// 		throw err;
        	// 	}
        	// 	console.log("in");
        	//var query = connection.query('select * form RGBA;');
        	//console.log(JSON.parse(query));
        	res.send("DOne?");
        	// 	connection.query('select * form RGBA', function(err, rows){
        	// 		console.log(rows);
        	// 		res.json(rows);
        	// 	});
        	// 	console.log(query);
        	// });
        }
    });
});

http.createServer(app).listen(3000, function(){
	console.log('Server Running at port 3000');
})