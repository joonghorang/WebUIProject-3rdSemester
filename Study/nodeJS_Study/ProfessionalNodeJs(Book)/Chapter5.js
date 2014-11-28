05 이벤트 이미터 패턴을 활용한 이벤트 바인딩 단순화 

- 이벤트 이미터 패턴의 소개
- 이벤트 리스너의 바인딩과 바인딩 해제
- 커스텀 이벤트 이미터의 개발 

*이벤트 이미터란 ?
노드에서는 많은 객체가 이벤트를 내보낸다. 예를 들어 TCP 서버는 새 클라이언트가 접속할 때마다 
'connect' 이벤트를 내보내고, 파일 스트림은 새 데이터 청크(chunk)읽을 때마다 'data'이벤트를 내보낸다. 
노드에서는 이들 객체를 이벤트 이미터(event emitter)라고 한다. 

이벤트 이미터를 이용하면 프로그래머는 관심 있는 이벤트를 수신할 수 있다. 
프로그래머는 이벤트 이미터에서 관련 이벤트를 내보낼 때마다 호출할 콜백 함수를 등록할 수 있다. 

표준 콜백 패턴의 이해 

다음은 노드에서 파일을 메모리에 로드하는 코드 예제이다. 


var fs = require('fs');
fs.readFile('/etc/passwd', function(err, fileContent) { // 익명 인라인 함수를 fs.readFile의 두번째 인자로 전달하고 있다. 
														// 이런 방식으로 CPS(Continuation - Passing Style)를 활용하고 있다. 
	if(err){
		throw err;
	}
	console.log('파일 콘텐츠', fileContet.toString());
})


이벤트 이미터 패턴의 이해 
표준 콜백 패턴(콜백 함수를 실행 중인 함수의 인자로 넘겨주는 방식)은 함수가 완료된 후 
클라이언트에서 이를 통보받고 싶을 때 적합하다. 하지만 실행 도중 몇 개의 이벤트가 일어나거나,
이벤트가 여러 번 일어난다면 이 방식이 잘 동작하지 않는다. 

특정 사건이 일어날 때마다 알고 싶다면 이벤트 이미터 패턴을 활용해야한다. 

이벤트 이미터는(이름에서 암시하듯) 이벤트를 내보내는 객체다. 
이벤트 리스너는 이벤트 이미터에 바인딩해 다음 예제처럼 특정 이벤트 타입을 리스닝하는 코드다. 
ex)
var req = http.request(options, function(response){
	response.on("data", function(data){
		console.log("응답에서 수신한 데이터 : ", data);
	});
	response.on("end", function(){
		console.log("응답종료");
	});
});
req.end(); 

http.request함수는 콜백을 호출하면서 응답 객체를 인자로 넘겨즌다. 
이 응답 객체는 이벤트 이미터이며, 노드 문서에 따르면 data 및 end 이벤트를 내보낼 수 있다. 
여기서는 이들 이벤트 중 하나가 일어날 때마다 호출할 콜백 함수를 등록하고 있다. 

보통 CPS는 요청 작업이 끝나고 "제어를 다시 가져오고 싶을 때 사용하고",
이벤트 이미터 패턴은 "이벤트가 여러 번 "일어날 수 있을 때 사용한다. 


이벤트 타입의 이해 
이벤트는 항상 문자열로 표현된 타입을 갖고 있다. 
관례상 이벤트 타입은 공백 없이 소문자로 지정된다. 


이벤트 이미터 API의 활용
이벤트 이미터 패턴을 구현하는 객체(TCP소켓, HTTP요청, 그 외 다수)는 다음과 같은 메서드를 구현한다. 

	- addListener 및 .on : 이벤트 타입에 이벤트 리스너를 추가하는 메서드 
	- .once : 치ㅚ대 한 번만 호출할 이벤트 타입에 이벤트 리스너를 추가하는 메서드 
	- .removeEventListener : 특정 이벤트 타입의 특정 이벤트 리스너를 제거하는 메서드
	- .removeAllEventListeners : 특정 이벤트 타입의 모든 이벤트 리스너를 제거하는 메서드 

. addListener() 또는 .on() 을 활용한 콜백 바인딩 
이벤트 타입과 콜백 하수를 지정하면 이벤트가 일어날 때 호출할 함수를 등록할 수 있다. 
예를들어 파일 읽기 스트림은 데이터 청크를 사용할 수 있을 때 'data'이벤트를 내보낼 수 있다. 
다음은 콜백 함수를 넘겨 이 정보를 수신하는 코드다. 
ex)
function receiveData(data){
	console.log("파일 일기 스트림으로부터 데이터 수신 : %j", data);
}
readStream.addListener("data", receiveData);

.addListener 함수 대신 간단한 축약 함수인 .on을 사용해도 된다. 

function receiveData(data){
	console.log("파일 일기 스트림으로부터 데이터 수신 : %j", data);
}
readStream.on("data", receiveData);

좀 더 간결하게 익명함수를 사용하면

readStream.on("data", function(data){
	console.log("파일 읽기 스트림으로부터 데이터 수신 : %j", data);
});

* 콜백 함수로 전달되는 인자는 특정 이벤트 이미터 객체 및 이벤트 타입에 따라 다르며, 별도 표준으로 정해진 게 아니다. 

여러 이벤트 리스너의 바인딩 
ex)
raedStream.on("data", function(data){
	console.log("데이터 있음");
});
readStream.on("data", function(data){
	console.log("여기에도 데이터있음");ㅣ
});
이벤트 이미터는 등록된 이벤트 리스너를 등록 순서대로 호출하는데 여기에는 두 가지 의미가 있다. 

1. 이벤트 리스너가 이벤트 발신 후 바로 호출되지 않을 수 있다. 
2. 스택으로 예외를 던지는 일은 정상적인 동작은 아니지만 코드상의 버그로 인해 일어날 수 있다. 
그러면 이벤트 리스너 중 하나가 호출 시점에 예외를 던진다면 다른 이벤트 리스너는 호출되지 않을 수 있다. 

.removeListener()를 활용한 이벤트 이미터의 이벤트 리스너 제거 
ex)
function receiveData(data){
	console.log("파일 읽기 스트림으로부터 데이터 수신 : %j", data);
}
readStream.on("data", receiveData);
// ...
readStream.removeListener("data", receiveData);

.once()를 통한 일회용 콜백 등록 
ex)
readStream.once("data", receiveData);

.removeAllListeners()를 활용한 모든 이벤트 리스너 제거 
ex)
emitter.removeAllListeners(type);
