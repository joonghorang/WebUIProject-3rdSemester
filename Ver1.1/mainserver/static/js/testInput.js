var MAX_WIDTH = window.innerWidth;
var MAX_HEIGHT = window.innerHeight;

var wrapper = document.getElementById("wrapper");
var textInput = document.getElementById("text-input");
var submitButton = document.getElementById("submit-button");
var backGroundCanvas = document.getElementById("back-ground-canvas");

var textValue;	// 입력받은 문자열 저장 변수 

var fR;
var fG;
var fB;
var firstColor;	// 그라데이션 칼라 초기값
var secondColor;
var offset = 4;

window.onload = function(){
	textInputEventManager();
};

function changeDecToHexColor(r, g, b){
    var result = "#" + zeroCheck((r).toString(16)) 
                     + zeroCheck((g).toString(16)) 
                     + zeroCheck((b).toString(16));
    return result;
}
function zeroCheck(num){
    if(num.toString().length < 2){
        return "0" + num;
    } else {
        return num;
    }
}

function drawGradation(firstColor, secondColor) {
	var grdContext = backGroundCanvas.getContext('2d');
	// 그라데이션 영역 정의 및 객체 생성
	var grd = grdContext.createLinearGradient(0, MAX_HEIGHT, MAX_WIDTH, MAX_HEIGHT); 			// 풀스크린용
	grd.addColorStop(0, firstColor);
	grd.addColorStop(1, secondColor);

	// 도형의채우는 색상 속성에 그라데이션 객체 설정
	grdContext.fillStyle = grd;
	grdContext.fillRect(0, 0, MAX_WIDTH, MAX_HEIGHT);											// 풀스크린용
}

function changeGradationColor(num, offset){
	var R, G, B;
	if((fR - offset * num) < 16){
		R = 16;
	} else {
		R = decimalToHex(zeroCheck(fR - offset * num));
	}
	if((fG - offset * num) < 16){
		G = 16;
	} else {
		G = decimalToHex(zeroCheck(fG - offset * num));
	}
	if((fB - offset * num) < 16){
		B = 16;
	} else {
		B = decimalToHex(zeroCheck(fB - offset * num));
	}
	firstColor = combineRgbString(R, G, B);
	drawGradation(firstColor, secondColor);
		
	function decimalToHex(num){
		var hexnum = (num).toString(16);
		return hexnum;
	}
	function combineRgbString(R, G, B){
		var Color = "#" + R.toString() + G.toString() + B.toString();
		return Color;
	}
}

function textInputEventManager(){
	textInput.oninput = function(event){
		if(textInput.value.length < 30){
			var num = textInput.value.length;
			if(num < 5){
				changeGradationColor(num, offset);
				textInput.style.fontSize = "50px";
			} else if(num < 10) {
				changeGradationColor(num, offset);
				textInput.style.fontSize = "45px";
			} else if(num < 15) {
				changeGradationColor(num, offset);
				textInput.style.fontSize = "40px";
			} else if(num < 20) {
				changeGradationColor(num, offset);
				textInput.style.fontSize = "35px";
			} else {
				changeGradationColor(num, offset);
				textInput.style.fontSize = "30px";
			}
		} else {
			textInput.value = textInput.value.slice(0,29);
		}	
	};

	EventUtil.addHandler(textInput, "textInput", function(event){
		event = EventUtil.getEvent(event);
		if(textInput.value.length > 29){
			EventUtil.preventDefault(event);
		}
	});


	EventUtil.addHandler(textInput, "focus", function(event){	// 입력창 포커스시 
		textInput.value = "";
		textInput.style.fontSize = "50px";
	});

	EventUtil.addHandler(textInput, "paste", function(event){ // 붙이기 방지 
		var text = EventUtil.getClipboardText(event);
		EventUtil.preventDefault(event);
	});

	EventUtil.addHandler(textInput, "textInput", function(event){	// 엔터키 누르면 전송하게 하는 이벤트 
		event = EventUtil.getEvent(event);
		if(event.keyCode === 13){
			EventUtil.preventDefault(event);
			textValue = textInput.textContent;
		} 
	});

};