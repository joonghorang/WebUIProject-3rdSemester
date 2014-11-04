15장 캔버스와 그래픽

<canvas> 요소는 width와 height 속성을 통해 생성할 그림의 크기를 설정합니다. 
ex)
<canvas id = "drawing" width = "200" height = "200"> A drawing of something. </canvas>

그리고 2d 컨텍스트 설정을 해야하므로

var drawing = document.getElementById("drawing");

if (drawing.getContext) { // <canvas>가 지원되는지 확인 하는 분기

	var context = drawing.getContext("2d");

	//context 변수에 해당 캔버스의 컨텍스트 객체를 저장한다. 
	//또 기본적으로 toDataURL() 메서드를 이용해 생성한 캔버스 이미지를 내보내야 한다. 

	// 이미지 데이터의 URI
	var imgURI = drawing.toDataURL("image/png"); // 여기서 png는 내보낼 데이터 형식이다. 기본적으로 브라우저는 png를 받는다.

	// 이미지 표시
	var image = document.createElement("img");  // 임의의 img태그를 하나 생성하고 그걸 image 변수에 삽입
	image.src = imgURI; 						// 저장해둔 imgURI 를 경로에 삽입
	document.body.appendChild(image); 			// 생성한 image변수(img태그)를 body안에 붙임 
}


15.2 2D 컨텍스트

1. 채우기 : 채우기는 도형을 특정 스타일(색깔이나 그레이디언트, 이미지)로 채운다.
2. 스트로크 : 외곽선에 색을 칠하기만 한다. 

2d 컨텍스트의 조작은 대개 스트로크와 채우기의 변형이며 fillStyle과 strokeStyle 두 가지 
프로퍼티로 제어한다.  두 프로퍼티 모두 문자열과 그래디언트 객체, 패턴 객체에 사용 가능하며
기본 값은 "#000000"(검정)이다.

ex)

var drawing = document.getElementById("drawing");

if(drawing.getContext){
	var context = drawing.getContext("2d");
	context.strokeStyle = "red";
	context.fillStyle = "#0000ff";
} 

이렇게 되면 기본 fillStyle과 strokeStyle이 지정되었다. 
앞으로 그리는 도형은 이 프로퍼티를 변경하지 않는 한은 이 속성값대로 그려지게 된다. 

15.2.2 사각형 그리기
// 빨간색 사각형
context.fillStyle = "#ff0000";
context.fillRect(10, 10, 50, 50);	// (x좌표, y좌표, 가로, 세로크기)

// 반투명한 파란색 사각형
context.fillStyle = "rgba(0, 0, 255, 0.5)"; // a값을 0~1 사이의 값을 가지며 투명도를 의미한다. 
context.fillRect(30, 30, 50, 50);

// 빨간색 사각형 외각선
context.strokeStyle = "#ff0000";
context.strokeRect(10, 10, 50, 50);

// 반투명한 파란색 사각형 외각선
context.strokeStyle = "rgba(0, 0, 255, 0.5)";
context.strokeRect(30, 30, 50, 50); 

// 사각형 모양으로 지우기
context.clearRect(40, 40, 10, 10); 

15.2.3 패스 그리기
패스를 그리기 시작할 떄는 반드시 첫 번째 beginPath()를 호출해서 새 패스를 시작하라고 명령해야한다.
그리고 그 다음부터는 다음 메서드들로 그림을 그린다. 

arc(x, y, radius, startAngle, endAngle, counterclockwise) // 시작점을 지정하고 처음 각과 끝각으로 그린다. 
arcTo(x1, y1, x2, y2, radius) // 시작점과 끝점을 지정하고 반지름이 radius인 원호
bezierCurveTo(c1x, c1y, c2x, c2y, x, y) /// x,y까지 이어지는 베지어 곡선을 그리며 조절점은 (c1x, c1y), (c2x,c2y)
lineTo(x,y) // 마지막 지점부터 (x, y)까지 직선을 그린다. 
moveTo(x, y) // 선을 그리지 않고 커서만 (x, y)로 옮김
quadraticCurveTo(cx, cy, x, y) // 마지막 지점에서부터 x,y까지 사각형 곡선을 그리며 조절점은 (cx, cy)이다.
rect(x, y, width, height) // x, y를 시작점으로 하는 사각형을 그린다. 별도의 도형을 그리는게 아니라 패스만 생성


이렇게 패서는 생성한 다음 시작점으로 돌아가는 직선을 그릴 때는 closePath()를 사용한다. 
패스를 완성한 상태에서 fillStyle로 채우려면 fill() 메서드를 사용한다. 

ex)

// 패스 시작
context.beginPath();

// 바깥쪽 원
context.arc(100, 100, 99, 0, 2 * Math.PI, false);

// 안쪽 원
context.moveTo(194, 100);
context.arc(100, 100, 94, 0, 2 * Math.PI, false);

// 분침
context.moveTo(100, 100);
context.LineTo(100, 15);

// 시침
context.moveTo(100, 100);
context.lineTo(35, 100);

// 이상 패스들에 선을 부여 
// 매번 업데이트 될 때마다 새로 그려주어야 한다. 
context.stroke();

* isPointInPath() 라는 메서드는 주어진 지점이 패스에 존재하는지 판단하며 패스를 닫기 전에는
언제든지 호출할 수 있다. 
ex) context.isPoiintInPath(100, 100); 

15.2.4 텍스트 그리기
텍스트를 그리는 메서드는 
1.   fillText(입력할 문자열, x좌표, y좌표, 옵션으로 픽셀 너비의 최대값)
2. strokeText(입력할 문자열, x좌표, y좌표, 옵션으로 픽셀 너비의 최대값)

그리고 텍스트의 프로퍼티로 
context.font = "bold 14px Arial";
context.textAlign = "center";// "start"는 해당 x좌표 부터 텍스트 시작. "end"는 x좌표가 끝점. 
context.textBaseline = "middle"; // "top"은 위쪽박스로 붙이기. "bottom"은 하단으로 붙이기 
context.fillText("12", 100, 20);

measureText() 메서드는 
font, textAlign, textBaseline의 현재 값을 바탕으로 텍스트 크기를 계산한다. 
예를 들어 "Hello world!" 텍스트를 140픽셀 너비의 사각형에 딱 맞추고 싶다고 가정하면

var fontSize = 100;
context.font = fontSize + "px Arial";

while(context.measureText("Hello world!").width > 140){ // Hello world!의 가로 길이를 체크해 140보다 같거나 작아질 떄까지 줄인다. 
	fontSize--;
	context.font = fontSize + "px Arial";
}

context.fillText("Hello world!", 10, 10); // fillText()나 strokeText()모두 네 번째 매개변수는 텍스트 너비의 최대값이다. 
context.fillText("Font size is " + fontSize + "px", 10, 50); 

와 같이 기정하면 된다. 

매개변수로 텍스트를 받고 TextMetrics 객체를 반환한다. 
반환된 객체에는 현재 width 프로퍼티 밖에 없지만 향후 더 추가될 예정이다. 

15.2.11 복합
2D 컨텍스트에 그려진 그림 전체에 영향을 미치고 싶다면
globalAlpha와 globalCompositionOperation 두 가지를 사용한다.
globalAlpha는 투명도를 나타내는 0과 1 사이의 숫자이고 기본 값은 0이다. 
context.globalAlpha = 0.5;

globalCompositionOperation 프로퍼티는 새로 그릴 도형이 컨텍스트에 이미 존재하는 이미지 
즉 기존 레이어와 새로운 레이어를 어떻게 병합할지를 설정하는 것이다. 
옵션은 아래와 같다.
source-over(기본 값) // 새 그림은 이미 존재하는 이미지 위에 그려진다.
source-in // 새 그림은 이미 존재하는 이미지와 교집합 하는 부분에만 그려진다. 겹치지 않는 부분은 투명
source-out // 새 그림은 겹쳐지지 않는 영역에만 그려진다. 
source-atop //  새 그림은 이미 존재하는 이미지와 겹치는 부분에만 그리고 겹치지 않는 부분은 영향 받지 않는다.
destination-over // 새 그림은 이미 존재하는 이미지 아래 그려지며 투명한 픽셀 아래에 있는 부분만 보인다.
destination-in // 새 그림은 이미 존재하는 이미지 아래 그려지며 두 이미지가 겹치지 않는 곳은 모두 투명
destination-out // 새 그림은 이미 존재하는 이미지의 겹치는 부분을 삭제한다.
destination-atop // 새 그림은 이미 존재하는 이미지 아래에 그려진다. 기존 이미지에서 새 그림과 겹치지 않는 부분은 투명해짐
lighter // 새 그림과 이미 존재하는 이미지 값을 더해 더 밝은 이미지를 생성한다. 
copy // 새 그림이 이미 존재하는 이미지를 완전히 교체
xor // 새 그림의 이미지 데이터와 이미 존재하는 이미지 데이터를 픽셀단위로 XOR 연산하여 표시한다.  

* 기본적으로 캔버스는 PNG를 받는다. 
