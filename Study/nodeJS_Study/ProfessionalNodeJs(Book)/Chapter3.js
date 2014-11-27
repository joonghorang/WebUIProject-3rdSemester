03 모듈 로딩 

웹 페이지에서 자바스크립트 코드를 로드하면 이 코드는 전연 네임스페이스로 주입되며,
이 공간은 이미 로드된 다른 스크립트와 공유된다. 이는 추적하거나 해결하기 어려운 버그로 이어지기 쉬받. 

다행히 노드는 어느 정도 질서를 부여해 CommonJS 모듈 표준을 구현했다. 
이 표준에서 각 모듈은 다른 모듈과 구분된 자신만의 컨텍스트가 있다. 

따라서 코드를 여러 개의 잘 정의된 모듈로 분리하면 코드를 관리하기가 그만큼 쉬워진다. 

노드가 모듈을 로드하는 방식 
ex)
var module = require('module_name');

코어 모듈 로딩 
ex)
var http = require('http');

파일 모듈의 로딩
ex)
var myModule = require('/home/pedro/my_modules/my_module')  // 절대 경로 
var myModule = require('../my_modules/my_module'); 			// 상대 경로 
*js라는 확장자는 생략할 수 있다. 

폴더 모듈의 로딩 
ex)
var myModule = require('./myModuleDir');
이러헥 하면 노드는 해당 폴더 내에서 모듈을 찾는다. 
노드는 이 폴더가 패키지라고 가정하고 패키지 정의를 찾는다. 
이 패키지 정의는 package.json이라는 파일이어야한다. 

node_modules 폴더를 통한 로드 
모듈명이 상대 경로도 아니고, 코어 모듈도 아닐 경우 노드는 이 모듈을 현재 디렉터리내의
node_modules 폴더에서 찾으려고 한다. 
ex)
var myModule = require('myModule.js');  // 이러면 ./node_modules/myModule.js파일을 찾는다. 
해당 디렉토리에서 찾지 못하면 계속 상위 디렉토리에서 찾아보려고 노력한다. 

모듈 내보내기 

노드에서는 파일과 모듈이 일대일 대응관계에 있다. 

circle.js

function Circle(x, y, r){
	function r_squared(){
		return Math.pow(r, 2);
	}

	function area(){
		return Math.PI * r_squared();
	}

	return {
		area: area
	};
}

module.exports = Circle; // 여기서 module은 현재 작업중인  module이다. 
						 // 이 코드는 내보낼 내용을 정의하여 내보낸다. 
						 // 이 예제는 Circle 생성자 함수를 내보냄으로써 모듈 사용자가
						 // Circle인스턴스를 생성할 수 있게 한다. 

다음과 같이 내보낼 수도 있다. 
 ex)
 function printA(){
 	console.log('A');
 }

 function printB(){
 	console.log('B');
 }

 function printC(){
 	console.log('C');
 }

module.exports.printA = printA;
module.exports.printB = printB;
module.exports.pi = Math.PI;

이 모듈을 사용하는 클라이언트 코드는

var myModule2 = require('./myModule2');
myModule2.printA(); // -> 'A' 출력됨
myModule2.printB(); // -> 'B'
console.log(myModule2.pi); // -> 3.1415....
