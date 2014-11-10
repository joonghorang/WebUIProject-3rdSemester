8장 브라우저 객체 모델

- 브라우저 객체 모델(BOM)의 핵심인 window 객체에 대한 이해
- 창과 프레임, 팝업 컨트롤
- location 객체에서 얻는 페이지 정보
- navigator 객체를 통한 브라우저 이해

* BOM?
웹 페이지 콘텐츠와 무관하게 브라우저 기능을 노출하는 객체. 

8.1 window 객체

브라우저 창의 자바스크립트 인터페이스 구실을 하고 다른 한편으로는 
ECMAScript Global 객체로 기능한다. 

따라서 웹 페이지에서 정의한 모든 객체, 변수, 함수에서는 window 가 전역 객체 구실을 한다. 

8.1.1 전역 스코프

전역에서 선언한 변수와 함수는 모두 window 객체의 프로퍼티 및 메서드가 된다. 

var age = 29;
window.age = 30;
console.log(age); // 30

그러나 전역 변수가 window객체의 프로퍼티가 되긴 하지만 전역 변수를 정의하는 것과
window 에 프로퍼티를 직접 정의하는 것은 조금 다르다. 
전역 변수는 delete 연산자로 제거할 수 없지만,
window에 직접 정의한 프로퍼티는 가능하다. 

ex)

var age = 29;
window.color = "red";

delete window.age; 			// false를 반환 
delete window.color; 		// true를 반환 

console.log(window.color); 	// undefined

이 window 객체의 특성을 이용해 선언하지 않았을 가능성이 있는 변수의 존재 여부는
window 객체를 통해 확인이 가능하다. 

var check = window.testValue;

8.1.2 창 사이의 관계와 프레임
8.1.3 창의 위치
화면을 기준으로 창이 왼쪽 위에서 각각 얼마나 떨어졌는지를 
window 객체 screenLeft / screenTop 프로퍼티를 통해 알 수 있다. 

ex)
var leftPos = (typeof window.screenLeft == "number")? // 3항 연산자. 
				window.screenLeft : window.screenX;
var topPos = (typeof window.screenTop == "number") ?
				window.screenTop : window.screenY;

하지만 이 프로퍼티의 값이 워낙 브라우저마다 천차 만별이니 차라리
moveTo()와 moveBy() 메서드를 사용하는 것이 현명하다.

// 창을 왼쪽 위 구석으로 옮깁니다. 
window.moveTo(0,0);

// 창을 아래쪽으로 100픽셀 옮깁니다.
window.moveBy(0, 100);

// 창을 (200, 300)으로 옮깁니다.
window.moveTo(200, 300);

// 창을 왼쪽으로 50픽셀 옮깁니다.
window.moveBy(-50, 0);

8.1.4 창 크기 
창 크기를 알아내는 방법은 무슨 브라우저든 상당히 복잡하다. 
결국 브라우저 창 크기를 정확히 알아낼 방법도 없지만, 
다음 예제와 같이 페이지 뷰포트 크기는 알 수 있다.

ex)
var pageWidth = window.innerWidth;				// 일단 window.innerWidth 값으로 초기화 
var pageHeight = window.innerHeight;			// 모바일 장치에서는 데스크톱 브라우저와 다르므로 
												// 조절을 원한다면 아래로.
												// http://quirksmode.org/mobile/viewports2.html

if(typeof pageWidth != "number"){				// 숫자가 아니라면 
	if(document.compatMode == "CSS1Compat"){	// 페이지가 표준 모드인지 확인하고 
		pageWidth = document.documentElement.clientWidth;
		pageHeight = document.documentElement.clientHeight;
	} else {									// 표준 모두가 아니라면 아래를 사용. 
		pageWidth = document.body.clientWidth;
		pageHeight = document.body.clientHeight;
	}
}

브라우저 창 크기를 조절 할 때는 
resizeTo()와 // 최종 너비, 높이를 받고
resizeBy()	 // 너비, 노핑를 얼만큼 바꿀지 받는다. 

// 100 x 100 으로 변경
window.resizeTo(100, 100);

// 100 x 100 에서 200 x 150으로 변경
window.resizeBy(100, 50);

// 300 x 300 으로 변경
window.resizeTo(300, 300);

그러나 창을 움직이는 메서드와 마찬가지로, 크기를 바꾸는 메서드 역시 
인터넷 익스플로러 7이상, 크롬, 오페라에서는 기본적으로 금지.
최상위 window 객체에만 적용되는 점도 마찬가지이다. 

8.1.5 내비게이션과 열기 
window.open(이동할 URL, 대상 창, 기능을 나타내는 문자열,
			 새 페이지가 브라우저 히스토리에서 현재 페이지를 대체할 것인지 불리언 값);

이 메서드는 URL로 이동한 후 브라우저 창을 새로 연다. 
일반적으로 세 번째 매개변수까지만 사용한다. 

ex)
window.open("http://www.naver.com/", "topFrame");
이 코드는 <a href = "http://www.naver.com" target = "topFrame"></a>와 동일하다. 

팝업 창 
위 함수의 두 번째 매개변수가 기존의 창/프레임 이름이 아니라면
세 번째 매개변수에 지정한 문자열로 새 창이나 탭을 생성한다. 
세 번째 매개변수가 없다면 새 부라우저 창이 열리고,
기본 브라우저 창 설정(툴바, 주소, 표시 줄, 상태 바 등)이 적용된다. 
세 번째 매개변수는 새 창을 열때에만 적용된다. 

이 때 새 창의 설정 정보를 나타내는 옵션은 아래와 같다. 

fullscreen	"yes" 또는 "no"	// 브라우저 창을 최대 크기로 생성할지 아닐지
width 		숫자 			// 새 창의 너비, 최소값은 100
height 		숫자 			// 새 창의 높이, 최소값은 100
left 		숫자 			// 새 창의 x 좌표, 음수는 쓸 수 없다. 
top 		숫자 			// 새 창의 y좌표 음수는 쓸 수 없다. 
location 	"yes" 또는 "no" // 주소 표시줄을 표시할지 아닐지. 
menubar 	"yes" 또는 "no" // 메뉴 바를 표시할지 기본값은 no
resizable 	"yes" 또는 "no" // 새 창의 테두리를 드래그해서 크기를 조절할 수 있는지 
scrollbars 	"yes" 또는 "no" // 새 창 콘텐츠가 뷰포트를 넘칠 때 스크롤을 허용할지 
status 		"yes" 또는 "no" // 상태 바를 표시할지 아닐지 
toolbar 	"yes" 또는 "no" // 툴바를 표시할지 아닐지

ex)
window.open("http://www.naver.com", "naverWindow", 
			"height = 400, width = 400, top =10, left = 10, resizable = yes");
이 코드가 만드는 새 창은 400x400 크기이고 화면의 왼쪽 위에서 가로세로 
10픽셀씩 ㄷ러어져 있으며 크기 조절은 가능하다. 

window.open() 메서드는 새로 생성한 창에 대한 참조를 반환. 
naverWindow.close() 메소드를 써서 새 창을 닫을 수도 있다. 

8.1.6 인터벌과 타임아웃
브라우저에서 자바스크립트는 단일 스레드로 실행되지만 타임아웃과 인터벌을 통해
코드가 특정 시간에 실행되게끔 조절할 수는 있다. 
타임아웃은 일정 시간 뒤에 코드를 실행하는 것이고, 
인터벌은 일정 시간마다 코드를 반복실행하는 것이다. 

타임아웃은 window의 setTimeout(실행할 코드(함수도 가능), 코드를 실행할 때까지 기다리는 시간) 메서드로 설정 
ex)
var timeoutId = setTimeout(function() {
	alert("Hello world!");
}, 1000); // 그러나 정확히 1초는 아닌데 왜냐하면 다른 코드를 실행하고 있다면 지연 가능성이 있다. 

이 함수는 해당 타임아웃의 숫자형 ID를 리턴하는데, 
타임아웃을 취소할 때 사용한다. 

clearTimeout(timeoutId);

인터벌은 window의 setInterval() 메서드로 인터벌을 설정하며 
이 메서드는 setTimeout()과 같은 매개변수, 즉 실행할 코드(문자열 또는 함수)와 
각 실행 사이에 대기할 시간을 밀리초로 받습니다. 

ex)
setInterval(function(){
	alert("Hello world!");
}, 1000);

이 역시 ID를 반환합니다. 
인터벌은 취소하지 않으면 계속 떠있으므로 취소가 중요합니다. 
취소하는 예제코드는

var num = 0;
var max = 10;
var intervalID = null;

function incrementNumber(){
	num++;

	// 최대값에 도달하면 대기 중인 작업을 전부 취소
	if(num == max){
		clearInterval(intervalID);
		alert("Done");
	}
}

intervalId = setInterval(incrementNumber, 500);

하지만 아래와 같이 timeout으로 구현하는 것이 좋다. 

var num = 0;
var max = 10;
var intervalID = null;

function incrementNumber(){
	num++;

	
	if(num < max){ // 최대값에 도달하지 않았다면 다른 타이아웃을 설정
		setTimeout(incrementNumber, 500);
	} else {
		alert("Done");
	}
}
setTimeout(incrementNumber, 500);

8.2 location 객체 
이 객체는 현재 창에서 불러온 문서 정보와 함께 일반적인 내비게이션 기능을 제공한다. 
lcoation 객체는 window의 프로퍼티인 동시에 document의 프로퍼티이다. 

location이 가지고 있는 정보는
hash, host, hostname, href, pathname, prot, protocol, search 등이 있다. 

replace() 함수는 새 URL로 이동하는 동시에 
브라우저 히스토리 상의 현재 페이지를 덮어쓴다. 

8.3 navigator 객체
이 객체는 브라우저 정보를 담고 있으며 주로 브라우저를 구분하는데에 사용한다. 

8.4 screen 객체
이 객체에는 픽셀 너비와 높이 등 클라이언트 화면에 관한 정보가 들어있다. 
브라우저별로 screen 객체에서 지원하는 프로퍼티가 다르니 유의할 것. 
p.324~325 참조-

8.5 history 객체
창을 첫 번째 연 이후 사용자의 내비게이션 히스토리를 보관한다. 
history는 window의 프로퍼티이므로 브라우저 창, 탭, 프레임은 각각 자신의 
window 객체에 속한 history 객체를 가진다. 
보안을 이유로 사용자가 방문했던 URL은 알 수 없지만, 
URL을 몰라도 사용자가 방문했던 목록을 통해 뒤로 가거나 앞으로 가는 일은 가능하다. 

go() 메서드는 사용자의 이동 히스토리에서 앞으로 또는 뒤로 이동.
ex)

// 한 페이지 뒤로
history.go(-1);
또는
history.back();

// 한 페이지 앞으로
history.go(1);
또는
history.forward();

