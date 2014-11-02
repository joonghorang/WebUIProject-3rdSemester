// 0. 전역으로 설정할 변수들을 지정한다. 
var textInput = document.getElementById("text-input");
var fontSize = 36;
var fontName = "NanumMyeongjo";
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

    	if(textInput.value.length > 10){
    		alert("Error");
    	} else {


			var textX = canvasWidth/2;
			var textY = canvasHeight/2;

			console.log("textX : " + textX);
			console.log("measureText : " + context.measureText(textInput.value).width);

	    	var originTextData = textInput.value;
	    	setText(context, originTextData, fontColor, fontName, fontSize, textX, textY);

			document.body.appendChild(image); // 생성한 image변수(img태그)를 body안에 붙임

			console.log("After textX : " + textX);
			console.log("After measureText : " + context.measureText(textInput.value).width);
        }
    
		function setText(context, text,color, font, fontSize, x, y){
		    context.fillStyle = fontColor;
		    context.font = fontSize + "px " + fontName;
		    context.textAlign = "center";
		    //context.textBaseline = "middle";
		    context.fillText(textInput.value, x, y);
		}
    }, false);

