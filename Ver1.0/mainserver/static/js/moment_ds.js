(function(){    
    function init(){
        //console.log(prevId, nextId);
        //moveMoment();
        initPageCanvas();
        setBgColor();
        var moment = document.getElementById("moment");
        drawShadow(moment);
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
    function initPageCanvas(){
        var pageBackground = document.getElementById("page-background"); 
        var pCanvas_W = window.innerWidth;
        var pCanvas_H = window.innerHeight;
        pageBackground.width = pCanvas_W;
        pageBackground.height = pCanvas_H;
        pageCtx = pageBackground.getContext("2d");
        var originImg = document.getElementById("moment-image-wrapper").children[0];
        console.log(originImg.src);
        var pageImg = new Image();
        pageImg.src = originImg.src;
        
        pageImg.onload = function() {
            if(pageImg.width < pageImg.height){     // 세로가 긴 경우, 비율상 작은쪽을 캔버스의 길이에 맞춰서 늘린다. 하지만 이렇게 하면 브라우저화면이 극단적으로 가로로 길거나 할 때 문제가 생긴다. 
                                                    // 가로로 긴 비율의 사진을 가로로 긴 브라우저에 맞춰도 브라우저의 가로세로 비율이 더 극단적이라면 오른쪽 끝은 남게 된다. 
                                                    // 따라서 그런 경우 분기를 하나 더 두어서, 맞춘다. 
                console.log("height");
                if(pCanvas_W / pageImg.width * pageImg.height < pCanvas_H){
                    pageCtx.drawImage(pageImg, 0, 0, pCanvas_H / pageImg.width * pageImg.width, pCanvas_H / pageImg.width * pageImg.height);
                } else {
                    pageCtx.drawImage(pageImg, 0, 0, pCanvas_W / pageImg.width * pageImg.width, pCanvas_W / pageImg.width * pageImg.height);
                }
                
            } else {                         
                console.log("width");
                if(pCanvas_H / pageImg.height * pageImg.width < pCanvas_W){
                    pageCtx.drawImage(pageImg, 0, 0, pCanvas_W / pageImg.height * pageImg.width, pCanvas_W / pageImg.height * pageImg.height);
                } else {
                    pageCtx.drawImage(pageImg, 0, 0, pCanvas_H / pageImg.height * pageImg.width, pCanvas_H / pageImg.height * pageImg.height);
                }
                
            }
        }
        pageBackground.style.opacity = "0.3";
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
    function drawShadow(element){
        var url = location.href;
        var slicePointer = url.indexOf("moment");                       // 2014로 찾을까하다가 해가지나면 다시 바꿔야 하므로 이렇게 찾는 것으로...
        var hours = url.slice(slicePointer + 15, slicePointer + 17);    // 그당시의 시각에 해당하는 문자열 
        var offset = 20; // 그림자의 길이. 
        var shadowColor = "#444444";
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
        element.style.boxShadow = posX.toString() + "px " + posY.toString() + "px 15px " + shadowColor;//textColor; 텍스트칼라나 백그라운드 칼라로 적용해 봤으나 구림...
    }
    var letsShow = {
        //image를 보여주기위한 함수
        //imageWrapper를 열고 textCanvas를 닫는다.
        momentImage : function(){
            var textCanvas = document.getElementById("text-canvas");
            var imageWrapper = document.getElementById("moment-image-wrapper"); 
            var image = imageWrapper.children[0];
            var bgCanvas    = document.getElementById("bg-canvas");
            display([imageWrapper], "show");
            display([textCanvas, bgCanvas], "hide");
            drawShadow(image);
            moment.style.boxShadow = "none"; // 개인적으로는 그냥 프레임 자체가 사라지는게 이뻣는데, 다른 팀원들과 논의해봐야할듯. 
        },
        //textCanvas를 보여주기위한 함수
        //textCanvas를 열고 imageWrapper를 닫는다.
        momentText : function(){
            var textCanvas = document.getElementById("text-canvas");
            var imageWrapper = document.getElementById("moment-image-wrapper");
            var bgCanvas    = document.getElementById("bg-canvas");
            display([textCanvas, bgCanvas], "show");
            display([imageWrapper], "hide");
            drawShadow(moment);
        }
    }
    init();

})();
