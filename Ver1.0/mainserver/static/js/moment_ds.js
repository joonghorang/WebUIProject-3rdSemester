(function(){  
    function drawBgCanvas(bgColor){
        var bgCanvas = document.getElementById("bg-canvas");
        var BG_CANVAS_W = 500;
        var BG_CANVAS_H = 500;
        bgCanvas.width = BG_CANVAS_W;
        bgCanvas.height = BG_CANVAS_H;
        var bgCtx = bgCanvas.getContext("2d");
        bgCtx.fillStyle = bgColor;
        bgCtx.fillRect(0,0,bgCanvas.width,bgCanvas.height);
    }
    function drawTextCanvas(textColor){
        
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

    drawBgCanvas(bgColor);
    drawTextCanvas(textColor);
    var textCanvas = document.getElementById("text-canvas");
    var imageWrapper = document.getElementById("moment-image-wrapper"); 
    EventUtil.addHandler(imageWrapper, "click", letsShow.momentText);
    EventUtil.addHandler(textCanvas, "click", letsShow.momentImage);
})();
