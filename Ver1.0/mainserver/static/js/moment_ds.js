(function(){  
    function initCanvases(){
        //set canvases w, h
        var bgCanvas = document.getElementById("bg-canvas");
        var textCanvas = document.getElementById("text-canvas");
        var CANVAS_W = 500;
        var CANVAS_H = 500;
        bgCanvas.width = CANVAS_W;
        bgCanvas.height = CANVAS_H;
        textCanvas.width = CANVAS_W;
        textCanvas.height = CANVAS_H;
    }
    function drawBgCanvas(bgColor){
        var bgCanvas    = document.getElementById("bg-canvas");
        var bgCtx = bgCanvas.getContext("2d");
        bgCtx.fillStyle = bgColor;
        bgCtx.fillRect(0,0,bgCanvas.width,bgCanvas.height);
    }
    function drawTextCanvas(textColor, text){
        var textCanvas  = document.getElementById("text-canvas");
        drawTextOn(textCanvas, text, textColor);
    }
    var letsShow = {
        //image를 보여주기위한 함수
        //imageWrapper를 열고 textCanvas를 닫는다.
        momentImage : function(){
            var textCanvas = document.getElementById("text-canvas");
            var imageWrapper = document.getElementById("moment-image-wrapper"); 
            display([imageWrapper], "show");
            display([textCanvas], "hide");
        },
        //textCanvas를 보여주기위한 함수
        //textCanvas를 열고 imageWrapper를 닫는다.
        momentText : function(){
            var textCanvas = document.getElementById("text-canvas");
            var imageWrapper = document.getElementById("moment-image-wrapper"); 
            display([textCanvas], "show");
            display([imageWrapper], "hide");
        }
    }
    
    initCanvases();
//    drawBgCanvas(bgColor);
    drawTextCanvas(textColor, text);
    var textCanvas = document.getElementById("text-canvas");
    var imageWrapper = document.getElementById("moment-image-wrapper"); 
    EventUtil.addHandler(imageWrapper, "click", letsShow.momentText);
    EventUtil.addHandler(textCanvas, "click", letsShow.momentImage);
})();
