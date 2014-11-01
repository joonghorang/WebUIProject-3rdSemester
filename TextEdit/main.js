    
    


   	(function mainFunction(){
   		var CANVAS_WIDTH = 800;
	    var CANVAS_HEIGHT = 600;
	    var fontSize = 72;
	    var fontName = "NanumMyeongjo";
	    var fontColor = "#FFF";
	    var content = document.getElementById("content");

	    var textInput = document.getElementById("text-input");
	    textInput.value = "여기에 문장을 입력하세요.";


   		var submitButton = document.getElementById("submit-button");
	    submitButton.addEventListener("click", function(){
	    	var rCanvas = document.createElement("canvas");
	        rCanvas.width = CANVAS_WIDTH;
	        rCanvas.height = CANVAS_HEIGHT;
	        var rCanvasCtx = rCanvas.getContext("2d");
	        setText(rCanvasCtx, textInput.value, 10, 10, fontColor, fontName, fontSize);
	        content.appendChild(rCanvas);
	    }, false);

	    function setText(context, text, x, y, color, font, fontSize){
	        context.fillStyle = "#FFF";
	        context.font = fontSize + "px " + fontName;
	        context.fillText(textInput.value, 200, fontSize + 150);
	    }
	})();