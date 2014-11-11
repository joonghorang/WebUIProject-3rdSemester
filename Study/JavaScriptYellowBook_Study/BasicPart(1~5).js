
3.6.7. break문과 continue문
문장 레이블과 break 및 continue문의 조합.
루프를 유연하게 만들 수 있지만 과용하면 디버그에 문제가 생길 수 있따.
레이블 이름은 항상 해당 레이블의 의도를 설명할 수 있게 정하고 루프를 너무 많이 중첩하지 않도록 한다. 


(function mainFunction(){
	var num = 0;
	outermost :
	for(var i = 0; i < 10; i++) {
		for(var j = 0; j < 10; j++){
			if(i === 5 && j ===5){
				break outermost;
			}
			num++;
		}
	}
	console.log(num);
})();    

3.6.8 with문 
with문은 코드의 스코프를 특정 개체에 고정한다.
with문의 원래 의도는 특정 객체를 코드에서 매우 자주 참조할 때 편리하게 작성하는 것. 
즉 
var qs = location.search.substring(1);
var hostName = location.hostName;
var url = location.href;
이 코드를 아래와 같이 줄여 쓸 수 있다. 

with(location){
	var qs = search.substring(1);
	var hostName = hostname;
	var url = href;
}
console.log(qs, hostName, url);

3.7.1 매개변수의 이해
아래와 같은 코드로 매개변수가 총 몇개 넘어왔는지 알수 있다.
매개변수란 일종의 배열로, 실제로 arguments[0]과 같은 코드로 접근할 수 있다.
그러나 그 배열에 새로운 값을 할당하려고 하면 에러가 뜬다.

function howManyArgs(){
	alert(arguments.length);
}

3.7.2. 오버로딩 없음
자바 스크립트에는 오버로딩이 없다. 이는 함수 시그니처가 없기 때문이다. 
같은 이름으로 함수를 여러 번 정의하면 마지막 함수가 해당 이름을 소유한다. 






4장 변수와 스코프, 메모리

자바스크립트에서 변수는 가져야할 데이터 타입에 대한 규칙이 없으므로 변수의 값과 데이터 타입은 스크립트 실행 중에 바뀔 수 있다.
'원시값'은 단순한 데이터이며 '참조값'은 여러 값으로 구성되는 객체를 가리킨다. 

변수에 값을 할당하면 자바스크립트 엔진은 해당 값이 원시 데이터인지 참조인지를 우선 판단.
원시값은 변수에 저장된 실제 값을 조작하게 되고,
참조값은 해당 객체에 대한 '참조'를 조작하는 것이 ㄹ뿐이다. 

참조값을 다룰 때는 언제든 프로퍼티와 메서드를 추가하거나 바꾸고 삭제할 수 있다. 

var person = new Object();
person.name = "Nicholas";
alert(person.name); // 'Nicholas'

원시값은 이와 같이 동적으로 프로퍼티를 추가하거나 할 수 없다. 

4.1.4 타입 판별

typeof 연산자는 변수가 원시 타입인지 아닌지 판별하기에 최상이다.
값이 객체이거나 null이면 "object"를 반환한다. 그 외에는 전부 원시 값.

object 객체안을 구분하려면 instanceof연산자를 사용한다.
반환 값으로 불리언이 리턴되는데

alert(person instanceof Object); // person변수가 Object의 인스턴스(형)인가?

와 같은 식으로 사용한다. 모든 참조값은 Object의 인스턴스인 것으로 정의되어 있으므로 참조 값이나
Object생성자에 instanceof 연산자를 사용하면 항상 true를 반환. 그게 아니라면 항상 false를 반환한다.
따라서 제한적인 typeof 연산자보다 instanceof 연산자를 사용하는 것을 추천.






5장 참조타입

5.1 Object타입

참조 값(객체)이란 특정 '참조 타입'의 인스턴스입니다. 즉 참조 타입은 데이터와 기능을 그룹으로 묶는 구조.
참조 타입은 객체가 가져야 할 프로퍼티와 메서드를 정의한다는 점 때문에 '객체 정의'라 불리기도 함

var person = new Object();
person.name = "Nicholas";
person.age = 29;

참조 타입 Object의 인스턴스를 생성해서 변수 person에 할당함. 

임의의 매개변수를 자바처럼 Object 타입으로 받고 싶다면 함수에 
function displayInfo(args){} 와 같이 표기하고
displayInfo({
	name : "Jack",
	age : 29
}); 와 같이 사용한다. 

그리고 아래의 두 표기법은 같은데
person["name"]
person.name

대괄호 표기법을 사용하면 문법에러를 일으키는 문자가 들어있거나 키워드 및 예약어에 해당하는 프로퍼티와
이름에도 접근할 수 있다. 즉

person["first name"] = "Nicholas";

와 같은 표현이 가능하다.
그러나 일반적으로는 점 표기법이 더 좋다. 

5.2 Array 타입
자바스크립트의 배열 슬롯에는 어떤 타입의 데이터라도 넣을 수 있다. 
또한 동적으로 크기를 조절하므로 따로 어레이 크기를 지정해줄 필요가 없다.

var colors = new Array();
var colors = Array();
또는
var colors = [];

몇 개 들어갈지 알고 있다면
var colors = new Array(20);

하지만 그 뒤에 추가로 더 넣을 수도 있다.
특히 매번 마지막에 하나씩 추가로 넣고 싶다면

colors[colors.length] = "something";
으로 추가할 수 있다. 

해당 오브젝트가 배열인지 아닌지 확인하려면
Array.isArray() 함수를 사용한다. 

join() 메서드는 구분자가 될 문자열을 매개변수로 받고 배열 데이터를 모두 포함한 문자열을 반환한다.

var colors = ["red", "green", "blue"];
alert(colors.join(",")); // red,green,blue
alert(colors.join("||")); // red||green|blue

더불어 자바스크립트에서 배열은 stack 연산을 할 수 있다.
colors.push("something"); // 마지막에 something을 집어넣음.
colors.pop(); // 마지막 아이템이 나옴.
해당 value값을 리턴하기 때문에 
var lastColor = colors.pop(); 으로 응용가능.

첫번째 값을 꺼내고 싶다면
colors.shift();

배열의 첫번째 슬롯에 값을 넣고 싶다면
colors.unshift();

배열을 정렬하는 메서드가 있다. 
reverse() 메서드는 단순히 배열에 저장된 데이터의 순서를 뒤집는다.
sort()는 기본적으로 데이터를 정순, 즉 가장 값이 작은 것부터 큰 순으로 정렬한다. 그러나 toString()함수가
배면에서 동작하기 때문에 숫자를 정렬하는데는 적합하지 않고, 비교함수를 추가로 작성하여 넣어주어야 한다.

function compare(value1, value2) {
	if(value1 < value2){
		return -1;
	} else if (value1 > value2){
		return 1;
	} else {
		return 0;
	}
}

이 비교 함수는 대부분의 데이터 타입에서 동작하며 이 함수를 sort에 매개변수로 넘겨준다.
colors.sort(compare); 

역순으로 정리하려면 compare 함수의 return 값을 바꾼다.

배열에 들어 있는 데이터를 조작하는 메서드로는
concat() 함수가 있다.  이 메서드는 현재 배열 데이터를 기반으로 새로운 배열을 리턴한다.
먼저 현재 배열을 복사한 다음, 메서드의 매개변수를 새 배열의 마지막에 추가해서 반환한다. 

slice() 함수는 배열에 포함된 데이터 일부를 가진 새 배열을 만든다. 
매개변수를 두 개 받는데 가져올 데이터 범위의 시작과 끝이다. 
매개변수를 하나만 넘기면 해당 인덱스에서 끝까지 모든 데이터를 가져온다. 

slice()나 concat() 메서드는 원래 배열을 전혀 건드리지 않는다. 

가장 강력한 함수중 하나인 splice()는 
배열의 중간에 데이터를 삽입하는 데 사용한다. 반환 값은 배열이다. 또한 원본 배열에도 영향을 미친다. 
*삭제한 것이 없다면 빈 배열을 반환한다. 

삭제 - 삭제할 데이터는 첫 번째 매개변수(인덱스) 부터 두 번째 매개변수(개수) 만큼이다. 
예를 들어 splice(0, 2)는 처음 두 개를 삭제합니다.

삽입 - 매개변수를 세 개 이상 넘기면 배열에 데이터를 삽입할 수 있습니다. 
매개변수를 삽입할 위치, 0(즉, 아무것도 삭제하지 않습니다.), 삽입할 데이터 순으로 넘기면 됩니다.
예를 들어 splice(2, 0, "red", "green")은 배열 인덱스 [2]에 문자열 "red"와 "green"을 삽입

대체 - 삽입과 삭제를 조합하면 원하는 데이터를 다른 데이터로 대체할 수 있습니다. 
예를 들어 splice(2, 1, "red", "green")은 인덱스 2의 데이터를 삭제한 다음 문자열 "red" 와 "green"을 
인덱스2에 삽입합니다. 

ex)
var colors = ["red", "green", "blue"];
var removed = colors.splice(0,1); 		// 첫 번째 데이터 제거 
alert(colors); 							// green, blue
alert(removed); 						// red하나만 남은 배열

removed = colors.splice(1, 0, "yellow", "orange"); // 인덱스 1에 데이터 2개 추가
alert(colors); // green,yellow,orange,blue
alert(removed); // 빈 배열

removed = colors.splice(1, 1, "red", "purple"); // 데이터 2개를 추가하고 1개 제거
alert(colors); // green, red, purple, orange, blue
alert(removed); // yellow하나만 남은 배열

배열을 검색하는 함수는
indexOf(검색할 데이터, 검색을 시작할 인덱스번호)
이 함수는 맨 처음 데이터와 일치하는 값 하나만을 리턴한다. 그리고

찾은 인덱스를 반환하는데, 
찾지 못했을 때는 -1을 반환.

반복 메서드
every() - 배열의 모든 데이터에서 콜백 함수를 호출하고 반환 값이 전부 true이면 true를 반환
filter() - 배열의 모든 데이터에서 콜백 함수를 호출하고 반환 값이 true인 데이터를 새 배열에 저장하여 반환
forEach() - 배열의 모든 데이터에서 콜백 함수를 호출합니다. 이 메서드는 반환 값이 없습니다. 
map() - 배열의 모든 데이터에서 콜백 함수를 호출하고 그 결과를 새 배열에 저장하여 반환합니다.
some() - 배열의 모든 데이터에서 콜백 함수를 호출하고 반환 값 중 하나라도 true이면 true를 반환합니다.

이들 메서드는 원래 배열에 들어있던 데이터를 바꾸지는 않습니다. 

감소 메서드
reduce() - 모든 배열을 순회하면서 콜백 함수를 실행하고 값을 하나 만들어 반환한다. 
매개변수를 두 개 받는데 하나는 각 데이터에서 실행할 콜백함수고 
두번째 매개변수는 감소 작업을 시작할 초기 인덱스값. 

그리고 인자로 들어가는 콜백함수의 인자는
이전 값, 현재 값, 현재 값의 인덱스, 현재 배열 총 네개이다. 

이 메서드는 배열의 숫자를 모두 더하는 것 같은 작업에 쓸 수 있음.
ex)
var values = [1, 2, 3, 4, 5];
var sum = values.reduce(function(prev, cur, index, array){return prev + cur;});

5.5 Function 타입
모든 함수는 Function타입의 인스턴스이며 다른 참조 타입과 마찬가지로 프로퍼티와 메서드가 있다. 

즉 자바스크립트에서 함수는 다음 코드로 이해하는 것이 좋다.
var func = function(n){
	return n;
}
여기서 보면 알 수 있듯이 함수 이름은 필수도 아니고 중요하지도 않다. 

5.5.3 값처럼 쓰는 함수
함수 이름은 단지 변수일 뿐이므로 함수도 다른 값이 올 수 있는 곳이라면 어디든 올 수 있다.
이런 특징 덕분에 함수를 다른 함수에 매개변수로 넘기거나, 함수가 실행 결과로 다른 함수를 반환하는 
일이 가능하다.

function callSomeFunction(someFunction, someArg){
	return someFunction(someArg);
}
function add10(num){
	return num + 10;
}

var result1 = callSomeFunction(add10, 10);
alert(result1);

function getGreeting(name){
	return "Hello, " + name;
}

var result2 = callSomeFunction(getGreeting, "Nicholas");
alert(result2);

즉 여기서 callSomeFunction은 범용함수이다. 어떤 함수를 넘기든지 상관 없다.

5.5.4 함수의 내부구조
함수 내부에는 arguments, this라는 특별한 개체가 들어있다.
arguments는 함수에 전달된 매개변수를 모두 담아두는 일종의 배열이다. (수정은 불가능)
arguments.callee()함수는 arguments를 소유하고 있던 원래 함수이다. 
함수 내부에서 재귀적으로 함수를 호출할 때 이 표현을 사용한다. 

this역시 특별한 객체인데 함수가 실행중인 컨텍스트 객체에 대한 참조이다. 
ex)
window.color = "red";
var o = {color : "blue"};

function sayColor(){
	alert(this.color); // 여기서 this의 값은 함수를 호출하는 시점에 결정되므로 함수가 반환하는 값역시
						// 함수를 호출하는 시점에 따라 다르다. 
}

sayColor(); // 전역에서 호출하면 "red"

o.sayColor = sayColor;
o.sayColor(); // 지역에서 호출하면 "blue"

함수와 이름사이의 의존성을 제거하려면 arguments.callee.caller를 사용한다. 

5.5.5 함수 프로퍼티와 메서드
모든 함수에 공통인 프로퍼티로 length와 prototype이 있다. 
length프로퍼티는 함수가 넘겨받을 것으로 예상하는 이름 붙은 매개변수의 갯수이다. 

prototype은 모든 참조 타입의 인스턴스 메서드가 존재하는 곳이다. 
toString()이나 valueOf()같은 메서드는 prototype에 존재하며 객체 인스턴스는 이에 접근한다. 
prototype프로퍼티는 개발자 자신만의 참조 타입과 상속을 정의할 때 매우 중요하다. 

그 외에 apply()와 call() 메서드는 
모두 소유자인 함수를 호출하면서 this를 넘기는데, 결과적으로 함수 내부에서 this 객체의 값을 
바꾸는 것이나 마찬가지이다. 

ex)
function sum(num1, num2) {
	return num1 + num2;
}

function callSum1(num1, num2){
	return sum.apply(this, arguments); // 이 스코프의 들어온 arguments객체를 다른 함수로 넘김. 
}

function callSum2(num1, num2){
	return sum.apply(this, [num1, num2]); // 이 스코프의 num1, num2를 배열로 넘김
}

alert(callSum1(10,10)); // 20
alert(callSum2(10,10)); // 20

call() 메서드도 apply() 메서드와 마찬가지로 동작하지만 매개변수를 전달하는 방식이 다름.
this가 첫번째 매개변수 인 것은 똑같지만, call()을 사용할 때는 매개변수를 각각 나열해야한다. 
결과는 두 함수가 같다. 어느쪽을 쓸지는 순전히 개발자 마음
배열형태의 인자를 넘길 때는 apply()가 낫고, 
그렇지 않다면 call()이 낫다. 

apply()와 call()함수의 진가는 this를 바꾸는데 있다.

ex) 
window.color = "red";
var o = { color : "blue" };

function sayColor(){
	alert(this.color);
}

sayColor();	// red

sayColor.call(this); // red
sayColor.call(window); // red
sayColor.call(o); // blue 함수의 콘텍스트를 o로 설정함. 

call()이나 apply()를 써서 스코프를 바꾸면 객체마다 일일이 메서드를 등록하지 않아도 된다는 장점이 있다.

bind() 함수는 새로운 함수 인스턴스를 만드는데 그 this는 bind()에 전달된 값입니다. 
ex)

window.color = "red";
var o = { color : "blue" };

function sayColor(){
	alert(this.color);
}
var objectSayColor = sayColor.bind(o);
objectSayColor(); // blue 이렇게 되면 objectSayColor의 스코프는 sayColor스코프에 bind(묶인)된다. 

즉 objectSayColor()의 스코프가 어디가 되든 o의 스코프가 적용이 된다. 

5.6 원시 래퍼 타입

Boolean, Number, String  원시 값을 편리하게 조작하기 위해 디자인된 참조타입.
원시 값을 읽을 때마다 이에 해당하는 래퍼 타입이 이면에서 생성되므로 메서드를 사용할 수 있다.

즉,
var s1 = "some text";
var s2 = s1.substring(2); // 원래 s1은 원시 타입이기 때문에 하위 메서드가 존재할 리 없다. 

위 코드의 2번째 줄의 동작은 사실 아래와 같은 코드로 돌아가는 것.
var s1 = new String("some text");
var s2 = s1.substring(2);
s1 = null;

참조 타입과 원시 래퍼 타입의 주요 차이는 생명주기이다. new 연사자를 사용해 참조 타입의 
인스턴스를 만들면 스코프를 벗어날 때까지 메모리에 존재하지만,
자동으로 생성된 원시 래퍼 타입은 코드의 해당 행을 벗어나는 즉시 파괴된다. 

따라서 
s1.color = "red"; 
console.log(s1.color); // undefined
가 된다. 

5.6.1 불리언 타입

var booleanObj = new Boolean(true); 
그러나 주의할 점은 불리언 표현식에서는 모든 객체를 자동으로 true로 변환하므로
var result = falseObject && true; 와 같이 사용하면
falseObject가 false 인데도 계속 true 리턴한다. 

이럴 때는 원시 불리언 타입을 사용해서 
var falseObject = false;
로 지정해 주어야 falseObject는 false가 된다. 

따라서 불리언 객체는 쓰지 않는 것이 좋다. 

5.6.2 Number 타입

var numberObj = new Number(10); 

numberObj.toString(2); // "1010"
여기서 toString의 매개변수는 진법이다. 

numberObj.toFixed(2); // "10.00"
여기서 toFixed의 매개변수는 소수점 자리 표시이다. 
만약에 numberObj = 10.005 였다면 "10.01"을 리턴한다. 

numberObj.toExponential(1); // "1.0e+1"

숫자에 따라 유동적으로 
지수 표기법이나 소수점 표기법을 알아서 선택하여 반환하는 메서드
toPrecision()
var num = 99;
num.toPrecision(1); // "1e+2" 한자리 수로 표기(반올림함)
num.toPrecision(2); // "99"   두자리 수로 표기
num.toPrecision(3); // "99.0" 세자리 수로 표기 

하지만 typeof 나 instanceof에서 원시 숫자와 다르게 동작하므로
사용하지 않는게 좋다. 

5.6.3 String 타입
var stringObejct = new String("hello world");

문자열의 특정 문자에 접근하는 charAt() 과 charCodeAt() 두가지가 있다. 
CharAt() 메서드는 매개변수로 받은 인덱스에 위치한 문자를 한 글자로 ㅣㅇ루어진 문자열로 반환한다. 
ex)
var stringValue = "hello world";
alert(stringValue.charAt(1)); // "e"
이 표현은 다음과도 같다.
alert(stringValue[1]); 

charCodeAt()은 문자 코드를 반환한다. 
alert(stringValue.charCoeAt(1)); // "101"

문자열을 조작하는 메서드로 concat()은 문자열은 병합하여 그 결과를 반환한다.
ex)
var stringValue = "hello";
var result = stringValue.concat("world");
alert(result);		// "hello world"
alert(stringValue); // "hello"

즉 문자열의 뒤에 추가해준다. 또한 매개변수에 제한이 없어서
var result = stringValue.concat("world", "!");
와 같은 코드도 가능하다. 
그러나 실제 코드에서는 concat()보다 + 연산자가 훨씬 많이 쓰인다. 

그 외에 문자열 일부로 새 문자열을 만드는 메서드로는
slice(), substr(), substring() 세 가지가 있다.
세 함수 모두 첫번째 매개변수로 문자열을 가져올 '시작점'
두번째 매개변수로 slice()와 substring()은 가져올 문자열의 '끝점' 을 넣는다. (그 직전까지 가져온다)
substr()은 두 번째 매개변수가 가져올 문자들의 '갯수' 이다. 

문자열 안에서 원하는 문자열의 위치를 찾는 메서드로는
indexOf() 와 lastIndexOf() 두 가지이다. 
두 메서드는 모두 매개변수로 넘긴 문자열을 검색해 그 위치를 반환하며 못찾았을 때는 -1을 반환한다.

var stringValue =  "hello world";
console.log(stringValue.indexOf("o")); 		// 4 앞에서 부터 검색
console.log(stringValue.lastIndexOf("o")); 	// 7 뒤에서 부터 검색

두 번 째 인자를 받을 수도 있는데 이 인자는 검색의 시작점을 의미한다.
이를 응용하여 모든 문자열의 위치를 받을 수 있다.

var stringValue = "Lorem ipsum dolor sit amet, consectetur adipisicing elit";
var positions = new Array();
var pos = stringValue.indexOf("e"); // 초기값으로 가장 처음 e의 위치를 지정

while(pos > -1) {
	positions.push(pos);
	pos = stringValue.indexOf("e", pos + 1); // 원래의 pos값 + 1 위치를 시작점으로 지정하고 재검색 및 재정의
}

console.log(positions); // "3,24,32,35,52"

문자열 패턴 매칭 메서드
match()  
배열을 리턴하는데,
배열의 첫 번째 데이터는 패턴에 일치하는 문자열 전체이고
나머지 데이터는 패턴에서 지정한 캡처 그룹이다. 
즉 처음 하나는 찾아준다. 

var text = "cat, bat, sat, fat";
var pattern = /.at/;

var matches = text.match(pattern);
console.log(matches.index); // 0
console.log(matches[0]) // "cat"
console.log(pattern.lastIndex); // 0 

search() 메서드는 패턴을 찾는 메서드이다. 
일치하는 데이터를 못찾았을 떄는 -1을 반환하고 
일치하는 첫번째 패턴의 문자를 찾으면
해당 문자의 문장에서의 위치(숫자)를 반환한다. 

var text = "cat, bat, sat, fat";
var pos = text.search(/at/);
console.log(pos); // "1"

replace() 는 문자열의 일부를 바꾸는 메서드이다.
첫 인자는 찾을 문자열, 두 번째 인자는 그 문자를 교체할 새로운 문자열

첫 번째 매개변수가 문자열이라면 해당 문자열과 일치하는 첫 번째 문자열만 바꾼다.
일치하는 문자열 전체를 바꾸려면 다음과 같이 정규 표현식에 g플래그를 써서 
넘기는 방법 외에는 없다.

var text = "cat, bat, sat, fat";
var result = text.replace("at", "ond");
alert(result); 

result = text.replace(/at/g, "ond");
alert(result); 

replace()의 두 번째 매개변수에는 함수도 쓸 수 있다.
일치하는 것이 하나 뿐일 때 콜백함수는 자동으로 매개변수를 세 개 받는다.
일치하는 문자열,
해당 문자열의 위치,
마지막으로 전체 문자열.

만약 일치하는 것이 여럿일 때는 이들 모두가 매개변수로 전달되며
그 다음에는 매치한 위치, 마지막으로 원래 문자열이 전달된다. 

매개변수로 함수를 넘기면 세세하게 조정할 때 좋다.

ex)
function htmlEscape(text){
	return text.replace(/[<>"&]/g, function(match, pos, originalText){
		switch(match){
			case "<" :
				return "&lt;";
			case ">" :
				return "&gt;";
			case "&" :
				return "&amp;";
			case "\"":
				return "&quot;"; 
		}
	});
}

alert(htmlEscape("<p class=\"greeting\">Hello world!</p>")); 

패턴을 다루는 마지막 문자열 메서드는 split()
인자로 넘어온 구분자를 기준으로 분리해서 배열에 담아 배열을 반환한다.
옵션인 두 번째 매개변수는 반환 받을 배열의 크기를 지정한다.

ex)

var colorText = "red, blue, green, yellow";
var color1 = colorText.split(","); 		//["red", "blue", "green", "yellow"]
var color2 = colorText.split(",", 2);	//["red", "blue"]
var color3 = colorText.split(/[^\,]+/);	//["",",",",",",",""]


localeCompare() 메서드는 문자열 두개를 비교한 후 
다음의 3가지중 하나의 경우를 반환한다. 
1. 메서드를 호출하는 텍스트가 매개변수로 넘긴 문자열보다 알파벳 순서상 뒤에 있다면
음수를 반환합니다(거의 대부분 -1을 반환하지만 브라우저에 따라 값이 다를 수 있습니다.)
2. 메서드를 호출한 텍스트와 매개변수 문자열이 일치한다면 0을 반환.
3. 메서드를 호출하는 텍스트가 매개변수로 넘긴 문자열보다 알파벳 순서상 앞에 있다면 
양수를 반환합니다(거의 대부분 1을 반환하지만 브라우저에 따라 값이 다를 수 있습니다.)

ex)
var stringValue = "yellow";
console.log(stringValue.localeCompare("brick"));	// 1
console.log(stringValue.localeCompare("yellow"));	// 0
console.log(stringValue.localeCompare("zoo"));		// -1


5.7 내장된 싱글톤 객체
5.7.1 Global 객체
사실 전역 변수나 전역 함수라는 것은 존재하지 않습니다.
전역에서 정의한 변수와 함수는 모두 Global  객체의 프로퍼티가 됩니다. 

eval() 메서드
매개변수로 문자열을 하나 받는데, 이 안에 들어가면
어떤 변수나 함수도 전역처럼 사용할 수 있다. 
eval("function sayHi() {alert('hi'); }");
sayHi(); 

이들은 코드 파싱 단계에서는 문자열일 뿐이지만, 변수나 함의로 정의되는 시점은
eval()이 실행되는 시점이다. 
즉 특정 시점부터 실행하고 싶은 코드가 있다면 var temp 와 같은 객체에 넣어두었다가
eval(temp); 로 살려서 사용 가능하다. 

Window객체 
Global 객체는 일반적으로 직접 접근 불가능하다. 
그래서 전역 스코프에서 선언한 변수와 함수는 모두 window 객체의 프로퍼티가 된다. 

5.7.2 Math 객체
각종 수학 공식과 상수를 Math 객체에 저장해 두었다. 
그중 min(), max() 메서드는 최소값과 최대값을 찾아준다.

var max = Math.max(3, 54, 32, 16);
console.log(max);

var min = Math.min(3, 54, 32, 16);
console.log(min); 

배열 데이터에서 최대값이나 최소값을 찾을 때는 apply() 메서드를 응용한다.

var values = [1, 2, 3, 4, 5, 6, 7, 8];
var max = Math.max.apply(Math, values); 

즉 apply()의 첫번째 매개변수로 Math를 넘겨서 this가 정확히 설정되도록 하는 것이다. 
이렇게 하면 두 번째 매개변수로 배열을 넣었을 때 올바르게 작동한다.


random() 메서드
Math.random() 메서드는 0과 1사이의 난수를 반환하되 0이나 1을 반환하지는 않습니다. 

따라서 floor() 메서드와 같이 사용하여 정수로 만들어 사용합니다. 
var num = Math.floor(Math.random() * 10 + 1); 

만약 2 와 10 사이의 난수를 원한다면 
원하는 경우의 수는 9 이고
그 중 가장 작은 겂은 2 이므로 다음과 같이 하면 됩니다. 

var num = Math.floor(Math.random() * 9 + 2); 

그리고 이를 자동으로 생서해주는 함수를 선언하는 것이 가장 현명합니다.
function selectFrom(lowerValue, upperValue){
	var choices = upperValue - lowerValue + 1;
	return Math.floor(Math.random() * choices + lowerValue);
}
var num = selectFrom(2, 10);
alert(num); // 2와 10 사이의 난수, 2와 10을 포함. 

