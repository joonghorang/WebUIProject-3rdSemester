읽기 좋은 자바스크립트 코딩 기법

초판 발행 2013년 01월 07일
지은이 니콜라스 자카스 
옮긴이 김광호
펴낸곳 한빛미디어(주) 

- switch문에서 default절에 딱히 수행해야할 로직이 없다면 default 절을 꼭 넣지 않아도 됩니다. 

- 모든 지역 변수를 함수의 첫 번째 문장에 선언하는 스타일을 추천합니다. 
ex)
function doSomthingWithItems(items){
	var i, len;
	var value = 10;
	var result = value + 10;

	for(i = 0, len = items.length; i < len; i++){
		doSomething(items[i]);
	}
}

- 익명 함수는 선언과 동시에 호출할 수 있고 또 그 반환값을 변수에 할당하는 것도 가능합니다. 
함수 호출을 명확하게 하려면 다음 예제와 같이 함수 앞뒤에 괄호를 추가합니다. 

ex)
var value = (function () {
	// function body

	return {
		message : "Hi"
	}
}());

- eval()은 문자열로 된 자바스크립트 코드를 실행하는 함수입니다. 이 함수를 이용해 자바스크립트 코드를 추가로 내려받거나
실행 중에 자바스크립트 코드를 생성하고 실행할 수 있습니다. 

하지만  Ajax응답을 자바스크립트에서 사용하는 값으로 변경하는 목적으로 사용할때를 제외하고 eval()은 비추천.

- 함수를 정의할 떄는 가능한 한 지역 변수를 사용해야 합니다. 함수 안에서 정의할 수 있는 건 모두 지역 변수로 선언하고
함수 외부에서 선언된 데이터는 인자로 받아야 합니다. 이로써 주변 환경에서 함수를 독립시켜 한쪽을 변경해도 다른 쪽에 
영향이 가지 않게 할 수 있습니다. 

- 변수에 값을 할당할 때 var 문으로 변수를 미리 선언하지 않으면 해당 변수는 자동으로 전역 변수로 생성됩니다. 


// 전역변수 관련 

- One-Global 접근법에서는 네이티브 API가 사용하지 않을만한 이름으로 전역 객체를 만들고 그 전역 객체 안에 필요한 로직을 모두 추가합니다. 
즉, 여러 개의 전역을 만들지 않고 전역으로 선언하려 했던 객체를 전역 객체의 프로퍼티에 추가합니다. 
ex)
var MaintainableJS = {};

MaintainableJS.Book = function (title){
	this.title = title;
	this.page = 1;
};

MaintainableJS.Book.prototype.turnPage = function (direction){
	this.page += direction;
};


MaintainableJS.Chapter1 = new MaintainableJS.Book("A");
MaintainableJS.Chapter2 = new MaintainableJS.Book("B");
MaintainableJS.Chapter3 = new MaintainableJS.Book("C");

- One-Global 접근법을 사용하는 프로젝트에서는 네임스페이스도 사용합니다. 네임스페이스란 전역 객체에 
프로퍼티를 하나 추가해 기능을 논리적인 단위로 모아놓은 것입니다. 예를들어 YUI는 거의 모든 부분에서 네임스페이스를 사용하고 있습니다.
Y.DOM 안에 있는 모든 것은 DOM 조작에 관련된 메서드만 있고 Y.Event안에는 이벤트와 관련된 메서드만 있습니다. 

공통으로 사용하는 네임스페이스 규칙은 각 파일에서 필요한 네임스페이스를 생성하는 것입니다. 
그러려면 먼저 각 파일에서 네임스페이스를 추가할 때 네임스페이스가 이미 존재하는지 먼저 확인해야 합니다. 
기본적인 패턴은 아래와 같습니다. 
 
 var YourGlobal = {
 	namespace = function (ns){	// 문자열과 같은 이름의 네임스페이스가 존재하면 참조값을 반환해서 이미 선언된 네임스페이스는 건드리지 않고 존재하지 않는 네임스페이만 새로 생성한다. 
 		var parts = ns.split("."),
 			object = this,
 			i, len;

 		for(i = 0, len = parts.length; i < len; i++){
 			if(!object[parts[i]]){
 				object[parts[i]] = {};
 			}
 			object = object[parts[i]];
 		}
 		return object;
 	}
 };

이 메서드는 다음과 같이 사용합니다. 
// YourGlobal.Books와 YourGlobal.Books.MaintainableJavaScript를 둘 다 생성합니다. 
// 둘 다 기존에 존재하지 않은 네임스페이스므로, 처음부터 생성합니다. 

YourGlobal.namespace("Books.MaintainableJavaScript");

// 이제 해당 네임스페이스를 사용할 수 있습니다. 
YourGlobal.Books.MaintainableJavaScript.author = "Nicholas C. Zakas";

// YourGloabl.Books는 그대로 두고, HighPerformanceJavaScript만 여기에 추가합니다. 
YourGlobal.namespace("Book.HighPerformanceJavaScript");

// 기존에 선언한 네임스페이스에는 영향을 끼치지 않았습니다. 

// 또는 다른 방식으로, namespace 메서드를 호출하고 바로 새로운 프로퍼티를 추가할 수도 있습니다. 
YourGlobal.namespace("Books").ANewBook = {};

- One-Global 접근법에 모듈을 사용하면 금상첨화입니다. 모듈은 새로운 전역 객체나 네임스페이스 없이 일반적인 기능을 
묶어서 사용하는 방법을 의미합니다. 대신 모든 코드는 함수 하나에서 실행되며 작업을 수행하거나 인터페이스를 만드는 역할을 합니다. 
모듈은 이름 없이 사용할 수도 있고 실행할 때 다른 모듈이 필요하다면 필요한 모듈 목록을 명시할 수도 있습니다. 

YUI 모듈
YUI 자바스크립트 라이브러리를 이용하여 모듈을 생성합니다. 
YUI.add("module-name", function(Y){
	// 모듈 바디
}, "version", { requires: [ "dependency1", "dependency2"]});

YUI에서 각 모듈에 네임스페이스를 만들고 모듈에 할 일을 추가하는 방법은 다음과 같습니다.
YUI.add("my-books", function(Y){
	//네임스페이스 추가
	Y.namespace("Books.MaintainableJavaScript");
	//할일 추가
	Y.Book.MaintainableJavaScript.author = "Nicholas";
}, "1.0.0", { requires: ["dependency1", "dependency2"]});

모듈은 YUI().use()메서드에 사용할 모듈명을 인자로 넘겨 실행합니다. 
YUI().use("my-books", "another-module", function(Y){
	console.log(Y.Books.MaintainableJavaScript.author);
});
이 코드가 실행되면"my-books"와 "another-module"이라는 이름의 모듈이 로딩되고, 각
모듈을 정의할 때 입력한 의존 모듈도 함께 로딩됩니다.  
모듈명을 입력한 순서대로 모듈이 실행되고 마지막으로 YUI().use()를 호출할 때 넘긴 콜백 함수가 실행됩니다. 
콜백 함수의 인자인 Y객체는 모듈을 로딩하고 수행한 결과가 모두 반영된 상태로 콜백함수에 전달되게 됩니다. 
// 하지만 외부 라이브러리를 사용하는 것이 리팩토링에 좋을지는 좀... 

- 이벤트 핸들러에서 애플리케이션 로직은 무조건 분리해야합니다. 
이벤트 핸들러는 애플리케이션 로직 처리 함수처럼 전역 객체에 두어야 합니다. 
ex)
var MyApplication = {

	handleClick : function(event){
		this.showPopup(event);
	},

	showPopup : function(event){
		var popup = document.getElementById("popup");
		popup.style.left = event.clientX + "px";
		popup.style.top = event.clientY + "px";
		popup.className = "reveal";
	}
};

addListener(element, "click", function(event){
	MyApplication.handleClick(event);
});

그러나 이건 첫 단계일 뿐이고 변경할 부분이 남았습니다. 
뭐냐하면 event객체를 이벤트 핸들러에서만 사용하고 애플리케이션 로직에는 필요한 데이터만 넘기는 것입니다. 
ex)
var MyApplication = {

	handleClick : function(event){
		this.showPopup(event.clientX, event.clientY);
	},

	showPopup : function(x, y){
		var popup = document.getElementById("popup");
		popup.style.left = x + "px";
		popup.style.top = y + "px";
		popup.className = "reveal";
	}
};

addListener(element, "click", function(event){
	MyApplication.handleClick(event); // 여기서는 이렇게 넘겨도 됨.
});


- 자바스크립트에는 문자열, 숫자, 불린, null, undefined 총 5 개의 기본 데이터 타입이 있습니다. 
typeof를 문자열에 사용하면, "string"을 반환합니다. 
typeof를 숫자에 사용하면, "number"를,
typeof를 불린에 사용하면, "boolean"을,
typeof를 undefined에 사용하면, "undefined"을 반환합니다. 
하지만
typeof를 null에 사용하면, "object"를 반환하니 주의해야합니다. 
null을 확인하려면 (===, !==)를 사용해야합니다. 

- 코드에서 구성 데이터 분리하기 
소스 코드에 직접 입력된 값은 언제든지 바뀔 수 있어 설정 데이터로 간주합니다. 다음 항목은 모두 설정 데이터의 예입니다.
	- URL
	- UI에 보여지는 문자열
	- 반복되는 고유한 값
	- 설정 값(예, 페이지당 게시물 수)
	- 변경될 수 있는 값

ex)
//구성 데이터 분리
var config = {
	MSG_INVALID_VALUE : "Invalid value", 
	URL_INVALID : "/errors/invalid.php",
	CSS_SELECTED : "selected"
};

function validate(value){
	if(!value){
		alert(config.MSG_INVALID_VALUE);
		location.href = config.URL_INVALID;
	}
}

function toggleSelected(element){
	if(hasClass(element, config.CSS_SELECTED)){
		removeClass(element, config.CSS_SELECTED);
	} else {
		addClass(element, config.CSS_SELECTED);
	}
}


- 구성 데이터를 애플리케이션과 깔끔하게 분리하려면 별도의 파일에 두는 것이 가장 좋습니다. 

- 일반 자바스크립트로 변수에 JSON 객체를 할당하는 방식입니다. 
var config = {"A" : "10",
				"B" : "case",
				"C" : "selected"};

- 각 자바스크립트 파일에 객체 하나만 정의해야 합니다. 
파일에 하나의 객체만 정의하면 자연스레 파일 수가 많이지는데 이렇게 파일이 많아지면 같은 파일에 여러명이 동시에 작업할 가능성이 낮아집니다. 
// 깃에서 충돌나는걸 자연스럽게 방지할 수 있다!

