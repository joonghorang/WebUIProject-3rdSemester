var MAX_HEIGHT = window.innerHeight;
var MAX_WIDTH = window.innerWidth;

var colorBar = document.getElementById("colorBar");
var navBar = document.getElementById("navBar");
var uploadButton = document.getElementById("uploadButton");

window.onload = function(){
//	uploadButton.preventDefault();
	console.log(uploadButton);
}

colorBar.addEventListener('click',function(){
	// 하나씩 유닛 추가하는 로직.
	var addColorCard = document.createElement('div');
	addColorCard.setAttribute('class', 'ColorCard');
	addColorCard.setAttribute('id', ("ColorCard" + colorBar.childNodes.length).toString());
	addColorCard.style.height = MAX_HEIGHT * 0.24 + "px";
	addColorCard.style.backgroundColor = "#000000";
	addColorCard.style.display = "inline-block";
	colorBar.appendChild(addColorCard);

	var colorCards = document.getElementById("colorBar").childNodes;
	console.log(MAX_WIDTH * 0.8 / colorCards.length);

	for(var i = 0; i < colorCards.length; i++){
		colorCards[i].style.width = MAX_WIDTH * 0.8 / colorCards.length + "px";
		colorCards[i].style.backgroundColor = "#" + i + i + i + i + i + i;
	}
}, false);


uploadButton.addEventListener('click', function(e){
	e.preventDefault();
	var request = new XMLHttpRequest();
	var formData = new FormData();;
	var red = document.getElementById('red');
	var green = document.getElementById('green');
	var blue = document.getElementById('blue');
	var alpha = document.getElementById('alpha');

	formData.append("r", red.value);
	formData.append("g", green.value);
	formData.append("b", blue.value);
	formData.append("a", alpha.value);

	request.open("POST" , "/rgbDB" , false);
	request.send(formData);

	console.log(request.responseText) // 받아온 결과물을 뿌려줌. 
}, false);
