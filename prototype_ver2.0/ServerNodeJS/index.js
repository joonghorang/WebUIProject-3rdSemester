var express = require('express');
var fs = require('fs');
var formidable = require('formidable');
var path = require('path');

var imageProcess = require('./myModules/image-process.js');

var static = __dirname + '/static';

var app = express();


//var Canvas = require('canvas')
//  , Image = Canvas.Image
//  , canvas = new Canvas(200,200)
//  , ctx = canvas.getContext('2d');
//
//ctx.font = '30px Impact';
//ctx.rotate(.1);
//ctx.fillText("Awesome!", 50, 100);
//
//var te = ctx.measureText('Awesome!');
//ctx.strokeStyle = 'rgba(0,0,0,0.5)';
//ctx.beginPath();
//ctx.lineTo(50, 102);
//ctx.lineTo(50 + te.width, 102);
//ctx.stroke();

//static 폴더 위치
app.use(express.static(static));

//render할 파일을 어디서 읽어올거냐
app.set('views', __dirname + '/views');
//render할 파일 확장자? 가뭐냐
app.set('view engine', 'jade');




app.get('/', function(req, res){
    res.render('index');
});
//app.get('/imp', function(req,res){
//    res.send('<img src="' + canvas.toDataURL() + '" />');
//});
app.get('/output', function(req, res){
    res.render('output');
});

app.get('/output/:file', function(req, res){
    var file = req.params.file; 
    var ext = path.extname(file);
    console.log("file ext : " + ext);
    
    var data = fs.readFileSync(__dirname + '/uploads/' + file);
    if(ext === ".jpg"){
        res.writeHead(200, {'Content-Type': 'image/jpg' });
        res.end(data, 'binary');
    }
    else if(ext === ".json"){
        res.writeHead(200, {'Content-Type': 'application/json' });
        res.end(data, 'binary');
    }
});

app.post('/uploads', function(req, res, next){
    console.log("post");
    
    var form = new formidable.IncomingForm();
    
    form.parse(req, function(err, fields, files){
        console.log("Parsing Done."); 
        var outputData = {"text" : fields.text};
        console.log(files.image.path);
        fs.writeFileSync('./uploads/output.jpg', fs.readFileSync(files.image.path));
//        fs.readFile(files.image.path, function(err, data){
//            console.log("Read File.");
//            fs.writeFile('./uploads/output.jpg', data, function(err){
//                console.log("Write File.");
//            });
//        });
//        
        //var colorDatas = imageProcess.getColors();
        fs.writeFile('./uploads/output.json', JSON.stringify(outputData, null, 4), function(err) {
            if(err) {
                console.log(err);
            }else{
                console.log("JSON saved to " + "output.json");
            }    
        }); 
    });
    
    res.redirect('/output');
});

if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}