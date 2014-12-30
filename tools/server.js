var express = require("express");
var Canvas = require("canvas");
var Image = Canvas.Image;
var fs = require("fs");
var path = require("path");
var formidable = require("formidable");
var tinycolor = require("tinycolor2");
var mytools = require("./controllers/mytools.js");
var Impressive = require("impressive");
var colorClassifier = require("./controllers/colorClassifier");
var fading = require("./controllers/fading");

var Imp1 = require('./controllers/impressiveVer1');
var Imp2 = require('./controllers/impressiveVer2');
var Imp3 = require('./controllers/impressiveVer3');
var Imp4 = require('./controllers/impressiveVer4');

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
                            var moments = JSON.parse(fs.readFileSync( __dirname + '/' + 'moments.json'));
                            moments.image.push(filename);
                            fs.writeFile(__dirname + '/' + 'moments.json', JSON.stringify(moments, null, 4), function(err){
                                if(err){
                                    console.log(err);
                                }else{
                                    
                                }                                
                            });
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
    var imp = Impressive(image);
    var colorCf = colorClassifier(imp);
    res.render('colorLab.html',{
        imageSrc : app.get("targetName"),
        pickedColors : imp.pickedColors.toHexString(),
        highSatColors : imp.highSatColors.toHexString(),
        chromaColors : imp.chromaColors.toHexString(),
        achromaColors : imp.achromaColors.toHexString(),
        dominantColors : imp.dominantColors.toHexString(),
        bgColors : colorCf.bgColors.toHexString(),
        textColors : colorCf.textColors.toHexString(),
        middleColors : colorCf.middleColors.toHexString()
    });
});
app.get('/colorLab1', function(req, res){
    var imageData = fs.readFileSync(uploads + app.get("targetName")); 
    var image = new Image();
    image.src = imageData;
    res.render('colorLab1.html',{
        imageSrc : app.get("targetName"),
        pickedColors : Imp1(image).toHexString()
    });
});
app.get('/colorLab2', function(req, res){
    var imageData = fs.readFileSync(uploads + app.get("targetName")); 
    var image = new Image();
    image.src = imageData;
    res.render('colorLab1.html',{
        imageSrc : app.get("targetName"),
        pickedColors : Imp2(image).toHexString()
    });
});
app.get('/colorLab3', function(req, res){
    var imageData = fs.readFileSync(uploads + app.get("targetName")); 
    var image = new Image();
    image.src = imageData;
    res.render('colorLab1.html',{
        imageSrc : app.get("targetName"),
        pickedColors : Imp3(image).toHexString()
    });
});
app.get('/colorLab4', function(req, res){
    var imageData = fs.readFileSync(uploads + app.get("targetName")); 
    var image = new Image();
    image.src = imageData;
    var imp = Imp4(image);
    var colorCf = colorClassifier(imp);
    res.render('colorLab2.html',{
        imageSrc : app.get("targetName"),
        pickedColors : imp.pickedColors.toHexString(),
        highSatColors : imp.highSatColors.toHexString(),
        chromaColors : imp.chromaColors.toHexString(),
        achromaColors : imp.achromaColors.toHexString(),
        dominantColors : imp.dominantColors.toHexString(),
    });
});
app.get('/colorLab/:id', function(req, res){
    var id = req.params.id;
    var filename = id + '.jpg';
    var imageData = fs.readFileSync(uploads + filename); 
    var image = new Image();
    image.src = imageData;
    var imp = Impressive(image);
    var colorCf = colorClassifier(imp);
    console.log(imp.pickedColors.toHexString());
    res.render('colorLab.html',{
        imageSrc : '/' + filename,
        pickedColors : imp.pickedColors.toHexString(),
        highSatColors : imp.highSatColors.toHexString(),
        chromaColors : imp.chromaColors.toHexString(),
        achromaColors : imp.achromaColors.toHexString(),
        dominantColors : imp.dominantColors.toHexString(),
        bgColors : colorCf.bgColors.toHexString(),
        textColors : colorCf.textColors.toHexString(),
        middleColors : colorCf.middleColors.toHexString()
    });
});
app.get('/momentsTest', function(req, res){
    var momentsData = JSON.parse(fs.readFileSync( __dirname + '/' + 'moments.json'));
    var moments = [];
    var bgColorsArr = [];
    var textColorsArr = [];
    for(var i =0; i< momentsData.image.length; ++i){
        var filename = momentsData.image[i];
        moments[i] = {
            id : path.basename(filename, path.extname(filename)),
            imageSrc : filename
        }
        var imageData = fs.readFileSync(uploads + filename); 
        var image = new Image();
        image.src = imageData;
        var imp = Impressive(image);
        var colorCf = colorClassifier(imp);
        bgColorsArr.push(colorCf.bgColors.toHexString());
        textColorsArr.push(colorCf.textColors.toHexString());
    }
    
    res.render('momentsTest.html', {
        moments : moments,
        text : momentsData.text,
        bgColorsArr : bgColorsArr,
        textColorsArr : textColorsArr 
    });
});
app.get('/gradientLab', function(req, res){
    res.render('gradientLab.html',{

    });
});
app.get('/imageAging', function(req, res){
    var imageData = fs.readFileSync(uploads + app.get("targetName")); 
    var image = new Image();
    image.src = imageData;
    res.render('imageAging.html', {
        imageSrc : app.get("targetName")
    });
});
app.get('/junk', function(req, res){
    res.render('junk.html');
});
var intervalId = setInterval(FadingImage, 1000);
function FadingImage(){
    
}

if (!module.parent) {
  app.listen(app.get('port'), function(){  
      console.log('내가 포트 '+app.get('port')+'으로 서버를 켰단다.');
  });
}