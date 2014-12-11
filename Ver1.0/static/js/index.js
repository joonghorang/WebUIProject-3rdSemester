var MAX_HEIGHT = window.innerHeight;
var MAX_WIDTH = window.innerWidth;

var navBar = document.getElementById("navBar");
var momentsBar = document.getElementById("momentsBar");
var fileInput = document.getElementById("upload-hidden");
var submitButton = document.getElementById("submitButton");

window.addEventListener('DOMContentLoaded', function(){  
}, false);


window.onload = function(){
	console.log(uploadButton);
}

momentsBar.addEventListener('click',function(){
	// 하나씩 유닛 추가하는 로직.
	var addColorCard = document.createElement('div');
	addColorCard.setAttribute('class', 'moment');
	addColorCard.setAttribute('id', ("moment" + momentsBar.childNodes.length).toString());
	addColorCard.style.height = MAX_HEIGHT * 0.24 + "px";
	addColorCard.style.backgroundColor = "#000000";
	addColorCard.style.display = "inline-block";
	momentsBar.appendChild(addColorCard);

	var colorCards = document.getElementById("momentsBar").childNodes;
	console.log(MAX_WIDTH * 0.8 / colorCards.length);

	for(var i = 0; i < colorCards.length; i++){
		colorCards[i].style.width = MAX_WIDTH * 0.8 / colorCards.length + "px";
		colorCards[i].style.backgroundColor = "#" + i + i + i + i + i + i;
	}
}, false);

submitButton.addEventListener('click', function(e){
	e.preventDefault();
	var request = new XMLHttpRequest();
	var formData = new FormData();

    /*파일 없을때 에러처리*/
    if(fileInput.files.item(0)===null){
        alert('no image');
    }
    /*AJAX로 데이터 받아오기*/
    var formData = new FormData();
    console.log(fileInput.files[0]);
    formData.append("image", fileInput.files[0]);

	request.open("POST" , "/upload" , true);
	request.send(formData);

	console.log(request.responseText) // 받아온 결과물을 뿌려줌. 
}, false);