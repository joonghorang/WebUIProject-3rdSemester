6장 객체 지향 프로그래밍 

객체는 특별한 순서가 없는 값의 배열.
각 프로퍼티와 메서드는 이름으로 구별하며 값에 대응할 뿐. 

따라서 객체를 일종의 해시 테이블이라고 생각하면 이해하기 쉽다. 
즉 객체는 이름 - 값 쌍의 그룹이며 각 값은 데이터나 함수가 될 수 있다. 

6.1 객체에 대한 이해하기
객체를 만드는 가장 단순한 방법은 Object인스턴스를 만들고 
여기에 프로퍼티와 메서드를 추가하는 방법.

var person = new Object();
person.name = "joong";
person.age = 29;
person.sayName = function(){
	console.log(this.name);
};

6.1.1 프로퍼티 타입
프로퍼티에는 데이터 프로프티와 접근자 프로퍼티 두 가지 타입이 있습니다. 

데이터 프로퍼티는 데이터 값에 대한 단 하나의 위치를 포함하여 이 위치에서 값을 읽고 씁니다. 
이를 수정하려면 Property() 메서드를 써야 합니다. 
이 메서드는 인자로 수정할 객체, 프로퍼티 이름, 서술자 객체 세 가지를 받습니다. 

var person = {};
Object.defineProperty(person, "name", {
	writable : false, 		// person의 name프로퍼티 쓰기 금지 
	configurable : false, 	// person의 name프로퍼티 수정 금지
							// writable외의 다른 속서응ㄹ 수정하려고 하면 이제 에러가 발생한다. 

	value : "joong"
});

console.log(person.name); // "joong"
person.name = "Joongil"; 
console.log(person.name); // 쓰기 금지를 프로퍼티에 설정해 두었기 때문에  "Joong"

접근자 프로퍼티에는 데이터 값이 들어 있지 않고 대신 getter 함수와 setter 함수로 구성된다. 
접근자 프로퍼티를 읽을 때는 getter 함수가 호출되며 유효한 값을 반환할 책임은 이 함수에 있다.

접근자 프로퍼티는 명시적으로 정의할 수는 없고 반드시 Object.defineProperty()를 사용해야 한다. 

ex)
var book = {
	_year : 2004,
	edition : 1
};

Object.defineProperty(book, "year", {
	get : function(){
		return this._year;
	},
	set : function(newValue){
		if(newValue > 2004) {
			this._year = newValue;
			this.edition += newValue - 2004;
		}
	}
});

book.year = 2005;
console.log(book.edition); // 2

6.1.2 다중 프로퍼티 정의
객체에서 프로퍼티 여러 개를 동시에 수정할 때는 Object.defineProperies()를 쓴다. 
이 메서드는 서술자를 이용해 여러 프로퍼티를 한 버넹 정의한다. 
매개변수는 프로퍼티를 추가하거나 수정할 객체, 그리고 프로퍼티 이름이 추가 및 수정할 프로퍼티 이름과
대응하는 객체 두 가지다. 

var book = {};

Object.defineProperties(book, {
	_year: {
		value: 2004
	},

	edition: {
		value: 1
	},

	year: {
		get: function(){
			return this._year;
		}
	},

	set: function(newValue){
		if (newValue > 2004){
			this._year = newValue;
			this.edition += newValue - 2004;
		}
	}
});

이 코드는 book 객체에 _year와 edition 두가지 데이터 프로퍼티와 접근자 프로퍼티 year(year의 get, set함수)
를 생성한다. 결과 자체는 위 방식들과 같다. 

6.1.3 프로퍼티 속성 읽기 
Object.getOwnPropertyDescriptor() 메서드를 사용해 원하는 프로퍼티의 서술자 프로퍼티를 읽을 수 있다.
모든 객체에 사용가능하다.

매개변수로 프로퍼티가 포함된 객체, 서술자를 가져올 프로퍼티 이름을 받는다.

반환 값은 해당 프로퍼티의 성격마다 다른데, 
접근자 프로퍼티에서는 confiurable과 enumerable, get,set을 프로퍼티로 포함하는 객체를 반환하고
데이터 프로퍼티에서는 confiurable과 enumerable, writable, value를 프로퍼티로 포함하는 객체를 반환한다. 

6.2 객체 생성한다

6.2.1 팩터리 패턴

function createPerson(name, age, job){
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function(){
		alert(this.name);
	};
	return o;
}

var person = createPerson("Kim", 29, "Software Engineer");

이 패턴의 단점은 생성한  객체가 어떤 타입인지 알 수 없다.

6.2.2 생성자 패턴

function Person(name, age, job){
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = function(){
		alert(this.name);
	};
}

var person = new Person("Kim", 29, "Software Engineer");

팩토리 패턴과 다름점은
1. 명시적으로 객체를 생성하지 않습니다.(new 연산자를 통해 생성합니다.)
2. 프로퍼티와 메서드는 this 객체에 직접적으로 할당됩니다.
3. return 문이 없습니다. 
4. 생성자 함수이름의 시작을 대문자(Person)로 시작한다. (일반 함수는 소문자로 시작함.)

그렇기 때문에
console.log(person instanceof Person); // true

new를 이용하지 않고, 
스코프를 이용해서 생성하는 방법은
var o = new Object();
Person.all(o, "Kim", 29, "Nurse");
o.sayName(); // "Kim"

생성자 패러다임의 주요 문제는 인스턴스마다 메서드가 생성된다는 점.
따라서 함수를 밖으로(전역으로) 빼주는 것이 좋다.

function Person(name, age, job){
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = sayName;
}

function sayName(){
	alert(this.name);
}

var person = new Person("Kim", 29, "Hall");

그러나 이 해결방법도 함수를 전역에 놓음으로서 전역 스코프를 어지럽힌다는 단점이 있다.

6.2.3 프로토타입 패턴

function Person(){
	// 비워둔다.
}

Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
	console.log(this.name);
};

var person1 = new Person();
person1.sayName(); // "Nicholas"

프로토타입 패턴은 프로퍼티와 메서드를 모든 인스턴스에서 공유하므로 
만약 person2 = new Person(); 으로 새로운 객체를 만들었다하더라도,
같은 프로퍼티와 함수를 공유한다. 

객체 사이에 프로토타입 연결이 존재하는지는 isPrototypeOf() 메서드를 통해 알 수 있다. 
console.log(Person.prototyep.isPrototypeOf(person1)); // true
또는
console.log(Objecct.getPrototypeOf(person1) == Person.prototype); // true
console.log(Object.getPrototypeOf(person1).name); // "Nicholas"

person1.sayName()을 호출하면 두 단계가 발생합니다. 
첫 단계에서 자바스크립트 엔진은 person1 인스턴스에 sayName이라는 프로퍼티가 있는지 확인합니다.
찾을 수 없으므로 person1 프로토타입에 프로퍼티 sayName이 있는지 확인합니다. 
프로토타입에서 프로퍼티를 찾을 수 있으므로 프로토타입에 저장된 함수가 실행됩니다. 
이런식으로 상속 비슷하게 응용가능. 

객체 인스턴스에서 프로토타입에 있는 값을 읽을 수는 있지만 수정은 불가능하다. 
수정 할 수 있는 것은 객체의 인스턴스 프로퍼티값 뿐. 
그러나 객체 인스턴스에 부여한 프로퍼티값을 delete() 함수로 지우면
다시금 프로토타입의 프로퍼티값을 읽어오게 된다. 

따라서 이를 활용하기 위해 인스턴스가 가진 프로퍼티가 프로토타입의 것인지 
인스턴스의 것인지 확인해보려면

person1.hasOwnProperty("name"); // 인스터스의 프로퍼티라면 true 포로토타입의 것이라면 false

Object.keys() 메서드는 
객체 인스턴스에서 나열 가능한 프로퍼티의 전체 목록을 얻을 수 있습니다. 

function Person{}

Person.prototype.name = "N";
Person.prototyep.age = 29;

var keys = object.keys(Perosn.prototype);
alert(keys); // "name,age"

var p1 = new Person();
p1.name = "K";
var p1keys = Object.keys(p1);
alert(p1keys); // 나열 가능한 프로퍼티만 출력됨 "name"

나열 가능 여부와 관계없이 인스턴스 프로퍼티 전체 목록을 얻으려면 Object.getOwnPropertyNames() 메서드를
같은 방법으로 사용한다. 

var keys = Object.getOwnPropertyNames(Person.prototype);
console.log(keys); // "constructor, name, age"

매번 Person.prototype을 치는 것이 귀찮을 때는 아래와 같이 선언한다.

function Person(){}

Person.prototype = {
	constructor : Person,
	name : "Nicholas",
	age : 29,
	job : "Software Engineer",
	sayName : function (){
		console.log(this.name);
	}
}

프로토타입에서 값을 찾는 작업은 런타임때 검색하므로 프로토 타입이 바뀌면
그 내용이 코드 순서에 관계 없이 모든 인스턴스에 반영된다. 
또한 Prototype 포인터는 생성자가 호출될 때 할당되므로 프로토타입을 다른 객체로 바꾸면
생성자와 원래 프로토타입 사이의 연결이 끊어진다. 

ex) 
function Person(){

}

var friend = new Person();
Person.prototype = {
	constructor : Person,
	name : "Nicholas",
	age : 29,
	job : "Software Engineer",
	sayName : function(){
		alert(this.name);
	}
};

friend.sayName(); //error 

네이티브 객체 프로토타입
네이티브 참조 타입(Object, Array, String등)의 메서드 역시 생성자의 프로토타입에 정의되어 있습니다.
예를 들어 sort() 메서드는 Array.prototype에 존재하고
substirng()메서드는 String.prototype에 정의되어 있습니다. 

따라서 여기에 접근해서 기존의 프로토타입을 재정의 할 수 있다. 
혹은 아예 새로운 프로퍼티를 추가시킬 수 도 있다. 

프로토타입의 단점으로
존재하는 모든 프로퍼티 값이 모든 인스턴스에서 공유되는데, 이런 특징은
함수에서는 이상적이지만, 그 외의 변수값들에는 문제가 될 수 있다. 

예를 들어
function Person(){
}

Person.prototype = {
	constructor : Person,
	name : "Nicholas",
	age : 29,
	job : "Software Engineer",
	friends : ["Shelby", "Court"],
	sayName : function() {
		alert(this.name);
	}
};

var person1 = new Person();
var person2 = new Person();

person1.friends.push("Van");

console.log(person1.friends); // "Shelby,Court,Van"
console.log(person2.friends); // "Shelby,Court,Van"
즉 person1의 배열에만 새로운 친구를 추가했는데 person2에도 반영이된다. 


6.2.4 생성자 패턴과 프로토타입 패턴의 조합
공유하면서 변화가 없을 값과 (프로토타입 패턴)
사유하면서 변화가 많을 값을 나누어서 (생성자 패턴) 
생성한다. 

function Person(name, age, job){
	this.name = name;
	this.age = age;
	this.job = job;
	this.friends = ["Shelby", "Court"];
}

Person.prototype = {
	constructor : Person,
	sayName : function(){
		alert(this.name);
	}
};

var person1 = new Person("N", 29, "Software");
var person2 = new Person("G", 20, "Doctor");

person1.friends.push("Van");

console.log(person1.friends); // "Shelby,Court,Van"
console.log(person2.friends); // "Shelby,Court"
console.log(person1.friends === person2.friends); // false
console.log(person1.sayName === person2.sayName); // true

6.2.5 동적 프로토타입 패턴

function Person(name, age, job){

	// 프로퍼티 
	this.name = name;
	this.age = age;
	this.job = job;

	// 메서드
	if(typeof this.sayName != "function"){
		Person.prototype.sayName = function(){
			alert(this.name);
		};
	}
}

var friend = new Person("Nicholas", 29, "Software");
friend.sayName(); // "Nicholas"

이 패턴을 쓰면 instanceof 를 통해 객체가 어느 타입에서 만들어졌는지 확인 가능

6.2.6 기생 생성자 패턴 

이 패턴은 보통 다른 패턴이 실패할 때 폴백으로 쓴다. 
이 패턴의 아이디어는 다른 객체를 생성하고 반환하는 동작을 래퍼 생성자로 감싼다.

function Person(name, age, job){
	var o = new Object(); // 
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function(){
		alert(this.name);
	};
	return o;
}

var friend = new Person("Nicholas", 29, "Software Engineer");
friend.sayName(); // "Nicholas"

즉 new를 함수 안에서 한번 함수 밖에서 한 번 총 두번 실행함으로써, 
생성자가 값을 반환하지 않을 때는 기본적으로 새 객체 인스턴스를 반환한다.
반대로 생성자 마지막에 return 문을 추가함으로써 생성자를 호출했을 때 반환되는 값을
오버라이드 할 수 있다.

이 패턴을 쓰면 다른 방법으로는 불가능한 객체 생성자를 만들 수 도 있다.

function SpecialArray(){
	var values = new Array();
	//배열을 선언

	values.push.apply(values, arguments);
	// 값을 추가

	values.toPipedString = function(){
		return this.join("|"); // 단순히 배열 값을 |로 구분하여 반환.
	};

	return values; // 이 배열을 함수 값으로 반환. 
}

var colors = new SpecialArray("red", "blue", "green");
alert(colors.toPipedString()); // "red|blue|green"

그러나 이 타입의 문제는 반환된 객체와 생성자 또는 생성자의 프로토타입 사이에
아무 연결고리가 없다. 반환된 객체는 instanceof 연산자로 타입을 알 수 없다. 

6.2.7 방탄 생성자 패턴
기본적으로 기생 생성자 패턴과 비슷한데 두 가지가 다르다. 
1. 생성된 객체의 인스턴스 메서드가 this를 참조하지 않으며.
2. 생성자를 new 연산자를 통해 호출하는 경우가 결코 없다. 

function Person(name, age, job){

	// 반환할 객체를 생성
	var o = new Object();

	// 옵션 : 변수와 함수는 여기서 정의

	// 메서드를 등록
	o.sayName = function(){
		console.log(name);
	};

	return o;
}

var friend = Person("Nicholas", 29, "Software");
friend.sayName(); // "Nicholas"
이렇게 하면 반환된 객체의 name 값을 수정할 방법이 없다. 

6.3 상속

6.3.1 프로토 타입 체인

function SuperType(){
	this.property = true;
}

SuperType.prototype.getSuperValue = function(){
	return this.property;
};

function SubType(){
	this.subproperty = false;
}

// SuperType 을 상속
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function(){
	return this.subproperty;
};

var instance = new SubType();
alert(instance.getSuperValue()); // true

이제 이렇게 되면
instance.getSuperValue()를 호출했을 때 3단계로 값을 찾아들어간다. 
1) 인스턴스에서,
2) SubType.prototype 에서,
3) SuperType.prototype에서 검색하며 3단계에서 마지막에서 해당 메서드를 찾는다. 

그러나 현실에서는 프로토타입 체인에 한 단계가 더 존재한다.
바로 Object의 prototype이다. 

하위 타입에서 상위 타입의 메서드를 오버라이드하거나 
상위 타입에 존재하지 않는 메서드를 정의해야할 때가 많습니다. 
예제

function SuperType(){
	this.property = true;
}

SuperType.prototype.getSuperValue = function(){
	return this.property;
};

function SubType(){
	this.subproperty = false;
}

// SuperType에서 상속
SubType.prototype = new SuperType();

// 새 메서드 
SubType.prototype.getSubValue = function (){
	return this.subproperty;
};

// 기존 메서드를 오버라이드
SubType.prototype.getSuperValue = function(){
	return false;
};

var instance = new SubType();
alert(instance.getSuperValue()); // false

프로토타입 체인의 문제는프로토타입 프로퍼티에 들어 있는 값이 모든 인스턴스에서 공유되기 때문에
프로토타입 대신 생성자에 정의한다.  
프로토타입으로 상속을 구현하면 프로토타입이 다른 타입의 인스턴스가 되므로
처음에 인스턴스 프로퍼티였던 것들이 프로토타입 프로퍼티로 바뀐다. 

즉 위에 나왔던 배열에 추가하는 문제가 발생한다. 
이 문제 때문에 프로토타입 체인만 단독으로 쓰이는 경우는 거의 없다.

6.3.2 생성자 훔치기
프로토 타입과 참조 값에 얽힌 상속 문제를 해결하고자
하위 타입 생성자 안에서 상위 타입 생성자를 호출하는 방법을 고안했다. 
함수는 단순히 코드를 특정 컨텍스트에서 실행하는 객체일 뿐임을 염두하면
apply()와 call()을 응용해 생성자를 실행할 수 있다.

function SuperType(){
	this.colors = ["red", "blue", "green"];
}

function SubType(){
	//SuperType에서 상속
	SuperType.call(this);
}

var instance1 = new SubType();
instance1.colors.push("black");
console.log(instance1.colors); // "red,blue,green,black"

var instance2 = new SubType();
console.log(instance2.colors); // "red,blue,green"

하위 생성자에서 상위로 매개변수를 전달하는 방식으로 사용할 수도 있다.

function SuperType(name){
	this.name = name;
}

function SubType(){
	//SuperType에서 상속하되 매개변수를 전달
	SuperType.call(this, "Nicholas");

	// 인스턴스 프로퍼티 
	this.age = 29;
}

var instance = new SubType();
console.log(instance.name); 	// "Nicholas"
console.log(instance.age); 		// 29

6.3.3 조합 상속

프로토 타입 체인 + 셍성자 훔치기 패턴의 조합 

기본 아이디어는 프로토타입 체인을 써서
프로토 타입에 존재하는 프로퍼티와 메서드를 상속하고
생성자 훔치기 패턴으로 인스턴스 프로퍼티를 상속하는 것.

function SuperType(name){
	this.name = name;
	this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function(){
	alert(this.name);
};

function SubType(name, age){
	// 프로퍼티 상속
	SuperType.call(this, name);

	this.age = age;
}

// 메서드 상속
SubType.prototype = new SuperType();

SubType.prototype.sayAge = function(){
	alert(this.age);
};

var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
alert(instance1.colors); // "red,blue,green,black"
instance1.sayName(); 	// "Nicholas"
instance1.sayAge(); 	// "29"

var instance2 = new SubType("Greg", 27);
alert(instance2.colors); // "red,blue,green"
instance2.sayName();	// "Greg"
instance2.sayAge();		// "27"

이 패턴은 SubType의 인스턴스들이 colors 프로퍼티를 포함해 자신만의 고유 프로퍼티를 가지면서도
메서드는 공유하게 만들 수 있다. 

이 조합 상속은 instanceof()와 isPrototypeOf() 함수도 올바르게 작동한다.


6.3.4 프로토타입 상속

굳이 엄격히 정의된 생성자를 쓰ㅡ지 않고 
주어진 객체를 생성자의 프로토타입으로 할당한 다음 임시 생성자의 인스턴스를 반환한다.

function object(o){
	function F(){}
	F.prototype = o;
	return new F();
}

이러면 object() 함수는 주어진 객체의 사본 역할을 하는 것이다. 

좀 더 구체적인 응용법은
위 함수가 정의되어 있다고 가정하고

var person = {
	name : "Nicholas",
	friends : ["Shelby", "Court", "Van"]
};

var anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

var yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");

console.log(person.friends); 				// "Shelby,Court,Van,Rob,Barbie"
console.log(anotherPerson.friends);			// "Shelby,Court,Van,Rob,Barbie"
console.log(yetAnotherPerson.friends);		// "Shelby,Court,Van,Rob,Barbie"

이런 방식은 기반 객체를 object()함수에 넘긴 다음 결과 객체를 적절히 수정해야 한다. 
여기서 넘겨받은 새 객체의 프로토타입은 person입니다. 
즉, person.friends를 person과 anotherPerson, yetAnotherPerosn에서 공유한다. 
이 코드는 person의 복제본을 2개 만든 효과가 있다. 

프로토타입 패턴과 마찬가지로 참조 값을 포함하는 프로퍼티들은 모두 그 값을 공유한다.

6.3.5 기생 상속
상속을 담당할 함수를 만들고, 어떤 식으로든 객체를 확장해서 반환한다. 

function createAnother(original){
	var clone = object(original); 	// 함수를 호출하여 새 객체를 생성
	clone.sayHi = function(){		// 객체를 확장
		console.log("hi"); 
	};
	return clone;					// 확장된 객체를 반환. 
}

var person = {
	name : "Nicholas",
	friends : ["Shelby", "Court", "Van"]
};

var anotherPerson = createAnother(person);
anotherPerson.sayHi(); 		// "hi"

6.3.6 기생 조합 상속
조합 상속은 자바스크립트에서 가장 자주 쓰이는 상속 패턴이지만
비효율적인 면도 있다. 바로 상위 타입 생성자가 항상 두 번 호출된다는 점이다. 
이를 위해 기본적인 아이디어는,
하위 타입의 프로토타입을 할당하기 위해 상위 타입의 생성자를호출하지 않고
상위 타입의 프로토타입으로 부터 상속한 다음 결과를 
하위 타입의 프로토타입에 할당한다. 

function object(o){
	function F(){}
	F.prototype = o;
	return new F();
}

function inheritPrototype(subType, superType){
	var protoType = object(superType.prototype); 	// 객체 생성
	prototype.constructor = subType;				// 객체 확장
	subType.prototype = prototype; 					// 객체 할당
}

이 함수는 하위 타입의 생성자와 상위 타입 생성자 두 가지를 매개변수로 받아서,
상위 타입의 프로토 타입을 object() 메서드를 통해 복제하고
복제한 객체의 contructor프로퍼티를 subType으로 할당해서 
나중에 복제된 객체의 프로퍼티를 만지다가 
기본 contructor 프로퍼티가 사라지거나 변경되는 경우에 대비한다. 
마지막으로 하위 타입의 프로토타입에 새로 복제한 객체를 할당한다. 

ex)
function SuperType(name){
	this.name = name;
	this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function(){
	console.log(this.name);
};

function SubType(name, age){
	SuperType.call(this, name);

	this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function(){
	console.log(this.age);
};

