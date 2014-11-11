12장 DOM 레벨 2와 레벨 3

DOM 레벨 1은 HTML 및 XML 문서의 구조를 정의하는데 초점을 맞췄습니다. 
DOM 레벨 2와 레벨 3은 이 구조를 바탕으로 상호작용 기능을 추가하고 고급 XML 기능을 지원합니다. 

결과적으로 DOM 레벨 2와 레벨 3은 매우 특정한 DOM 부분집합을 정의하는 여러 가지 모듈로 구성됩니다. 

12.2.1 요소 스타일에 접근 
CSS 프로퍼티 이름은 하이픈 표기법(-) 즉, background-image처럼 각 단어를 하이픈으로 연결하는 방법을 쓰지만, 
자바스크립트에서 사용할 때는 단어가 바뀔 때마다 대문자를 한 글자씩 쓰는 카멜 케이스로 써야 합니다 .

	CSS							자바스크립트

	background-image 			style.backgroundImage
	color						style.color
	display						style.display
	font-family					style.fontFamily

ex)
var myDiv = document.getElementById("myDiv");

// 배경색을 지정합니다. 
myDiv.style.backgroundColor = "red";

// 크기를 바꿉니다. 
myDiv.style.width = "100px";
myDiv.style.height = "200px";

// 테두리를 지정합니다. 
myDiv.style.border = "1px solid black";

DOM 레벨 2 스타일 명세에는 style 객체의 프로퍼티와 메서드도 정의되어 있다. 
이들 프로퍼티와 메서드는 요소의 style 속성에 관한 정보를 담고있으며 변경할 수도 있다. 

cssText - 이전에 설명했듯 style 속성의 CSS 코드에 접근할 수 있습니다. 
length - 요소에 적용된 CSS 프로퍼티 개수입니다. 
parentRule - CSS 정보를 표현하는 CSSRule 객체입니다. 
getPropertyCSSValue(propertyName) - 주어진 프로퍼티 값을 포함하는 CSSValue 객체를 반환합니다. 
getPropertyPriority(propertyName) - 주어진 프로퍼티에 !important가 지정되어 있다면 "important"를, 그렇지 않다면 빈 문자열을 반환합니다.
getPropertyValue(propertyName) - 주어진 프로퍼티의 문자열 값을 반환합니다. 
item(색인) - 주어진 위치에 있는 CSS 프러퍼티 이름을 반환합니다. 
removeProperty(propertyName) - 주어진 프로퍼티를 제거합니다. 
setProperty(propertyName, value, priority) - 주어진 프로퍼티에 주어진 값과 중요도 ("important" 또는 빈 문자열)를 지정합니다. 

cssText 프로퍼티를 설정하면 요소의 여러가지 스타일을 한 번에 바꿀 수 있으므로 가장 빠른 방법입니다. 
ex)
myDiv.style.cssText = "width: 25px; height: 100px; background-color : green"; 

length 프로퍼티는 item() 메서드와 함께 사용하여 요소에 정의된 CSS 프로퍼티를 순회하도록 디자인되었습니다. 
이 둘을 이용하면 style 객체를 마치 컬렉션처럼 쓸 수 있으며 
다음 예 처럼 item() 대신 대괄호 표기법을 사용하여 주어진 위치의 
CSS 프로퍼티 이름을 알 수도 있습니다. 

for(var i = 0, len = myDiv.style.length; i < len; i++){
	console.log(myDiv.style[i]);	// 또는 myDiv.style.item(i);
}

