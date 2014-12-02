var requirejs = require('requirejs');
requirejs.config({
    baseUrl: __dirname + "/js",
    nodeRequire: require
});

var Canvas = requirejs("canvas");
var tinycolor = requirejs("tinycolor2");

Array.prototype.circleIndex = function(idx){
//    // circleIndexOf(-1) = circleIndexOf( arrlen - 1 )
    if( idx >= 0 && idx < this.length){
        return this[idx];
    }else if(idx < 0){
        return this.circleIndex(this.length + idx);
    }else{
        return this.circleIndex(idx - this.length);
    }    
}

var createCanvasByImage = function(img){
//todo : module 호환해야됨.
//    var rCanvas = document.createElement("canvas");
//    rCanvas.width = image.naturalWidth;
//    rCanvas.height = image.naturalHeight;
    console.log(img);
    var pixelNumResizingSaturation = 100000;
    
    var pixelNum = img.width * img.height;
    var pixelNumRate = pixelNum / pixelNumResizingSaturation;

    var canvasWidth = img.width;
    var canvasHeight = img.height;
    
    if(pixelNumRate > 1){
        console.log("resizing... pixelNumRate : " + pixelNumRate);
        var lengthRate =  Math.sqrt(pixelNumRate);
        canvasWidth = parseInt(canvasWidth/lengthRate);
        canvasHeight = parseInt(canvasHeight / lengthRate);
        console.log("resizing result - canvasWidth : " + canvasWidth + "canvasHeight : " + canvasHeight);
    }

    var rCanvas = new Canvas(canvasWidth, canvasHeight);
    var rCanvasCtx = rCanvas.getContext("2d");
    rCanvasCtx.drawImage(img, 0,0, img.width, img.height, 0,0, canvasWidth, canvasHeight);
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

var smoothing = function(histData, repeat, cvCoeff){

    //set default
    repeat = typeof repeat !== "number" ? 1 : repeat;
    cvCoeff = typeof cvCoeff === "undefined" || cvCoeff.length%2 !== 1 ? [1, 1, 1, 1, 1] : cvCoeff; 
    
    var beforeHistData = histData.slice(0);
    var resultHistData;
    var cvSum = cvCoeff.reduce(function(pv, cv){return pv + cv});
    
    for( var r = 0; r < repeat; ++r){
        resultHistData = [];
        for( var i = 0; i< beforeHistData.length; ++i){
            var sum = 0;
            for( var cvIdx = -2; cvIdx < 2; ++cvIdx){
                sum += beforeHistData.circleIndex(i + cvIdx) * cvCoeff[cvIdx + 2];
            }

//            Average Convolution
//            for( var cvIdx = -2; cvIdx < 2; ++cvIdx){
//                sum += beforeHistData.circleIndexOf(i + cvIdx);
//            }
            resultHistData[i] = sum/cvSum;
        }
        beforeHistData = resultHistData;
    }
    return resultHistData;
}

var pickPeaks = function(histData){
    var peaks = [];
    var minDataIndex = histData.indexOf(Math.min(histData)); // min is zero. ordinally
    for(var i = minDataIndex; i< histData.length + minDataIndex; ++i){
        if( histData.circleIndex(i-1) < histData.circleIndex(i) && 
           histData.circleIndex(i) > histData.circleIndex(i+1)){
            peaks.push({ x : i, size : histData.circleIndex(i)});   
        }
    }
    peaks.sort(function(f,b){ return b.size - f.size });
    for( var i = 0; i< peaks.length; ++i){
        peaks[i] = peaks[i].x;    
    }
    return peaks;
}

exports.pickPeaks = pickPeaks;
exports.smoothing = smoothing;

exports.createCanvasByImage = createCanvasByImage;
exports.pickColors = pickColors;
exports.histogram = histogram;
exports.test_picColors = test_pickColors;