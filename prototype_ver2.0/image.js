(function main() {
    var ORIGINIMAGE_HEIGHT = 300;
    var fileInput = document.getElementById("file-input");
    var submitButton = document.getElementById("submit-button");    
    var inputImage = null;
    
    fileInput.addEventListener("change", function(){
        var file = this.files.item(0);
        var imageURL = URL.createObjectURL(file);
        inputImage = document.createElement("img");
        inputImage.src = imageURL;
        inputImage.heightㅠ = ORIGINIMAGE_HEIGHT;
        content.appendChild(inputImage);
    }, false);
    
    submitButton.addEventListener("click", function(){
        if(inputImage === null){
            alert("no image");
        }
        else {
            getAvgRGBAFromImage(inputImage);
            mainText(setPixel);
        }
    }, false);
    
    function setPixel(imageData, x, y, r, g, b, a){
        var index = (x + y * imageData.width) * 4;
        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = a;   
    }
    function createPhotoCanvasFromImage(image){
        var rCanvas = document.createElement("canvas");
        rCanvas.width = image.naturalWidth;
        rCanvas.height = image.naturalHeight;
        
        CANVAS_WIDTH = rCanvas.width;
        CANVAS_HEIGHT = rCanvas.height;
        
        var rCanvasCtx = rCanvas.getContext("2d");
        rCanvasCtx.drawImage(image, 0, 0);
        return rCanvas;
    }
    function getAvgRGBAFromImage(img){
        var imgCanvas = createPhotoCanvasFromImage(img);
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