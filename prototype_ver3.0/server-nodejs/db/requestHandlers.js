// requrest handler : 요청별로 다른 함수에서 처리하고 싶다. 
var querystring = require("querystring");

function start(response) {
	console.log("Request handler 'start' was called.");

	var body = '<html>' + '<head>' + 
	'<meta http-equiv = "Content-Type" content = "text/html; ' + 
	'charset = UTF-8" />' +
	'</head>' + '<body>' +
	'이름을 입력하세요.' + '<br>' +
	'<form action = "/hello" method = "post">' +
	'<input type = "text" name = "text"></input>' +
	'<input type = "submit" value = "입력" />' +
	'</form>' + '</body>' + '</html>';

	response.writeHead(200, {"Content-Type" : "text/html"}); // 쓰는 형식을 html로 해줘야 해당 구문을 html로 변환해서 뿌려준다. plain으로 하면 그냥 문장이되서 나감. 
	response.write(body);
	response.end();	
}

function hello(response, postData) {
	console.log("Request handler 'hello' was called.");
	response.writeHead(200, {"Content-Type" : "text/plain; charset=UTF-8"});
	response.write("HEllo " + querystring.parse(postData).text + "님");
	response.end();
}

exports.start = start;
exports.hello = hello;