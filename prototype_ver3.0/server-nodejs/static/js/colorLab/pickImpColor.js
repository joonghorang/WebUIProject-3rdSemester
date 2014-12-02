//12. 01. 20:43 
//add "circleIndexOf" method to Array.prototype
//add "smoothing" function
//12. 02. 06:00
//add "pickPeaks" function
//12. 03. 04:07
//try to make Server Client compatible js.

//Server, Client js 호환 자작한 부분... 더 좋은 방법이 있는지 찾아보자.
var Canvas;
var requirejs;
var path;
var tinycolor;

var __basename = typeof module === "undefined" || !module.exports ? (function(){
    //Client Side js.
    Canvas = function(width, height){
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        return canvas;
    }
    return "";
})() : (function(){ 
    //Server Side js.
    path = require("path");
    Canvas = require("canvas");
    tinycolor = require("tinycolor2");
    return path.basename(module.filename);
})();


var pickColors = function(img){
    console.log(__basename + " - function() pickColors start ...");
    var imageCanvas = createCanvasByImage(img);
    var hsvHistData = histogram("hsv", imageCanvas);
    var pickedHues = pickPeaks(smoothing(hsvHistData, 7));
    console.log(" pickedHue Finish. Hue.leng : " + pickedHues.length);
    var pickedColors = [];
    for(var i = 0; i< pickedHues.length; ++i){
        pickedColors.push(tinycolor({h : pickedHues[i]["x"], s :100, v:100}).toRgb());
    }
    console.log(__basename + " - function() pickColors end ");
    return pickedColors;
}

Array.prototype.circleIndex = function(idx){
//    // circleIndexOf(-1) = circleIndexOf( arrlen - 1 )
    if( idx >= 0 && idx < this.length){
        return this[idx];
    }else if(idx < 0){
        return this.circleIndex(idx + this.length);
    }else{
        return this.circleIndex(idx - this.length);
    }    
}

var createCanvasByImage = function(img){
//todo : module 호환해야됨.
//    var rCanvas = document.createElement("canvas");
//    rCanvas.width = image.naturalWidth;
//    rCanvas.height = image.naturalHeight;
    
    console.log(__basename + " - function() createCanvasByImage start ...");
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
        console.log("resizing result - canvasWidth : " + canvasWidth + ", canvasHeight : " + canvasHeight);
    }

    var rCanvas = new Canvas(canvasWidth, canvasHeight);
    var rCanvasCtx = rCanvas.getContext("2d");
    rCanvasCtx.drawImage(img, 0,0, img.width, img.height, 0,0, canvasWidth, canvasHeight);
    console.log(__basename + " - function() createCanvasByImage end");
    return rCanvas;
}    

var histogram = function( type, canvas ){
    var color = new tinycolor("#0000ff");
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
    console.log(cvCoeff);
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
//    peaks.sort(function(f,b){ return b.size - f.size });
//    for( var i = 0; i< peaks.length; ++i){
//        peaks[i] = peaks[i].x;    
//    }
    return peaks;
}

if(typeof module !== "undefined" && module.exports){
    exports.pickPeaks = pickPeaks;
    exports.smoothing = smoothing;

    exports.createCanvasByImage = createCanvasByImage;
    exports.pickColors = pickColors;
    exports.histogram = histogram;
}