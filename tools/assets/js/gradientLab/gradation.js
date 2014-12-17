(function(){
var isNodeModule = typeof module !== 'undefined' && module.exports;
var isRequirejs = typeof define === 'function' && define.amd;
    
var Canvas;
var Image;
var gaussianNoise;
var commonCanvas;
    
/* Dependency, Export Setting */
if(isNodeModule){
    //Node module dependency
    Canvas = require("canvas");   
    Image = Canvas.Image;
    gaussianNoise = require("gaussian-noise");
    commonCanvas = require("commonCanvas");
    //export node module
    module.exports = gradation;
}else{
    //create Canvas constructor on Browser 
    Canvas = function(width, height){
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        return canvas;
    }
    if(isRequirejs){
        //export Requirejs module
        define(["commonCanvas","gaussianNoise"],function(comCanLocal,gauNoiLocal){ 
            commonCanvas = comCanLocal;
            gaussianNoise = gauNoiLocal;
            return gradation; 
        });
    }
    else{
        //export normal browser
        window.gradation = gradation;
    }
}    
    
var gradation = {
    inkAndPaper : function(canvas, paperColor, inkColor, width, height){
        
    }
    gradient : function(canvas, color1, color2){
        var rgb1 = commonCanvas.hex2Rgb(color1);
        var rgb2 = commonCanvas.hex2Rgb(color2); 
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
    },

    gradientWithNoise : function(canvas, color1, color2, noisePercent){
        var rgb1 = commonCanvas.hex2Rgb(color1);
        var rgb2 = commonCanvas.hex2Rgb(color2); 
        var ctx = canvas.getContext("2d");
        var imageData = ctx.getImageData(0,0,canvas.width, canvas.height);

        var index;
        var noise;
        for(var y = 0; y < canvas.height; ++y){
            if(Math.random() > 1 - noisePercent )
            { noise = gaussianNoise.genGaussianNoise( canvas.width/ 32);
            }else{ noise = 0; }
            for(var x = 0; x< canvas.width; ++x){

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
    },


    cv : function(canvas, mat){
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
    }
}
})();