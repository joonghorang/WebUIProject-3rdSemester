window.addEventListener('DOMContentLoaded', function(){
	var outputText = document.getElementById("output-text");
	var outputCanvas = document.getElementById("text-canvas");
	var backCanvas = document.getElementById("back-canvas");
	var outputImageWrapper = document.getElementById("output-image-wrapper");

	//init
	function init(){
		var context = outputCanvas.getContext("2d");
		var backContext = backCanvas.getContext("2d");
		backContext.fillStyle = "#505050";
		backContext.fillRect(0,0, backCanvas.width, backCanvas.height);
	
		var CANVAS_WIDTH = outputCanvas.width;
		var CANVAS_HEIGHT = outputCanvas.height;

		//setting value
		var fontName = "NanumMyeongjo";
		var fontColor = "#202020";
		var fontSizeArray = new Array();
		//fontSizeArray.push(72); //0
		//fontSizeArray.push(60); //1
		fontSizeArray.push(48); //2
		fontSizeArray.push(36); //3
		fontSizeArray.push(24); //4
		fontSizeArray.push(16); //5
		fontSizeArray.push(8);  //6

		textWriter();

		function textWriter(){
		    var originTextData = "가라 데이터.";
		    var textX = CANVAS_WIDTH/2;
		    var textY = CANVAS_HEIGHT/2;
		    // 왼쪽 정렬을 위한 코드. (윈쪽 정렬한 후 문단 전체를 제일 긴 단어를 기준으로 가운데 정렬하기)
		    var addTextX = 0;
		    var addTextY = 24; // 24가 기본값

		    if(originTextData.length > 30){
		        alert("Error");
		    } else {
		        var originTextArray = stringToWordList(originTextData);
		        originTextArray = addEnterToWordList(originTextArray);
		        displayWordList(context, originTextArray);
		    }

		    function displayWordList(context, wordArray){
		        switch(wordArray.length){
		            case 1 :
		                fontSize = fontSizeArray[0];
		                if(wordArray[0].length > 8 && wordArray[0].length <= 9){
		                    fontSize = fontSzieArray[1];
		                } else if(wordArray[0].length > 9 && wordArray[0].length <= 15){
		                    fontSize = fontSzieArray[3];
		                } else if(wordArray[0].length > 15){
		                    fontSize = fontSzieArray[5];
		                }
		                textX = repositionTextX(wordArray, textX, fontSize);
		                setTextFactory(wordArray, context, fontColor, fontName, fontSize, textX, textY, addTextY);
		                break;
		            case 2 :
		                fontSize = fontSizeArray[1];
		                addTextY = 35;

		                for(var i = 0; i < wordArray.length; i++){
		                    if(wordArray[i].length > 6 && wordArray[i].length <= 12){
		                        fontSize = fontSizeArray[2];
		                        addTextY = 30;
		                    } else if(wordArray[0].length > 12){
		                        fontSize = fontSizeArray[5];
		                        addTextY = 10;
		                    }
		                }

		                textX = repositionTextX(wordArray, textX, fontSize);
		                setTextFactory(wordArray, context, fontColor, fontName, fontSize, textX, textY, addTextY);;
		                break;
		            case 3 :
		                fontSize = fontSizeArray[2];
		                addTextY = 60;

		                for(var i = 0; i < wordArray.length; i++){
		                    if(wordArray[i].length > 7 && wordArray[i].length <= 11){
		                        fontSize = fontSizeArray[3];
		                        addTextY = 24;
		                    }
		                }
		                textX = repositionTextX(wordArray, textX, fontSize);
		                setTextFactory(wordArray, context, fontColor, fontName, fontSize, textX, textY, addTextY);
		                break;
		            case 4 :
		                fontSize = fontSizeArray[2];
		                addTextY = 30;

		                textX = repositionTextX(wordArray, textX, fontSize);
		                setTextFactory(wordArray, context, fontColor, fontName, fontSize, textX, textY, addTextY);
		                break;
		            case 5 : 
		                fontSize = fontSizeArray[3];
		                addTextY = 40;

		                textX = repositionTextX(wordArray, textX, fontSize);
		                setTextFactory(wordArray, context, fontColor, fontName, fontSize, textX, textY, addTextY);
		                break;
		            case 6 : 
		                fontSize = fontSizeArray[3];
		                addTextY = 24;

		                textX = repositionTextX(wordArray, textX, fontSize);
		                setTextFactory(wordArray, context, fontColor, fontName, fontSize, textX, textY, addTextY);
		                     break;
		            default : 
		                     fontSize = fontSizeArray[3];
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
	};
	init();

	EventUtil.addHandler(outputText, "click", function(event){
		display([outputImageWrapper], "show");
		display([outputText], "hide");
	});
	EventUtil.addHandler(outputImageWrapper, "click", function(event){
		display([outputText], "show");
		display([outputImageWrapper], "hide");
	});


},false)

