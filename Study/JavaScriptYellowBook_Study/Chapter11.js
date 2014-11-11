11 DOM 확장 

- 선택자 API에 대한 이해
- HTML5 DOM 확장 사용
- 브라우저 전용 DOM 확장 사용

11.1 선택자 API에
자바스크립트 라이브러이에서 가장 인기 있는 기능은 
CSS 선택자로 패턴을 만들고 그에 맞는 DOM 요소를 선택하는 능력입니다. 
그 중에서도 JQuery 라이브러리는 완전히 CSS 선택자에 기초하여 DOM 문서를 쿼리합니다. 

* www.w3.org/TR/selectors-API)

11.1.1 querySelector() 메서드 
이 함수는 매개변수로 CSS 쿼리를 받고 패턴에 일치하는 
"첫 번째" 자손 요소를 반환하며 일치하는 것이 없다면 null 을 반환합니다. 

// body 요소를 가져옵니다.
var body = document.querySelector("body");

// ID가 "myDiv"인 요소를 가져옵니다. 
var myDiv = document.querySelector("#myuDiv");

// 클래스가 "selected"인 요소 중 첫 번째를 가져옵니다.
var selected = document.querySelector(".selected");

// 클래스가 "button"인 이미지 중 첫 번째를 가져옵니다.
var img = document.body.querySelector("img.button");

* document 에서 쿼리를 날리면, 문서 전체에 해당하는 요소를 가져오지만, 
  그 하위 Element 에서 쿼리를 날리면, 해당 Element의 자손에서만 쿼리합니다. 

11.1.2 querySelectorAll() 메서드

이 함수는 하나만 찾아주는 것이 아니라 일치하는 노드 전체를 반환합니다. 
NodeList의 정적 인스턴스를 반환해 줍니다. 

// <div>에 포함된 <em> 요소를 모두 가져옵니다. (getElementsByTagName("em")과 비슷함)
var ems = document.getElementById("myDiv").querySelectorAll("em");

// 클래스가 "selected"인 요소를 모두 가져옵니다.
var selecteds = document.querySelectorAll(".selected");

// <p> 요소에 포함된 <strong> 요소를 모두 가져옵니다.
var strongs = document.querySelectorAll("p strong");

그리고 반환값인 NodeList 객체에서 item() 메서드나 대괄호 표기법을 썻 원하는 요소를 
가져올 수 있습니다. 

ex)
var i, len, strong;
for(i = 0, len = strongs.length; i < len; i++){
	strong = strongs[i];	// storngs.item(i)도 가능
	storng.className = "important";
}

11.1.3 matchesSelector() 메서드 
이 메서드는 매개변수로 CSS 선택자를 받고, 
요소가 그에 일치하면 true 를, 일치하지 않으면 false 를 반환

하지만 브라우저마다 함수명이 조금씩 다르기 때문에 아래와 같은 래퍼 함수로 사용해야 함. 
ex)

function matchesSelector(element, selector){
	if(element.matchesSelector){ // 이러면 조건이 없기 때문에 정상작동한다면 무조건 true를 리턴. 
		return element.matchesSelector(selector);
	} else if(element.msMatchesSelector){
		return element.msMatchesSelector(selector);
	} else if(element.mozMatchesSelector){
		return element.mozMatchesSelector(selector);
	} else if(element.webkitMatchesSelector){
		return element.webkitMatchesSelector(selector);
	} else {
		throw new Error("matchesSelector Not supported");
	}
}

if(matchesSelector(document.body, "body.page1")){
	// 코드 
}

11.2 요소 간 이동 

- childElementCount : 자식 요소 숫자를 반환하되 텍스트 노드와 주석은 제외합니다. 
- firstElementChild : 첫 번째 자식 요소를 가리킵니다.
- lastElementChild : 마지막 자식 요소를 가리킵니다.
- previousElementSibling : 이전 형제 요소를 가킵니다.
- nextElementSibling : 다음 형제 요소를 가리킵니다.

ex)
var i;
var len;
var child = element.firstElementChild;
while(child != element.lastElementChild){
	processChild(child);		// 요소임을 이미 알고 있음. 
	child = child.nextElementSibling;
}

11.3 HTML5

11.3.1 클래스 관련 추가사항

getElementsByClassName() 메서드 
이 함수는 클래스 이름 문자열을 매개변수로 받으며 해당 클래스를 모두 가진 요소의
NodeList를 반환합니다. 클래스 이름의 순서는 상관없습니다. 

// 순서에 상관 없이 클래스 이름에 "username"과 "current"가 모두 있는 요소를 찾습니다. 
var allCurrentUsernames = document.getElementsByClassName("username current");

// myDiv의 자손 중에 "selected" 클래스가 있는 요소를 모두 찾습니다. 
var selected = document.getElementById("myDiv").getElementByClassName("selected");

이 메서드는 클래스를 바탕으로 이벤트를 등록하려 할 때 유용합니다. 
반환 값은 NodeList입니다. 

classList 프로퍼티 
HTML5는 모든 요소에 classList 프로퍼티를 추가하여 클래스 이름을 안전하고 단순하게 조작할 수 있습니다. 
classList 프로퍼티는 DOMTokenList란 새 컬렉션 타입의 인스턴스 입니다. 
이는 다음과 같은 메서드를 가집니다. 
- add(value) 		// 주어진 문자열 값을 목록에 추가합니다. 값이 이미 존재하면 추가하지 않습니다. 
- contains(value) 	// 주어진 값이 목록에 존재하면 true를, 그렇지 않다면 false를 반환합니다. 
- remove(value)		// 주어진 문자열 값을 목록에서 제거합니다. 
- toggle(value) 	// 값이 목록에 존재하면 제거하고 그렇지 않으면 추가합니다. 

ex)
// "disabled" 클래스를 제거합니다. 
div.classList.remove("disabled");

// "current" 클래스를 추가합니다. 
div.classList.add("current");

// "user" 클래스를 토글합니다. 
div.classList.toggle("user");

// 현재 클래스를 확인합니다. 
if(div.classList.contains("bd") && !div.classList.contains("disabled")){
	// 코드 
}

// 클래스 이름을 순회합니다. 
for(var i = 0, len = div.classList.length; i < len; i++){
	doSomething(div.classList[i]);
}

classList 프로퍼티를 이용하면 요소의 class 속성을 완전히 제거하거나 
덮어쓸 때 외에는 className 프로퍼티가 불필요합니다. 
classList 프로퍼티를 구현한 브러우저는 파이어폭스 3.6 이상과 크롬입니다. 

11.3.3 HTMLDocument의 변화 

readyState 프로퍼티 
document의 readyState 프로퍼티에 가능한 값은 두 가지입니다.

- loading : 문서를 불러오는 중입니다. 
- complete : 문서를 완전히 불러왔습니다. 

ex)
if(document.readyState == "complete"){
	// 코드 
}

insertAdjacentHTML() 메서드 
인자로 삽입할 위치와, HTML 텍스트 두 가지를 매개변수로 받습니다. 
삽입할 위치로 받는 인자 목록은 아래와 같습니다. 

- beforebegin : 호출한 요소 바로 앞에 삽입합니다. 
- afterbegin : 호출한 요소의 첫 번째 자식 요소 바로 앞에 삽입합니다. 
- beforeend : 호출한 요소의 마지막 자식 요소 바로 다음에 삽입합니다. 
- afterend : 호출한 요소 바로 다음에 삽입합니다. 

// 바로 앞에 삽입합니다
element.insertAdjacentHTML("beforebegin", "<p>Hello world!</p>");

// 첫 번째 자식으로 삽입
element.insertAdjacentHTML("atferbegin", "<p>Hello world!</p>");
