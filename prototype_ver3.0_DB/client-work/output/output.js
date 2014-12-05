
var MAX_WIDTH = window.innerWidth * 99/100;
var MAX_HEIGHT = window.innerHeight * 99.8/100;
var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;

var textInput = document.getElementById("text-input");
var fontSize = 36;
var fontName = "NanumMyeongjo";
var fontColor = "#202020";
    
//캔버스를 생성한다.  
var outputCanvas = document.getElementById("output-canvas");
outputCanvas.width = CANVAS_WIDTH;
outputCanvas.height = CANVAS_HEIGHT;
var context = outputCanvas.getContext("2d");

function textWriter(){
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
    }

    function displayWordList(context, wordArray){
        switch(wordArray.length){
            case 1 :
                fontSize = 72;
                if(wordArray[0].length > 8 && wordArray[0].length <= 9){
                    fontSize = 60;
                } else if(wordArray[0].length > 9 && wordArray[0].length <= 15){
                    fontSize = 36;
                } else if(wordArray[0].length > 15){
                    fontSize = 16;
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
        };
    };

    function findMostLongWord(wordArray){
        var mostLongWord = wordArray[0];

        for(var i = 0; i < wordArray.length - 1; i++){
            if(wordArray[i].length < wordArray[i+1].length){
                mostLongWord = wordArray[i+1];
            }
        }
        return mostLongWord;
    }

    function repositionTextX(wordArray, textX, fontSize){
        context = outputCanvas.getContext("2d");
        context.font = fontSize + "px " + fontName;
        addTextX = (context.measureText(findMostLongWord(wordArray)).width) / 2;
        textX -= addTextX;
        return textX;
    }

    function setText(context, text, color, font, fontSize, x, y){
        context.fillStyle = fontColor;
        context.font = fontSize + "px " + fontName; //fontWeight + " " + 
        context.textAlign = "left";
        context.textBaseline = "middle";
        context.fillText(text, x + 8, y);
    };

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