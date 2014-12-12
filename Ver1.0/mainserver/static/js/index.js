var MAX_HEIGHT = window.innerHeight;
var MAX_WIDTH = window.innerWidth;

var navBar = document.getElementById("navBar");
var momentsBar = document.getElementById("momentsBar");
var fileInput = document.getElementById("upload-hidden");
var submitButton = document.getElementById("submitButton");

window.addEventListener('DOMContentLoaded', function(){  
	test_genOutputs();
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