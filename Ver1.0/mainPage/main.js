var MAX_HEIGHT = window.innerHeight;
var MAX_WIDTH = window.innerWidth;

var navBar = document.getElementById("navBar");
var colorBar = document.getElementById("colorBar");


window.addEventListener('DOMContentLoaded', function(){  
    test_genOutputs();
}, false);

//colorBar.addEventListener('click',function(){
//	// 하나씩 유닛 추가하는 로직.
//	var addColorCard = document.createElement('div');
//	addColorCard.setAttribute('class', 'ColorCard');
//	addColorCard.setAttribute('id', ("ColorCard" + colorBar.childNodes.length).toString());
//	addColorCard.style.height = MAX_HEIGHT * 0.24 + "px";
//	addColorCard.style.backgroundColor = "#000000";
//	addColorCard.style.display = "inline-block";
//	colorBar.appendChild(addColorCard);
//
//	var colorCards = document.getElementById("colorBar").childNodes;
//	console.log(MAX_WIDTH * 0.8 / colorCards.length);
//
//	for(var i = 0; i < colorCards.length; i++){
//		colorCards[i].style.width = MAX_WIDTH * 0.8 / colorCards.length + "px";
//		colorCards[i].style.backgroundColor = "#" + i + i + i + i + i + i;
//	}
//}, false);