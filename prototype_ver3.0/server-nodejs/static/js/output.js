// CSS 100%와 가장 근사한 전체 창크기 
var MAX_WIDTH = window.innerWidth * 99/100;
var MAX_HEIGHT = window.innerHeight * 99.8/100;

// 임의로 정한 캔버스 크기 
var CANVAS_WIDTH = MAX_WIDTH;
var CANVAS_HEIGHT = MAX_HEIGHT;

// 전역변수 
var textInput = document.getElementById('text-input');
var fontSize = 36;
var fontName;
var fontColor = "#000000";

//캔버스를 생성한다.  
var outputCanvas = document.getElementById("output-canvas");
outputCanvas.width = CANVAS_WIDTH;
outputCanvas.height = CANVAS_HEIGHT;
var context = outputCanvas.getContext("2d");


function textWriter(){

    console.log("textWrite");
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(100, 50, 50, 50); // 사각형 그리기
    // 비동기 통신으로 받아온 칼라값을 넣어준다. 
    fontColor = colorSetHex[1];
    outputCanvas.style.backGroundColor = colorSetHex[0];

    var originTextData = textInput.value;
    var textX = CANVAS_WIDTH/2;
    var textY = CANVAS_HEIGHT/2;
    // 왼쪽 정렬을 위한 코드. (윈쪽 정렬한 후 문단 전체를 제일 긴 단어를 기준으로 가운데 정렬하기)
    var addTextX = 0;
    var addTextY = 24; // 24가 기본값

    if(textInput.value.length > 30){
        alert("Error");
    } else {
        var originTextArray = stringToWordList(originTextData);
        originTextArray = addEnterToWordList(originTextArray);
        displayWordList(context, originTextArray);

        function stringToWordList(String){
            var result = [];
            result = String.split(" ");
            return result;
        };

        function addEnterToWordList(WordArray){
            for(var i = 0; i < WordArray.length; i++){
                WordArray[i] += "\n";
            }
            return WordArray;
        };
    }

    function displayWordList(context, wordArray){
        switch(wordArray.length){
            case 1 :
                fontSize = 120;
                if(wordArray[0].length > 8 && wordArray[0].length <= 9){
                    fontSize = 72;
                } else if(wordArray[0].length > 9 && wordArray[0].length <= 15){
                    fontSize = 60;
                } else if(wordArray[0].length > 15){
                    fontSize = 36;
                }
                textX = repositionTextX(wordArray, textX, fontSize);
                setTextFactory(wordArray, context, fontColor, fontName, fontSize, textX, textY, addTextY);
                break;
            case 2 :
                fontSize = 60;
                addTextY = 35;

                for(var i = 0; i < wordArray.length; i++){
                    if(wordArray[i].length > 6 && wordArray[i].length <= 12){
                        fontSize = 48;
                        addTextY = 30;
                    } else if(wordArray[0].length > 12){
                        fontSize = 16;
                        addTextY = 10;
                    }
                }

                textX = repositionTextX(wordArray, textX, fontSize);
                setTextFactory(wordArray, context, fontColor, fontName, fontSize, textX, textY, addTextY);;
                break;
            case 3 :
                fontSize = 48;
                addTextY = 60;

                for(var i = 0; i < wordArray.length; i++){
                    if(wordArray[i].length > 7 && wordArray[i].length <= 11){
                        fontSize = 36;
                        addTextY = 24;
                    }
                }
                textX = repositionTextX(wordArray, textX, fontSize);
                setTextFactory(wordArray, context, fontColor, fontName, fontSize, textX, textY, addTextY);
                break;
            case 4 :
                fontSize = 48;
                addTextY = 30;

                textX = repositionTextX(wordArray, textX, fontSize);
                setTextFactory(wordArray, context, fontColor, fontName, fontSize, textX, textY, addTextY);
                break;
            case 5 : 
                fontSize = 36;
                addTextY = 40;

                textX = repositionTextX(wordArray, textX, fontSize);
                setTextFactory(wordArray, context, fontColor, fontName, fontSize, textX, textY, addTextY);
                break;
            case 6 : 
                fontSize = 36;
                addTextY = 24;

                textX = repositionTextX(wordArray, textX, fontSize);
                setTextFactory(wordArray, context, fontColor, fontName, fontSize, textX, textY, addTextY);
                     break;
            default : 
                     fontSize = 36;
                     addTextY = 36;
                     textX = repositionTextX(wordArray, textX, fontSize);
                     setTextFactory(wordArray, context, fontColor, fontName, fontSize, textX, textY, addTextY);
                     break;
        }
        
        function setTextFactory(wordArray, context, fontColor, fontName, fontSize, textX, textY, addTextY){

            checkOneWordBug();                              // 연속해서 한 단어가 있는지 검사. 
            var wordPointer = 0;
            var temp = 1;
            if(wordArray.length % 2 === 0){                 // 줄이 짝수 일 때 
                temp = 0;
                for(var i = 0; i < wordArray.length/2; i++){
                    setText(context, wordArray[wordPointer], fontColor, fontName, fontSize, textX, textY - (addTextY * (wordArray.length/2-i) - addTextY/2) * 2);
                    wordPointer++;
                }
                for(var j = (wordArray.length/2); j < wordArray.length; j++){
                    setText(context, wordArray[j], fontColor, fontName, fontSize, textX, textY + (addTextY * temp + addTextY/2) * 2);
                    wordPointer++;
                    temp++;
                }
            } else if(wordArray.length % 2 === 1){      // 줄이 홀수 일 때 
                for(var i = 0; i < wordArray.length/2 - 1; i++){
                    setText(context, wordArray[wordPointer], fontColor, fontName, fontSize, textX, textY - addTextY * (wordArray.length/2-i-0.5));
                    wordPointer++;
                }
                setText(context,wordArray[wordPointer++], fontColor, fontName, fontSize, textX, textY);
                for(var j = (wordArray.length/2)+0.5; j < wordArray.length; j++){
                    setText(context, wordArray[j], fontColor, fontName, fontSize, textX, textY + addTextY * temp);
                    wordPointer++;
                    temp++;
                }
            }

            function setText(context, text, color, font, fontSize, x, y){
                console.log("color");
                console.log(colorSetHex[0]);
                context.fillStyle = colorSetHex[0];

                context.font = fontSize + "px " + fontName; //fontWeight + " " + 
                context.textAlign = "left";
                context.textBaseline = "middle";
                context.fillText(text, x + 8, y);
            };

            function checkOneWordBug(){
                for(var i = 0; i < wordArray.length - 1; i++){ // 연속적으로 1글자 짜리가 오면 뒷 단어를 복사하고 
                    if(parseInt(wordArray[i].length) + parseInt(wordArray[i+1].length) === 4){
                        wordArray[i] = wordArray[i] + wordArray[i+1];
                        wordArray[i + 1] = "";  
                    }
                }
                for(var j = 0; j < wordArray.length - 1; j++){ // 복사하고 공백이 생기면 공백을 가장 뒷쪽으로 밀고.
                    if(wordArray[j] === ""){
                        console.log("in");
                        for(var k = j; k < wordArray.length - 1; k++){
                            wordArray[k] = wordArray[k + 1];
                            wordArray[k + 1] = "";
                        }
                    }
                }
                for(var l = 0; l <= wordArray.length; l++){ // 가장 뒤로 밀린 공백을 삭제한다. 
                    console.log(wordArray[l]);
                    if(wordArray[l] === ""){
                        wordArray.splice(l, 0);
                    }
                }
            }
        };
    };



    function repositionTextX(wordArray, textX, fontSize){
        context = outputCanvas.getContext("2d");
        context.font = fontSize + "px " + fontName;
        addTextX = (context.measureText(findMostLongWord(wordArray)).width) / 2;
        textX -= addTextX;
        return textX;

        function findMostLongWord(wordArray){
            var mostLongWord = wordArray[0];

            for(var i = 0; i < wordArray.length - 1; i++){
                if(wordArray[i].length < wordArray[i+1].length){
                    mostLongWord = wordArray[i+1];
                }
            }
            return mostLongWord;
        }
    }
}