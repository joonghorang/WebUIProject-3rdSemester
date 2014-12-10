var mysql = require('mysql');
 
var dbconn = mysql.createConnection({
    host     : 'localhost', // 기본포트가 3306으로 되어있는 경우에는 포트 설정이 필요없다.
    user     : 'joong',
    password : 'db1004'
});

var express = require('express');

var app = express();
 
exports.list = function(req, res){
        //DB 선택 부분
    dbconn.query('USE joongdb', function(err){
        if(err) throw err;
                // 쿼리 부분
        for(var i = 0; i < 10; i++){
            dbconn.query('INSERT INTO RGB values(' + i +','+ i + ',' + i +',' + i + ',' + i + ')');
        }
        dbconn.query('SELECT * FROM RGB', function(err, result){
            if(err) throw err;
            console.log(result);
            res.send(result);
        });
    });
};

