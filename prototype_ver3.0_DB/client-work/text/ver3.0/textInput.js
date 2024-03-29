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

// 초기화 코드
window.onload = function(){						
	backGroundCanvas.width = MAX_WIDTH;
	backGroundCanvas.height = MAX_HEIGHT;
	draw_canvas(firstColor, secondColor);
	EventManager();
};

function draw_canvas() {
	var ctx = backGroundCanvas.getContext('2d');
	
	// 그라데이션 영역 정의 및 객체 생성
	//var grd = ctx.createLinearGradient(0, MAX_HEIGHT/40, MAX_WIDTH, MAX_HEIGHT*2/3);	// 일부 스크린만 그라데이션 
	var grd = ctx.createLinearGradient(0, MAX_HEIGHT, MAX_WIDTH, MAX_HEIGHT); 			// 풀스크린용
	grd.addColorStop(0, secondColor);
	grd.addColorStop(1, firstColor);

	// 도형의채우는 색상 속성에 그라데이션 객체 설정
	ctx.fillStyle = grd;
	//ctx.fillRect(0, MAX_HEIGHT/2 - MAX_HEIGHT/16, MAX_WIDTH, MAX_HEIGHT/8);			// 일부 스크린만
	ctx.fillRect(0, 0, MAX_WIDTH, MAX_HEIGHT);											// 풀스크린용
}

function changeGradationColor(num, offset){
	var R = decimalToHex(fR - offset * num);
	var G = decimalToHex(fG - offset * num);
	var B = decimalToHex(fB - offset * num);	
	firstColor = combineRgbString(R, G, B);
	draw_canvas(firstColorR, secondColor);
	
	var fontR = decimalToHex(0 + offset * num / 2);
	var fontG = decimalToHex(0 + offset * num * 1.5);
	var fontB = decimalToHex(0 + offset * num * 2);
	textInput.style.color = combineRgbString(fontR, fontG, fontB);

	function decimalToHex(num){
		var hexnum = (num).toString(16);
		return hexnum;
	}
	function combineRgbString(R, G, B){
		var Color = "#" + R.toString() + G.toString() + B.toString();
		return Color;
	}
}

// 이벤트를 관리하는 걸 모아둔 함수. 
function EventManager(){
	textInput.oninput = function(){
		if(textInput.value.length < 30){
			var num = textInput.value.length;
			if(num < 5){
				changeGradationColor(num, 9);
				textInput.style.fontSize = "60px";
			} else if(num < 10) {
				changeGradationColor(num, 9);
				textInput.style.fontSize = "55px";
			} else if(num < 15) {
				changeGradationColor(num, 9);
				textInput.style.fontSize = "50px";
			} else if(num < 20) {
				changeGradationColor(num, 9);
				textInput.style.fontSize = "45px";
			} else {
				changeGradationColor(num, 8);
				textInput.style.fontSize = "40px";
			}
		} else {
			alert("Please input under 30.");
		}	
	};

	EventUtil.addHandler(textInput, "textInput", function(event){
		event = EventUtil.getEvent(event);
		if(textInput.value.length > 30){
			EventUtil.preventDefault(event);
		}
	});


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
		textInput.style.display = "none";
		submitButton.style.display = "none";
		outputCanvas.style.display = "block";
		backGroundCanvas.style.display = "none";
		
		//현재 時를 HH형식으로 리턴
		function getHour() {		
		    var now = new Date();
		    var hour = now.getHours();
		    if (("" + hour).length == 1) { hour = "0" + hour; }
		    return hour;		
		    return getCurrentTime().substr(8,2);
		}

		var presentTime = parseInt(getHour());
		console.log(presentTime);
		if(presentTime > 12){
			fontName = "NanumMyeongjo";
		} else{
			fontName = "NanumBarunGothic";
		}
		textWriter(); // 글자 쏴주는 함수 
	});

	EventUtil.addHandler(textInput, "textInput", function(event){	// 엔터키 누르면 전송하게 하는 이벤트 
		event = EventUtil.getEvent(event);
		if(event.keyCode === 13){
			EventUtil.preventDefault(event);
			textValue = textInput.textContent;
		} 
	});

};

