//var fileInput = document.getElementById('file-input');
//fileInput.onchange = function(){
//    var files = this.files;
//    for(var i = 0; i < files.length; i++){
//        var file = files.item(i);
//        
//        var reader = new FileReader();
//        reader.onload = function() {
//            var image = document.createElement('img');
//            image.width = 400;
//            image.height = 300;
//            image.src = reader.result;
//            
//            document.body.appendChild(image);
//        };
//        reader.readAsDataURL(file);
//    }
//};

//
//
//(function(){
//var fileInput = document.getElementById('file-input');
//var imageURL = "";
//var image = document.createElement('img');
//var r = 150;
//var g = 0;
//var b = 0;
//var a = 255;
//
//fileInput.addEventListener("change", function(){
//    var file = this.files.item(0);
//    imageURL = URL.createObjectURL(file);
//    image.src = imageURL;
//    
//    document.body.appendChild(image);
//}, false);
//
//var buttonSubmit = document.getElementById('submit');
//buttonSubmit.addEventListener("click", function(){
//    if(imageURL === ""){
////        //alert("No file");
////        var resultCanvas = document.createElement('canvas');
////        resultCanvas.width = 100;
////        resultCanvas.height = 100;
////        var resultContext = resultCanvas.getContext("2d");
////        var resultImageData = resultContext.createImageData(100, 100);
////        
////        for(var x = 0; x < resultImageData.width; ++x){
////            for(var y = 0; y < resultImageData.height; ++y){
////                var index = (x + y * resultImageData.width) * 4;
////                resultImageData.data[index + 0] = r;
////                resultImageData.data[index + 1] = g;
////                resultImageData.data[index + 2] = b;
////                resultImageData.data[index + 3] = a;
////            }
////        }
////        
////        resultContext.putImageData(resultImageData, 0, 0);
////        document.body.appendChild(resultCanvas);
//    }
//
//    else 
//    {
//        var canvas = document.createElement('canvas');
//        canvas.width = image.width;
//        canvas.height = image.height;
//        var context = canvas.getContext("2d");
//        context.drawImage(image, 0,0);
//        
////        document.body.appendChild(canvas);
//        var imageData = context.getImageData(0, 0, image.width, image.height);
//        var resultCanvas = document.createElement('canvas');
//        resultCanvas.width = 400;
//        resultCanvas.height = 300;
//        var resultContext = resultCanvas.getContext("2d");
//        var resultImageData = resultContext.createImageData(400, 300);
//        
//        var tmpR = 0;
//        var tmpG = 0;
//        var tmpB = 0;
//        for(var x = 0; x < imageData.width; ++x){
//            for(var y = 0; y < imageData.height; ++y){
//                var index = (x + y * imageData.width) * 4;
//                tmpR += imageData.data[index + 0];
//                tmpG += imageData.data[index + 1];
//                tmpB += imageData.data[index + 2];
//            }
//        }
//        var pixelNum = imageData.width * imageData.height;
//        r = parseInt(tmpR / pixelNum);
//        g = parseInt(tmpG / pixelNum);
//        b = parseInt(tmpB / pixelNum);
//        
//        for(var x = 0; x < resultImageData.width; ++x){
//            for(var y = 0; y < resultImageData.height; ++y){
//                setPixel(resultImageData, x, y, r, g, b, a);
//            }
//        }
//        resultContext.putImageData(resultImageData, 0, 0);
//        document.body.appendChild(resultCanvas);
//    }
//}, false);
//function setPixel(imageData, x, y, r, g, b, a){
//    var index = (x + y * imageData.width) * 4;
//    imageData.data[index + 0] = r;
//    imageData.data[index + 1] = g;
//    imageData.data[index + 2] = b;
//    imageData.data[index + 3] = a;   
//}
//function imageToCanvas(){
//    
//}
//function SetRGB(imageData){   
//    
//}
//})();


//
//
(function main() {
    var CANVAS_WIDTH = 800;
    var CANVAS_HEIGHT = 600;
    var ORIGINIMAGE_HEIGHT = 300;
    
    
    var fontSize = 72;
    var fontName = "NanumMyeongjo";
    var fontColor = "#FFF";
    var fileInput = document.getElementById("file-input");
    var textInput = document.getElementById("text-input");
    var submitButton = document.getElementById("submit-button");
    var content = document.getElementById("content");
    
    var avgR;
    var avgG;
    var avgB;
    var avgA;
    
    var inputImage = null;
    
    textInput.value = "달.";
    
    fileInput.addEventListener("change", function(){
        var file = this.files.item(0);
        var imageURL = URL.createObjectURL(file);
        inputImage = document.createElement("img");
        inputImage.src = imageURL;
        inputImage.height = ORIGINIMAGE_HEIGHT;
        content.appendChild(inputImage);
        
        
    }, false);
    
    submitButton.addEventListener("click", function(){
        if(inputImage === null){
            alert("no image");
        }
        
        else {
            getAvgRGBAFromImage(inputImage);
            
            var rCanvas = document.createElement("canvas");
            rCanvas.width = CANVAS_WIDTH;
            rCanvas.height = CANVAS_HEIGHT;
            var rCanvasCtx = rCanvas.getContext("2d"); 
            var rImageData = rCanvasCtx.createImageData(CANVAS_WIDTH, CANVAS_HEIGHT);
            for(var x = 0; x<CANVAS_WIDTH; ++x){
                for(var y = 0; y < CANVAS_HEIGHT; ++y){
                    setPixel(rImageData, x, y, avgR, avgG, avgB, avgA);
                }
            }
            rCanvasCtx.putImageData(rImageData, 0, 0);
            setText(rCanvasCtx, textInput.value, 10, 10, fontColor, fontName, fontSize);
            console.log(textInput.value);
            console.log(textInput);
            console.log(rCanvasCtx);
            
            content.appendChild(rCanvas);
        }
    }, false);
    
    function setPixel(imageData, x, y, r, g, b, a){
        var index = (x + y * imageData.width) * 4;
        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = a;   
    }
    function createCanvasFromImage(image){
        var rCanvas = document.createElement("canvas");
        rCanvas.width = image.naturalWidth;
        rCanvas.height = image.naturalHeight;
        var rCanvasCtx = rCanvas.getContext("2d");
        rCanvasCtx.drawImage(image, 0, 0);
        return rCanvas;
    }
    function setText(context, text, x, y, color, font, fontSize){
        context.fillStyle = "#FFF";
        context.font = fontSize + "px " + fontName;
        context.fillText(textInput.value, 200, fontSize + 150);
    }
    function getAvgRGBAFromImage(img){
        var imgCanvas = createCanvasFromImage(img);
        var imgCanvasCtx = imgCanvas.getContext("2d");
        var imgData = imgCanvasCtx.getImageData(0,0,imgCanvas.width, imgCanvas.height);
        var sumR = 0;
        var sumG = 0;
        var sumB = 0;
        var sumA = 0;
        var pixelNum = imgCanvas.width * imgCanvas.height;
        
        var idx = 0 ;
        for(var x = 0; x < imgCanvas.width; ++x){
            for(var y = 0; y < imgCanvas.height; ++y){
                idx = (x + y*imgCanvas.width) * 4;
                sumR += imgData.data[idx + 0];
                sumG += imgData.data[idx + 1];
                sumB += imgData.data[idx + 2];
                sumA += imgData.data[idx + 3];
            }
        }
        
        avgR = parseInt(sumR / pixelNum);
        avgG = parseInt(sumG / pixelNum);
        avgB = parseInt(sumB / pixelNum);
        avgA = parseInt(sumA / pixelNum);
        
    }
    
})();


// RGB to HSV
// 일단 개념은 대충이해하고 코드를 스톡오버 플로우에서 복사해왔으나 좀더 들여다 봐야할 듯.
function setRgbToHsv () {
    var rr, gg, bb;
    var r = arguments[0] / 255,
        g = arguments[1] / 255,
        b = arguments[2] / 255;
    var h, 
        s,
        v = Math.max(r, g, b);
    var diff = v - Math.min(r, g, b);
    var diffc = function(c){
            return (v - c) / 6 / diff + 1 / 2;
        };

    if (diff == 0) {
        h = s = 0; // rgb의 최대값과 최소값을 뺀 값이 0이라면 모든 평면이 같다는 의미.
    } else {
        s = diff / v;
        rr = diffc(r);
        gg = diffc(g);
        bb = diffc(b);

        if (r === v) {
            h = bb - gg;
        }else if (g === v) {
            h = (1 / 3) + rr - bb;
        }else if (b === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        }else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        v: Math.round(v * 100)
    };
}