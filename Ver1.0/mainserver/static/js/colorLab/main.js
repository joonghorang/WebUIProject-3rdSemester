

//Array.prototype.circleIndex = function(idx){
////    // circleIndexOf(-1) = circleIndexOf( arrlen - 1 )
//    if( idx >= 0 && idx < this.length){
//        return this[idx];
//    }else if(idx < 0){
//        return this.circleIndex(this.length + idx);
//    }else{
//        return this.circleIndex(idx - this.length);
//    }    
//}

document.getElementById("histo");
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
    
//    var histCanvas = drawHistogram(smoothing(histData, 3));
    histo.appendChild(drawHistogram(histData1));
    //pickPeaks(histData);
    histo.appendChild(drawHistogram(histData2));
    //pickPeaks(smoothing(histData, 7));
    histo.appendChild(drawHistogram(histData3));
    //pickPeaks(smoothing(histData, 7, [1, 4, 6, 4, 1]));
    
},false);

var drawHistogram = function(histData){
    var histCanvas = document.createElement("canvas");
    var ctx = histCanvas.getContext("2d");
    var imageData = ctx.createImageData(histo.clientWidth, 200)
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
    histCanvas.width = imageData.width;
    histCanvas.height = imageData.height;
    ctx.putImageData(imageData, 0, 0);
    return histCanvas;
}
//
//var smoothing = function(histData, repeat, cvCoeff){
//
//    //set default
//    repeat = typeof repeat !== "number" ? 1 : repeat;
//    cvCoeff = typeof cvCoeff === "undefined" || cvCoeff.length%2 !== 1 ? [1, 1, 1, 1, 1] : cvCoeff; 
//    
//    var beforeHistData = histData.slice(0);
//    var resultHistData;
//    var cvSum = cvCoeff.reduce(function(pv, cv){return pv + cv});
//    
//    for( var r = 0; r < repeat; ++r){
//        resultHistData = [];
//        for( var i = 0; i< beforeHistData.length; ++i){
//            var sum = 0;
//            for( var cvIdx = -2; cvIdx < 2; ++cvIdx){
//                sum += beforeHistData.circleIndex(i + cvIdx) * cvCoeff[cvIdx + 2];
//            }
//
////            Average Convolution
////            for( var cvIdx = -2; cvIdx < 2; ++cvIdx){
////                sum += beforeHistData.circleIndexOf(i + cvIdx);
////            }
//            resultHistData[i] = sum/cvSum;
//        }
//        beforeHistData = resultHistData;
//    }
//    return resultHistData;
//}
//
//var pickPeaks = function(histData){
//    var peaks = [];
//    var minDataIndex = histData.indexOf(Math.min(histData)); // min is zero. ordinally
//    for(var i = minDataIndex; i< histData.length + minDataIndex; ++i){
//        if( histData.circleIndex(i-1) < histData.circleIndex(i) && 
//           histData.circleIndex(i) > histData.circleIndex(i+1)){
//            peaks.push({ x : i, size : histData.circleIndex(i)});   
//        }
//    }
//    peaks.sort(function(f,b){ return b.size - f.size });
//    for( var i = 0; i< peaks.length; ++i){
//        peaks[i] = peaks[i].x;    
//    }
//    return peaks;
//}
//
