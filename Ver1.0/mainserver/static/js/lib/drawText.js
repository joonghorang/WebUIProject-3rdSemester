function drawTextOn(textCanvas, text, textColor){
    MAX_STR_LEN = 30;
    
    var fontName = "NanumBarunGothicUltraLight";
    var fontColor = textColor;
    var fontSizeArray = [140, 100, 72, 60, 48, 36, 24, 16, 8];
    var textContext = textCanvas.getContext("2d");
    textWriter(text);
    function textWriter(originTextData){
            // Comment : Setting을 빼두는 것까진 좋았다. 그런데 이 데이타들이 내부에서 설정되어야 하는 친구들이었을까?            
            // Comment : 30과 같은것을 하드코딩이라 한다. 가독성도, 수정도 좋지않다.
		    if(originTextData > MAX_STR_LEN){
		        alert("Error");
		    } else {
		        var originTextArray = stringToWordList(originTextData);
		        var words = addEnterToWordList(originTextArray);
		        drawWordsOnCanvas(textContext, words);
                
                // Comment : 자잘한 함수들을 어떻게 처리하면 좋을까.
                // Comment : String과 같은 네이밍은 통상적으로 쓰이는 의미와 중복되기 쉬워 에러를 뱉기 쉽상이다.
		    }
            // Comment : 무엇을 하는 친구일지 전혀 감이 오지않는 네이밍. context에 글자를 써주는 것이라고 명시해주자. 
            //          canvas에 그리는 경우 네이밍엔 draw등을 넣어주는게 좋다.
		    function drawWordsOnCanvas(context, wordArray){
                var textX = textCanvas.width/2;
                var textY = textCanvas.height/2;
                // 왼쪽 정렬을 위한 코드. (윈쪽 정렬한 후 문단 전체를 제일 긴 단어를 기준으로 가운데 정렬하기)
                // Comment : 이런 부정확한 이름들은 어떤 역할을 하는 변수인지 확실히 써주자.
                var addTextX = 0;
                // Comment : 마찬가지. 이 array방식에는 문제가 있다.
                var addTextArray =[24,36,48,60,72,100];
                // Comment : addTextX와 떨어져 있어야 했나?
                var addTextY = addTextArray[2]; // 24가 기본값
                var uuuuuu = fontSizeAndAddTextY(wordArray);
                var fontSize = uuuuuu.fontSize;
                var addTextY = uuuuuu.addTextY;
                textX = repositionTextX(wordArray, textX, fontSize);
                setTextFactory(wordArray, context, fontColor, fontName, fontSize, textX, textY, addTextY);
                
                function fontSizeAndAddTextY(wordArray){
                    var fontSize, addTextY;
                    switch(wordArray.length){
                    // Comment : 원래는 case 1, 2, 이런식의 네미잉은 좋지 않으나 
                    //          이 경우에는 줄 수라는 의미가 담겨있으므로 괜찮다.
		            case 1 :
                        // Comment : indexing하는 숫자는 의미를 가지고 있지 않게된다.
		                fontSize = fontSizeArray[0];
                        // Comment : 이것을 우리는 괴랄하다고 한다.
                        // Comment : 결국 결정되는 fontSize와 AddTextY는 하나다.
		                if(wordArray[0].length > 8 && wordArray[0].length <= 9){ // Comment : ....이게 뭐죠. 이러기 없기.
		                    fontSize = fontSizeArray[0];
		                } else if(wordArray[0].length > 9 && wordArray[0].length <= 15){
		                    fontSize = fontSizeArray[1];
		                } else if(wordArray[0].length > 15){
		                    fontSize = fontSizeArray[3];
		                }
		                break;
		            case 2 :
		                fontSize = fontSizeArray[1];
		                addTextY = addTextArray[1];

		                for(var i = 0; i < wordArray.length; i++){
		                    if(wordArray[i].length > 6 && wordArray[i].length <= 12){
		                        fontSize = fontSizeArray[2];
		                        addTextY = addTextArray[2]
		                    } else if(wordArray[0].length > 12){
		                        fontSize = fontSizeArray[5];
		                        addTextY = addTextArray[1];
		                    }
		                }
		                break;
		            case 3 :
		                fontSize = fontSizeArray[2];
		                addTextY = addTextArray[5];

		                for(var i = 0; i < wordArray.length; i++){
		                    if(wordArray[i].length > 7 && wordArray[i].length <= 11){
		                        fontSize = fontSizeArray[3];
		                        addTextY = addTextArray[3];
		                    }
		                }
		                break;
		            case 4 :
		                fontSize = fontSizeArray[2];
		                addTextY = addTextArray[2]

		                break;
		            case 5 : 
		                fontSize = fontSizeArray[3];
		                addTextY = addTextArray[4]

		                break;
		            case 6 : 
		                fontSize = fontSizeArray[3];
		                addTextY = addTextArray[2]

                        break;
		            default : 
                        // Comment : 좋지않은 indent.
                        //          그리고 default의 의미를 알자.
                        fontSize = fontSizeArray[3];
                        addTextY = addTextArray[3]
                        break;
                }
                    return {fontSize: fontSize, addTextY: addTextY};
                }
                // Comment : 이름은 귀엽고 좋으나 Factory가 가지는 의미를 살리지 못했다.
                // Comment : textY, addTextY는 뭐가 다를까?
                function setTextFactory(wordArray, context, fontColor, fontName, fontSize, textX, textY, addTextY){
                    // Comment : 이건 예외지 버그가 아니다.
                    checkOneWord(wordArray);                              // 연속해서 한 단어가 있는지 검사. 
                    // Comment : 알수없는 네이밍 변수.
                    var wordIdx = 0;
                    // Comment : 무엇의 tmp 인가.
                    var temp;
                    // Comment : 이런식의 코멘트는 좋다. 왜 줄이 짝수이고 홀수인지를 구별해야하는지 써주면 이해도 업.
                    if(wordArray.length % 2 === 0){                 // 줄이 짝수 일 때 
                        // Comment : 안에 들어와서도 tmp가 무엇인지 알길이없다.
                        temp = 0;
                        for(var i = 0; i < wordArray.length/2; i++){
                            setText(context, wordArray[wordIdx], fontColor, fontName, fontSize, textX, textY - (addTextY * (wordArray.length/2-i) - addTextY/2) * 2);
                            // Comment : 넌 뭔데 증가되는거냐.
                            wordIdx++;
                        }
                        for(var j = (wordArray.length/2); j < wordArray.length; j++){
                            setText(context, wordArray[j], fontColor, fontName, fontSize, textX, textY + (addTextY * temp + addTextY/2) * 2);
                            wordIdx++;
                            temp++;
                        }
                        // Comment : 홀수 아니면 짝수다. else를 쓰자.
                    } else if(wordArray.length % 2 === 1){      // 줄이 홀수 일 때 
                        temp = 1;
                        for(var i = 0; i < wordArray.length/2 - 1; i++){
                            setText(context, wordArray[wordIdx], fontColor, fontName, fontSize, textX, textY - addTextY * (wordArray.length/2-i-0.5));
                            wordIdx++;
                        }
                        setText(context,wordArray[wordIdx++], fontColor, fontName, fontSize, textX, textY);
                        for(var j = (wordArray.length/2)+0.5; j < wordArray.length; j++){
                            setText(context, wordArray[j], fontColor, fontName, fontSize, textX, textY + addTextY * temp);
                            wordIdx++;
                            temp++;
                        }
                    }
                    // Comment : 마찬가지. 네이밍에 draw를 쓰자.
                    function setText(context, text, color, font, fontSize, x, y){
                        
                        context.fillStyle = fontColor;
                        context.font = fontSize + "px " + fontName; //fontWeight + " " + 
                        context.textAlign = "left";
                        context.textBaseline = "middle";
                        // Comment : 이런 20은 다른사람이 수정을 하기 힘들게 한다. 
                        context.fillText(text, x, y);
                    };
                    // Comment : 함수이름으로 역할을 명시하려고 한 노력이보인다.
                    //          함수에대한 코멘트를 써주었다면 네이밍에도 고민이 줄고 이해도 올라갔을 것이다.
                    function checkOneWord(wordArray){
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
                            if(wordArray[l] === ""){
                                // Comment : 커밋하기 전 단순 디버깅을 위한 console.log들은 지워주자. 
                                //          좀더 구체적으로 위치와 실행한 함수를 logging해주었다면 
                                //          지우지 않아도되는 의미가 담긴 log가 되었을 것.
                                console.log(wordArray[l] + "here");
                                wordArray.splice(l, 0);
                                console.log(wordArray.length);
                            }
                        }
                    }
                };
            }
        };
    // Comment : 왜 무엇을 reposition해주어야 하는가.
    function repositionTextX(wordArray, textX, fontSize){
        // x방향으로 좀 치우쳤네요 ㅎㅎ, 코렉션 없는게 맞음. 
        var X_CORRECTION = 0 ;
        context = textCanvas.getContext("2d");
        context.font = fontSize + "px " + fontName;
        addTextX = (context.measureText(findMostLongWord(wordArray)).width) / 2;
        textX -= addTextX;
        return textX + X_CORRECTION;
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
