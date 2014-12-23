(function(){    
    function init(){
        moveMoment();
        initCanvases();
        drawBgCanvas(bgColor);
        drawTextCanvas(textColor, text);
        var textCanvas = document.getElementById("text-canvas");
        var imageWrapper = document.getElementById("moment-image-wrapper"); 
        EventUtil.addHandler(imageWrapper, "click", letsShow.momentText);
        EventUtil.addHandler(textCanvas, "click", letsShow.momentImage);
    }
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
    function moveMoment(){ // Full View에서 모멘츠간 이동을 위한 함수 
        var backwardButton = document.getElementById("backward-button");
        var forwardButton = document.getElementById("forward-button");
        EventUtil.addHandler(backwardButton, "click", function(event){
             window.location.href = "201412231751_ivnsm"; 
             console.log("you click backward button");
        });
        EventUtil.addHandler(forwardButton, "click", function(event){
            console.log("you click forward button");
        });
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
    init();

})();
