var MAX_WIDTH = window.innerWidth * 99/100;
var MAX_HEIGHT = window.innerHeight * 99.8/100;

// 나중에 확장하게 될 지도 모르기에 따로 값을 선언해두었따. 
var CANVAS_WIDTH = MAX_WIDTH;
var CANVAS_HEIGHT = MAX_HEIGHT;

var exitButton = document.getElementById("exit-button");

window.onload = function(){
	exitButton.style.width = MAX_HEIGHT * 4 / 100 + "px";
	exitButton.style.height = MAX_HEIGHT * 4 / 100 + "px";
	exitButton.style.marginLeft = MAX_WIDTH - 40 + "px";
	exitButton.style.marginTop = 20 + "px";
};

var outputCanvas = document.getElementById("text-canvas");
outputCanvas.width = CANVAS_WIDTH;
outputCanvas.height = CANVAS_HEIGHT;
var context = outputCanvas.getContext("2d");
var outputBackCanvas = document.getElementById("image-canvas");
outputBackCanvas.width = CANVAS_WIDTH;
outputBackCanvas.height = CANVAS_HEIGHT;
var outputBackContext = outputBackCanvas.getContext("2d");


