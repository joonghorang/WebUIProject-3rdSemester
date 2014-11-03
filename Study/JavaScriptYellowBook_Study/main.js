// 0. 전역으로 설정할 변수들을 지정한다. 
var textInput = document.getElementById("text-input");
var fontSize = 36;
var fontName = "NanumMyeongjo";
var fontWeight = "bold ";
var fontColor = "#FFFFFF";
// -. 캔버스를 생성한다.  
var drawing = document.getElementById("drawing");

if (drawing.getContext) { // <canvas>가 지원되는지 확인 하는 분기

	var context = drawing.getContext("2d");

	//context 변수에 해당 캔버스의 컨텍스트 객체를 저장한다. 
	//또 기본적으로 toDataURL() 메서드를 이용해 생성한 캔버스 이미지를 내보내야 한다. 

	// 이미지 데이터의 URI
	var imgURI = drawing.toDataURL("image/png"); // 여기서 png는 내보낼 데이터 형식이다. 기본적으로 브라우저는 png를 받는다.

	// 이미지 표시
	var image = document.createElement("img");  // 임의의 img태그를 하나 생성하고 그걸 image 변수에 삽입
	image.src = imgURI; 						// 저장해둔 imgURI 를 경로에 삽입

	context.fillStyle = "#550000";
	context.fillRect(0, 0, 500, 500);

	var canvasWidth = context.canvas.width; // 입력받은 캔버스의 가로 세로 
	var canvasHeight = context.canvas.height;

}

// -. 텍스트가 입력되어 submit 버튼을 누르면 텍스트로 넘어온 값을 읽고 처리하여 html요소에 삽입한다.  
    textInput.addEventListener("change", function(){
		var originTextData = textInput.value;
		var textX = canvasWidth/2;
		var textY = canvasHeight/2;

    	if(textInput.value.length >= 13){
    		alert("Error");
    	} else {

    		var originTextArray = stringToWordList(originTextData);
    		originTextArray = addEnterToWordList(originTextArray);
    		displayWordList(originTextArray);

        }
    
		function setText(context, text, color, font, fontSize, x, y){
		    context.fillStyle = fontColor;
		    context.font = fontSize + "px " + fontName; //fontWeight + " " + 
		    context.textAlign = "center";
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

		function displayWordList(wordArray){

			var addTextY = 0;
			switch(wordArray.length){
				case 1 :
					fontSize = 72;
					if(wordArray[0].length > 8 && wordArray[0].length <= 9){
						fontSize = 60;
					}else if(wordArray[0].length > 9){
						fontSize = 48;
					} 

					setText(context, wordArray[0], fontColor, fontName, fontSize, textX, textY);
					break;
				case 2 :
					fontSize = 60;
					addTextY = 35;

					for(var i = 0; i < wordArray.length; i++){
						if(wordArray[i].length > 8 && wordArray[i].length <= 12){
							fontSize = 48;
							addTextY = 30;
						}
					}
					setText(context, wordArray[0], fontColor, fontName, fontSize, textX, textY - addTextY);
					setText(context, wordArray[1], fontColor, fontName, fontSize, textX, textY + addTextY);
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
					setText(context, wordArray[0], fontColor, fontName, fontSize, textX, textY - addTextY);
					setText(context, wordArray[1], fontColor, fontName, fontSize, textX, textY);
					setText(context, wordArray[2], fontColor, fontName, fontSize, textX, textY + addTextY);
					break;
				case 4 :
					fontSize = 48;
					addTextY = 30;

					setText(context, wordArray[0], fontColor, fontName, fontSize, textX, textY - addTextY * 3);
					setText(context, wordArray[1], fontColor, fontName, fontSize, textX, textY - addTextY);
					setText(context, wordArray[2], fontColor, fontName, fontSize, textX, textY + addTextY);
					setText(context, wordArray[3], fontColor, fontName, fontSize, textX, textY + addTextY * 3);
					break;
				case 5 : 
					fontSize = 36;
					addTextY = 40;

					setText(context, wordArray[0], fontColor, fontName, fontSize, textX, textY - addTextY * 2);
					setText(context, wordArray[1], fontColor, fontName, fontSize, textX, textY - addTextY);
					setText(context, wordArray[2], fontColor, fontName, fontSize, textX, textY);
					setText(context, wordArray[3], fontColor, fontName, fontSize, textX, textY + addTextY);
					setText(context, wordArray[4], fontColor, fontName, fontSize, textX, textY + addTextY * 2);
					break;
				case 6 : 
					fontSize = 36;
					addTextY = 24;

					setText(context, wordArray[0], fontColor, fontName, fontSize, textX, textY - addTextY * 5);
					setText(context, wordArray[1], fontColor, fontName, fontSize, textX, textY - addTextY * 3);
					setText(context, wordArray[2], fontColor, fontName, fontSize, textX, textY + addTextY);
					setText(context, wordArray[3], fontColor, fontName, fontSize, textX, textY - addTextY);
					setText(context, wordArray[4], fontColor, fontName, fontSize, textX, textY + addTextY * 3);
					setText(context, wordArray[5], fontColor, fontName, fontSize, textX, textY + addTextY * 5);
						 break;
				case 7 : 
						 break;
				case 8 : 
						 break;
				case 9 :
						 break;
				default : 
	    				 setText(context, wordArray[0], fontColor, fontName, fontSize, textX, textY);
			}

			document.body.appendChild(image); // 생성한 image변수(img태그)를 body안에 붙임
		}

    }, false);

