var MAX_WIDTH = document.body.clientWidth;
var MAX_HEIGHT = document.body.clientHeight; 
console.log(MAX_WIDTH);
console.log(MAX_HEIGHT);

var textInput = document.getElementById("textInput");

EventUtil.addHandler(textInput, "onload", function(event){
	textInput.textContent = "30자 이내로 입력해주세요."; // p태그는 value가 아니라 textContent 프로퍼티로 접근해야한다. 
	textInput.style.color = "red";
});
EventUtil.addHandler(textInput, "focus", function(event){
	textInput.textContent = "|";
	document.execCommand("backcolor", false, "blue");
	document.execCommand("justifyleft", false, null);
	document.execCommand("bold", false, null);
});

EventUtil.addHandler(textInput, "paste", function(event){ // 붙이기 방지 
	var text = EventUtil.getClipboardText(event);
	EventUtil.preventDefault(event);
});