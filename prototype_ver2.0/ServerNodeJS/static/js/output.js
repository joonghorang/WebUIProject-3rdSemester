var xhr = new XMLHttpRequest();
var outputData;

xhr.open("get", "output/output.json", false);
xhr.send(null);

if( (xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
   outputData = JSON.parse(xhr.responseText);
}else{
    alert("fail to get json");   
}

var outputImage = document.getElementById("output-image");
var outputCanvas = document.getElementById("output-canvas");

//outputCanvas click.
//outputCanvas Fade out.
outputCanvas.addEventListener('click',function(e){
    if(this.style.opacity === "0"){
        this.style.opacity = 1;
    }else{
        this.style.opacity = 0;
    }
}, false);

//window onload.
//calculate image ratio (width/height).
//create imageData of output-canvas.
window.addEventListener("load", function(e){
    var ratio = outputImage.naturalWidth/outputImage.naturalHeight;
    outputImage.style.width = outputCanvas.style.width = 100 * ratio + "vh";
    outputImage.style.maxHeight = outputCanvas.style.maxHeight = 100 / ratio + "vw";
    
    ctx = outputCanvas.getContext("2d");
    var imageData = ctx.createImageData(outputCanvas.width, outputCanvas.height);
    for(var x = 0; x<outputCanvas.width; ++x){
        for(var y = 0; y<outputCanvas.height; ++y){
            var index = (x + y * imageData.width) * 4;
            imageData.data[index + 0] = 201;
            imageData.data[index + 1] = 91;
            imageData.data[index + 2] = 73;
            imageData.data[index + 3] = 250; 
            if( y < outputCanvas.height/7 ){
                imageData.data[index + 3] = 255* y / (outputCanvas.height/7);   
            }
        }
    }
    ctx.putImageData(imageData, 0,0);
    
}, false);

