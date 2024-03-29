var hex2Dec = function(hex){    
    var r = parseInt(hex.slice(1,3),16);
    var g = parseInt(hex.slice(3,5),16);
    var b = parseInt(hex.slice(5,7),16);
    return {r: r, g: g, b: b};
};

var genGaussianNoise = function(variance){
    if(typeof variance === "undefined") variance = 1.0;
    
    if (typeof genGaussianNoise.spare !== "undefined") {
         var spare = genGaussianNoise.spare;
         delete genGaussianNoise.spare;
         return variance * spare;
     } else {
         var rand1 = Math.random();
         rand1 = -2 * Math.log(rand1);
         
         var rand2 = Math.random();
         rand2 = 2 * Math.PI * rand2;
         genGaussianNoise.spare = Math.sqrt(rand1 * variance) * Math.sin(rand2);
         return Math.sqrt(rand1 * variance) * Math.cos(rand2);
     }
}

var testGaussian = function(variance){
    if(typeof variance === "undefined") variance = 1.0;

    var hist = [];
//    var histLength = variance * 4 * 2 * 100;
    histLength = 2000;
    for( var i = 0; i< histLength; i++){
        hist[i] = 0;   
    }
    for(var i =0; i< 100000; ++i){
        var gauNoise = genGaussianNoise(variance);
        gauNoise = Math.round(gauNoise * 100);
        if(gauNoise < histLength/2 && gauNoise > -histLength/2) hist[parseInt(gauNoise + histLength/2)]++;
    }
    return hist;
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
            imageData.data[index + 3] = 255;
        }         
    }
    
    ctx.putImageData(imageData, 0,0);
};

var gradientWithNoise = function(canvas, color1, color2, noisePercent){
    var rgb1 = hex2Dec(color1);
    var rgb2 = hex2Dec(color2); 
    var ctx = canvas.getContext("2d");
    var imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
    
    var index;
    var noise;
    for(var x = 0; x< canvas.width; ++x){
        if(Math.random() > 1 - noisePercent )
        { noise = genGaussianNoise( canvas.width/ 16);
        }else{ noise = 0; }
        
for(var y = 0; y < canvas.height; ++y){
            index = (y * canvas.width + x) * 4;
        

            var colorPersent = x + noise;
            
            imageData.data[index + 0] = 
                parseInt((rgb1.r * (x + noise) / canvas.width) + rgb2.r * (canvas.width - (x + noise))/canvas.width);
            imageData.data[index + 1] = 
                parseInt((rgb1.g * (x + noise) / canvas.width) + rgb2.g * (canvas.width - (x + noise))/canvas.width);
            imageData.data[index + 2] = 
                parseInt((rgb1.b * (x + noise) / canvas.width) + rgb2.b * (canvas.width - (x + noise))/canvas.width);

            imageData.data[index + 3] = 255;
        }         
    }
    
    ctx.putImageData(imageData, 0,0);
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