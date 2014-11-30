var express = require('express'); // express를 로드한다. 
//var routes = require('./routes'); // 라우터를 설정
//var http = require('http');
var path = require('path');

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'joong',
    password: 'db1004',
    database: 'joongdb'
});
 
connection.connect();		// db연결한다. 
 
connection.query('select * from color', function(err, rows, cols){ //query 함수의 첫 번째 인자에 sql 문을 작성하고 두 번째 인자는 질의문 수행 결과를 처리할 함수를 넘겨준다. 
																   //함수는 db-mysql의 질의문 처리 함수 인자와 동일하다.
    if(err) {
    	throw err;
 	} else {

 		var query = connection.query("insert into color(r, g, b, a) values(?, ?, ?, ?)", [10, 4, 5, 1], 
 			function(){

 			});
// query 함수의 첫 번째 인자로 sql문을 작성하는데 변수 값을 할당할 부분에 ‘?’를 채워넣는다.
// 두 번째 인자로는 ‘?’에 넣을 값들을 배열로 주고, 
// 세 번째 인자는 질의문 처리 함수를 넘겨준다.

		console.log(query.sql);
 		console.log(rows);
	} 
});
 
connection.end();