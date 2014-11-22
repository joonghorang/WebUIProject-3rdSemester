var MAX_WIDTH = window.innerWidth;
var MAX_HEIGHT = window.innerHeight;

console.log(MAX_HEIGHT);
console.log(MAX_WIDTH);

var html = document.getElementById("html");
var wraper = document.getElementById("wraper");
var textInput = document.getElementById("textInput");
var button = document.getElementById("button");
var textValue;

window.onload = function(){						// 기본 동적 스타일 

	// html.style.width = MAX_WIDTH + "px";
	// html.style.height = MAX_HEIGHT + "px";

	wraper.style.lineHeight = MAX_HEIGHT + "px";
	wraper.style.height = MAX_HEIGHT + "px";
	wraper.style.width = MAX_WIDTH + "px";

	wraper.style.verticalAlign = "middle";

	button.style.verticalAlign = "middle";

	textInput.style.backgroundColor = "yellow";
	
	textInput.style.textAlign = "center";
	textInput.style.verticalAlign = "middle";

	textInput.style.lineHeight = MAX_HEIGHT + "px";
	textInput.style.width = MAX_WIDTH-50 + "px";
	textInput.style.height = MAX_HEIGHT + "px";

	textInput.textContent = "30자 이내로 입력해주세요.";
	// textInput.fontSize = "100px";
	// textInput.style.color = "#303030";
};

EventUtil.addHandler(textInput, "focus", function(event){	// 입력창 포커스시 
	textInput.textContent = "+";
	textInput.style.textAlign = "left";

	textInput.style.paddingLeft = MAX_WIDTH/4 + "px";
	textInput.style.width = MAX_WIDTH - MAX_WIDTH/4 - 50 + "px";
	
	textInput.style.fontSize = "60px";
});

EventUtil.addHandler(textInput, "paste", function(event){ // 붙이기 방지 
	var text = EventUtil.getClipboardText(event);
	EventUtil.preventDefault(event);
});

EventUtil.addHandler(button, "click", function(event){		// 전송버튼 이벤트 
	textValue = textInput.textContent;
	console.log(textValue); //testcode
});

EventUtil.addHandler(textInput, "keypress", function(event){	// 엔터키 누르면 전송하게 하는 이벤트 
	event = EventUtil.getEvent(event);
	if(event.keyCode === 13){
		EventUtil.preventDefault(event);
		textValue = textInput.textContent;
		console.log(textValue); //testcode
	}
});