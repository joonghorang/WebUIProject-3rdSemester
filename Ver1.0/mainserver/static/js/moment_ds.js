(function(){    
    function init(){
//        delColorByTime();
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
        var pageImg = new Image();
        pageImg.src = originImg.src;
        
        pageImg.onload = function() {
            if(pageImg.width < pageImg.height){     // 세로가 긴 경우, 비율상 작은쪽을 캔버스의 길이에 맞춰서 늘린다. 하지만 이렇게 하면 브라우저화면이 극단적으로 가로로 길거나 할 때 문제가 생긴다. 
                                                    // 가로로 긴 비율의 사진을 가로로 긴 브라우저에 맞춰도 브라우저의 가로세로 비율이 더 극단적이라면 오른쪽 끝은 남게 된다. 
                                                    // 따라서 그런 경우 분기를 하나 더 두어서, 맞춘다. 
                if(pCanvas_W / pageImg.width * pageImg.height < pCanvas_H){
                    pageCtx.drawImage(pageImg, 0, 0, pCanvas_H / pageImg.width * pageImg.width, pCanvas_H / pageImg.width * pageImg.height);
                } else {
                    pageCtx.drawImage(pageImg, 0, 0, pCanvas_W / pageImg.width * pageImg.width, pCanvas_W / pageImg.width * pageImg.height);
                }
                
            } else {                     
                if(pCanvas_H / pageImg.height * pageImg.width < pCanvas_W){
                    pageCtx.drawImage(pageImg, 0, 0, pCanvas_W / pageImg.height * pageImg.width, pCanvas_W / pageImg.height * pageImg.height);
                } else {
                    pageCtx.drawImage(pageImg, 0, 0, pCanvas_H / pageImg.height * pageImg.width, pCanvas_H / pageImg.height * pageImg.height);
                }
                
            }
        }
        pageBackground.style.opacity = "0.3";
    }

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
    
//
//    // 색변화할 예정인 테스트용 함수 
//    function delColorByTime(){
//        var originImg = document.getElementById("moment-image-wrapper").children[0];
//        var Img = new Image();
//        Img.src = originImg.src;
//        Img.onload = function(){
//            var timeCanvas = document.createElement('canvas');
//            timeCanvas.width = Img.width;
//            timeCanvas.height = Img.height;
//
//            var timeContext = timeCanvas.getContext("2d");
//            timeContext.drawImage(Img, 0, 0, Img.width, Img.height);
//            var timeImageData = timeContext.getImageData(0, 0, Img.width, Img.height);
//
//            var lightDegree = 1;
//
//            var url = location.href;
//            var slicePointer = url.indexOf("moment");                       // 2014로 찾을까하다가 해가지나면 다시 바꿔야 하므로 이렇게 찾는 것으로...
//            var pastYear = parseInt(url.slice(slicePointer + 7, slicePointer + 11));    // 그당시의 시각에 해당하는 문자열 
//            var pastMonth = parseInt(url.slice(slicePointer + 11, slicePointer + 13));
//            var pastDay = parseInt(url.slice(slicePointer + 13, slicePointer + 15));
//            var pastHour = parseInt(url.slice(slicePointer + 15, slicePointer + 17));
//
//            var presentDate = new Date();
//            var presentYear = parseInt(presentDate.getFullYear());
//            var presentMonth = parseInt(presentDate.getMonth()) + 1; // 월은 js에서는 0월부터 시작이라 1 더해주어야한다.  
//            var presentDay = parseInt(presentDate.getDate());
//            var presentHour = parseInt(presentDate.getHours());
//
//            function monthToDay(year, month){
//                if(year % 4 === 2){ // 윤달의 경우 
//                    if(month === 2){
//                        return 31 + 29;
//                    }
//                } 
//                if(month === 1){
//                    return 31;
//                } else if(month === 2){
//                    return 31 + 28;
//                } else if(month === 3){
//                    return 31 + 28 + 31;
//                } else if(month === 4){
//                    return 31 + 28 + 31 + 30;
//                } else if(month === 5){
//                    return 31 + 28 + 31 + 30 + 31;
//                } else if(month === 6){
//                    return 31 + 28 + 31 + 30 + 31 + 30;
//                } else if(month === 7){
//                    return 31 + 28 + 31 + 30 + 31 + 30 + 31;
//                } else if(month === 8){
//                    return 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31;
//                } else if(month === 9){
//                    return 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30;
//                } else if(month === 10){
//                    return 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31;
//                } else if(month === 11){
//                    return 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30;
//                } else if(month === 12){
//                    return 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30 + 31;
//                } else {
//                    console.log("wrong Input in monthToDay Function");
//                }
//
//            }
//            var yearTime = (presentYear - pastYear) * 365 * 24;
//            var monthTime = (monthToDay(presentYear, presentMonth) - monthToDay(pastYear, pastMonth)) * 24;
//            var dayTime = (presentDay - pastDay) * 24;
//            var hourTime = presentHour - pastHour;
//            var totalTime = yearTime + monthTime + dayTime + hourTime;
//            if(totalTime > 1000){
//                totalTime = 1000;
//            }
//            console.log(bgColor);
//            var DestinationR = parseInt(bgColor.slice(1, 3), 16);
//            var DestinationG = parseInt(bgColor.slice(3, 5), 16);
//            var DestinationB = parseInt(bgColor.slice(5, 7), 16);
//            for(var x = 0; x < timeImageData.width; ++x){                            // 각 픽셀을 순회하며 전체적으로 하얀색으로 빼도록 한다. 
//                for(var y = 0; y < timeImageData.height; ++y){
//                    var index = (x + y * timeImageData.width) * 4;
//
//                    for(var i = 0; i < totalTime; i++){
//                         if(timeImageData.data[index + 0] > DestinationR){
//                            timeImageData.data[index + 0] -= lightDegree;// * totalTime;
//                        } else if(timeImageData.data[index + 0] === DestinationR) {     // 최종적으로 색상이 같아졌다면 아무것도 하지 않고, 로그만 남긴다. 
//                            //console.log("R is Same in this pixel " + timeImageData.data[index + 0]);
//                        }else {
//                            timeImageData.data[index + 0] += lightDegree;// * totalTime;
//                        }
//                        if(timeImageData.data[index + 1] > DestinationG){
//                            timeImageData.data[index + 1] -= lightDegree;// * totalTime;
//                        } else if(timeImageData.data[index + 1] === DestinationR) {     // 최종적으로 색상이 같아졌다면 아무것도 하지 않고, 로그만 남긴다. 
//                            //console.log("G is Same in this pixel " + timeImageData.data[index + 0]);
//                        }else {
//                            timeImageData.data[index + 1] += lightDegree;//* totalTime;
//                        }
//                        if(timeImageData.data[index + 2] > DestinationB){
//                            timeImageData.data[index + 2] -= lightDegree;// * totalTime;
//                        } else if(timeImageData.data[index + 2] === DestinationR) {     // 최종적으로 색상이 같아졌다면 아무것도 하지 않고, 로그만 남긴다. 
//                            //console.log("B is Same in this pixel " + timeImageData.data[index + 0]);
//                        }else {
//                            timeImageData.data[index + 2] += lightDegree;// * totalTime;
//                        }                       
//                    }
//                    //timeImageData.data[index + 1] += lightDegree * totalTime;
//                    //timeImageData.data[index + 2] += lightDegree * totalTime;
//                }
//            }
//            //console.log(timeImageData);
//            var wrapper = document.getElementById("wrapper");
//            timeContext.putImageData(timeImageData, 0, 0);
//            timeCanvas.setAttribute("id", "timeCanvas");
//            wrapper.appendChild(timeCanvas);
//        }
//    }
//    
    
    
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
