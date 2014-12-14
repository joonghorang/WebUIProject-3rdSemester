(function(){
var isNodeModule = typeof module !== undefined && module.exports;

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

    
    
if(isNodeModule){
    module.exports = // moduleName ;
}else {
    window.//moduleName = moduleName;
}
})();