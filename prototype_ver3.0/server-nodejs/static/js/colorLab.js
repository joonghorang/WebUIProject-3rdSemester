var histo = document.getElementById("histo");
window.addEventListener('DOMContentLoaded', function(){
    
//    var xhr = new XMLHttpRequest();
//    xhr.onreadystatechange = function(){
//        if(xhr.readyState ==4){
//            if((xhr.status >= 200 && xhr.status < 300 || xhr.status 304)){
//                console.log(xhr.responseText);
//            }
//        }else {
//            alert("Req Fail");   
//        }            
//    }
//    xhr.open("get", "/itemFactory/image", false);
//    xhr.send("
//    console.log(histo.width, histo.clientWidth, histo.offsetWidth, histo.scrollWidth);
    var histCanvas = drawHistogram(histData);
    histo.appendChild(histCanvas);
},false);

var drawHistogram = function(histData){
    var histCanvas = document.createElement("canvas");
    var ctx = histCanvas.getContext("2d");
    var imageData = ctx.createImageData(histo.clientWidth, 400)
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
            for(var y = 0; y < histData[histIdx] * dataHeightRate; ++y){
                var index = (y * imageData.width + x) * 4;
            
                imageData.data[index + 0] = 197;
                imageData.data[index + 1] = 32;
                imageData.data[index + 2] = 101;
                imageData.data[index + 3] = 255;
            }
        }
    }
    histCanvas.width = imageData.width;
    histCanvas.height = 400;

    ctx.putImageData(imageData, 0, 0);
    console.log(imageData.width, ctx.width, histCanvas.width);
    
    return histCanvas;
}