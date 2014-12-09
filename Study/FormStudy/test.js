var MAX_HEIGHT = window.innerHeight;
var MAX_WIDTH = window.innerWidth;

var submitButton = document.getElementById("submitButton");
var form = document.getElementById("formWrapper");
submitButton.addEventListener('click', function(){
	form.submit();
	console.log("clicked");
}, false);
