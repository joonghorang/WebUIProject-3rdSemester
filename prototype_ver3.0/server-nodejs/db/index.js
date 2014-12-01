var server = require("./server"); // 이러면 require객체가 server.js를 import한다. 
								  // 임포트한 해당 객체를 server라는 변수에 넣어준다. 
var router = require("./router"); // router.js에서 exports로 정의한 객체도 여기에 객체화
var requestHandler = require("./requestHandlers");

// path와 연결되는 함수의 정보를 저장한다. 
var handle = {}
handle["/"] = requestHandler.start;
handle["/start"] = requestHandler.start;
handle["/hello"] = requestHandler.hello;

server.start(router.route, handle);					  // server안에는 server.js에서 정의해두었던 함수를 사용할 수 있따. 
								  				// 이런식으로 몇 개의 js파일을 따로 작성하여 require함수를 사용해서 불러온 후 사용할 수 있다. 
