(function(){    
    function init(){
        //moveMoment();
        setBgColor();
        drawShadow();
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
    function setBgColor(){
        var wrapper = document.getElementById("wrapper");
        wrapper.style.backgroundColor = bgColor;
    }
    // 페이지 이동은 앵커태그로 할 예정. 
    // function moveMoment(){ // Full View에서 모멘츠간 이동을 위한 함수 
    //     var backwardButton = document.getElementById("backward-button");
    //     var forwardButton = document.getElementById("forward-button");
    //     EventUtil.addHandler(backwardButton, "click", function(event){
    //          window.location.href = "201412231751_ivnsm"; // 이런식으로 화면이동해야하는데, 서버에 요청을 다시해아할듯. 
    //          console.log("you click backward button");
    //     });
    //     EventUtil.addHandler(forwardButton, "click", function(event){
    //         console.log("you click forward button");
    //     });
    // }
    function drawShadow(){
        var url = location.href;
        var slicePointer = url.indexOf("moment");                       // 2014로 찾을까하다가 해가지나면 다시 바꿔야 하므로 이렇게 찾는 것으로...
        var hours = url.slice(slicePointer + 15, slicePointer + 17);    // 그당시의 시각에 해당하는 문자열 
        var offset = 20; // 그림자의 길이. 
        var moment = document.getElementById("moment");
        var hourDegree = -(360 / 12 / 180 * Math.PI);                   //각과 시간은 반대방향이므로.
        
        if(hours > 11){
            hours = hours - 12;
        }
        var startDegree = 90 / 180 * Math.PI;                       // 0시는 3시(0도)와 90도 차이나므로 시작점은 +90도부터 시작한다. 
        var degree = startDegree + hours * hourDegree;
        //console.log("h : " + hours);
        //console.log("degree : " + degree * 180 / Math.PI); 
        var posX =  Math.cos(degree) * offset;
        var posY =  -(Math.sin(degree) * offset);                   // css설정은 Y값이 +일수록 밑으로 그림자가 진다.       
        //console.log("X " + posX);
        //console.log("Y " + posY);
        moment.style.boxShadow = posX.toString() + "px " + posY.toString() + "px 15px #555555";
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
