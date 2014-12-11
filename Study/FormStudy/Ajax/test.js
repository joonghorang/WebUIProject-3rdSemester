var MAX_HEIGHT = window.innerHeight;
var MAX_WIDTH = window.innerWidth;

var elButton = document.getElementById("upload-button");
var elForm = document.getElementById("fileForm");
elForm.addEventListener("submit" , function(e) {
	e.preventDefault();
	elButton.innerHTML = "Uploading.........";

	var files = elSelect.files;
	var formData = new FormData();

	formData.append('photo', files[0], files[0].name);
 	//Ajax
	sendAjax("POST", "http://127.0.0.1:3000/upload", formData);
	function sendAjax(sMethod, sUrl, sFormData) {
		var _method = sMethod || "GET";
		var _url = sUrl || "http://localhost:3000/jsonTest";
		var _sFormData = sFormData || null;
		var request = new XMLHttpRequest();
		request.open( _method, _url , true);
		request.send(_sFormData);
		request.onload = function() {
			if(request.status === 200) {
				var result = request.responseText;
			}
		};
	}
});

