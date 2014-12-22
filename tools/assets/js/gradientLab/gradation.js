(function(){
var isNodeModule = typeof module !== 'undefined' && module.exports;
var isRequirejs = typeof define === 'function' && define.amd;
    
var Canvas;
var Image;
var gNoise;
var cmCvs;
    
/* Dependency, Export Setting */
if(isNodeModule){
    //Node module dependency
    Canvas = require("canvas");   
    Image = Canvas.Image;
    gNoise = require("gaussian-noise");
    cmCvs = require("commonCanvas");
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
        define(["commonCanvas","gaussianNoise"],function(commonCanvas,gaussianNoise){ 
            cmCvs = commonCanvas;
            gNoise = gaussianNoise;
            return gradation; 
        });
    }
    else{
        //export normal browser
        window.gradation = gradation;
    }
}    
    
var gradation = {
    inkAndPaper : function(canvas, paperColor, inkColor, width, height, inkQuan, time){
        paperColor = typeof paperColor === "object" ? paperColor : cmCvs.hex2Rgb(paperColor);
        inkColor = typeof inkColor === "object" ? inkColor : cmCvs.hex2Rgb(inkColor);
        
        semiInkRate = 0.3;
        semiInkColor = {
            r : inkColor.r * semiInkRate + paperColor.r * (1-semiInkRate),
            g : inkColor.g * semiInkRate + paperColor.g * (1-semiInkRate),
            b : inkColor.b * semiInkRate + paperColor.b * (1-semiInkRate),
            a : 255
        }
        var ctx = canvas.getContext('2d');
        var imageData = ctx.createImageData(canvas.width,canvas.height);
   
        var len = 2;
        var r1 = inkQuan * time*len;
        var r2 = 3.5 * inkQuan * time*len;
        var rRate = r1/r2;
        
        width = canvas.width * width;
        height = canvas.height * height;
        
        function toDegree(x, y){
            return Math.atan2(x,y) * 180 / Math.PI;
        }
        
        var degreeRange2 = [r2];
        for ( var i =1 ; i< 3600; ++i){
            degreeRange2[i] = degreeRange2[i-1] + gNoise.gen(0.3);   
        }
        var degreeRange1 = [];
        for ( var i =0; i<degreeRange2.length; ++i){
            degreeRange1[i] = degreeRange2[i] * rRate;
        }
        for(var y = 0; y < canvas.height; ++y){
            for(var x = 0; x < canvas.width; ++x){
                var deltaX = width -x;
                var deltaY = height -y;
                var degree = toDegree(deltaX,deltaY);
                var degreeIdx = Math.round(degree*10) + degreeRange1.length/2 -1;
                var r = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY, 2));
                var color;
                if(r < degreeRange1[degreeIdx]){
                    color = inkColor;       
                }else if( r > degreeRange2[degreeIdx]){
                    color = paperColor;
                }else{
                    var rate = Math.pow(degreeRange2[degreeIdx] - r,3)
                    /Math.pow(degreeRange2[degreeIdx] - degreeRange1[degreeIdx],3);
                    color = {
                        r : inkColor.r * (rate) + semiInkColor.r * (1-rate),
                        g : inkColor.g * (rate) + semiInkColor.g * (1-rate),
                        b : inkColor.b * (rate) + semiInkColor.b * (1-rate),
                        a : 255
                    };
                }
                cmCvs.setPixel(imageData, x, y, color);
            }
        }
        
        
//        var xpos1 = 0.2;
//        var xpos2 = 0.7;
//        var xpos1 = canvas.width * xpos1;
//        var xpos2 = canvas.width * xpos2;
//        
//        var x1poses = [xpos1];
//        var x2poses = [xpos2];
//        for(var i =1; i< canvas.height; ++i){
//            var noise = gNoise.gen(2);
//            x1poses[i] = x1poses[i-1] + parseInt(gNoise.gen());
//            noise = gNoise.gen(4);
//            x2poses[i] = x2poses[i-1] + parseInt(gNoise.gen());
//        }
//        
//        for(var y = 0; y < canvas.height; ++y){
//            for(var x = 0; x < canvas.width; ++x){
//                var color;
//                if( x < x1poses[y]){
//                    color = inkColor;       
//                }else if( x > x2poses[y]){
//                    color = paperColor;
//                }else{
//                    var rate = (x2poses[y] - x)/(x2poses[y] - x1poses[y]);
//                    color = {
//                        r : inkColor.r * (rate) + semiInkColor.r * (1-rate),
//                        g : inkColor.g * (rate) + semiInkColor.g * (1-rate),
//                        b : inkColor.b * (rate) + semiInkColor.b * (1-rate),
//                        a : 255
//                    };
//                }
//                cmCvs.setPixel(imageData, x, y, color);
//            }
//        }
        
        ctx.putImageData(imageData, 0,0);  
    },
    
    gradient : function(canvas, color1, color2){
        var rgb1 = cmCvs.hex2Rgb(color1);
        var rgb2 = cmCvs.hex2Rgb(color2); 
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
        var rgb1 = cmCvs.hex2Rgb(color1);
        var rgb2 = cmCvs.hex2Rgb(color2); 
        var ctx = canvas.getContext("2d");
        var imageData = ctx.getImageData(0,0,canvas.width, canvas.height);

        var index;
        var noise;
        for(var y = 0; y < canvas.height; ++y){
            if(Math.random() > 1 - noisePercent )
            { noise = gNoise.gen( canvas.width/ 32);
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