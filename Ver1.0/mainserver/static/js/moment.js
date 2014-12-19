window.addEventListener('DOMContentLoaded', function(){
	var MAX_WIDTH = window.innerWidth;
	var MAX_HEIGHT = window.innerHeight;
	var outputImageWrapper = document.getElementById("output-image-wrapper");
	var outputText = document.getElementById("output-text");
	var outputCanvas = document.getElementById("text-canvas");
	var backCanvas = document.getElementById("back-canvas");
	//init
	function init(){
		//사진이미지 배경을 설정한다. 
		outputImageWrapper.style.backgroundColor = "#202020";
		var context = outputCanvas.getContext("2d");
		var backContext = backCanvas.getContext("2d");
		backContext.fillStyle = "#202020";
		backContext.fillRect(0,0, backCanvas.width, backCanvas.height);
		console.log(outputText.width);

		// 전체 폰트 사이즈 크기를 상대적으로 여기서 조절 가능. 
		outputCanvas.width = MAX_WIDTH * 0.6;
		outputCanvas.height = MAX_WIDTH * 0.6;

		var CANVAS_WIDTH = outputCanvas.width;
		var CANVAS_HEIGHT = outputCanvas.height;

		//setting value
		var fontName = "MyHelvetica";
		var fontColor = "#ffffff";
		var fontSizeArray = new Array();
		fontSizeArray.push(140);
		fontSizeArray.push(100);
		fontSizeArray.push(72); //0
		fontSizeArray.push(60); //1
		fontSizeArray.push(48); //2
		fontSizeArray.push(36); //3
		fontSizeArray.push(24); //4
		fontSizeArray.push(16); //5
		fontSizeArray.push(8);  //6

		textWriter();

		function textWriter(){
		     var originTextData = "HELVETICA LOVE";
		    var textX = CANVAS_WIDTH/2;
		    var textY = CANVAS_HEIGHT/2;
		    // 왼쪽 정렬을 위한 코드. (윈쪽 정렬한 후 문단 전체를 제일 긴 단어를 기준으로 가운데 정렬하기)

		    var addTextX = 0;

		    var addTextArray = new Array();	// for Y
		    //addTextArray.push(10);	//0
		    //addTextArray.push(16);	//1
		    addTextArray.push(24);	//2
		    addTextArray.push(36);	//3
		    addTextArray.push(48);	//4
		    addTextArray.push(60);	//5
		    addTextArray.push(72);
		    addTextArray.push(100);

		    var addTextY = addTextArray[2]; // 24가 기본값

		    if(originTextData > 30){
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
		                fontSize = fontSizeArray[0];
		                if(wordArray[0].length > 8 && wordArray[0].length <= 9){
		                    fontSize = fontSizeArray[0];
		                } else if(wordArray[0].length > 9 && wordArray[0].length <= 15){
		                    fontSize = fontSizeArray[1];
		                } else if(wordArray[0].length > 15){
		                    fontSize = fontSizeArray[3];
		                }
		                textX = repositionTextX(wordArray, textX, fontSize);
		                setTextFactory(wordArray, context, fontColor, fontName, fontSize, textX, textY, addTextY);
		                break;
		            case 2 :
		                fontSize = fontSizeArray[1];
		                addTextY = addTextArray[1]

		                for(var i = 0; i < wordArray.length; i++){
		                    if(wordArray[i].length > 6 && wordArray[i].length <= 12){
		                        fontSize = fontSizeArray[2];
		                        addTextY = addTextArray[2]
		                    } else if(wordArray[0].length > 12){
		                        fontSize = fontSizeArray[5];
		                        addTextY = addTextArray[1];
		                    }
		                }

		                textX = repositionTextX(wordArray, textX, fontSize);
		                setTextFactory(wordArray, context, fontColor, fontName, fontSize, textX, textY, addTextY);;
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
		                textX = repositionTextX(wordArray, textX, fontSize);
		                setTextFactory(wordArray, context, fontColor, fontName, fontSize, textX, textY, addTextY);
		                break;
		            case 4 :
		                fontSize = fontSizeArray[2];
		                addTextY = addTextArray[2]

		                textX = repositionTextX(wordArray, textX, fontSize);
		                setTextFactory(wordArray, context, fontColor, fontName, fontSize, textX, textY, addTextY);
		                break;
		            case 5 : 
		                fontSize = fontSizeArray[3];
		                addTextY = addTextArray[4]

		                textX = repositionTextX(wordArray, textX, fontSize);
		                setTextFactory(wordArray, context, fontColor, fontName, fontSize, textX, textY, addTextY);
		                break;
		            case 6 : 
		                fontSize = fontSizeArray[3];
		                addTextY = addTextArray[2]

		                textX = repositionTextX(wordArray, textX, fontSize);
		                setTextFactory(wordArray, context, fontColor, fontName, fontSize, textX, textY, addTextY);
		                     break;
		            default : 
		                     fontSize = fontSizeArray[3];
		                     addTextY = addTextArray[3]
		                     textX = repositionTextX(wordArray, textX, fontSize);
		                     setTextFactory(wordArray, context, fontColor, fontName, fontSize, textX, textY, addTextY);
		                     break;
		            function setTextFactory(wordArray, context, fontColor, fontName, fontSize, textX, textY, addTextY){
			            checkOneWordBug();                              // 연속해서 한 단어가 있는지 검사. 
			            var wordPointer = 0;
			            var temp;
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
			            	temp = 1;
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
			                context.fillStyle = fontColor;
			                context.font = fontSize + "px " + fontName; //fontWeight + " " + 
			                context.textAlign = "left";
			                context.textBaseline = "middle";
			                context.fillText(text, x, y);
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
			                    if(wordArray[l] === ""){
			                        console.log(wordArray[l] + "here");
			                        wordArray.splice(l, 0);
			                        console.log(wordArray.length);
			                    }
			                }
			            }
			        };
		        }
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

