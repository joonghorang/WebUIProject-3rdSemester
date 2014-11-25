<<<<<<< Updated upstream
(function main() {
=======
(function imageProcessing() {
>>>>>>> Stashed changes
    //var ORIGINIMAGE_HEIGHT = 300;
    var fileInput = document.getElementById("file-input");
    var submitButton = document.getElementById("submit-button");  
    var input_style = document.getElementById("input-style");  
    var text_input = document.getElementById("text-input");
    var textBox = document.getElementById("textBox");
    var inputImage = null;
    
    fileInput.addEventListener("change", function(){
        var file = this.files.item(0);
        var imageURL = URL.createObjectURL(file);
        inputImage = document.createElement("img");
        
        inputImage.setAttribute("class","inputImage");   // commented by 썬
        
        inputImage.src = imageURL;
<<<<<<< Updated upstream
        inputImage.setAttribute("class", "inputImage");
        inputImage.style.opacity = 0; 
        
        inputImage.addEventListener('click',function(){
            this.style.transition = 'opacity .5s ease-in-out';
            if(this.style.opacity === "0"){
                this.style.opacity = 1;
            }
            else{
                this.style.opacity = 0;
            }
        },false);
        content.appendChild(inputImage);

        inputImage.style.display = 'none';

        fileInput.style.display = 'none';
        input_style.style.display = 'none';

        submitButton.style.display = 'block';
        text_input.style.display = 'block';
        text_input.value = "Input your text here.";
=======
        //inputImage.height = ORIGINIMAGE_HEIGHT;
        content.appendChild(inputImage);
        
        //<animation test> : TODO 파일 분리했을 때 왜 안됐지.......???
        inputImage.addEventListener('click',function(){
            this.style.transition = 'opacity .5s ease-in-out';
            if(this.style.opacity==="0"){
                this.style.opacity=1;
            }
            else{
                this.style.opacity=0;
            }
        },false);
        //</animation test>
        
>>>>>>> Stashed changes
    }, false);
    
    submitButton.addEventListener("click", function(){
        if(inputImage === null){
            alert("no image");
        }
        else {
            getAvgRGBAFromImage(inputImage);
            mainText(setPixel);
            textBox.style.display = 'none';
            inputImage.style.display = 'block';
            inputImage.style.position = 'absolute';

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