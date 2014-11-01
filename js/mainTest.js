(function main() {
    var CANVAS_WIDTH = 800;
    var CANVAS_HEIGHT = 600;
    var ORIGINIMAGE_HEIGHT = 300;
    
    
    var fontSize = 72;
    var fontName = "NanumMyeongjo";
    var fontColor = "#FFF";
    var submitButton = document.getElementById("submit-button");
    var fileInput = document.getElementById("file-input");
    var textInputButton = document.getElementById("text-input");
    var content = document.getElementById("content");
    
    var avgR;
    var avgG;
    var avgB;
    var avgA;
    
    var inputImage = null; // 이미지받을 애를 저장할 전역변수

    var newCanvas = document.createElement("canvas"); // 평균값을 넣을 캔버스 선언

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
                alert(textInputButton.value);

                var resultCanvas = document.createElement("canvas");
                resultCanvas.width = CANVAS_WIDTH;
                resultCanvas.height = CANVAS_HEIGHT;
                var resultCanvasContext = resultCanvas.getContext("2d");
                var resultImageData = resultCanvasContext.createImageData(CANVAS_WIDTH, CANVAS_HEIGHT); 

                for(var y = 0; y < CANVAS_HEIGHT; y++){
                    for(var x = 0; x < CANVAS_WIDTH * 4; x = x + 4){
                         resultImageData.data[y * (CANVAS_WIDTH * 4) + x] = 200; // 빨강
                         resultImageData.data[y * (CANVAS_WIDTH * 4) + x + 1] = 20; // 초록
                         resultImageData.data[y * (CANVAS_WIDTH * 4) + x + 2] = 40; // 파랑
                         resultImageData.data[y * (CANVAS_WIDTH * 4) + x + 3] = 255; // 투명도
                    }
                }

                resultCanvasContext.putImageData(resultImageData, 0, 0);            // 최종적으로 결과가 된 이미지데이터를 캔버스에 삽입

                // 이 순서대로 써야함.
                resultCanvasContext.fillStyle = fontColor;
                resultCanvasContext.font = fontSize + "px " + fontName;
                resultCanvasContext.fillText(textInputButton.value, 200, fontSize + 150);

                content.appendChild(resultCanvas);

                fileImgToCanvas();
                findColorAverage();
            }
    }, false);
    
    function fileImgToCanvas(){
        
        newCanvas.width = inputImage.naturalWidth;         // natural을 붙여줘여 원래 이미지의 원본 width를 가져온다.
        newCanvas.height = inputImage.naturalHeight;
        var newCanvasContext = newCanvas.getContext("2d");
        //var newCanvasImageData = newCavasContext.createImageData(newCanvas.width, newCanvas.height);
        newCanvasContext.drawImage(inputImage, 0, 0);
        //newCanvasContext.putImageData(newCanvasImageData, 0, 0);
        document.body.appendChild(newCanvas);
    }

    function findColorAverage(){


        var imgWidth = inputImage.naturalWidth;
        var imgHeight = inputImage.naturalHeight;

        var newCanvasContext = newCanvas.getContext("2d");
        var newCanvasImageData = newCanvasContext.getImageData(0, 0, imgWidth, imgHeight);

        var sumR = 0;
        var sumG = 0;
        var sumB = 0;
        var sumA = 0;

        for(var y = 0; y < imgHeight; y++){
            for(var x = 0; x < imgWidth * 4; x = x + 4){
                 sumR += newCanvasImageData.data[y * (imgWidth * 4) + x]; // 빨강
                 sumG += newCanvasImageData.data[y * (imgWidth * 4) + x + 1]; // 초록
                 sumB += newCanvasImageData.data[y * (imgWidth * 4) + x + 2]; // 파랑
                 sumA += newCanvasImageData.data[y * (imgWidth * 4) + x + 3]; // 투명도
            }
        }
        console.log(newCanvasImageData.data[0]);
        console.log(newCanvasImageData.data[1]);
        console.log(newCanvasImageData.data[2]);
        console.log(newCanvasImageData.data[3]);

        avgR = parseInt(sumR/(imgWidth * imgHeight));
        avgG = parseInt(sumG/(imgWidth * imgHeight));
        avgB = parseInt(sumB/(imgWidth * imgHeight));
        avgA = parseInt(sumA/(imgWidth * imgHeight));

        // console.log(avgR);
        // console.log(avgG);
        // console.log(avgB);
        // console.log(avgA);
    }
})();