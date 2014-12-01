var requirejs = require('requirejs');
requirejs.config({
    baseUrl: __dirname + "/js",
    nodeRequire: require
});

var Canvas = requirejs("canvas");
var tinycolor = requirejs("tinycolor2");

var createCanvasByImage = function(img){
//todo : module 호환해야됨.
//    var rCanvas = document.createElement("canvas");
//    rCanvas.width = image.naturalWidth;
//    rCanvas.height = image.naturalHeight;
    var rCanvas = new Canvas(img.width, img.height);
    
    var rCanvasCtx = rCanvas.getContext("2d");
    rCanvasCtx.drawImage(img, 0, 0);
    return rCanvas;
}

var pickColors = function(canvas){
    ctx = canvas.getContext("2d");
    var imageData = ctx.getImageData(0,0, canvas.width, canvas.height);    
    var tmpR = 0;
    var tmpG = 0;
    var tmpB = 0;
    
    for(var x = 0; x < imageData.width; ++x){
        for(var y = 0; y < imageData.height; ++y){
            var index = (x + y * imageData.width) * 4;
            tmpR += imageData.data[index + 0];
            tmpG += imageData.data[index + 1];
            tmpB += imageData.data[index + 2];
        }
    }
    var pixelNum = imageData.width * imageData.height;
    var r = parseInt(tmpR / pixelNum);
    var g = parseInt(tmpG / pixelNum);
    var b = parseInt(tmpB / pixelNum);
    return {"r": r, "g": g, "b": b, "a": 255};
}

var test_pickColors = function(canvas){
    
}

var histogram = function( type, canvas ){
    var color = new tinycolor("#0000ff");
    console.log(color.toHsv());
    if(type === "hsv"){
        var ctx = canvas.getContext("2d");
        var imageData = ctx.getImageData(0,0,canvas.width, canvas.height);

        var histData = [];
        for( var i = 0; i < 360; i++){
            histData[i] = 0;   
        }
        for(var x = 0; x < imageData.width; ++x){
            for(var y = 0; y < imageData.height; ++y){
                var index = (x + y * imageData.width) * 4;
                var r = imageData.data[index + 0];
                var g = imageData.data[index + 1];
                var b = imageData.data[index + 2];
                //console.log(r, g, b);
                var hsv = tinycolor({ r: r, g: g, b: b}).toHsv();
//                console.log(hsv);
                if(hsv.s > 0.3) histData[parseInt(hsv.h)]++;
            }
        }
        return histData;
    }
    
}

exports.createCanvasByImage = createCanvasByImage
exports.pickColors = pickColors;
exports.histogram = histogram;
exports.test_picColors = test_pickColors;