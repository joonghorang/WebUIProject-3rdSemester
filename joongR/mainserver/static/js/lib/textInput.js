
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

function drawGradation(color1, color2) {
	var backGroundCanvas = document.getElementById("back-ground-canvas");
	var grdContext = backGroundCanvas.getContext('2d');
	var grdW = (GlobalVar.CONSTANTS()).MAX_WIDTH;
	var grdH = (GlobalVar.CONSTANTS()).MAX_HEIGHT;

	// 그라데이션 영역 정의 및 객체 생성
	var grd = grdContext.createLinearGradient(0, grdH, grdW, grdH); 			// 풀스크린용
	grd.addColorStop(0, color1);
	grd.addColorStop(1, color2);

	// 도형의채우는 색상 속성에 그라데이션 객체 설정
	grdContext.fillStyle = grd;
	grdContext.fillRect(0, 0, grdW, grdH);											// 풀스크린용
}

function changeGradationColor(textCount, offset){
	var result = [];
	var origin = [];
	var gradationColor = GlobalVar.GradationColorGetter();
	var color1 = gradationColor.color1;
	var color2 = gradationColor.color2;
	var maginotBrightness = 16;

	origin.R = (commonCanvas.hex2Rgb(color1)).r;
	origin.G = (commonCanvas.hex2Rgb(color1)).g;
	origin.B = (commonCanvas.hex2Rgb(color1)).b;
	if((origin.R - offset * textCount) < maginotBrightness){
		result.R = maginotBrightness;
	} else {
		result.R = decimalToHex(zeroCheck(origin.R - offset * textCount));
	}
	if((origin.G - offset * textCount) < maginotBrightness){
		result.G = maginotBrightness;
	} else {
		result.G = decimalToHex(zeroCheck(origin.G - offset * textCount));
	}
	if((origin.B - offset * textCount) < maginotBrightness){
		result.B = maginotBrightness;
	} else {
		result.B = decimalToHex(zeroCheck(origin.B - offset * textCount));
	}
	color1 = commonCanvas.rgb2Hex(result.R, result.G, result.B);

	drawGradation(color1, color2);

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
	var textInput = document.getElementById("text-input");
	var textCount;
	var offset = 4; 									// 한 번에 줄어드는 빛의 양.
	textInput.oninput = function(event){
		textCount = textInput.value.length;
		changeGradationColor(textCount, offset);
		if(textInput.value.length < 30){
			if(textCount < 5){
				textInput.style.fontSize = "50px";
			} else if(textCount < 10) {
				textInput.style.fontSize = "45px";
			} else if(textCount < 15) {
				textInput.style.fontSize = "40px";
			} else if(textCount < 20) {
				textInput.style.fontSize = "35px";
			} else {
				textInput.style.fontSize = "30px";
			}
		} else {												// 30자가 넘어가면 자동으로 텍스트를 잘라버려서 입력되지 않게끔 한다. 
			textInput.value = textInput.value.slice(0,29);
		}
		//console.log(event);
	
	};

	EventUtil.addHandler(textInput, "keydown", function(event){
		if(event.keyCode === 13){
			console.log("Pressed enter to submit.");
			submit.sendData();
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

	// EventUtil.addHandler(textInput, "textInput", function(event){	// 엔터키 누르면 전송하게 하는 이벤트 
	// 	event = EventUtil.getEvent(event);
	// 	if(event.keyCode === 13){
	// 		console.log("enter");
	// 		EventUtil.preventDefault(event);

	// 		submit.sendData();
	// 	} 
	// });
};


window.onload = function(){
	textInputEventManager();
};
