var express = require("express");
var Canvas = require("canvas");
var Image = Canvas.Image;
var fs = require("fs");
var path = require("path");
var formidable = require("formidable");
var mysql = require("mysql");
var tinycolor = require("tinycolor2");
var mytools = require("./controllers/mytools.js");
var Impressive = require("impressive");

var app = express();

/* DB Connection Setting */
//var connection = mysql.createConnection({
//    host :'us-cdbr-iron-east-01.cleardb.net',
//    user : 'bf67c12c853ddc',
//    password : '16d5ce5e',
//    database : 'heroku_7081e1ce7ec12df'
    //    host : 'localhost',
//    port : 3306,
//    user : 'tools',
//    password : 'tools',
//    database : 'tools'    
//});
//connection.connect(function(err){
//    if(err){
//        console.error('mysql이 에러났대요');
//        console.error(err);
//        throw err;
//    }
//});

var __basename = path.basename(__filename);
var assets = __dirname + '/assets/';
var uploads = __dirname + '/uploads/';
app.use(express.static(assets));
app.use(express.static(uploads));

app.set('views', __dirname+'/views');
app.engine('.html', require('ejs').__express);
app.set('port', (process.env.PORT || 3000));
app.set('targetName', "target_image_data");

app.get(['/', '/index'], function(req, res){
    res.render('index.html', {
        imageSrc : app.get('targetName')
    });
});
app.post('/', function(req, res){
    var form = formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        if(err){ console.log(err);
        }else{
            fs.readFile(files.image.path, function(err, data){
                if(err){ 
                    console.log(err);
                }else{
//                    console.log(filename);
                    fs.writeFile(uploads + app.get("targetName"), data, function(err){
                        if(err){
                            console.log("post / : upload image error!");
                        }else{
                            console.log("post / : upload image complete");
                            res.send(200);
                        }
                    });
                    var filename = mytools.genFileName() + path.extname(files.image.name);
                    fs.writeFile(uploads + filename, data, function(err){
                        if(err){
                            console.log("post / : upload image error!");
                        }else{
                            console.log("post / : upload image complete");
                        }
                    });    
//                    var query = connection.query('insert into moments (filename) VALUES ("'+filename+'");', function(err, results){
//                        if(err){
//                            console.error(err);
//                            throw err;
//                        }
//                        console.log(results);
//                    });
                }
            });
        }
    });
});
app.get('/colorLab', function(req, res){
    var imageData = fs.readFileSync(uploads + app.get("targetName")); 
    var image = new Image();
    image.src = imageData;
    console.log(Impressive);
    res.render('colorLab.html',{
        imageSrc : app.get("targetName"),
        pickedColors : Impressive(image).toHexString()
    });
});
app.get('/gradientLab', function(req, res){
    res.render('gradientLab.html',{

    });
});
app.get('/imageAging', function(req, res){
    res.render('imageAging.html');
});
app.get('/junk', function(req, res){
    res.render('junk.html');
});
if (!module.parent) {
  app.listen(app.get('port'), function(){  
      console.log('내가 포트 '+app.get('port')+'으로 서버를 켰단다.');
  });
}