var canvas = require("canvas");
var tinycolor = require("tinycolor");

var pickColors = function(canvas){
    ctx = canvas.getContext("2d");
    var imageData = ctx.getImageData(0,0, canvas.width, canvas.height);    
    var tmpR = 0;
    var tmpG = 0;
    var tmpB = 0;
    console.log(ctx.width, ctx.height);
    console.log(imageData.height, imageData.GetWidth);
    for(var x = 0; x < imageData.width; ++x){
        for(var y = 0; y < imageData.height; ++y){
            var index = (x + y * imageData.width) * 4;
            tmpR += imageData.data[index + 0];
            tmpG += imageData.data[index + 1];
            tmpB += imageData.data[index + 2];
        }
    }
    var pixelNum = imageData.width * imageData.height;
    console.log(tmpR, tmpG, tmpB);
    var r = parseInt(tmpR / pixelNum);
    var g = parseInt(tmpG / pixelNum);
    var b = parseInt(tmpB / pixelNum);
    console.log(r, g, b);
    return {"r": r, "g": g, "b": b, "a": 255};
}

exports.pickColors = pickColors;