06 타이머를 활용한 함수 호출 예약 

- 함수의 실행 연기
setTimeout과 setinterval 함수를 사용하면 일정 시간동안 함수 실행을 미룰 수 있다. 

예를 들어 다음 코드는 웹페이지에서 스크립트가 로드되고 1초가 지난 시점에 'Hello there.'문자열을 첨부한다. 
ex)
var oneSecond = 1000 * 1 ; // 기본단위기 밀리초.
setTimeout(function(){
	document.write('<p>Hello there.</p>');
}, oneSecond);

setTimeout의 호출결과는 타임아웃 핸들러로서, 이 객체는 clearTimeout을 사용해 실행을 취소하는 것 이외에
다른 용도로는 사용할 수 없는 내부 객체다. 



- 예약된 실행의 취소
CLEARTIMEOUT을 활용한 함수의 실행 취소 
ex)
var timeoutTime = 1000;
var timeout = setTimeout(function(){
	console.log("타임아웃");
}, timeoutTime);
clearTimeout(timeout);

미래 특정 시점에 예약된 실행을 취소하려면 
ex)
var timeout = setInterval(function A(){
	console.log("타임아웃!");
}, 1000);

setTimeout(function B() {
	clearTimeout(timeout);
}, 3000);

- 함수의 주기적 실행 예약
setInerval함수는 특정 시간 주기로 함수를 반복 실행할 수도 있게 해준다. 
다음 코드를 웹페이지에 집어넣으면 이 코드는 'Hello there.'라는 구문을 문서에 매 초마다 추가해준다. 

var onSecond = 1000 * 1; 
setInterval(function() {
	document.write('<p>Hello there.</p>');
}, oneSecond);

무한히 작업을 반복 실행하고 싶지 않다면 clearInterval()을 호출해 예약을 취소하면 된다. 
setInterval은 스케줄링 핸들러를 반환하는데, 이 핸들러를 clearInterval의 인자로 전달하면 예약을 취소할 수 있다. 
ex)
var interval = setInterval(function(){
	console.log("tick");
}, 1000);
...
clearInterval(interval);

- 다음 이벤트 루프까지 함수의 실행 연기 

브라우저 자바스크립트 프로그래머들은 종종 가까운 미래로 작업 실행을 연기하기 위해 
setTimeout(callback, 0)을 사용한다.  
밀리초 인자로 0값을 사용하면 자바스크립트 런타임은 처리중인 이벤트를 모두 처리한 후 
가능한 한 빨리 콜백 함수를 실행하게 된다. 
이 기법은 종종 "바로 실행할 필요가 없는 작업을 연기하는 수단"으로 활용된다. 

이벤트 루프가 실행되는 각 시점을 틱(tick)이라고 한다. 

따라서 우리는 이벤트 루프가 "다음번" 실행될 때, 
즉 다음번 틱에 콜백 함수를 호출하게끔 함수 실행을 예약할 수 있다. 
setTimeout이 자체 스케줄링 큐를 갖고 있는 자바스크립트 런타임을 사용하는데 반해
process.nextTick 함수는 노드 이벤트 루프를 대상으로 한다. 

setTimeout(callback, 0) 대신 process.nextTick(callback)을 사용하면 콜백은 이벤트 큐의 
모든 이벤트를 처리한 후 바로 실행된다.(이 시간은 자바스크립트 타임아웃 큐가 활성화되는 시간보다 훨씬 이른 시간이다)

사용예는 
ex)
process.nextTick(function(){
	my_expensive_computation_fuction();
});

* process 객체는 노드의 전역 객체중 하나다. 

- 이벤트 루프 블로킹 
노드와 자바스크립트 런타임은 보통 단일 스레드 이벤트 루프다. 
각 루프에서 런타임은 관련 콜백함수를 호출해 큐에 들어 있는 다음 이벤트를 처리한다. 
이벤트의 처리를 마치면 이벤트 루프는 다음 이벤트를 가져와 처리한다. 
이 패턴은 "큐가 비워질 때까지" 계속 진행된다. 
이들 콜백 중 하나가 오랜 시간을 차지하면 이벤트 루프는 이 시간 동안 남아 있는 이벤트를 처리하지 못하게 된다. 
이 현상은 서비스를 느리게 만든다. 

따라서 때로는 이벤트 루프를 차단할 필요가 있는데, 다음 예제 코드를 보면
ex)
process.nextTick(function nextTick1(){
	var a = 0;
	while(true){
		a++;
	}
});

process.nextTick(function nextTick2(){
	console.log("다음 틱");
});

setTimeout(function timeout(){
	console.log("타임아웃");
}, 1000); 

이 경우 nextTick2와 timeout 함수는 첫번째 nextTick 함수 내의 무한 사이클로 인해 
이벤트 루프가 차단됨에 따라 아무리 오랜시간 기다려도 실행되지 못한다. 
또 1초 후 실행되기로 예약된 타임아웃 함수도 실행되지 않는다. 

따라서 해당 이벤트 루프를 빠져나갈 필요가 있는데, 
process.nextTick을 잘 활용하면 이벤트 루프가 다음번 틱으로 중요하지 않은 작업의 실행을 연기할 수 있다. 

예를 들어 생성한 임시 파일을 제거해야 하지만 
클라이언트에게 응답하기 전에 파일을 제거할 필요가 없다면 
다음과 같이 파일 삭제를 연기할 수 있다. 

ex)
stream.on("data", function(data){
	stream.end("my response");
	process.nextTick(function(){
		fs.unlink("/path/to/file");
	});
});

- SETINTERVAL 대신 SETTIMEOUT을 활용한 직렬화 강제 적용
비동기적으로 실행될 경우 실행순서가 의도한 바와 다르게 작동할 수 있다. 
예를 들어 
ex)
var interval = 1000;
setInterval(fuction(){
	my_async_function(function(){
		console.log("my_async_function 실행완료!");
	});
});

이 경우 my_async_function의 종료 시점과 다음번 my_async_function의 시작 지점 사이에
특정 주기를 강제해야한다. 이는 다음과 같이 하면 된다. 
var interval = 1000;

(function schedule(){
	setTimeout(function do_it(){
		my_async_function(function(){
			console.log('my_async_function 함수 실행 완료 !');
			schedule();
		});
	}, interval);
}());

이 schedule 함수를 정의하자마자 호출하고, 
이 함수는 1초후(지정한 주기) do_it함수 호출을 예약한다. 
1초가 지나면 익명 함수가 실행되면서 my_async_function를 호출한다. 
이 함수가 실행을 마치면 이 함수로 넘겨준 익명 함수가 호출되고,
schedule 함수를 다시 호출해 다시 1초후 
do_it 함수의 호출을 예약하고, 이로 인해 전체 호출 사이클이 재시작한다. 

