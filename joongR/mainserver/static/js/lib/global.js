// 일단 전역객체들을 여기에 모두 불러 모은다. 
var GlobalVar = {};
// 받아온 모멘트들을 저장하는 전역배열
var momentArray = new Array();  
GlobalVar = {

	// 현재 textInput.js에서 사용되고 있는 변수들. 
	"CONSTANTS" : function(){
		// 변수 선언
		this.MAX_WIDTH = window.innerWidth * 99.3/100; // 왠지는 모르겠으나 정확하게 비율이 맞지 않아서 상수를 추가. 
		this.MAX_HEIGHT = window.innerHeight * 99.3/100;
		// 변수 대입
		this.result = [];
		this.result.MAX_WIDTH = this.MAX_WIDTH;
		this.result.MAX_HEIGHT = this.MAX_HEIGHT;
		return this.result;
	},
	"GradationColorSetter" : function(color1, color2){
		this.color1 = color1;
		// this.color1R = commonCanvas.hex2Rgb(color1).r;
		// this.color1G = commonCanvas.hex2Rgb(color1).g;
		// this.color1B = commonCanvas.hex
		this.color2 = color2;
	},
	"GradationColorGetter" : function(){
		this.result = [];
		this.result.color1 = this.color1;
		this.result.color2 = this.color2;
		return this.result;
	},

	// 현재 index.js에서 사용되고 있는 변수들
	"ShadowColorSetter" : function(r, g, b){
		this.shadowR = r;
		this.shadowG = g;
		this.shadowB = b;
	},
	"ShadowColorGetter" : function(){
		this.result = [];
		this.result.shadowR = this.shadowR;
		this.result.shadowG = this.shadowG;
		this.result.shadowB = this.shadowB;
		return this.result;
	},
	"TempImgWarehouseSetter" : function(img){
		this.tempImgWarehouse = img;
	},
	"FlagSetter" : function(){

	},
	"Init" : function(){
		this.ShadowColorGetter.bind(this.ShadowColorSetter);
		this.GradationColorGetter.bind(this.GradationColorSetter);
	}
}
 GlobalVar.Init();

// GlobalVar.GradationColorSetter("#FFFFFF", "#FFFFFF");
// console.log(GlobalVar.GradationColorGetter());


// // 임시 그림자 저장소 
// var shadowR = 20;
// var shadowG = 20;
// var shadowB = 20;

// 취소 버튼을 위한 전역변수. 
var tempImgWarehouse;
var tempFlag = false;

// var wrapper = document.getElementById("wrapper");
// var textInput = document.getElementById("text-input");
// var submitButton = document.getElementById("submit-button");
// var backGroundCanvas = document.getElementById("back-ground-canvas");

//var textValue;	// 입력받은 문자열 저장 변수 

