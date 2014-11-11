function mainText(setPixel){
    
        //캔버스를 생성한다.  
        var drawing = document.createElement("canvas");
        drawing.width = CANVAS_WIDTH;
        drawing.height = CANVAS_HEIGHT;
    
        if (drawing.getContext) {

            var context = drawing.getContext("2d");

            // 이미지 데이터의 URI
            var imgURI = drawing.toDataURL("image/png"); // 여기서 png는 내보낼 데이터 형식이다. 기본적으로 브라우저는 png를 받는다.

            // 이미지 표시
            var image = document.createElement("img");  // 임의의 img태그를 하나 생성하고 그걸 image 변수에 삽입
            image.src = imgURI; 						// 저장해둔 imgURI 를 경로에 삽입

            //image colorData -> canvas imagedata
            var rImageData = context.createImageData(CANVAS_WIDTH, CANVAS_HEIGHT);
            for(var x = 0; x<CANVAS_WIDTH; ++x){
                for(var y = 0; y < CANVAS_HEIGHT; ++y){
                    setPixel(rImageData, x, y, avgR, avgG, avgB, avgA);
                }
            }
            context.putImageData(rImageData, 0, 0);
            document.getElementById("content").appendChild(drawing);
       
        } 
    
        textWriter();
    
    // -. 텍스트가 입력되어 submit 버튼을 누르면 텍스트로 넘어온 값을 읽고 처리하여 html요소에 삽입한다.  
    function textWriter(){
        var originTextData = textInput.value;
        var textX = CANVAS_WIDTH/2;
        var textY = CANVAS_HEIGHT/2;
        // 왼쪽 정렬을 위한 코드. (윈쪽 정렬한 후 문단 전체를 제일 긴 단어를 기준으로 가운데 정렬하기)
        var addTextX = 0;
        var addTextY = 24; // 24가 기본값

        if(textInput.value.length >= 30){
            alert("Error");
        } else {

            var originTextArray = stringToWordList(originTextData);
            originTextArray = addEnterToWordList(originTextArray);
            displayWordList(context, originTextArray);

        }

        function setText(context, text, color, font, fontSize, x, y){
            console.log("setTextWorking");
            context.fillStyle = fontColor;
            context.font = fontSize + "px " + fontName; //fontWeight + " " + 
            context.textAlign = "left";
            context.textBaseline = "middle";
            context.fillText(text, x + 8, y);
        }

        function stringToWordList(String){
            var result = [];
            result = String.split(" ");
            return result;
        }

        function addEnterToWordList(WordArray){
            for(var i = 0; i < WordArray.length; i++){
                WordArray[i] += "\n";
            }
            return WordArray;
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
            }
            document.body.appendChild(image); // 생성한 image변수(img태그)를 body안에 붙임
        // }
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
            context = drawing.getContext("2d");
            context.font = fontSize + "px " + fontName;
            addTextX = (context.measureText(findMostLongWord(wordArray)).width) / 2;
            textX -= addTextX;
            return textX;
        }

        function setTextFactory(wordArray, context, fontColor, fontName, fontSize, textX, textY, addTextY){
            var wordPointer = 0;
            var temp = 1;

            if(wordArray.length % 2 === 0){ 				// 줄이 짝수 일 때 
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
            } else if(wordArray.length % 2 === 1){ 		// 줄이 홀수 일 때 
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
            return;
        }
    }
}