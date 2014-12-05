
/*
 * GET users listing.
 */

var mysql = require('mysql');
 
var dbconn = mysql.createConnection({
    host     : 'localhost', // 기본포트가 3306으로 되어있는 경우에는 포트 설정이 필요없다.
    user     : 'joong',
    password : 'db1004'
});

var express = require('express');

var app = express();



exports.list = function(req, res){
	app.post('/users',function(req,res){
	    var user = {'userid':req.body.userid,
	                'name':req.body.name,
	                'address':req.body.address};
	    var query = dbconn.query('insert into users set ?',user,function(err,result){
	        if (err) {
	            console.error(err);
	            throw err;
	        }
	        console.log(query);
	        res.send(200,'success');
	    });
	});

	app.get('/users', function(req,res){
	    var query = dbconn.query('select * from users',function(err,rows){
	        console.log(rows);
	        res.json(rows);
	    });
	    console.log(query);
	});
	
    res.send({ title: 'Express', view_engin: 'ejs', author: 'saebyeok'}); // 이부분은 responseBody가 json으로 출력되는 것을 확인하기 위해서 변경해 봤다. 
};
 
exports.login = function(req, res){
        //DB 선택 부분
    dbconn.query('USE joongdb', function(err){
        if(err) throw err;
                // 쿼리 부분
        for(var i = 0; i < 10; i++){
            dbconn.query('INSERT INTO color values(' + i +','+ i + ',' + i +',' + i + ')');
        }
        dbconn.query('SELECT * FROM color', function(err, result){
            if(err) throw err;
            console.log(result);
            res.send(result);
        });
    });
};