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
var fileInput = document.getElementById('file-input');
var imageURL = "";
var image = document.createElement('img');
var r = 150;
var g = 0;
var b = 0;
var a = 255;

fileInput.addEventListener("change", function(){
    var file = this.files.item(0);
    imageURL = URL.createObjectURL(file);
    image.src = imageURL;
    
    document.body.appendChild(image);
}, false);

var buttonSubmit = document.getElementById('submit');
buttonSubmit.addEventListener("click", function(){
    if(imageURL === ""){
        //alert("No file");
        var resultCanvas = document.createElement('canvas');
        resultCanvas.width = 100;
        resultCanvas.height = 100;
        var resultContext = resultCanvas.getContext("2d");
        var resultImageData = resultContext.createImageData(100, 100);
        
        for(var x = 0; x < resultImageData.width; ++x){
            for(var y = 0; y < resultImageData.height; ++y){
                var index = (x + y * resultImageData.width) * 4;
                resultImageData.data[index + 0] = r;
                resultImageData.data[index + 1] = g;
                resultImageData.data[index + 2] = b;
                resultImageData.data[index + 3] = a;
            }
        }
        
        resultContext.putImageData(resultImageData, 0, 0);
        document.body.appendChild(resultCanvas);
    }

    else 
    {
        var canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext("2d");
        context.drawImage(image, 0,0);
        
//        document.body.appendChild(canvas);
        var imageData = context.getImageData(0, 0, image.width, image.height);
        var resultCanvas = document.createElement('canvas');
        resultCanvas.width = 400;
        resultCanvas.height = 300;
        var resultContext = resultCanvas.getContext("2d");
        var resultImageData = resultContext.createImageData(400, 300);
        
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
        r = parseInt(tmpR / pixelNum);
        g = parseInt(tmpG / pixelNum);
        b = parseInt(tmpB / pixelNum);
        
        for(var x = 0; x < resultImageData.width; ++x){
            for(var y = 0; y < resultImageData.height; ++y){
                setPixel(resultImageData, x, y, r, g, b, a);
            }
        }
        resultContext.putImageData(resultImageData, 0, 0);
        document.body.appendChild(resultCanvas);
    }
}, false);
function setPixel(imageData, x, y, r, g, b, a){
    var index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;   
}
function imageToCanvas(){
    
}
function SetRGB(imageData){   
    
}