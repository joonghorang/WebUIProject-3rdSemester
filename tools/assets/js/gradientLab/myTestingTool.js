(function(){
var isNodeModule = typeof module !== 'undefined' && module.exports;
var isRequirejs = typeof define === 'function' && define.amd;
    
var Canvas;
var Image;
var tc;
var cmCvs;
    
/* Dependency, Export Setting */
//create Canvas constructor on Browser 
Canvas = function(width, height){
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return canvas;
}
if(isRequirejs){
    //export Requirejs module
    define(["commonCanvas", "tinycolor2"],function(commonCanvas,tinycolor2){ 
        cmCvs = commonCanvas;
        tc = tinycolor2;
        return testingTool; 
    });
}else{
     //export normal browser
     window.testingTool = testingTool;
} 
var testingTool = {
    drawHistogram : drawHistogram,
    draw2dHistogram : draw2dHistogram,
    find2dMax : find2dMax
};
var drawHistogram = function(histData, width, height){
    var histCanvas = new Canvas(width, height);
    var ctx = histCanvas.getContext("2d");
    var imageData = ctx.createImageData(histCanvas.width, histCanvas.height);
    var maxDataSize = Math.max.apply(null, histData);
    var dataWidth = imageData.width / histData.length;
    var dataHeightRate = imageData.height / maxDataSize;
    
//    for(var x = 0; x < imageData.width ; ++x){
//        for(var y = 0; y < imageData.height; ++y){
//            var index = (y * imageData.width + x) * 4;
//            imageData.data[index + 0] = 197;
//            imageData.data[index + 1] = 32;
//            imageData.data[index + 2] = 101;
//            imageData.data[index + 3] = 255;
//        }
//    }
    
    for(var histIdx = 0; histIdx < histData.length; ++histIdx){
        for(var x = parseInt(histIdx * dataWidth); x < (histIdx+1) * dataWidth ; ++x){
//            for(var y = 0; y< histData[histIdx] * dataHeightRate; ++y){
            for(var y = imageData.height; y > imageData.height - (histData[histIdx] * dataHeightRate); --y){
                var index = (y * imageData.width + x) * 4;
            
                imageData.data[index + 0] = 197;
                imageData.data[index + 1] = 32;
                imageData.data[index + 2] = 101;
                imageData.data[index + 3] = 255;
            }
        }
    }
    ctx.putImageData(imageData, 0, 0);
    return histCanvas;
}

var draw2dHistogram = function(hist, width, height){
    var histCanvas = new Canvas(width, height);
    var ctx = histCanvas.getContext("2d");
    var imageData = ctx.createImageData(histCanvas.width, histCanvas.height);
    var maxDataSize = find2dMax(hist);
    
    
}

var find2dMax = function(twoDArray, cmp){
    var max = 0;
    for(var i = 0; i < twoDArray.length; ++i){
        var iMax = Math.max.apply(null, twoDArray[i]);
        if(max < iMax) max = iMax;
    }
    return max;
}

})();

