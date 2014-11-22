var http = require('http'); 									// http모듈을 로드해서 로컬변수 http에 할당 
http.createServer(function(request,response){					// 새로운 서버를 만드는 함수. http.ServerRequest와 http.ServerResponse라는 두 개의 매개변수를 가진다. 
	response.writeHead(200, {'content-type' : 'text/plain'});	// 응답헤더를 전송하는 역할
	response.write("Hello, World\n");							// 응답으로 이 말을 적음 
	response.end();												// 모든 헤더와 응답 본문이 전송되었고, 통신이 종료되었다는 신호를 보냄.
}).listen(8888);												// 셋팅 값들을 넣어주고, 응답을 8888번에서 대기 
