var textInput = {
	"drawGradation" : function(color1, color2) {
		this.backGroundCanvas = document.getElementById("back-ground-canvas");
		this.grdContext = this.backGroundCanvas.getContext('2d');
		this.grdW = (GlobalVar.CONSTANTS()).MAX_WIDTH;
		this.grdH = (GlobalVar.CONSTANTS()).MAX_HEIGHT;

		// 그라데이션 영역 정의 및 객체 생성
		this.grd = this.grdContext.createLinearGradient(0, this.grdH, this.grdW, this.grdH); 
		this.grd.addColorStop(0, color1);
		this.grd.addColorStop(1, color2);

		// 도형의채우는 색상 속성에 그라데이션 객체 설정
		this.grdContext.fillStyle = this.grd;
		this.grdContext.fillRect(0, 0, this.grdW, this.grdH);	
	},
	"changeGradationColor" : function(textCount, offset){
		this.result = [];
		this.origin = [];
		this.gradationColor = GlobalVar.GradationColorGetter();
		this.color1 = this.gradationColor.color1;
		this.color2 = this.gradationColor.color2;
		this.maginotBrightness = 16;

		this.origin.R = (commonCanvas.hex2Rgb(this.color1)).r;
		this.origin.G = (commonCanvas.hex2Rgb(this.color1)).g;
		this.origin.B = (commonCanvas.hex2Rgb(this.color1)).b;
		if((this.origin.R - offset * textCount) < this.maginotBrightness){
			this.result.R = this.maginotBrightness;
		} else {
			this.result.R = decimalToHex(zeroCheck(this.origin.R - offset * textCount));	// using in /utility.js function
		}
		if((this.origin.G - offset * textCount) < this.maginotBrightness){
			this.result.G = this.maginotBrightness;
		} else {
			this.result.G = decimalToHex(zeroCheck(this.origin.G - offset * textCount));
		}
		if((this.origin.B - offset * textCount) < this.maginotBrightness){
			this.result.B = this.maginotBrightness;
		} else {
			this.result.B = decimalToHex(zeroCheck(this.origin.B - offset * textCount));
		}
		this.color1 = commonCanvas.rgb2Hex(this.result.R, this.result.G, this.result.B);

		this.drawGradation(this.color1, this.color2);

		function zeroCheck(num){	// 숫자가 감소하다가 1자리가 되었을 때 16진수로 바꾸면 1자리가 모자라므로 스트링"0"을 넣어준다. 
		    if(num.toString().length < 2){
		        return "0" + num;
		    } else {
		        return num;
		    }
		}
	},
	"changeBrightness" : function(event){
		this.textInput = document.getElementById("text-input");
		this.textCount;
		this.offset = 4; 
		this.textCount = this.textInput.value.length;
		this.changeGradationColor(this.textCount, this.offset);
		if(this.textInput.value.length < 30){
			if(this.textCount < 5){
				this.textInput.style.fontSize = "50px";
			} else if(this.textCount < 10) {
				this.textInput.style.fontSize = "45px";
			} else if(this.textCount < 15) {
				this.textInput.style.fontSize = "40px";
			} else if(this.textCount < 20) {
				this.textInput.style.fontSize = "35px";
			} else {
				this.textInput.style.fontSize = "30px";
			}
		} else {													// 30자가 넘어가면 자동으로 텍스트를 잘라버려서 입력되지 않게끔 한다. 
			this.textInput.value = this.textInput.value.slice(0,29);
		}
	},
	"enterSubmit" : function(event){
		if(event.keyCode === 13){
			console.log("Pressed enter to submit.");
			submit.sendData();
		}
	},
	"focusOnInit" : function(event){
		this.textInput.value = "";
		this.textInput.style.fontSize = "50px";
	},
	"preventPaste" : function(event){
		var text = EventUtil.getClipboardText(event);
		EventUtil.preventDefault(event);
	},
	"run" : function(){
		this.bindFunction(); 
		this.textInput = document.getElementById("text-input"); 										
		EventUtil.addHandler(this.textInput, "input", this.changeBrightness.bind(this));
		EventUtil.addHandler(this.textInput, "keydown", this.enterSubmit.bind(this));
		EventUtil.addHandler(this.textInput, "focus", this.focusOnInit.bind(this));	// 입력창 포커스시 
		EventUtil.addHandler(this.textInput, "paste", this.preventPaste.bind(this));
	},
	"bindFunction" : function(){									// 모든 함수들을 묶어버리는 
		this.run.bind(this.textInput);
	}
}
textInput.run();
