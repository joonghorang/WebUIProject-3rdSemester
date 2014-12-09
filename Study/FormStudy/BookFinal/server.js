// 모듈을 추출합니다. 
var http = require("http");
var express = require("express");

// 웹 서버를 생성합니다.
var app = express();
app.use(express.static('public')); // public폴더안에 있는 파일들을 정적파일로 쓸것임.
									// 주소를 치고 해당 html파일 이름을 덧붙이면 그 html파일이 로드됨. 
									// static미들웨어는 요청이 들어오는 순간에 파일을 새로 읽고 웹 브라어주에 제공. 
									// 따라서 public 폴더 내부의 파일 변경은 서버를 다시 시작하지 않아도 반영됨. 


// app.use(function (request, response){ // 메인에 접속했을 때 static 미들웨어가 먼저 나오고 일반 함수를 넣은 사용자 정의 미들웨어는 나중에 나온다. 
// 	response.send('<h1>Hello Middleware..!</h1>/');
// });
// 존재하지 않는 파일 경로로 들어가면 위의 코드가 뜬다. 
// 만약에 순서가 바뀌면 아무리 3000/index.html로 접속해도, 뜨지 않고 코드로 만들어진 페이지만 계속나온다.
// 첫번째 미들웨어에서 다음 미들웨어를 호출하지 않으므로 발생하는 일. 
// 따라서 뒤에 오는 라우터 코드를 위해서는 주석처리 되어야한다. 아니면 맨 밑으로 가든지...

// 라우터 
/*
사용자의 요청에 다라 사용자가 필요한 정보를 제공하는 것을 '라우트'한다라고 표현한다.
그리고 이러한 기능을 수행하는 미들웨어를 '라우터'라고 한다. 
즉, 라우터란 미들웨어의 일종이다. 
하지만 위처럼 static 미들웨어와는 다르게 app 객체의 속성이라는 것에 주의해야한다. 
*/
var router = express.Router();
// 이렇게 router미들웨어를 사용하면 아래의 메서드들을 사용할 수 있게 된다.
/*
app.get()	- 클라이언트의 GET요청을 처리한다. 
app.post()
app.put()
app.del()
app.all() 	- 클라이언트의 모든 요청을 처리한다. 
*/

// abc 라우터
// app.all('/a', function (request, response) { // /a주소로 들어오면 응답을 {}안과 같이 한다. 
// 	response.send('<h1>Page A</h1>')
// });
// app.all('/b', function (request, response) {
// 	response.send('<h1>Page B</h1>')
// });
// app.all('/c', function (request, response) {
// 	response.send('<h1>Page C</h1>')
// });

// 각각의 맞는 데이터 형식으로 제공하는 라우터 
var items = [{
	name : '우유',
	price : '2000'
}, {
	name : '홍차',
	price : '5000'
}];

app.all('/data.html', function (request, response) { // /a주로소 들어오면 응답을 {}안과 같이 한다. 
	var output = '';
	output += '<!DOCTYPE html>';
	output += '<html>';
	output += '<head>';
	output += '		<title>Data HTML</title>';
	output += '</head>';
	output += '<body>';
	items.forEach(function(item){	// items에 있는 모든 각각의 요소들을 돈다. 
		output += '<div>';
		output += '		<h1>' + item.name + '</h1>';
		output += '		<h2>' + item.price + '</h2>';
		output += '</div>';
	});
	output += '</body>';
	output += '</html>';
	response.send(output);
});
app.all('/a.json', function (request, response) { // 이렇게 하면 json형식으로 데이터제공. 뒤의 확장자가 그 역할을 한다.  
	response.send(items);
});
app.all('/data.xml', function (request, response) {
	response.send('<h1>Page C</h1>')
});

// 일반 요청 매개변수(클라이언트가 서버로 전달하는 데이터)
app.all('/parameter', function (request, response){
	// 변수를 선언합니다. 
	var name = request.param('name');
	var region = request.param('region');

	// 응답한다. 
	response.send('<h1>' + name + ':' + region + '</h1>');
})
// 그리고 크롬 확장프로그램 'postman'을 실행시키고,
// URL params를 클릭해 키값과 밸류값을 입력한뒤
// 나오는 http://127.0.0.1:3000/parameter?name=Joongil&region=Seoul,%20Korea 주소를
// 크롬 주소창에 입력하면 해당 <h1>태그가 출력된다. 

/*Get요청 이외의 요청에서 요청 매개변수를 추출하려면
body parser 미들웨어가 필요하다. 
웹 서버를 생성하는 부분에서 express.bodyParser()메서드를 사용한다.
*/
//app.use(express.bodyParser());
var bodyParser = require("body-parser");
//그리고 이러면 아래의 다섯 개의 라우트를 만들 수 있다. 

//데이터 조회 
app.get('/products', function (request, response){ // 모든 데이터를 사용자에게 제공 
	response.send(items);
});
app.get('/products/:id', function (request, response){
	var id = Number(request.param('id')); // request.param()함수의 리턴값은 문자열이므로 다시 숫자로 변환해 주기위해 Number()메소드를 사용

	//응답합니다.
	response.send(items[id]);
});

// 데이터 추가
app.post('/products', function (request, response){
	var name = request.param('name');
	var price = request.param('price');
	var item = {
		name: name,
		price: price
	};

	items.push(item);

	response.send({
		message : '데이터를 추가했습니다.',
		data : item 
	});
});

// 데이터 수정 
app.put('/products/:id', function (request, response){
	var id = Number(request.param('id'));
	var name = request.param('name');
	var price = request.param('price');

	if(items[id]) {
		// 데이터를 수정합니다. 
		if (name) { items[id].name = name; }
		if (price) { items[id].price = price; }

		// 응답합니다. 
		response.send({
			message : '데이터를 수정했습니다.',
			data : items[id]
		});
	} else {
		// 오류 : 요소가 없을 경우 
		response.send({
			error : '존재하지 않는 데이터 입니다!'
		});
	}
}); // 수정 

//데이터 삭제 
app.del('/products/:id', function (request, response){
	var id = Number(request.param('id'));

	items.splice(id, 1);
	response.send({
		message : '데이터를 삭제했습니다.'
	});
});

// 웹서버를 실행한다. 

http.createServer(app).listen(3000, function(){
	console.log('Server Running at port 3000');
})