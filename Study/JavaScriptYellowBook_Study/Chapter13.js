13장 이벤트

자바스크립트와 HTML의 상호작용은 문서나 브라우저 창에서 "특정 순간"에 일어난 일을 가리키는
'이벤트'에 의해 처리됩니다. 

13.1 이벤트 흐름

페이지의 어느 부분이 특정 이벤트를 소유해야 할 것인가?
이 문제를 이해하려면 종이 위에 동심원을 여러 개 그린 모습을 상상해 보십시오. 
정중앙을 짚으면 그 지점은 맽 안쪽에 있는 원의 중심이기도 하지만, 
동시에 모든 원의 중심이기도 합니다. 

버튼을 클릭하면 버튼의 컨테이너도 클릭하는 것이고
페이지 전체도 클릭하는 것입니다. 

13.1.1 이벤트 버블링 
문서 트리에서 가장 깊이 위치한 요소에서 시작해 
거슬러 흐르는 모양이 마치 거품이 올라가는 것 같다. 

ex)
<!DOCTYPE html>
<html>
	<head>
		<title>Event Bubbling Example</title>
	</head>
	<body>
		<div id = "myDiv">
			Click Me
		</div>
	</body>
</html>

여기서 <div> 요소를 클릭하면 click 이벤트가 다음 순서대로 발생합니다. 

1. <div>
2. <body>
3. <html>
4. document

13.1.2 이벤트 캡쳐링
위의 버블링과 반대 순서로 진행되는 것이 이벤트 캡쳐링입니다. 
현재는 
인터넷 익스픍로러 9, 사파리, 크롬, 오페라, 파이어폭스에서 지원합니다. 
DOM 명세에서는 document 에서 시작해야한다고 명시하였지만 사실,
window 에서 시작합니다. 
하지만 오래된 브라우저에서는 지원하지 않으므로 , 주로 버블링을 사용합시다. 

13.1.3 DOM 이벤트 흐름 

13.2 이벤트 핸들러

13.2.1 HTML 이벤트 핸들러
각 요소가 지원하는 이벤트는 이벤트 핸들러 이름을 HTML 속성에 사용하여 할당할 수 있습니다. 
속성 값은 실행할 자바스크립트 코드여야 합니다. 
ex)
<input type = "button" value = "Click Me" onclick = "alert('Clicked')" />

아니면 다음과 같이 페이지의 다른 곳에서 정의한(외부파일도 가능) 스크립트를 연결할 수도 있습니다. 
<script type = "text/javascript?">
	function showMessage(){
		alert("Hello world!");
	}
</script>
<input type = "button" value = "Click Me" onclick = "showMessage()" />

HTML에 이벤트 핸들러를 할당하는 방법에는 몇 가지 단점이 있습니다. 
첫번째 문제는 타이밍 문제로, 이벤트 핸들러 코드가 준비되기 전에 사용자가 이를 조작할 가능성이 있습니다. 
두번째 문제는 이벤트 핸들러 함수의 스코프 체인 확장 결과가 브라우저마다 다르다는 것입니다. 
마지막 단점은 이벤트 핸드러를 HTML에서 할당하면 HTML과 자바스크립트가 너무 단단히 묶여서,
				수정할 때 모든 코드를 바꿔야 할 수도 있다는 것입니다. 

13.2.2 DOM 레벨 0 이벤트 핸들러
자바스크립트에서 이벤트 핸들러를 할당하는 전통적인 방법은 이벤트 핸들러 프로퍼티에 함수를 할당하는 방법. 
ex)

var btn = document.getElementById("myBtn");
btn.onclick = function(){
	alert("Clicked");
};

이 코드를 실행하기 전에는 이벤트 핸들러가 할당되지 않으므로, 
이 코드가 버튼 마크업보다 뒤에 있다면 버튼을 클릭해도 아무 반응이 없는 시간이 존재할 수 있습니다. 

이벤트 핸들러 내부에서는 this를 통해 요소의 프로퍼티나 메서드에 접근이 가능합니다.
ex)
var btn = document.getElementById("myBtn");
btn.onclick = function(){
	console.log(this.id); 	// "myBtn"
}

13.2.3 DOM 레벨 2 이벤트 핸들러 

이벤트 핸들러 할당 : addEventListener()
이벤트 핸들러 제거 : removeEventListener()

이 메서드들은 인자로 
	1. 이벤트 이름, 
	2. 이벤트 핸들러 함수, 
	3.인벤트 핸들러를 캡처 단계에서 호출할지(true), 버블링 단계에서 호출할지(false)로 나타내는 불리언 값 

	세 가지를 받습니다. 

ex)
var btn = document.getElementById("myBtn");
btn.addEventListener("click", function(){
	console.log(this.id);
}, false);

이벤트를 제거하는 함수와 이벤트를 등록한 함수는 같은 함수를 공유해야 하므로 
다음과 같이 등록하고 삭제합니다. 

var btn = document.getElementById("myBtn");
var handler = function(){
	alert(this.id);
};
btn.addEventListener("click", handler, false); // 등록 

. . .

btn.removeEventListener("click", handler, false); // 삭제 

13.2.5 크로스 브라우저 이벤트 핸들러
var EventUtil = {
	addHandler : function(element, type, handler){
		if(element.addEventListener){
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent){
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	}

	removeHandler : function(element, type, handler){
		if(element.removeEventListener){
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent){
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}
	}
};

13.3 event 객체

DOM 표준을 준수하는 브라우저에서 이벤트 핸들러에 전달되는 매개변수는
event 객체 하나 뿐입니다. 

이 객체의 프로퍼티와 메서드는 다음과 같습니다. 
*참고로 모든 프로퍼티들은 읽기 전용입니다. 

프로퍼티/메서드 			타입 		설명


bubbles						불리언		이벤트가 버블링되는지 나타냅니다. 

cancelable					불리언		이벤트의 기본 동작을 취소할 수 있는지 나타냅니다. 

currentTarget				요소 		현재 이벤트를 처리 중인 요소입니다. 

defaultPrevented			불리언 		true이면 preventDefault()가 호출된 상태 

detail						정수 		이벤트와 관련된 추가 정보입니다. 

eventPhase					정수 		이벤트 핸들러가 호출된 단계입니다. 1은 캡처링 단계, 2는 타깃, 3은 버블링 단계

preventDefault() 			함수 		이벤트의 기본 행동을 취소합니다. cancelabe이 true 일때 사용가능합니다. 

stopImmediatePropagation()	함수 		이벤트 캡쳐링이나 이벤트 버블을 모두 취소하며, 
										다른 이벤트 핸들러 호출을 막습니다. 

stopPropagation()			함수 		이벤트 캡쳐링이나 이벤트 버블링을 모두 취소합니다. bubbles이 true이면 이 메서드를 쓸 수 있습니다. 

target 						요소 		해당 이벤트의 타겟입니다. 

trusted						불리언		해당 이벤트가 브라우저에서 생성한 이벤트라면 true, 개발자가 만든 자바스크립트 이벤트라면 false

type 						문자열 		발생한 이벤트 타입입니다. 

view 						Abstract	이벤트와 연결된 추상화된 뷰입니다. 이벤트가 발생한 window 객체와 일치합니다. 
							View

* 이벤트 핸들러 내부에서 this 객체는 항상 currentTarget의 값과 일치하며 
target에는 이벤트의 실제 타깃만 포함됩니다. 

함수 하나에 여러 이벤트를 처리하게끔 할 때는 type 프로퍼티가 유용합니다. 

ex)
var btn = document.getElementById("myBtn");
var handler = function(event){
	switch(event.type){
		case "click" :
			console.log("Clicked");
			break;
		case "mouseover" : 
			event.target.style.backgroundColor = "red";
			break;
		case "mouseout" :
			event.target.style.backgroundColor = "";
			break;
	}
};

btn.onclick = handler;
btn.onmouseover = handler;
btn.onmouseout = handler;


preventDafault() 메서드는  이벤트의 기본 동작을 취소합니다. 
ex)
var link = document.getElementById("myLink");
link.onclick = function(event){
	event.preventDafault();
};

eventPhase 프로퍼티는 현재 이벤트가 어느 단계에 있는지를 알려줍니다. 
이벤트 핸들러가 캡처 단계에서 호출되었으면 1, 
타깃에서 호출되었으면 2,
버블링 단계에서 호출되었으면 3입니다. 

13.4 이벤트 타입

기본 정의
	- 사용자 인터페이스(UI) 이벤트는 일반적인 브라우저 이벤트이며 BOM과의 상호작용이 포함될 수 있습니다. 
	- 포커스 이벤트는 요소가 포커스를 얻거나 잃을 때 발생합니다. 
	- 마우스 이벤트는 마우스로 어떤 동작을 취할 때 발생합니다. 
	- 휠 이벤트는 마우스 휠이나 이와 비슷한 장치를 사용할 때 발생합니다. 
	- 텍스트 이벤트는 문서에 텍스트를 입력할 때 발생합니다. 
	- 키보드 이벤트는 키보드로 어떤 동작을 취할 때 발생합니다. 
	- 구성(Composition) 이벤트는 입력 방법 에디터(IME : Input Method Editor)를 통해 문자를 입력할 때 발생합니다. 
	- 변경(mutation) 이벤트는 DOM 구조가 바뀔 때 발생합니다. 

13.4.1 UI 이벤트 

	- DOMActivate : 사용자가 마우스나 키보드로 요소를 활성화 했을 때 발생합니다.  click이나 keydown이 보다 범용적입니다.
	- load : 페이지를 완전히 불러왔을 때, 혹은 이미지나 객체를 완전히 불러왔을 때 발생합니다. 
		ex) <img src="smile.gif" onload = "alert('Image loaded.')">
	- unload : 페이지를 완전히 종료했을 때 window 에서, 혹은 객체를 완전히 종료했을 때 발생합니다. 
	- abort : <object> 요소의 콘텐츠를 완전히 내려받기 전에 사용자가 취소했을 때 해당 요소에서 발생 
	- error : 자바스크립트 에러가 발생했을 때 
	- select : 사용자가 텍스트 박스(<input>이나<textarea>)에서 글자를 선택할 때 발생합니다. 
	- resize : window나 프레임의 크기를 바꿀 때 발생합니다. 
	- scroll : 사용자가 스크롤바 있는 요소를 스크롤할 때 발생합니다. 

13.4.3 마우스 이벤트와 휠 이벤트

	- click : 사용자가 주요 마우스 버튼(일반적으로 왼쪽 버튼)을 클릭하거나 엔터키를 누를 때 발생합니다. 
	- dblclick : 사용자가 주요 마수으 버튼을 더블클릭할 때 발생합니다. 
	- mousedown : 사용자가 마우스 버튼을 누를 때 발생합니다. 이 이벤트는 키보드에서 발생하지 않습니다. 
	- mouseenter : 마우스 커서가 요소 밖에서 요소 경계 안으로 '처음' 이동할 때 발생합니다.
					이 이벤트는 버블링되지 않으며 커서가 자손 요소 위에 올라갈 때 발생하지도 않습니다. 
	- mouseleave : 마우스 커서가 요소 위에 있다가 요소 경계 밖으로 이동할 때 발생합니다. 마찬가지로 버블링되지 않습니다. 
	- mousemove : 마우스 커서가 요소 주변을 이동하는 동안 계속 발생합니다. 키보드에서 발생하지 않습니다. 
	- mouseout : 마우스 커서가 요소 위에 있다가 다른 요소 위로 이동할 때 발생합니다. 
					여기서 말하는 '다른 요소'란 경계 밖에 있는 요소일 수도, 자식 요소 일수도 있습니다. 
	- mouseover : 마우스 커서가 요소 바깥에 있다가 요소 경계 안으로 이돌할 때 발생합니다. 
	- mouseup : 사용자가 마우스 버튼을 누르고 있다가 놓을 때 발생합니다. 


	클라이언트 좌표 
	마우스 이벤트는 모두 브라우저 뷰포트의 어느 위치에서건 발생하고,
	이 정보는 event 객체의 clientX, clientY 프로퍼티에 저장됩니다. 

	마우스 이벤트의 클라이언트 좌표는 다음 코드로 가져옵니다. 

	var div = docuemnt.getElementById("myDiv");
	EventUtil.addHandler(div, "click", function(event){
		event = EventUtil.getEvent(event);
		console.log("Client coordinates : " + event.clientX + "," + event.clientY);
	});

	이 좌표는 페이지를 얼마나 스크롤 했는지는 감안하지 않으므로 페이지를 기준으로 한 커서 위치는 아닙니다.

	페이지 좌표
	클라이언트 좌표는 이벤트가 뷰포트 기준으로 어디에서 일어났는지 나타내는데 반해
	'페이지 좌표'는 페이지 기준이며 event 객체에 pageX, pageY 프로퍼티로 저장됩니다. 

	마우스 이벤트의 페이지 좌표를 가져올 때는 다음 코드를 사용합니다. 

	var div = document.getElementById("myDiv");
	EventUtil.addHandler(div, "click", function(event){
		event = EventUtil.getEvent(event);
		console.log("Page coordinated : " + event.pageX + "," + event.pageY);
	});

	화면좌표
	마우스 이벤트 위치는 브라어주 창에 상대적인 동시에 전체 화면에 상대적이기도 합니다. 
	전체 화면(실제 운영체제 화면)을 기준으로 한 마우스 위치는
	screenX / screenY 프로퍼티에 저장됩니다.

	마우스 이벤트의 화면 좌표는 다음과 같이 가져옵니다. 

	var div = document.getElementById("myDiv");
	EventUtil.addHander(div, "click", function(event){
		event = EvnetUtil.getEvent(event);
		console.log("Screen coordinates : " + event.screenX + "," + event.screenY);
	});

	키보드 수정 
	마우스 이벤트는 주로 마우스에서 일어나지만 
	키보드의 특정 키 상태가 이벤트에 중요한 영향을 끼치기도 합니다. 
	'수정 키'는 Shift, Ctrl, Alt, Meta 키이며 
	이들은 종종 마우스 이벤트의 동작에 영향을 끼칩니다. 
	DOM 표준에는 이들 키의 상태를 나타내는 
	shiftKey, ctrlKey, altKey, metaKey
	네 가지 프로퍼티가 있습니다. 

	각 프로퍼티는 키를 누른 상태일 때 true, 그렇지 않다면 false인 불리언 

	mousewheel 이벤트
	사용자가 마우스 휠을 세로 방향으로 움직일 때 발생합니다. 
	이 이벤트는 모든 요소에서 발생하며 window 까지 버블링해 올라갑니다. 

	mousewheel 이벤트의 event 객체에는 마우스 이벤트에 관한 표준 정보 외에도
	wheelDelta라는 추가 프로퍼티가 있습니다. 

	마우스 휠을 앞으로 굴리면 wheelDelta는 120의 배수인 '양수'이고
	마우스 휠을 뒤로 굴리면 wheelDelta는 120배수의 '음수'입니다. 

	터치 장치지원
	iOS나 안드로이드로 구현한 터치 장치에는 마우스가 없으며 매우 흥미롭습니다.
	터치 장치를 지원할 때는 다음을 염두에 두십시오.

	- dblclick 이벤트는 전혀 지원되지 않습니다. 
	- 클릭 가능한 요소를 탭하면 mousemove 이벤트가 발생합니다. 
	- mousemove 이벤트도 mouseover와 mouseout 이벤트를 발생시킵니다. 
	- mousewhell과 scroll 이벤트는 화면에 두 손가락을 올리 때 발생하며 
	  손가락을 움직이면 페이지가 스크롤 됩니다. 

13.4.4 키보드와 텍스트 이벤트 
'키보드' 이벤트는 사용자가 키보드를 조작할 때 발생합니다. 

- keydown : 사용자가 키를 처음 누를 때 발생하며 누르고 있는 동안 계속 발생
- keyup  사용자가 키에서 손을 뗄 때 발생합니다. 텍스트 박스ㅔ 글자가 나타난 후에 발생합니다. 

'텍스트' 이벤트는 textInput 하나뿐입니다. 
이 이벤트는 keypress를 확장하여 텍스트 입력이 사용자에게 표시되기 전에 가로챌 의도로 만들어졌습니다. 

**** textInput이벤트는 텍스트가 텍스트 박스에 삽입되기 직전에 발생합니다. 

키 코드 
event.keyCode
p578 참조 

textInput 이벤트 
편집 가능한 영역에서만 지원됩니다. 
textInput 이벤트는 문자에만 관심이 있으므로
event 객체의 data 프로퍼티에는 문자코드가 아니라 
삽입 문자 자체가 저장됩니다. 

data의 값은 항상 삽입된 문자 자체이므로
시프트 키를 누르지 않은 체 s를 누르면 data는 "s" 이지만 
시프트 키를 누른 상태에서는 "S"입니다. 

event 객체에는 inputMethod라는 프로퍼티도 있는데 이는 
텍스트가 해당 컨트롤에 입력된 방법을 나타냅니다. 
가능한 값은 다음과 같습니다. 

- 0 : 브라우저가 입력방법을 판단할 수 없음
- 1 : 키보드로 입력한 경우
- 2 : 텍스트를 붙여 넣은 경우
- 3 : 드래그 앤 드롭
- 4 : IME를 통한 텍스트 입력
- 5 : 폼에서 옵션을 선택하여 입력된 텍스트
- 6 : 스타일러스 등을 이용해 손으로 입력한 텍스트
- 7 : 목소리 명령어로 입력한 텍스트 
- 8 : 여러 방법을 조합하여 입력한 텍스트
- 9 : 스크립트로 입력한 텍스트 

노드 삽입
appendChild()나 replaceChild(), insertBefore()로 노드를 DOM에 삽입하면
DOMNodeInserted 이벤트가 가장 먼저 발생합니다. 

이 이벤트의 타깃은 삽입된 노드이며
event.relatedNode 프로퍼티에는 부모 노드에 대한 참조가 들어 있습니다. 

이 이벤트가 발생하는 시점은 해당 노드가 이미 부모 노드에 추가된 상태입니다. 

13.4.7 HTML5 이벤트

contextmenu이벤트 
우클릭 이벤트이며, 버블링 됩니다. 
원래 있던 우클릭 기능과 충돌을 피하기 위해 event.preventDefault()로 막아야 합니다. 

readystatechange 이벤트
이 이벤트의 의도는 문서나 요소를 불러오는 상황에 대한 정보를 제공하고자 하는 것이지만
종종 틀립니다. 따라서 정리하지 않았음. 

13.4.8 장치 이벤트 
스마트폰과 태블릿 장치에 대응하기 위한 이벤트 목록입니다. 

orientationchange 이벤트(모바일 사파리용) 
이 이벤트는 사용자가 장치를 가로 모드나 세로 모드로 바꿀 때 발생합니다. 
ex)
EventUtil.addHandler(window, "load", function(event){
	var div = document.getElementById("myDiv");
	div.innerHTML = "Current orientation is " + window.orientation;

	EvnetUtil.addHandler(window, "orientationchange", function(event){
		div.innerHTML = "Current orientation is " + window.orientation;
	});
});

deviceorientation 이벤트 
이 이벤트는 가속도계가 부착된 장치에서 관련 있는 동작을 감지했을 때
window에서 발생하며, 따라서 장치에 따라 지원이 제한됩니다. 
이 이벤트의 목적은 장치의 방향을 감지하는 것이지 움직임을 감지하는 것이 아닙니다. 

자세한건 원문 참조 604p

13.4.9 터치와 제스쳐 이벤트 

터치 이벤트 명세 
http://dvcs.w3.org/hg/webevents/raw-file/tip/touchevents/html

터치 이벤트 
touchstart		|		손가락으로 화면을 터치할 때 발생하며, 
						이미 다른 손가락으로 화면에 대고 있어도 다른 손가락을 대면 또 발생합니다. 

tochmove		|		손가락을 화면에서 움직일 때 계속 발생합니다. 
						이 이벤트가 일어나는 동안 preventDefault()를 호출하면 스크롤을 막을 수 있습니다. 

touchend		|		손가락을 화면에서 뗄 때 발생합니다. 

touchcancel 	|		시스템에서 터치를 더 이상 추적하지 않을 때 발생합니다. 
						언제 이런 상황이 발생하는지 명확하게 문서화되지는 않았습니다. 

각 이벤트는 모두 버블링되어 올라갑니다. 
각 터치 이벤트의 event 객체에는 마우스 이벤트와 공통인
target, bubbles, cancelable, veiw, clientX, clientY, scrrenX, screenY, detail, alterKey, shifthKey, ctrlKey, metaKey
프로퍼티가 들어있습니다. 

이 외에 3 가지 프로퍼티가 더 있습니다 
touches : 현재 감지한 터치를 나타내는 Touch 객체의 배열입니다. 
targetTouches : 이벤트의 타깃에 묶인 Touch 객체의 배열입니다. 
changedTouches : 사용자의 마지막 행동에서 바뀐 Touch 객체의 배열입니다. 

ex)
터치 한 번에 대해서만 추적하는 코드
function handleTouchEvent(evnet){
	if(event.touches.length == 1){
		var output = document.getElementById("output");
		switch(event.type){
			case "touchstart":
				output.innerHTML = "Touch started (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";
				break;
			case "touchend" :
				output.innerHTML = "<br>Touch ended (" + event.changedTouches[0].clientX + "," + event.changedTouches[0].clientY + ")";
				break;
			case "touchmove" :
				event.preventDefault() // 스크롤 방지
				output.innerHTML += "<br>Touch moved (" +
									event.changedTouches[0].clientX + "," +
									event.changedTouches[0].clientY + ")";	
				break;
		}
	}
}

EventUtil.addHandler(document, "touchstart", handleTouchEvent);
EventUtil.addHandler(document, "touchend", handleTouchEvent);
EventUtil.addHandler(document, "touchmove", handleTouchEvent);

이 코드는 단 하나의 터치를 추적하여 터치가 단 하나 있을 때에만 그 정보를 표시합니다. 

제스처 이벤트 

'제스처'란 두 손가락으로 화면을 터치한 채 표시된 부분의 크기를 바꾸거나 회전하는 동작을 말합니다. 
제스처 이벤트에는 다음 세 가지가 있습니다. 

- gesturestart : 한 손가락을 화면에 얹은 채 다른 손가락으로 화면을 터치할 때 발생합니다. 
- gesturechange : 화면에서 두 손가락 중 하나의 위치가 바뀔 때 발생합니다. 
- gestureend : 두 손가락 중 하나를 화면에서 뗄 때 발생합니다. 

이들 이벤트는 두 손가락으로 이벤트 대상을 터치할 때만 발생합니다. 
이들 역시 버블링 됩니다. 

터치와 제스처 이벤트는 연관되어 있습니다. 
한 손가락을 화면 위에 놓으면
touchstart 이벤트가 발생합니다. 
다른 손가락을 화면 위에 놓으면 
gesturestart 이벤트가 우선 발생하며, 
두 번재 손가락의 위치에서 touchstart 이벤트가 또 발생합니다. 
두 손가락 중 하나를 움직이면
gesturechange 이벤트가 발생하고, 
두 손가락 중 하나를 떼는 순간 gestureend 이벤트가 발생하며
해당 위치에서 touchend 이벤트가 발생합니다. 

13.5 메모리와 성능

13.5.1 이벤트 위임
"이벤트 핸들러 개수" 문제의 해결책은 이 방법입니다. 
이벤트 버블링의 장점을 활용하여, 이벤트 핸들러를 하나만 할당해서 
해당 타입의 이벤트를 모두 처리하는 테크닉입니다. 

예를 들어 click 이벤트는 document 레벨가지 버블링되어 올라갑니다. 
즉 클릭 가능한 요소마다 일일이 onclick 이벤트 핸들러를 할당하지 않고
전체 페이지에 하나만 할당해도 되는 방식입니다. 

ex)
var list = document.getElementById("myLinks");

EventUtil.addHandler(list, "click", function(event){
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);

	switch(target.id){
		case "doSomething" :
			document.title = "I changed the document's title";
			break;
		case "goSomewhere" : 
			location.href = "http:/www.naver.com";
			break;

		case "sayHi" :
			alert("hi");
			break;	
	}
});

