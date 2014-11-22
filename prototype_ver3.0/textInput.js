var MAX_WIDTH = window.innerWidth;
var MAX_HEIGHT = window.innerHeight;

console.log(MAX_HEIGHT);
console.log(MAX_WIDTH);

var html = document.getElementById("html");
var wraper = document.getElementById("wraper");
var textInput = document.getElementById("textInput");
var button = document.getElementById("button");

window.onload = function(){

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

EventUtil.addHandler(textInput, "focus", function(event){
	textInput.textContent = "+";
	textInput.style.textAlign = "left";

	textInput.style.paddingLeft = MAX_WIDTH/4 + "px";
	textInput.style.width = MAX_WIDTH - MAX_WIDTH/4 - 50 + "px";
	// textInput.style.lineHeight = MAX_HEIGHT - MAX_HEIGHT/4 + "px";
	// textInput.style.height = MAX_HEIGHT - MAX_HEIGHT/4 + "px";
	
	textInput.style.fontSize = "60px";
});

EventUtil.addHandler(textInput, "paste", function(event){ // 붙이기 방지 
	var text = EventUtil.getClipboardText(event);
	EventUtil.preventDefault(event);
});