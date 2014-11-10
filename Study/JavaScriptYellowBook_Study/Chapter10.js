10장 DOM

- DOM을 노드의 계층 구조로 이해
- 다양한 노드 타입
- 브라우저들 간의 비호환성을 우회하는 DOM 코딩

DOM은 HTML과 XML 문서에 대한 애플리케이션 프로그래밍 인터페이스 API 입니다. 
DOM은 문서를 노드의 계층 구조 트리로 표현합니다. 

10.1.1 Node 타입

모든 노드에는 타입을 나타내는 nodeType 프로퍼티가 있다. 
노드 타입은 다음 12가지 숫자형 상수 중 하나이다. 

1 : Node.ELEMENT_NODE
2 : Node.ATTRIBUTE_NODE
3 : Node.TEXT_NODE
4 : Node.CDATA_SECTION_NODE
5 : Node.ENTITY_REFERENCE_NODE
6 : Node.ENTITY_NODE
7 : Node.PROCESSING_INSTRUCTION_NODE
8 : Node.COMMENT_NODE
9 : Node.DOCUMENT_NODE
10 : Node.DOCUMENT_NODE
11 : Node.DOCUMENT_TYPE_NODE
12 : Node.DOCUMENT_FRAGMENT_NODE
13 : Node.NOTATION_NODE

각 노드 타입을 비교하려면 
if(someNode.nodeType === Node.ELEMENT_NODE){
	alert("Node is an element.");
}

와 같은 식으로 비교하면 된다. 

nodeName, nodeValue 프로퍼티

이 둘은 해당 노드의 정보를 제공합니다. 
이 정보들은 노드 타입에 따라 완전히 다르므로 
if(someNode.nodeType == 1){
	value = someNode.nodeName;	// 요소의 태그 이름
}
if문으로 한 번 확인하고 변경을 해야합니다. 

요소의 nodeName은 항상 요소의 태그 이름과 일치하며 nodeValue는 항상 null입니다.

노드 사이의 관계
모든 노드는 트리로 되어 있기 때문에, 부모 자식 혹은 형제와 같은 관계가 있습니다. 
각 노드에는 childNodes 프로퍼티가 있는데 이 프로퍼티에는 NodeList가 저장됩니다. 
NodeList는 배열과 비슷한 객체라서 노드를 순서 있는 목록으로 저장하여 위치 기반으로 접근할 수 있게 합니다. 
NodeList는 처음 호출했을 때 얻은 결과를 저장하고 있는 것이 아니라
"계속 바뀌므로" 살아있는 객체라고 부르기도 합니다. 
ex)
var firstChild = someNode.childNodes[0];
var secondChild = someNode.childNodes.item(1);
var count = someNode.childNodes.length;

하지만 진정한 배열로 바꾸려면 Array.prototype.slice()를 사용해야 합니다. 
ex)
var arrayOfNodes = Array.prototype.slice.call(someNode.childNodes, 0);
하지만 지원이 안되는 브라우저가 있을 경우를 대비하여
function convertToArray(nodes){
	var array = null;
	try {
		array = Array.prototype.slice.call(nodes, 0);	// IE 이외, IE 9+
	} catch(ex){
		array = new Array();
		for(var i = 0, len = nodes.length; i < len; i++){
			array.push(nodes[i]);
		}
	}
	return array;
}

마찬가지로 각 노드에는 parentNode 프로퍼티도 있다. 
만약 childNodes 목록에 포함되어 있다면 같은 부모 parentNode를 가지고 있고, 
그렇기 때문에 그들은 nextSibling or previousSibling이다. 

첫째 자식은 firstChild(someNode.childNodes[0])이고 
마지막 자식은 lastChild(someNOde.childNodes[someNode.childNodes.length -1])이다. 

그 외 편리한 메서드로 hasChildNodes()가 있는데, 이 메서드는 노드에 자식 노드가 있다면
true를 반환합니다. 

ownerDocument 프로퍼티는 전체 문서를 표현하는 문서 노드에 대한 포인터이다. 즉, 루트 노드.  
한 노드가 여러 문서에 동시에 존재할 수는 없으니 각 문서는 자기 내부에 있는 노드를 소유하는 것으로 간주하빈다. 

노드 조작
노드 사이의 관계 포인터는 모두 읽기 전용이다. 
따라서 편집하는 함수는 따로 있는데 그중 하나는
appendChild() 로서 childNodes 목록에 노드를 추가한다. 
리턴값으로는 새로 추가한 노드를 반환합니다. 

var returnedNode = someNode.appendChild(newNode);

만약 appendChild()에 넘긴 노드가 이미 문서에 존재하고 있었다면 해당 노드는 이전 위치를 벗어나
"새 위치로" 이동합니다. DOM 트리가 수 많은 포인터로 연결되어 있지만, 
문서에서 두 위치에 동시에 존재할 수 있는 DOM 노드는 없기 때문입니다. 

ex)
var returnedNode = someNode.appendChild(someNode.firstChild);
console.log(returnedNode === someNode.firstChild); // false
console.log(returnedNode === someNode.lastChild); // true


한 노드는 childNodes 목록 마지막이 아니라 특정 위치로 옮겨야 할 때는 
insertBefore(삽입할 노드, 타켓 노드) 메서드를 사용한다. 

// 첫 자식으로 삽입
returnedNode = someNode.insertBefore(newNode, someNode.firstChild);

교체할 때는 
replaceChild(새로운 노드, 교체될 옛날 노드)를 사용한다. 
이렇게 삽입하면 옛 노드의 관계 포인터를 모두 새로운 노드에 복사합니다. 
옛 노드는 아직 같은 문서 소유이긴 하지만 문서에서 위치를 지정받지는 못한 채 붕 떠있는 상태가 됩니다. 

노드를 제거할 때는
removeChild(제거할 노드)를 사용합니다. 

이들 네 가지 메서드는 모두 특정 노드의 자식에서만 동작하므로 "부모 노드를 정확히 알아야 합니다."

노드를 복제할 때는
cloneNode(자손 노드까지 복제할지를 결정하는 불리언)를 사용합니다. 
복제된 직후에는 고아 노드이며, 따로 위치를 위 메서드들을 사용해서 지정해 주어야 합니다. 

10.1.2 Document 타입
자바스크립트는 문서 노드를 Document 타입으로 표현합니다. 
브라우저에서 전체 HTML 페이지를 표현하는 문서 객체는 HTMLDocument의 인스턴스이며,
HTMLDocument는 Document를 상속합니다. document 객체는 window 의 프로퍼티이므로
전역에서 접근할 수 있습니다. 

이 Document 노드의 nodeValue, parentNode, ownerDocument 는 null 이며 
자식 노드로 DocumentType(최대 1개) Element(최대 1개) Processing Instruction, Comment를 가질 수 있습니다. 

이 객체를 통해 페이지에 대한 정보를 얻고 구조 및 외관을 조작합니다. 



Document의 자식 노드

var html = document.documentElement; // <html>에 대한 참조를 얻음
console.log(html === document.childNodes[0]); 	// true
console.log(html === doucment.firstChild); 		// true

document 객체는 HTMLDocument의 인스턴스이므로
<body> 요소를 직접적으로 가리키는 body 프로퍼티를 갖습니다. 
var body = document.body;	// <body>에 대한 참조를 얻음

Document가 가질 수 있는 또 다른 자식 노드는 DocumentType 입니다. 
<!DOCTYPE> 태그는 문서의 다른 부분과는 별도의 엔티티로 간주하며 포함된 정보는 다음과 같이
doctype 프로퍼티를 통해 접근할 수 있습니다.

var doctype = document.doctype; // <!DOCTYPE>에 대한 정보를 얻음.
그러나 브라우저마다 너무 달라서 유용하게 쓰기 어렵다. 



문서 정보 

// 문서 제목을 가져옴
var originalTitle = document.title;

// 문서 제목을 설정
document.title = "New page title";

// 완전한 URL
var url = document.URL;

// 도메인 이름
var domain = document.domain;

// 레퍼러
var referrer = document.referrer;

각 페이지의 document.domain을 같은 값으로 설정하면 다른 페이지의 자바스크립트 객체에 접근이 가능합니다. 
즉, 이를 통해 페이지끼리 통신이 가능합니다. 

요소 위치

getElementById() 메서드는 
찾으려는 요소 ID를 매개변수로 받고 해당 요소를 찾아 반환하며,
그런 ID의 요소가 존재하지 않으면 null을 반환하며
var div = document.getElementById("someId");

만약 페이지에 같은 요소가 두 개 이상 존재한다면 그 중 첫번째 요소를 반환합니다. 

getElementByTagName() 메서드는
요소의 태그 이름을 매개변수로 받고 해당 요소가 담긴 NodeList를 반환합니다. 
HTML 문서에서는 HTMLCollection 객체를 반환하는데,
이 객체는 "살아 있는" 객체라는 점에서 NodeList 컬렉션과 매우 비슷합니다. 

var images = document.getElementByTagName("img");

HTMLCollection 객체의 데이터 역시 대괄호 표기법이나 item() 메서드로 접근할 수 있습니다. 
객체에 담긴 요소 숫자는 length 프로퍼티에 저장됩니다. 

images.length // 이미지의 갯수
images[0].src // 첫번째 이미지의 src 속성
images.item(0).src // 첫 번째 이미지의 src속성

문서 요소의 전체를 가져오려면 
var allElements = document.getElementByTagName("*");


문서에 쓰기

write(), writeln() 메서드는 문자열을 매개변수로 받아 문서에 씁니다.
이들 메서드는 페이지를 불러오는 중에 호출해서 동적으로 콘텐츠를 추가할 수 있습니다.
ex)
<html>
	<head>
		<title>document.write() Example</title>
	</head>
	<body>
		<p>The current date and time is :
		<script type = "text/javascript">
			document.write("<strong>" + (new Date()).toString() + "</strong");
		</script>
	</body>
</html>

10.1.3 Element 타입

이 타입에는 다음과 같은 특징이 있습니다.
- nodeType은 1
- nodeName은 요소의 태그 이름
- nodeValue는 null
- parentNode는 Document 또는 Element입니다.
- 자식 노드로 Element나 Text, Comment, ProcessingInstruction, CDATA Section, EntityReference를 가질 수 있습니다.

*HTML에서 사용하면 태그 이름은 항상 대문자로 반환됩니다. 
따라서
if(element.tagName.toLowerCase() === "div") 
로 해야 안전합니다. 


HTML 요소

이는 Element를 직접적으로 상속하며 몇 가지 프로퍼티가 추가됩니다. 

- id : 요소의 고유한 식별자
- title : 요소에 대한 추가정보 
- className : 요소의 CSS 클래스인 class 속성을 나타냅니다. 이 프로퍼티를 class라고 부르지 못하는 이유는 class가 ECMAScript의 예약어이기 때문입니다.

각 프로퍼티는 속성 값을 읽는 용도로도, 값을 설정하는 용도로도 사용합니다. 

* 더 자세한 HTML 요소와 타입은 책 400p 참조 


속성 얻기

getAttribute()
ex)
var div = document.getElementById("myDiv");
div.getAttribute("id");	// myDiv
div.getAttribute("class"); // bd
div.getAttribute("title"); // Body text
div.getAttribute("lang");  // en
div.getAttribute("dir");   // ltr

주의할 점은 getAttribute()의 인자로 속성 이름을 그대로 써야 한다. class의 속성 값을 얻으려면 className말고
class 라고 적아야 합니다. 

속성 설정
setAttribute(속성 이름, 설정할 값)는 속성이 존재하면 해당 속서으이 값을 교체하고,
존재하지 않으면 속성을 새로 생성하고 값을 설정합니다.

ex)
div.setAttribute("id", "someOtherId");
div.setAttribute("class", "ft");

속성 제거
removeAttribute(속성 이름) 
이 메서드는 속성의 값만 지우는 것이 아니라 요소에서 속성을 완전히 제거합니다. 
이 함수는 DOM 요소를 직렬화 할 때 많이 사용합니다. 

attribute 프로퍼티
Element 타입은 DOM 노드 타입 중에서 attributes 프로퍼티를 갖는 유일한 타입. 
여기에는 살아있는 객체인 NamedNodeMap이 저장됨. 
요소의 속성은 모두 Attr 노드로 표현되며 각 ATtr 노드는 NamedNodeMap 객체에 저장됩니다. 

이 객체에는 다음과 같은 메서드가 있습니다.
- getNamedItem(name) // nodeName 프로퍼티가 name인 노드를 반환합니다.
- removeNamedItem(name) // nodeNAme 프로퍼티가 name인 노드를 목록에서 제거합니다.
- setNamedItem(node) // node를 목록에 추가하고 nodeName 프로퍼티에 따라 색인합니다. 
- item(pos) // 인덱스가 pos인 노드를 반환합니다. 

ex)
var id = element.attributes.getNamedItem("id").nodeValue; // id의 속성을 가져옴 
var id = element.attributes["id"].nodeValue; // 마찬가지의 표현

var oldAttr = element.attributes.removeNamedItem("id"); // 주어진 이름의 속성을 제거하고 Attr노드를 반환함. 

setNamedItem은 잘 쓰이지 않음. 


요소 생성

document.createElement(생성할 요소의 태그 이름)
ex) var div = document.createElement("div"); 
여기서 요소의 속성을 조작하고 자식요소를 추가하면
div.id = "myNewDiv";
div.className = "box";

그 후에 문서에 추가하는 메서드 appendChild(), insertBefore(), replaceChild() 셋중 하나를 사용해서 문서 트리에 추가.
document.body.appendChild(div);

이렇게 되면 즉시 브라우저가 그 변화를 반영합니다. 
이 시점 이후 요소에 가해지는 변경 또한 즉시 반영됩니다. 


10.1.4 Text 타입
다음과 같은 특징이 있습니다. 
- nodeType은 3입니다.
- nodeName은 "#text"입니다. 
- nodeValue는 노드에 포함된 텍스트입니다.
- parentNode는 Element 입니다.
- 자식 노드를 가질 수 없습니다. 

노드의 텍스트를 조작하는 메서드는
- appendData(text) // 노드 마지막에 text를 추가합니다. 
- deleteData(offset, count) // offset부터 count만큼 삭제합니다.
- insertData(offset, text) // offset 위치에 text를 삽입합니다.
- replaceData(offset, count, text) // offset 부터 (offset + count) 까지의 텍스트를 text로 교체
- splitText(offset) // offset 위치를 기준으로 텍스트 노드를 둘로 나눕니다. 
- substringData(offset, count) // offset 위치부터 (offset + count)까지의 텍스트를 꺼냅니다. 

텍스트 노드 생성
var textNode = document.createTextNode("<strong>Hello</strong> world!");
 이 이후에 DOM트리에 삽입해야 반영이 됩니다. 

텍스트 노드 합침
element.normalize();

텍스트 노드 분할
var newNode = element.firstChild.splitText(,);
이러면 배열 형태로 담긴다. 
이 함수는 텍스트 노드에서 데이터를 추출하는 DOM 파싱 테크닉에서 가장 자주 쓰이게됩니다. 