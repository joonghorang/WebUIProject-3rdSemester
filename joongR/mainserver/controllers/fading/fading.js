/* Impressive

*/
(function(){
var isNodeModule = typeof module !== 'undefined' && module.exports;
var isRequirejs = typeof define === 'function' && define.amd;
var tc;
var cmCvs;

//var console = {};
//console.log = function(){};
    
/* Export and Constructor Setting */
if(isNodeModule){
    //Node module dependency
    Canvas = require("canvas");   
    Image = Canvas.Image;
    tc = require("tinycolor2");
    cmCvs = require("common-canvas");
}else {
    //Canvas constructor for browser
    Canvas = function(width, height){
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        return canvas;
    }
    if(isRequirejs){
        define(["tinycolor2", "commonCanvas"], function(tinycolor2, commonCanvas){ 
            //requirejs dependency 
            tc = tinycolor2;
            cmCvs = commonCanvas; 
            //export requirejs Module
            return fading; 
        });
    }else{
        tc = tinycolor;
        cmCvs = commonCanvas;
        //export normal browser module.
        window.fading = fading;    
    }
}    
/* add utility method */
Math.mod = function(a, n){
    if( a < 0 ){
        return this.mod(a + n, n);   
    }else{
        return a%n;
    }
}
/* Constant */
var HUE_RANGE = 360;    

var fading = function fading(canvas, hueL, hueR, rate){
    var affected = false;
    var ctx = canvas.getContext('2d');
    var imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
    for(var y = 0; y < canvas.height; ++y){
        for(var x = 0; x < canvas.width; ++x){
            var rgba = cmCvs.getPixel(imageData, x, y);
            var hsv = tc(rgba).toHsv();
            if(isInHueRange(hsv.h, hueL, hueR) && hsv.s > 0){
                if(!affected) affected = true;
                hsv.s = Math.round(hsv.s * rate * 100) / 100;
                rgba = tc(hsv).toRgb();
                rgba.a = parseInt(rgba.a *255);
                cmCvs.setPixel(imageData, x, y, rgba);
            }
        }
    }
    
    ctx.putImageData(imageData, 0,0);
    return affected;
}

function isInHueRange(hue, rangeL, rangeR){
    if(rangeL * rangeR > 0 && rangeL <= rangeR){
        return Math.mod(rangeL, HUE_RANGE) <= hue && 
            hue <= Math.mod(rangeR, HUE_RANGE);
    }else{
        return (Math.mod(rangeL, HUE_RANGE) <= hue && hue < HUE_RANGE) ||
            (0 <= hue && hue <= Math.mod(rangeR, HUE_RANGE));
    }
};


































//export node module
if(isNodeModule){
    module.exports = fading;
}
})();