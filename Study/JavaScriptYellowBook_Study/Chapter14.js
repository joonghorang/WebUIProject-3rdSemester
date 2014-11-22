14장 폼 스크립트 

14.1 폼 기본 
웹 폼은 HTML에서는 <form>요소로, 
자바스크립트에서는 HTMLFormElevemt 타입으로 표현됩니다. 이는 HTMLElement를 상속하므로
다른 HTML 요소와 같은 기본 프로퍼티를 가집니다. 

그 외에 다음 프로퍼티와 메서드가 추가됩니다. 

	- acceptCharset : 서버가 처리할 수 있는 문자셋. 
	- action : 요청을 보낼 URL. 
	- elements : 폼에 있는 컨트롤 전체의 HTMLCollection입니다. 
	- enctype : 요청의 인코딩 타입. 
	- length : 폼에 있는 컨트롤 갯수
	- method : HTTP 요청 타입이며 일반적으로 "get"이나 "post"입니다.
	- name : 폼의 이름. 
	- reset() : 폼 필드롤 모두 기본 값으로 리셋
	- submit() : 폼을 전송 
	- target : 요청을 보내고 응답을 받을 창의 이름 

<form>요소에 대한 참조는 대표적으로
var form = document.getElementById("form1");
으로 가져옵니다. 
아니면 docuemnt.forms 컬렉션을 통해서도 접근할 수 있습니다. 
// 페이지의 첫 번째 폼
var firstForm = document.forms[0];
//  이름이 "form2"인 폼
var myForm = dobuemnt.forms["form2"];

*폼에는 id와 name 프로퍼티를 모두 쓸 수 있고 두 값이 같을 필요는 없습니다. 

14.1.1 폼의 전송
사용자가 전송 버튼이나 이미지 버튼을 누르면 폼이 전송됩니다. 
전송 버픈은 <input> 요소나 <button>요소의 type 속성을 "submit" 으로 지정하고 
이미지 버튼은 <input> 요소의 type 속성을 "image"로 지정하면 됩니다. 

ex)
// 범용 전송 버튼 in HTML
<input type = "submit" value = "Submit Form">

// 커스텀 전송 버튼 
<button type = "submit">Submit Form</button>

// 이미지 버튼
<input type = "image" src = "graphic.gif">

*이들 버튼 타입이 폼에 들어있으면 폼 컨트롤에 포커스가 있는 상태에서 엔터 키를 눌러도 폼이 전송됩니다. 

폼을 이런 식으로 전송하면 서버에 요청을 보내기 전에 submit 이벤트가 발생하는데, 
이를 통해 폼 데이터의 유효성을 검사하고 폼을 실제로 전송할지 말지 결정할 수 있습니다. 
ex)
var form = document.getElementById("myForm");
EventUtil.addHandler(form, "submit", function(event){
	// 이벤트 객체
	event = EventUtil.getEvent(event);

	// 폼 전송 방지(기본 기능 방지)
	EventUtil.preventDefault(event);
})

확실하게 폼을 중복 전송하지 않게 하는 코드는 
EventUtil.addHandler(form, "submit", function(event){
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);

	//  전송버튼
	var btn = target.elements["submit-btn"];

	// 비활성화 
	btn.disabled = true; 
})

반대로 전송 버튼이 없어도 submit() 메서드를 호출해 폼을 전송할 수도 있습니다. 
(이런 식으로 전에 했던 버튼 가리는 꼼수 없이도 가능할지도?)
ex)
var form = document.getElementById("myForm");

// 폼 전송
form.submit(); 

폼을 submit()함수로 전송할 때는 submit 이벤트가 발생하지 않으므로, 
'호출하기 전에' 데이터의 유효성을 검사해야 합니다. 

* 폼 전송과 관련된 가장 큰 문제는 폼을 두 번 이상 전송할 가능성이 있다는 겁니다. 
이 문제를 해결하려면 폼을 전송하는 즉시 전송 버튼을 비활성화 하거나, 
onsubmit 이벤트 핸들러에서 폼을 더 이상 전송하지 않도록 막는 것입니다. 

14.1.2 폼 리셋
사용자가 리셋 버튼을 클릭하면 폼이 리셋됩니다. 
ex)

// 범용 리셋 버튼
<input type = "reset" value = "Reset Form">

// 커스텀 리셋 버튼 
<button type = "reset"> Reset Form </button>

마찬가지로 버튼이 눌린 다음 필요하다면 
리셋전에 이벤트를 걸어 취소할 수도 있습니다. 
ex)
var form = document.getElementById("myForm");
EventUtil.addHandler(form, "reset", function(event){
	// 이벤트 객체
	event = EventUtil.getEvent(event);

	// 폼 리셋 방지
	EventUtil.preventDefault(event);
})

폼 전송과 마찬가지로 리셋도 reset()함수로 가능합니다. 
ex)
form.reset();

14.1.3 폼 필드
폼 요소도 같은 다른 요소와 마찬가지로 네이티브 DOM 메서드로 접근할 수 있습니다. 
폼 요소는 각 폼의 프로퍼티인 elements컬렉션에 속하며, 이 컬렉션은 
폼에 포함된 모든 폼 필드에 대한 순서있는 목록입니다. 
순서있는
<input>, <textarea>, <button>, <select>, <fieldset> 순입니다. 
각 폼 필드가 elements 컬렉션에 나타는 순서는 마크업 순서와 일치하면
인덱스와 name 두 가지로 접근이 가능합니다. 

ex)

var form = document.getElementById("form1");

// 순서로 접근  : 첫번재 필드 
var field1 = form.elements[0];

// 이름으로 접근 : "textbox1"란 이름의 필드
var field2 = form.elements["textbox1"];

// 필드 개수
var fieldCount = form.elements.length;

* 라디오 버튼 처럼 여러 폼 컨트롤의 name 속성이 같다면 해당 이름의 요소 전체가 포함된 HTMLCollection이 반환됩니다. 

폼 필드의 공통 프로퍼티 
<fieldset>요소를 제외한 모든 폼 필드는 공통 프로퍼티를 공유합니다. 
	- disabled : 필드가 비활성 상태임을 나타내는 불리언 
	- form : 필드가 속하는 폼을 가리키는 포인터, 이 프로퍼티는 읽기 전용
	- name : 필드 이름
	- readOnly : 필드가 읽기 전용인지를 나타내는 불리언입니다. 
	- tabIndex : 필드의 탭 순서를 나타냅니다. 
	- type : "checkbox"나 "radio" 같은 필드 타입 
	- value : 서버에 전송할 필드 값. 파일 입력 필드에서는 이 프로퍼티가 읽기전용이며 컴퓨터에 존재하는 파일의 경로 

form을 제외한 프로퍼티는 전부 자바스크립트에서 동적으로 설정이 가능. 
ex)
var form = document.getElementById("myForm");
var field = form.elements[0];

// value 변경
field.value = "Another value";

// form 확인
alert(field.form === form); // true

// 필드에 포커스 부여
fields.focus();

// 필드 비활성화
field.disabled = ture;

// 필드 타입 변경(권장하지는 않지만 <input>에서 가능)
field.type = "checkbox";

공통 폼 필드 메서드 focus(), blur()
focus() 메서드는 브라우저의 포커스를 폼 필드에 옮겨서 필드를 활성화 시키며
키보드 이벤트에 응답하게 합니다. 
ex)
EventUtil.addHandler(window, "load", function(event){
	document.forms[0].elements[0].focus(); // * hidden이거나 display none일때 에러 발생 
})

다른 방법으로 HTML5에서는 폼 필드에 autofocus 속성을 이용하는 방법이 있다. 
<input type = "text" autofocus> // autofocus는 불리언 값. 

반대로 요소에서 포커스를 제외하는 메서드가 blur()
다른 데로 포커슬 옮기는게 아니라 그저 해당 필드에서 포커스만 제거. 


폼 필드 공통 이벤트 
	- blur : 필드가 포커스를 잃을 때 발생합니다. 
	- change : 필드가 포커스를 잃고 <input> 이나 <textarea> 요소에서는 value가 바뀔 때,
				<select>요소에서는 선택된 옵션이 바뀔 때 발생합니다. 
	- focus : 필드가 포커스를 받을 때 발생합니다. 

ex)
숫자만 입력할 수 있는 텍스트 박스.
focus이벤트로 배경색을 바꿔서 필드에 포커스가 있음을 분명히 나타내고, 
blur이벤트로 배경색을 원래대로 돌리며,
chage이벤트에서는 숫자가 아닌 문자가 입력되었을 때 배경색을 빨갛게 바꿈. 

var textbox = document.forms[0].elements[0];

EventUtil.addHandler(textbox, "focus", function(event){
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);

	if(target.style.backgroundColor != "red"){
		target.style.backgroundColor = "yellow";
	}
});

EventUtil.addHandler(textbox, "blur", function(event){
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);

	if (/[^\d]/.test(target.value)){
		target.style.backgroundColor = "red";
	} else {
		target.style.backgroundColor = "";
	}
});

EventUtil.addHandler(textbox, "change", function(event){
	event = EvnetUtil.getEvent(event);
	var target = EventUtil.getTarget(event);

	if(/[^\d]/.test(target.value)){
		target.style.backgroundColor = "red";
	} else {
		target.style.backgroundColor = "";
	}
});

14.2 텍스트 박스 스크립트 

한 줄짜리 텍스트 박스 <input>
	size 속성 : 텍스트 박스에 몇 글자를 렌더링 할지
	value 속성 : 텍스트 박스의 초기값
	maxlength 속성 : 박스에 최대 몇 글자까지 입력할 수 있는지 나타냄. 

ex) <input type = "text" size = "25" maxlength = "50" value = "initial value">

여러 줄짜리 텍스트 박스 <textarea>
	rows : 텍스트 박스의 세로 크기
	cols : 텍스트 박스의 가로크기(input의 size 속성과 동일)

ex) <textarea rows = "25" cols = "5"> initial value </textarea>

텍스트 박스 값을 읽고 쓸 때는 표준 DOM메서드보다 value 프로퍼티를 이용하길 권장 
(안될 때가 있음)
ex)
var textbox = document.forms[0].elements["textbox1"];
alert(textbox.value);

textbox.value = "Some new value";


14.2.1 텍스트 선택
위의 <input> 과 < textarea>는 텍스트 전체를 선택하는 
select() 메서드를 지원 . 
ex) 
textbox.select(); 

텍스트 박스로 포커스를 옮기면 전체 텍스트를 선택하는 일이 일반적이며 
텍스트 박스에 기본 값이 있을 때는 거의 항상 전체를 선태갛ㅂ니다. 

이런 기본 동작에는 사용자가 텍스트를 직접 지우고 입력하는 수고를 덜어주려는 의도가 있음. 
ex)

EventUtil.addHandler(textbox, "focus", function(event){
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);

	target.select();
});


select 이벤트 
selcet() 함수에 호응하는 select 이벤트도 있다. 
이 이벤트는 텍스트 박스의 텍스트를 선택할 때 발생. (정확한 시점은 브라우저에 따라 다름)

선택한 텍스트 가져오기
select 이벤트는 텍스트를 선택한 시점은 알 수 있지만 선택된 텍스트 값에 관한 정보는 전혀 제공하지 않는다. 
따라서 텍스트 박스에 HTML5는 프로퍼티를 두 개 추가했는데,
selectionStart와 selectionEnd 두 가지이다. 
이들 프로퍼티에서는 텍스트 경계를 나타내는 숫자가 들어있다. 
ex)

function getSelectedText(textbox){
	return textbox.value.substring(textbox.selectionStart,
									textbox.selectionEnd);
} // substring()은 문자열 오프셋을 매개변수로 받으므로, 두 값을 넘겨서 선택된 텍스트를 가져올 수 있다. 

텍스트 일부 선택 
HTML5에서는 텍스트 일부만 선택하는 메서드도 추가되었음.
setSelectionRange(선택할 텍스트의 첫 번째 문자 인덱스, 선택할 텍스트의 마지막 문자 인덱스)

ex)
textbox.value = "Hello world!"

// 전체 선택 
textbox.setSelectionRange(0, textbox.value.length); // "Hello world!"

// 첫 세글자 선택
textbox.setSelectionRange(0, 3); // "Hel"

// 인덱스 4부터 6까지 선택
textbox.setSelectionRange(4, 7); // "o w"

*선택된 텍스트를 확인하려면 반드시 호출 직저니안 직후에 텍스트 박스로 포커스를 옮겨야함. 

14.2.2 입력 필터링 
특정 타입이나 형식에 맞는 데이터만 받는 일에 사용한다. 

	- 문자 거부 
	문자를 텍스트 박스에 삽입할 때는 keypress 이벤트가 발생한다. 
	이 이벤트의 기본 동작을 취소하여 특정 문자를 차단할 수 있다. 

	// 모든 키 입력 차단 
	EventUtil.addHandler(textbox, "keypress", function(event){
		event = EventUtil.getEvent(event);
		EventUtil.preventDefault(event);
	});

	특정 문자만 차단하려면 이벤트의 문자 코드를 알아내고, 
	기본 동작을 취소 또는 허용해야 한다. 

	// 숫자만 입력 허용 
	EventUtil.addHandler(texbox, "keypress", function(event){
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		var charCode = EventUtil.getCharCode(event);

		if(!/\d/.test(String.fromCharCode(charCode))){ // /\d/는 정규 표현식이다. 
			EventUtil.preventDefault(event);
		}
	})

	// 브라우저 호환과 Ctrl키 입력 허용 추가 코드 
	EventUtil.addHandler(textbox, "keypress", function(event){
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		var charCode = EventUtil.getCharCode(event);

		if(event.ctrlKey === 13){
			console.log(1);
			EventUtil.preventDefault(event);
		}
	});

클립보드 활용
클립보드와 관련된 이벤트는 다음 여섯 가지. 

	- beforecopy : 복사하기 직전에 발생 
	- copy : 복사할 때 발생 
	- beforecut : 잘라내기 직전에 발생 
	- cut : 잘라낼 때 발생
	- beforepaste : 붙여넣기 직전에 발생 
	- paste : 붙여넣을 때 발생 

before류는 실제 이벤트가 발생하기 전에 데이터를 수정해야 할 떄 사용합니다. 
그러나 실제 동작을 취소하려면 반드시 copy, cut, paste 이벤트에서 해야합니다. 

이런 클립보드 데이터는 window 객체나 event 객체의 프로퍼티인 
clipboardData 객체를 통해 접근할 수 있습니다. 

텍스트 박스에 특정 문자만 받거나 형식에 맞는 텍스트만 받는다면
클립보드 텍스트를 읽는 기능이 유용할 수 있습니다. 
예를 들어 텍스트 박스에 숫자만 허용한다면 '값을 붙여넣을 때도' 반드시 유효성을 
확인해야 합니다. 

다음 예는 paste 이벤트에서 클립보드의 텍스트가 잘못된 것인지 판단하고 
그렇다면 기본 동작을 취소하는 예제 (숫자만 입력 가능)

EventUtil.addHandler(textbox, "paste", function(event){
	event = EventUtil.getEvent(event);
	var text = EventUtil.getClipboardText(event);

	if(!/^\d*$/.test(text)){
		EventUtil.preventDefault(event);
	}
});

14.2.3 자동 탭 이동 
14.2.4 HTML5 유효성 검사 API
14.3 <select> 요소 스크립트 
14.4 폼 직렬화 
Ajax가 등장하면서 '폼 직렬화'가 주요 과제가 되었습니다. 
자바스크립트로 폼을 직렬화할 때는 
type과 name, value 프로퍼티를 함께 사용합니다. 

브라우저가 서버로 폼을 전송할 때 어떻게 하냐면-

	- 필드 이름과 값을 URL 인코드하고 앰퍼샌드(&)로 구분합니다. 
	- 비활설 필드는 전송하지 않습니다. 
	- 체크 박스와 라디오 버튼은 체크된 것만 전송합니다. 
	- type이 "reset"이나 "button"으로 지정된 버튼은 전송하지 않습니다. 
	- 다중 선택 필드는 선택된 항목을 모두 전송합니다. 
	- 폼을 전송할 때 전송 버튼을 클릭했다면 해당 버튼을 전송하며,
	  그렇지 않다면 전송 버튼은 보내지 않습니다. type이 "image"로 지정된
	  <input>요소는 전송 버튼과 같이 취급합니다. 
	- <select> 요소의 값은 선택된 <option> 요소의 value 속성입니다. 
	  <option> 요소에 value 속성이 없다면 해당 요소의 텍스트를 값으로 사용합니다. 

*폼을 직렬활 할때는 일반적으로 버튼 필드는 포함하지 않습니다. 결과 문자열이 다른 방법으로 
전송될 수도 있기 때문입니다. 

폼 직렬화 코드 예제 
 ex)

function serialize(form){ // serializa 함수는 생성할 문자열의 각 부분을 담을 parts라는 배열을 먼저 생성합니다. 
	var parts = [],
		field = null,
		i,
		len,
		j,
		optLen,
		option,
		optValue;

	for (i = 0, len = form.elements.length; i < len; i++){ // for문으로 각 폼 필드를 순회하면서 그 참조를 
		field = form.elements[i];						   // field변수에 저장합니다. 

		switch(field.type){								   // field에 대한 참조를 가지고 type을 체크합니다. 
														   // 그 이후에 옵션 전체를 순화하며 선택된 옵션의 값을 추가하는 방식으로 
														   // 직렬화합니다. 
			case "select-one" : 
			case "select-multiple" :
				if(field.name.length){
					for(j = 0, optLen, field.options.length; j < optLen; j++){
						option = field.options[j];
						if(option.selected){
							optValue = "";
							if(option.hasAttribute){		//hasAttribue함수로 value속성에 무엇이 들어있는지 체크합니다. 
								optValue = (option.hasAttribute("value") ?
											option.value : option.text);
							} else {
								optValue = (option.attributes["value"].spectified ?
											option.value : option.text);
							}
							parts.push(encodeURIComponenet(field.name) + "=" +
									   encodeURIComponenet(optValue));
						}
					}
				}
				break;
			case undefined : 	// 필드셋
			case "file" : 		// 파일 입력(파일 필드에는 파일 콘텐츠가 들어 있긴 하지만 이들 필드를 흉내 낼 수 없으므로 생략)
			case "submit" : 	// 전송 버튼 
			case "reset" : 		// 리셋 버튼
			case "button" : 	// 커스텀 버튼 
				break;

			case "radio" : 		// 라디오 버튼 
			case "checkbox" : 	// 체크박스
				if(!field.checked){	// 체크가 true이면 default로 갑니다. 
					break;
				}
				/* 폴 백 */

			default : 
				// name 속성이 없는 필드는 전송하지 않음 
				if(field.name.length){	
					parts.push(encodeURIComponenet(field.name) + "=" +
							   encodeURIComponenet(field.value));
				}
		}
	}
	return parts.join("&");	// 필드 사이를 앰퍼샌드로 연결해 문자열 형식을 정확히 맞춥니다. 
}

14.5 리치 텍스트 편집 
14.5.1 contenteditable 
이 속성은 페이지의 어느 요소에도 지정할 수 있으며, 지정하는 즉시 요소는 
사용자가 편집  가능한 상태가 됩니다. 

ex)
<div class = "editable" id = "richedit" contenteditable></div>

요소에 들어 있던 텍스트는 자동으로 편집 가능한 상태가 되는데 
<textarea>요소와 비슷합니다. 

요소의 contectEditable 프로퍼티를 설정하여 편집 모드를 토글(불리언과 비슷한 개념)할 수 잇습니다. 

14.5.2 리치 텍스트 편집 
리치 텍스트를 편집하는 방법은

document.execCommand()입니다. 

이 메소드는 문서에서 이름 붙은 명령어를 실행하며
거의 모든 형식을 적용할 수 있습니다. 

들어가는 인자로는 
1. 실행할 명령어 이름,
2. 브라우저에서 해당 명령어에 사용자 인터페이스를 제공해야 하는지 나타내는 불리언 값.
	*그러나 항상 false 를 써야한다. 
3. 명령어 실행에 필요한 값(없으면 null) 

명령어 		|			값(3번째 인자) 			|	설명

backcolor 				색깔을 나타내는 문자열 		문서 배경색을 설정합니다. 

blod 					null						선택한 텍스트에서 볼드체를 토글합니다. 

copy					null						선택한 텍스트를 클립보드로 복사합니다. 

createlink				URL 문자열 					현재 선택한 텍스트를 주어진 URL을 가리키는 링크로 만듭니다. 

cut 					null						선택한 텍스트를 잘라내 클립보드로 옮깁니다. 

delete					null						현재 선택된 텍스트를 삭제합니다. 

fontname				폰트이름					선택한 텍스트를 주어진 폰트로 바꿉니다. 

fontsize				1-7							선택한 텍스트의 글씨 크기를 바꿉니다. 

forecolor 				색깔을 나타내는 문자열 		선택한 텍스트의 색깔을 바꿉니다. 

formatblock				HTML 태그(<h1>등) 			선택한 텍스트 박스 전체를 주어진 HTML 태그로 감쌉니다. 

indent					null						텍스트를 들여 씁니다. 

inserthorizontalrule	null						캐럿 위치에 <hr>요소를 삽입합니다. 

insertimage				이미지 URL 					캐럿 위치에 이미지를 삽입합니다. 

insertorderdlist		null						캐럿 위치에 <ol>요소를 삽입합니다. 

insetparagraph			null						캐럿 위치에 <p> 요소를 삽입합니다. 

insertunorderedlist		null						캐럿 위치에 <ul> 요소를 삽입합니다. 

italic					null						선택한 텍스트에서 이탤릭체를 토글합니다. 

justifycenter			null						캐럿이 있는 텍스트 블록을 중앙 정렬합니다. 

justifyleft				null						캐럿이 있는 텍스트 블록을 왼쪽 정렬합니다. 

outdent					null						텍스트를 내어 씁니다. 

paste					null 						선택한 텍스트에 클립보드 내용을 붙여넣습니다. 

removeformat			null 						캐럿이 있는 텍스트 블록에서 형식(태그)을 제거. 
													formatblock의 반대 역할입니다. 
selectall 				null						문서의 텍스트 전체를 선택합니다. 

underline				null						선택한 텍스트에서 밑줄 스타일을 토글합니다. 

unlink					null						텍스트에서 링크를 제거합니다. 
													createlink의 반대 역할입니다. 

* 사파리와 크롬은 paste가 없습니다. 

ex)
// 아이프레임 텍스트에서 볼드체를 토글합니다. 
frames["richedit"].document.execCommand("bold", false, null);

// 아이프레임 텍스트에서 이탤릭체를 토글합니다. 
frames["richedit"].document.execCommand("italic", false, null);

// 아이프레임 텍스트에 wrox 사이트 링크를 생성합니다. 
frames["richedit"].document.execCommand("createlink", false, "http://www.wrox.com");

// 아이프레임 텍스트를 h1요소로 감쌉니다. 
frames["richedit"].document.execCommand("formatblock", false, "<h1>");

아이프레임 참조 대신 현재 창의 document 객체에서 같은 메서드를 호출하면 contenteditable 부분이 바뀝니다. 
ex)
// 볼드체 토글 
document.execCommand("bold", false, null);


queryCommandEnabled()
주어진 명령어를 현재 선택된 텍스트에서 실행할지 캐럿 위치에서 실행할지 판단하는 함수 

매개변수로 체크할 명령어 이름을 받아서, 
명령어를 실행할 수 있으면 true, 없으면 false 를 반환한다. 

ex)
var result = frames["richedit"].document.queryCommandEnabled("bold");

queryCommandState()
주어진 명령어가 현재 선택된 텍스트에 적용되었는지 판단 
적용되어있으면 true, 아니면 false를 반환 . 

queryCommandValue() 
명령어를 실행할 때 어떤 값을 넘겼었는지 반환하는 함수. 
이 메서드는 명령어가 텍스트에 어떻게 적용됐는지 판단하여 다음 명령어가 적절한지 알아보는 데 쓰인다. 

14.5.3 리치 텍스트 선택 
아이프레임의 getSelection() 메서드로 리치 텍스트 에디터에서 선택한 범위를 
정확히 알 수 있습니다. 이 메서드는 document 객체와 window 객체에서 모두 
사용 가능하며 현재 선택된 텍스트를 나타내는 Selection 객체를 반환합니다. 
각 Selection 객체의 프로퍼티는 다음과 같습니다. 

	- anchorNode : 선택이 시작된 노드입니다. 
	- anchorOffset :  anchorNode에서 선택 지점 앞에 존재하는 글자 개수입니다. 
	- focusNode : 선택이 끝나는 노드입니다. 
	- focusOffset : focusNode에서 선택에 포함된 글자 개수입니다. 
	- isCollapsed : 선택 범위의 시작점과 끝점이 일치하는지 나타내는 불리언 값
	- rangeCount : 선택에 포함된 DOM 범위 개수 

	Selection 객체의 프로퍼티에서는 유용한 정보가 별로 없습니다. 
	다행히 다음 메서드에서 정보를 더 얻을 수 있고 선택을 조작할 수도 있습니다. 

	- addRange(range) : 선택 영역에 주어진 DOM 범위를 추가합니다. 
	- collapse(node, offset) : 주어진 노드에서 주어진 텍스트 오프세스을 접습니다. 
	- collapseToEnd() : 선택을 끝점으로 접습니다. 
	- collapseToStart() : 선택을 시작점으로 접습니다. 
	- containsNode(노드) : 주어진 노드가 선택 안에 있는지 판단합니다. 
	- deleteFromDocument() : 선택한 텍스트를 문서에서 삭제합니다. execCommand("delete", false, null) 과 동일 
	- extend(노드, 오프셋) : focusNode와 focusOffset을 주어진 값 만큼 이동해서 선택 영역을 늘립니다. 
	- getRangeAt(index) : 선택에서 주어진 인덱스에 해당하는 DOM 범위를 반환합니다. 
	- removeAllranges() : 선택에서 DOM 범위를 모두 제거합니다. 선택에는 반드시 범위가 최소 한 개는 있어야 하므로 
						  이 메서드는 결국 선택을 해제합니다. 
	- removeRange(range) : 선택에서 주어진 DOM 범위를 제거합니다. 
	- selectAllChildren(node) : 선택을 해제하고 주어진 노드와 그 자식 노드를 모두 선택합니다. 
	- toString() : 선택한 텍스트 콘텐츠를 반환합니다. 

	이 메서드들은 execCommand()보다 더 세밀히 편집할 수 있습니다. 
	ex)
	var selection = frames["richedit"].getSelection();

	// 선택한 텍스트를 가져옴 
	var selectedText = selection.toString();

	// 선택에 해당하는 범위를 가져옴 
	var range = selection.getRangeAt(0);

	// 선택한 텍스트 강조 
	var span = frames["richedit"].document.createElement("span");
	span.style.backgroundColor = "yellow";
	range.surroundContents(span); 


14.5.4 폼의 리치 텍스트 
리치 텍스트 에디터는 폼 컨트롤이 아니라 iframe이나 contenteditable이 지정된 요소를 써서 
구현하므로 엄밀히 말해 '폼에 속하지 않습니다.'
즉, 편집한 HTML을 서버에 전송하려면 직접 HTML을 추출해서 전송해야 합니다. 
이런 형태의 전송을 사용자에게 명시적으로 보여줄 필요는 없으므로 일반적으로 hidden 필드를 통해서 
업데이트된 HTML을 전송합니다. 
즉, 폼을 전송하기 직전에 iframe이나 contenteditable 요소에서 HTML을 추출해 hidden 필드에 삽입하는 겁니다. 

ex)
// 아이프레임에서 편집한 리치 텍스트를 폼의 onsubmit 이벤트 핸들러에서 추출해 삽입하는 코드 
EventUtil.addHandler(form, "submit", function(event){
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	target.elements["comments"].value = frames["richedit"].document.body.innerHTML;
});

iframe document.body의 innerHTML 프로퍼티에서 HTML을 가져와서 "comments"라는 폼 필드에 삽입했습니다. 
이렇게 하면 폼을 전송하기 직전에 'comments' 필드에 편집한 텍스트가 포함됩니다. 