var Canvas = function(width, height){
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return canvas;
}

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