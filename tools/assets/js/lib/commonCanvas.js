(function(){
var isNodeModule = typeof module !== "undefined" && module.exports;
var isRequirejs = typeof define === 'function' && define.amd;
    
var Canvas;
var Image;

/* Constructor Setting */
if(isNodeModule){
    var Canvas = require("canvas");   
    var Image = Canvas.Image;
}else {
    var Canvas = function(width, height){
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        return canvas;
    }
}

var commonCanvas = {
    createCanvasByImage : function(img, saturate){
    //    console.log(__basename + " - function() createCanvasByImage start ...");
    //    console.log(img);

        var pixelNum = img.width * img.height;
        saturate = typeof saturate !== "undefined" ? saturate : pixelNum;    
        var pixelNumRate = pixelNum / saturate;

        var canvasWidth = img.width;
        var canvasHeight = img.height;

        if(pixelNumRate > 1){
//            console.log("resizing... pixcoelNumRate : " + pixelNumRate);
            var lengthRate =  Math.sqrt(pixelNumRate);
            canvasWidth = parseInt(canvasWidth/lengthRate);
            canvasHeight = parseInt(canvasHeight / lengthRate);
//            console.log("resizing result - canvasWidth : " + canvasWidth + ", canvasHeight : " + canvasHeight);
        }

        var rCanvas = new Canvas(canvasWidth, canvasHeight);
        var rCanvasCtx = rCanvas.getContext("2d");
        rCanvasCtx.drawImage(img, 0,0, img.width, img.height, 0,0, canvasWidth, canvasHeight);
    //    console.log(__basename + " - function() createCanvasByImage end");
        return rCanvas;
    },
    hex2Rgb : function(hex){    //#ff1234
        var r = parseInt(hex.slice(1,3),16);
        var g = parseInt(hex.slice(3,5),16);
        var b = parseInt(hex.slice(5,7),16);
        return {r: r, g: g, b: b};
    },
    rgb2Hex : function(r,g,b){
        var rStr = r.toString(16);
        if(rStr.length == 1) rStr = "0" + rStr;
        var gStr = g.toString(16);
        if(gStr.length == 1) gStr = "0" + gStr;
        var bStr = b.toString(16);
        if(bStr.length == 1) bStr = "0" + bStr;

        return "#"+rStr+gStr+bStr;
    }
};
    
    
if(isNodeModule){
    module.exports = commonCanvas ;
}else if(isRequirejs){
    define(function(){ return commonCanvas });
}else {
    window.commonCanvas = commonCanvas;
}
})();