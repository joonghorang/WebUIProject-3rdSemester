XHR은 자바스크립트가 Ajax를 사용할 때 쓰는 객체 .

1. XMLHttpRequest객체를 생성한다.
var request = new XMLHttpRequest();
2. 전송 방식, 경로, 비동기 사용여부를 지정한다. 
request.open('Get', '/data.html', false);
3. 전송한다. 
request.send(); // 만약 post전송이라면 formData객체를 생성한 후, request.send(formData);라고 쓴다. 
4. 응답을 확인한다. 
console.log(request.responseText); 

이걸 비동기로 쓰려면 readyState속성을 알아야한다. 
readyState가 
0일때, request 객체를 만들었지만 open()메서드로 초기화하지 않았음
1일때, request 객체를 만들고 초기화했찌만 send() 메서드가 사용되지 않았음
2일때, send() 메서드를 사용했지만 아직 데이터를 받지 못함
3일때, 데이터의 일부만을 받음
4일때, 모든 데이터를 받음 

따라서 send를 보낸뒤, 서버가 보낸 데이터를 비동기적으로 받으려면 
var request = new XMLHttpRequest();
request.open('GET', '/data.html', true);
request.send();
if(request.readyState === 4 && request.status === 200){ // 완료가 다 되었으면, 받을 자료로 수행할 일을 여기에 넣음. 
	console.log(request.responseText);
}

JSON을 자바스크립트 객체로 변환하려면?
var json = JSON.parse(request.responseText); 

