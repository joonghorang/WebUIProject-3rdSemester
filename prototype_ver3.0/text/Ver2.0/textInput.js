var MAX_WIDTH = window.innerWidth * 99/100;
var MAX_HEIGHT = window.innerHeight * 99.8/100;

var wrapper = document.getElementById("wrapper");
var textInput = document.getElementById("text-input");
var submitButton = document.getElementById("submit-button");
var backGroundCanvas = document.getElementById("back-ground-canvas");
var textValue;	// 입력받은 문자열 저장 변수 

var fR = 255;
var fG = 255;
var fB = 255;
var firstColorR = (fR).toString(16);
var firstColorG = (fG).toString(16);
var firstColorB = (fB).toString(16);
var firstColor = "#" + firstColorR + firstColorG + firstColorB;	// 그라데이션 칼라 초기값
var secondColor = "#000000";

window.onload = function(){						// 기본 동적 스타일 
	backGroundCanvas.width = MAX_WIDTH;
	backGroundCanvas.height = MAX_HEIGHT;
	draw_canvas(firstColor, secondColor);
};

function setGradationColor(R, G, B){
	firstColorR = (R).toString(16);
	firstColorG = (G).toString(16);
	firstColorB = (B).toString(16);
	firstColor = "#" + firstColorR + firstColorG + firstColorB;
}

function draw_canvas(FirstColor, SecondColor) {
	var ctx = backGroundCanvas.getContext('2d');
	
	// 그라데이션 영역 정의 및 객체 생성
	var grd = ctx.createLinearGradient(0, MAX_HEIGHT/40, MAX_WIDTH, MAX_HEIGHT*2/3);
	grd.addColorStop(0, SecondColor);
	grd.addColorStop(1, FirstColor);

	// 도형의채우는 색상 속성에 그라데이션 객체 설정
	ctx.fillStyle = grd;
	ctx.fillRect(0, MAX_HEIGHT/2 - MAX_HEIGHT/16, MAX_WIDTH, MAX_HEIGHT/8);
}

EventUtil.addHandler(textInput, "focus", function(event){	// 입력창 포커스시 
	textInput.value = "";
	textInput.style.fontSize = "60px";
});

EventUtil.addHandler(textInput, "paste", function(event){ // 붙이기 방지 
	var text = EventUtil.getClipboardText(event);
	EventUtil.preventDefault(event);
});

EventUtil.addHandler(submitButton, "click", function(event){		// 전송버튼 이벤트 
	textValue = textInput.textContent;
	console.log(textValue); //testcode
});

// textInput.onchange = function(){
// 	console.log("ddd");
// }
document.onkeydown = function(){
	if(event.keyCode === 8){
		switch(textInput.value.length){
			case 1 : 
				fR = 255;
				fG = 255;
				fB = 255;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			case 2 :
				fR = 246;
				fG = 246;
				fB = 246;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			case 3 :
				fR = 237;
				fG = 237;
				fB = 237;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			case 4 :
				fR = 228;
				fG = 228;
				fB = 228;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			case 5 :
				fR = 219;
				fG = 219;
				fB = 219;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;	
			case 6 : 
				fR = 210;
				fG = 210;
				fB = 210;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			case 7 :
				fR = 201;
				fG = 201;
				fB = 201;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			case 8 :
				fR = 192;
				fG = 192;
				fB = 192;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			case 9 :
				fR = 183;
				fG = 183;
				fB = 183;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			case 10 :
				fR = 174;
				fG = 174;
				fB = 174;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;	
			case 11 : 
				fR = 165;
				fG = 165;
				fB = 165;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			case 12 :
				fR = 156;
				fG = 156;
				fB = 156;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			case 13 :
				fR = 147;
				fG = 147;
				fB = 147;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			case 14 :
				fR = 138;
				fG = 138;
				fB = 138;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			case 15 :
				fR = 129;
				fG = 129;
				fB = 129;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;	
			case 16 : 
				fR = 120;
				fG = 120;
				fB = 120;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			case 17 :
				fR = 112;
				fG = 112;
				fB = 112;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			case 18 :
				fR = 104;
				fG = 104;
				fB = 104;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			case 19 :
				fR = 96;
				fG = 96;
				fB = 96;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			case 20 :
				fR = 88;
				fG = 88;
				fB = 88;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				textInput.style.color = "#000000"; 
				break;	
			case 21 : 
				fR = 80;
				fG = 80;
				fB = 80;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				textInput.style.color = "#000010"; 
				break;
			case 23 :
				fR = 72;
				fG = 72;
				fB = 72;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);
				textInput.style.color = "#001020";  
				break;
			case 24 :
				fR = 64;
				fG = 64;
				fB = 64;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				textInput.style.color = "#002030";
				break;
			case 25 :
				fR = 56;
				fG = 56;
				fB = 56;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				textInput.style.color = "#003040"; 
				break;
			case 26 :
				fR = 48;
				fG = 48;
				fB = 48;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				textInput.style.color = "#004050"; 
				break;	
			case 27 : 
				fR = 40;
				fG = 40;
				fB = 40;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				textInput.style.color = "#005060"; 
				break;
			case 28 :
				fR = 32;
				fG = 32;
				fB = 32;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				textInput.style.color = "#006070"; 
				break;
			case 29 :
				fR = 24;
				fG = 24;
				fB = 24;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);
				textInput.style.color = "#007080";  
				break;
			case 30 :
				fR = 16;
				fG = 16;
				fB = 16;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			defalut : 
				break;
			}		
	}
}
EventUtil.addHandler(textInput, "textInput", function(event){	// 엔터키 누르면 전송하게 하는 이벤트 
	event = EventUtil.getEvent(event);
	if(event.keyCode === 13){
		EventUtil.preventDefault(event);
		textValue = textInput.textContent;
	} else if(textInput.value.length <= 30) {
		switch(textInput.value.length){
			case 1 : 
				fR = 255;
				fG = 255;
				fB = 255;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			case 2 :
				fR = 246;
				fG = 246;
				fB = 246;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			case 3 :
				fR = 237;
				fG = 237;
				fB = 237;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			case 4 :
				fR = 228;
				fG = 228;
				fB = 228;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			case 5 :
				fR = 219;
				fG = 219;
				fB = 219;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;	
			case 6 : 
				fR = 210;
				fG = 210;
				fB = 210;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			case 7 :
				fR = 201;
				fG = 201;
				fB = 201;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			case 8 :
				fR = 192;
				fG = 192;
				fB = 192;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			case 9 :
				fR = 183;
				fG = 183;
				fB = 183;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			case 10 :
				fR = 174;
				fG = 174;
				fB = 174;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;	
			case 11 : 
				fR = 165;
				fG = 165;
				fB = 165;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			case 12 :
				fR = 156;
				fG = 156;
				fB = 156;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			case 13 :
				fR = 147;
				fG = 147;
				fB = 147;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			case 14 :
				fR = 138;
				fG = 138;
				fB = 138;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			case 15 :
				fR = 129;
				fG = 129;
				fB = 129;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;	
			case 16 : 
				fR = 120;
				fG = 120;
				fB = 120;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			case 17 :
				fR = 112;
				fG = 112;
				fB = 112;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			case 18 :
				fR = 104;
				fG = 104;
				fB = 104;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			case 19 :
				fR = 96;
				fG = 96;
				fB = 96;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;
			case 20 :
				fR = 88;
				fG = 88;
				fB = 88;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				break;	
			case 21 : 
				fR = 80;
				fG = 80;
				fB = 80;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);
				textInput.style.color = "#000010"; 
				break;
			case 23 :
				fR = 72;
				fG = 72;
				fB = 72;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);
				textInput.style.color = "#001020"; 
				break;
			case 24 :
				fR = 64;
				fG = 64;
				fB = 64;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				textInput.style.color = "#002030"; 
				break;
			case 25 :
				fR = 56;
				fG = 56;
				fB = 56;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				textInput.style.color = "#003040"; 
				break;
			case 26 :
				fR = 48;
				fG = 48;
				fB = 48;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				textInput.style.color = "#004050"; 
				break;	
			case 27 : 
				fR = 40;
				fG = 40;
				fB = 40;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				textInput.style.color = "#005060"; 
				break;
			case 28 :
				fR = 32;
				fG = 32;
				fB = 32;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				textInput.style.color = "#006070"; 
				break;
			case 29 :
				fR = 24;
				fG = 24;
				fB = 24;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				textInput.style.color = "#007080"; 
				break;
			case 30 :
				fR = 16;
				fG = 16;
				fB = 16;
				setGradationColor(fR, fG, fB);
				draw_canvas(firstColor, secondColor);  
				textInput.style.color = "#008090"; 
				break;
			defalut : 
				break;
			}		
	} else {
		alert("Please input under 30.");
		EventUtil.preventDefault(event);
	}
});