var Canvas = function(width, height){
    var c = document.createElement("canvas");
    c.width = width;
    c.height = height;
    return c;
};

var createCanvasByImage = function(img){
//todo : module 호환해야됨.
//    var rCanvas = document.createElement("canvas");
//    rCanvas.width = image.naturalWidth;
//    rCanvas.height = image.naturalHeight;
    
    var pixelNumResizingSaturation = 100000;
    
    var pixelNum = img.width * img.height;
    var pixelNumRate = pixelNum / pixelNumResizingSaturation;

    var canvasWidth = img.width;
    var canvasHeight = img.height;
    
    if(pixelNumRate > 1){
        var lengthRate =  Math.sqrt(pixelNumRate);
        canvasWidth = parseInt(canvasWidth/lengthRate);
        canvasHeight = parseInt(canvasHeight / lengthRate);
    }

    var rCanvas = new Canvas(canvasWidth, canvasHeight);
    var rCanvasCtx = rCanvas.getContext("2d");
    rCanvasCtx.drawImage(img, 0,0, img.width, img.height, 0,0, canvasWidth, canvasHeight);
    return rCanvas;
}    

var gradient = function(canvas, color1, color2){
    var rgb1 = hex2Dec(color1);
    var rgb2 = hex2Dec(color2); 
    var ctx = canvas.getContext("2d");
    var imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
    var index;
    for(var y = 0; y < canvas.height; ++y){
        for(var x = 0; x< canvas.width; ++x){
            index = (y * canvas.width + x) * 4;
            imageData.data[index + 0] = rgb1.r * x / canvas.width + rgb2.r * (canvas.width - x)/canvas.width;
            imageData.data[index + 1] = rgb1.g * x / canvas.width + rgb2.g * (canvas.width - x)/canvas.width;
            imageData.data[index + 2] = rgb1.b * x / canvas.width + rgb2.b * (canvas.width - x)/canvas.width;
            //       imageData.data[index + 3] = 255;
        }         
    }
    ctx.putImageData(imageData, 0,0);
};

var hex2Dec = function(hex){    
    var r = parseInt(hex.slice(1,3),16);
    var g = parseInt(hex.slice(3,5),16);
    var b = parseInt(hex.slice(5,7),16);
    return {r: r, g: g, b: b};
};

var cv = function(canvas, mat){
    var matSize = Math.sqrt(mat.length);
    var matSum = mat.reduce(function(p, c){ return p+c; });
    var ctx = canvas.getContext("2d");
    var imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
    var rCanvas = Canvas(canvas.width, canvas.height);
    var rCtx = rCanvas.getContext("2d");
    var rImageData = rCtx.createImageData(canvas.width, canvas.height);
    var rSum;   
    var gSum;
    var bSum;
    var index;
    var cvRange = parseInt(matSize/2);
    for(var y = 0; y < canvas.height; ++y){
        for(var x = 0; x< canvas.width; ++x){
            rSum = 0;
            gSum = 0;
            bSum = 0;
            if( x > cvRange && y > cvRange && x < canvas.width - cvRange && y < canvas.height - cvRange ){
                index = (y * canvas.width + x) * 4;
                for(var i = -cvRange; i <= cvRange; ++i ){
                    for(var j = -cvRange; j<= cvRange; ++j ){
                        var matIndex = (i+cvRange)*matSize + j + cvRange;
                        var imgIndex = (j*canvas.width + i) * 4;
                        rSum += imageData.data[index + imgIndex + 0] * mat[matIndex];
                        gSum += imageData.data[index + imgIndex + 1] * mat[matIndex];
                        bSum += imageData.data[index + imgIndex + 2] * mat[matIndex];
                    }
                }                   
            }

            var rResult = parseInt(rSum/matSum);
            if(rResult < 0 ) rResult = 0;
            if(rResult > 255) rResult = 255;
            var gResult = parseInt(gSum/matSum);
            if(gResult < 0 ) gResult = 0;
            if(gResult > 255) gResult = 255;
            var bResult = parseInt(bSum/matSum);
            if(bResult < 0) bResult = 0;    
            if(bResult > 255) bResult = 255;
            rImageData.data[index + 0] = rResult;
            rImageData.data[index + 1] = gResult;
            rImageData.data[index + 2] = bResult;
            rImageData.data[index + 3] = 255;
        }      
    }
    rCtx.putImageData(rImageData, 0, 0);
    return rCanvas;
};