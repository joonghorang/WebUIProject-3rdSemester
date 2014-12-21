window.addEventListener('DOMContentLoaded', function(){
	var MAX_WIDTH = window.innerWidth;
	var MAX_HEIGHT = window.innerHeight;
	var outputImageWrapper = document.getElementById("output-image-wrapper");
	var outputText = document.getElementById("output-text");
	var outputCanvas = document.getElementById("text-canvas");
	var backCanvas = document.getElementById("back-canvas");
	var backwardButton = document.getElementById("backward-button");
	var forwardButton = document.getElementById("forward-button");
	//init
	function init(){
		//사진이미지 배경을 설정한다. 
        // Comment : good.
		outputImageWrapper.style.backgroundColor = "#202020";
		
        // Comment : context가 뭔지 알 도리가 없다.
        //           outputCanavs는 뭐고 backCanvas는 뭐죠. 이름으로 단박에 명시하기 힘들다면 구체적인 코멘트를 작성하자.
        var context = outputCanvas.getContext("2d");
		var backContext = backCanvas.getContext("2d");
		backContext.fillStyle = "#202020";
		backContext.fillRect(0,0, backCanvas.width, backCanvas.height);

		// 전체 폰트 사이즈 크기를 상대적으로 여기서 조절 가능. 
        // Comment : width height 같다는걸 명시하자.
		outputCanvas.width = MAX_WIDTH * 0.6;
		outputCanvas.height = MAX_WIDTH * 0.6;
        // Comment : 어떤게 좋은걸까?
		var CANVAS_WIDTH = outputCanvas.width;
		var CANVAS_HEIGHT = outputCanvas.height;

		//setting value

//웹폰트 사용시 이구문이 필요할 수 있음. 나중에 해결-
// 		<script src="//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js"></script>
// <script>
//  WebFont.load({
//   custom: {
//    families: ['NanumBarunGothic'],
//    urls: ['/css/font.css']
//   }
//  });
// </script>
        // Comment : 이런 식으로 폰트 setting부분을 따로 빼두는 것은 array.
		var fontName = "NanumBarunGothicUltraLight";
		var fontColor = "#ffffff";
        // Comment : 이 array 방식에는 문제가 있다.
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
        
        // Comment : 글자를 쓰는 모양이다. 결과물은 무엇으로 나오나? 알 수 없다면 return하는 결과물이 무엇인지 써주자. 
		textWriter();

		function textWriter(){
            // Comment : Setting을 빼두는 것까진 좋았다. 그런데 이 데이타들이 내부에서 설정되어야 하는 친구들이었을까?
		    var originTextData = "Typing 타이핑 12345";
		    var textX = CANVAS_WIDTH/2;
		    var textY = CANVAS_HEIGHT/2;
		    // 왼쪽 정렬을 위한 코드. (윈쪽 정렬한 후 문단 전체를 제일 긴 단어를 기준으로 가운데 정렬하기)

            // Comment : 이런 부정확한 이름들은 어떤 역할을 하는 변수인지 확실히 써주자.
		    var addTextX = 0;
            
            // Comment : 마찬가지. 이 array방식에는 문제가 있다.
		    var addTextArray = new Array();	// for Y
		    //addTextArray.push(10);	//0
		    addTextArray.push(16);	//1
		    addTextArray.push(24);	//2
		    addTextArray.push(36);	//3
		    addTextArray.push(48);	//4
		    addTextArray.push(60);	//5
		    addTextArray.push(72);
		    addTextArray.push(100);
            
            // Comment : addTextX와 떨어져 있어야 했나?
		    var addTextY = addTextArray[2]; // 24가 기본값
            
            // Comment : 30과 같은것을 하드코딩이라 한다. 가독성도, 수정도 좋지않다.
		    if(originTextData > 30){
		        alert("Error");
		    } else {
		        var originTextArray = stringToWordList(originTextData);
		        originTextArray = addEnterToWordList(originTextArray);
		        displayWordList(context, originTextArray);
                
                // Comment : 자잘한 함수들을 어떻게 처리하면 좋을까.
                // Comment : String과 같은 네이밍은 통상적으로 쓰이는 의미와 중복되기 쉬워 에러를 뱉기 쉽상이다.
		        function stringToWordList(String){
		            var result = [];
		            result = String.split(" ");
		            return result;
		        };
                // Comment : 왜 enter를 더해주어야 하는가.
		        function addEnterToWordList(WordArray){
		            for(var i = 0; i < WordArray.length; i++){
		                WordArray[i] += "\n";
		            }
		            return WordArray;
		        };
		    }
            // Comment : 무엇을 하는 친구일지 전혀 감이 오지않는 네이밍. context에 글자를 써주는 것이라고 명시해주자. 
            //          canvas에 그리는 경우 네이밍엔 draw등을 넣어주는게 좋다.
		    function displayWordList(context, wordArray){
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
                        // Comment : 모든 case에서 중복된다. 밖으로 빼주자.
		                textX = repositionTextX(wordArray, textX, fontSize);
                        // Comment : fontData처럼 묶어주어도 되지 않았을까?
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
                        // Comment : 좋지않은 indent.
                        //          그리고 default의 의미를 알자.
		                     fontSize = fontSizeArray[3];
		                     addTextY = addTextArray[3]
		                     textX = repositionTextX(wordArray, textX, fontSize);
		                     setTextFactory(wordArray, context, fontColor, fontName, fontSize, textX, textY, addTextY);
		                     break;
                    // Comment : 이름은 귀엽고 좋으나 Factory가 가지는 의미를 살리지 못했다.
                    // Comment : textY, addTextY는 뭐가 다를까?
		            function setTextFactory(wordArray, context, fontColor, fontName, fontSize, textX, textY, addTextY){
			            // Comment : 이건 예외지 버그가 아니다.
                        checkOneWordBug();                              // 연속해서 한 단어가 있는지 검사. 
                        // Comment : 알수없는 네이밍 변수.
			            var wordPointer = 0;
                        // Comment : 무엇의 tmp 인가.
			            var temp;
                        // Comment : 이런식의 코멘트는 좋다. 왜 줄이 짝수이고 홀수인지를 구별해야하는지 써주면 이해도 업.
			            if(wordArray.length % 2 === 0){                 // 줄이 짝수 일 때 
                            // Comment : 안에 들어와서도 tmp가 무엇인지 알길이없다.
			                temp = 0;
			                for(var i = 0; i < wordArray.length/2; i++){
			                    setText(context, wordArray[wordPointer], fontColor, fontName, fontSize, textX, textY - (addTextY * (wordArray.length/2-i) - addTextY/2) * 2);
                                // Comment : 넌 뭔데 증가되는거냐.
			                    wordPointer++;
			                }
			                for(var j = (wordArray.length/2); j < wordArray.length; j++){
			                    setText(context, wordArray[j], fontColor, fontName, fontSize, textX, textY + (addTextY * temp + addTextY/2) * 2);
			                    wordPointer++;
			                    temp++;
			                }
                            // Comment : 홀수 아니면 짝수다. else를 쓰자.
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
                        // Comment : 마찬가지. 네이밍에 draw를 쓰자.
			            function setText(context, text, color, font, fontSize, x, y){
			                context.fillStyle = fontColor;
			                context.font = fontSize + "px " + fontName; //fontWeight + " " + 
			                context.textAlign = "left";
			                context.textBaseline = "middle";
                            // Comment : 이런 20은 다른사람이 수정을 하기 힘들게 한다. 
			                context.fillText(text, x+20, y);
			            };
                        // Comment : 함수이름으로 역할을 명시하려고 한 노력이보인다.
                        //          함수에대한 코멘트를 써주었다면 네이밍에도 고민이 줄고 이해도 올라갔을 것이다.
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

	//화면전환 이벤트 등록
	EventUtil.addHandler(outputText, "click", function(event){
        display([outputImageWrapper], "show");
        display([outputText], "hide");
	});
	EventUtil.addHandler(outputImageWrapper, "click", function(event){
        display([outputText], "show");
        display([outputImageWrapper], "hide");
	});

	//모멘츠 이동버튼 이벤트 등록
	EventUtil.addHandler(backwardButton, "click", function(event){
        console.log("you click backward button");
	});
	EventUtil.addHandler(forwardButton, "click", function(event){
        console.log("you click forward button");
	});


},false)

