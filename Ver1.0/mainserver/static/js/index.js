var MAX_HEIGHT = window.innerHeight;
var MAX_WIDTH = window.innerWidth;

var navBar = document.getElementById("navBar");
var momentsBar = document.getElementById("momentsBar");
var fileInput = document.getElementById("upload-hidden");
var submitButton = document.getElementById("submit-button");

window.addEventListener('DOMContentLoaded', function(){  
	test_genOutputs();
}, false);

submitButton.addEventListener('click', function(e){
	e.preventDefault();

	var formData = new FormData();
    var localUrl = "/upload";

    /*파일 없을때 에러처리*/
    if(fileInput.files.item(0)===null){
        alert('no image');
    }
    /*AJAX로 데이터 보내기*/
    formData.append("image", fileInput.files[0]);
    var request = new XMLHttpRequest();
	request.open("POST" , "/upload" , true);
	request.send(formData);
    
    /*AJAX로 데이터 받기*/
    request.onreadystatechange = function() 
    {
       if (request.readyState == 4 && request.status == 200) 
       {    
           console.log(request.responseText);
       }
    }
}, false);