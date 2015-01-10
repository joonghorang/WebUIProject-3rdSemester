function drawTextOn(textCanvas, text, fontColor){
    this.MAX_STR_LEN = 30;
    this.fontName = "nanumMyeongjo" //"NanumBarunGothicUltraLight";
    this.fontColor = fontColor;
    this.fontSizeArray = [60, 72, 100, 120, 160, 200];
    this.textContext = textCanvas.getContext("2d");
    textWriter(text);
    function textWriter(originTextData){
		    if(originTextData.length > this.MAX_STR_LEN){
                console.log(originTextData);
                console.log(originTextData.length);
                console.log(this.MAX_STR_LEN);
		        alert("Length Error in drawText.js");
		    } else {
		        var words = stringToWordList(originTextData);
		        drawWordsOnCanvas(this.textContext, words);
		    }
		    function drawWordsOnCanvas(context, wordArray){
                // 텍스트의 기본 좌표값(전체 캔버스의 중심점으로 설정)
                var textX = textCanvas.width/2;
                var textY = textCanvas.height/2;
                
                // 단어의 갯수나 길이에 따라 중심점으로부터 떨어지는 거리를 계산하기 위한 보정 변수 
                var addTextX = 0;
                var addTextArray =[48,64,84,120,140,180,220];
                var addTextY = addTextArray[2]; // 24가 기본값
                var fixedWordArray = fontSizeAndAddTextY(wordArray);
                var fontSize = fixedWordArray.fontSize;
                var addTextY = fixedWordArray.addTextY;
                textX = repositionTextX(wordArray, textX, fontSize);
                setTextFactory(wordArray, context, this.fontColor, this.fontName, fontSize, textX, textY, addTextY);
                
                function fontSizeAndAddTextY(wordArray){
                    // 전체적으로 이 함수는 하드코딩이다. 
                    // 결과적으로 나온 시각적 이미지를 보고 일일이 수를 쳐 넣은 것으로, 
                    // 알고리즘적인 해결방법이 나오기 전까지는 이대로 둔다. 
                    var fontSize, addTextY;
                    switch(wordArray.length){
		            case 1 : // 여기서 숫자는 줄의 갯수를 의미.
		                if(wordArray[0].length <= 5){ 
		                    fontSize = this.fontSizeArray[5];
		                } else if(wordArray[0].length > 5 && wordArray[0].length <= 15){
		                    fontSize = this.fontSizeArray[3];
		                } else if(wordArray[0].length > 15){
		                    fontSize = 48;
		                }
		                break;
		            case 2 :
		                fontSize = this.fontSizeArray[5];
		                addTextY = addTextArray[3];

		                for(var i = 0; i < wordArray.length; i++){
		                    if(wordArray[i].length > 6 && wordArray[i].length <= 12){
		                        fontSize = this.fontSizeArray[3];
		                        addTextY = addTextArray[2]
		                    } else if(wordArray[i].length > 12 && wordArray[i].length <= 20){
		                        fontSize = this.fontSizeArray[1];
		                        addTextY = addTextArray[0];
		                    } else if(wordArray[i].length > 20){
                                fontSize = this.fontSizeArray[0];
                                addTextY = addTextArray[0];
                            }
		                }
		                break;
		            case 3 :
		                fontSize = this.fontSizeArray[5];
		                addTextY = addTextArray[6];

		                for(var i = 0; i < wordArray.length; i++){
		                    if(wordArray[i].length > 7 && wordArray[i].length <= 11){
		                        fontSize = this.fontSizeArray[3];
		                        addTextY = addTextArray[3];
		                    } else if(wordArray[i].length > 11){
                                fontSize = this.fontSizeArray[0];
                                addTextY = addTextArray[1];
                            }
		                }
		                break;
		            case 4 :
		                fontSize = this.fontSizeArray[4];
		                addTextY = addTextArray[2];
                        for(var i = 0; i < wordArray.length; i++){
                            if(wordArray[i].length > 7 && wordArray[i].length <= 11){
                                fontSize = this.fontSizeArray[3];
                                addTextY = addTextArray[3];
                            } else if(wordArray[i].length > 11){
                                fontSize = this.fontSizeArray[1];
                                addTextY = addTextArray[0];
                            }
                        }
		                break;
		            case 5 : 
		                fontSize = this.fontSizeArray[4];
		                addTextY = addTextArray[5];
                        for(var i = 0; i < wordArray.length; i++){
                            if(wordArray[i].length > 7 && wordArray[i].length <= 11){
                                fontSize = this.fontSizeArray[3];
                                addTextY = addTextArray[4];
                            } else if(wordArray[i].length > 11){
                                fontSize = this.fontSizeArray[1];
                                addTextY = addTextArray[2];
                            }
                        }
		                break;
		            case 6 : 
		                fontSize = this.fontSizeArray[1];
		                addTextY = addTextArray[0];
                        break;
		            case 7: 
                        fontSize = this.fontSizeArray[0];
                        addTextY = addTextArray[2];
                        break;
                    case 8: 
                        fontSize = this.fontSizeArray[0];
                        addTextY = addTextArray[3];
                        break;
                    case 9: 
                        fontSize = this.fontSizeArray[0];
                        addTextY = addTextArray[3];
                        break;
                    default :
                        fontSize = this.fontSizeArray[0];
                        addTextY = addTextArray[4];
                        break;
                }
                    return {fontSize: fontSize, addTextY: addTextY};
                }

                function setTextFactory(wordArray, context, this.fontColor, this.fontName, fontSize, textX, textY, addTextY){
                    // 단어를 실제로 배치하기 전에 연속해서 한 단어가 있는지 검사해서 있다면 단어 배열을 바꿔준다. 
                    checkOneWord(wordArray);                              
                    
                    var wordIdx = 0;
                    var lineIdx = 0;
                    if(wordArray.length % 2 === 0){                 // 줄이 짝수 일 때 
                        
                        // 글의 중심점으로부터의 윗단
                        for(var i = 0; i < wordArray.length/2; i++){    
                            setText(context, wordArray[i], this.fontColor, this.fontName, fontSize, textX, textY - (addTextY * (wordArray.length/2-i) - addTextY/2) * 2);
                            wordIdx++;
                        }
                        // 하단, 실질적으로는 중심이 캔버스의 중심이므로 y값에 대한 addY, 즉 보정값이 음수로 바뀌어야 한다. 
                        lineIdx = 0;
                        for(var j = (wordArray.length/2); j < wordArray.length; j++){
                            setText(context, wordArray[j], this.fontColor, this.fontName, fontSize, textX, textY + (addTextY * lineIdx + addTextY/2) * 2);
                            wordIdx++;
                            lineIdx++;
                        }
                    } else {      // 줄이 홀수 일 때 

                        // 글의 중심점으로부터의 윗단
                        for(var i = 0; i < wordArray.length/2 - 1; i++){
                            setText(context, wordArray[i], this.fontColor, this.fontName, fontSize, textX, textY - addTextY * (wordArray.length/2-i-0.5));
                            wordIdx++;
                        }
                        // 가운데 줄.
                        setText(context,wordArray[wordIdx++], this.fontColor, this.fontName, fontSize, textX, textY);
                        // 하단
                        lineIdx = 1;
                        for(var j = (wordArray.length/2)+0.5; j < wordArray.length; j++){
                            setText(context, wordArray[j], this.fontColor, this.fontName, fontSize, textX, textY + addTextY * lineIdx);
                            wordIdx++;
                            lineIdx++;
                        }
                    }
                    // Comment : 마찬가지. 네이밍에 draw를 쓰자.
                    function setText(context, text, color, font, fontSize, x, y){
                        
                        context.fillStyle = this.fontColor;
                        context.font = fontSize + "px " + this.fontName; //fontWeight + " " + 
                        context.textAlign = "left";
                        context.textBaseline = "middle";
                        // Comment : 이런 20은 다른사람이 수정을 하기 힘들게 한다. 
                        context.fillText(text, x, y);
                    };
                    // 단어가 1자길이로 연속되는 경우 세로로 길게 배치하는 것이 어색하니, 
                    // 해당 단어를 그 전 단어와 합쳐서 하나의 단어로 만들어 주는 함수.
                    function checkOneWord(wordArray){
                        // 1. 연속적으로 1글자 짜리가 오면 뒷 단어를 복사하고 
                        for(var i = 0; i < wordArray.length - 1; i++){ 
                            if(parseInt(wordArray[i].length) + parseInt(wordArray[i+1].length) === 2){
                                wordArray[i] = wordArray[i] + " " + wordArray[i+1];
                                wordArray[i + 1] = "";  
                            }
                        }
                        // 2. 복사하고 공백이 생기면 공백을 가장 뒷쪽으로 밀고.
                        for(var j = 0; j < wordArray.length - 1; j++){ 
                            if(wordArray[j] === ""){
                                console.log("in");
                                for(var k = j; k < wordArray.length - 1; k++){
                                    wordArray[k] = wordArray[k + 1];
                                    wordArray[k + 1] = "";
                                }
                            }
                        }
                        // 3. 가장 뒤로 밀린 공백을 삭제한다. 
                        for(var l = 0; l <= wordArray.length; l++){ 
                            if(wordArray[l] === ""){
                                wordArray.splice(l, 0);
            
                            }
                        }
                    }
                };
            }
        };
    function repositionTextX(wordArray, textX, fontSize){
        context = textCanvas.getContext("2d");
        context.font = fontSize + "px " + this.fontName;
        addTextX = (context.measureText(findMostLongWord(wordArray)).width) / 2;
        textX -= addTextX;
        return textX;
        function findMostLongWord(wordArray){
            var mostLongWord = wordArray[0];
            for(var i = 0; i < wordArray.length - 1; i++){
                if(mostLongWord.length < wordArray[i+1].length){
                    mostLongWord = wordArray[i+1];
                }
            }
            return mostLongWord;
        }
    }
};
function stringToWordList(String){
    var result = [];
    result = String.split(" ");
    return result;
};

