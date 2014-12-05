//http서버 : 클라이언트의 요처엥 따라 웹페이지를 제공. 

var http = require("http");
var url = require("url");

function start(route, handle){
	function onRequest(request, response){
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log("Request for" + pathname + "received.");
		
		request.setEncoding('utf8');

		//POST Data를 비동기로 받기 
		request.addListener("data", function(postDataChunk){
			postData += postDataChunk;
			console.log("Recieved POST data chunk '" +
			postDataChunk + "'.");
		});

		request.addListener("end", function(){
			route(handle, pathname, response, postData);
		});
	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}

exports.start = start; 