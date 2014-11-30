1장 소개 

- 아무도 열럼하지 않은 시각화는 진정한 의미로는 아직 시각적 산물이 아니다. 
- 예제파일 깃주소 : https://github.com/alignedleft/d3-book

2장 D3 소개 

D3 = Data-Driven Documents

D3는 다음 순서대로 동작하다. 
1. 브라우저 메모리로 데이터를 불러온다.
2. 필요한 HTMl 문서요소를 새로 만들어서 데이터를 엮는다.
3. 각 문서요소에 엮인 개별 데이터를 토대로 해당 문서요소를 변환시킨다. 
즉, 관련 시각적 프로퍼티를 지정한다.
4. 사용자 입력에 대한 반응으로 문서요소의 상태를 한 값에서 다른 값으로 전이시킨다. 

- D3의 핵심 기능은 비트맵 이미지가 아니라, SVG 이미지나 GeoJSON 데이터 같은 벡트(vector) 방식에 최적화되어있다. 
하지만 d3.geo.tile 플러그인(http://bit/ly/W8L18u)
이 소개되면서 변화가 시작됐다. (참고할 것)참고할

- D3는 여러분의 원본 데이터를 숨겨 주지 않는다.  D3 코드는 웹서버가 아닌 사용자 웹 브라우저에서 동작하며,
시각화할 데이터도 브라우저로 전송된다. 그래서 공유하면 안 되는 데이터라면 D3는 사용하지 말아야한다. 
(하지만 데이터 공유에 흥미가 없다면, 왜 그 데이터를 시각화하려 하는가? 
	시각화 의 목적은 데이터의 교류다.)

- http://sigmajs.org
그래픽 시가고하를 위한 경량 라이브러리. 예브면서 빠르다. HTML canvas를 이용한다. 

- 그외에 자유로운 그리기 도구를 제공하는 사이트 
http://processingjs.org
http://paperjs.org
http://raphaeljs.com

- D3 코드를 실제로 작성하지 않고 D3를 사용하고 싶다면, D3 기반된 제작된 도구들 중에서 선택하면 됨 
http://square.github.com/crossfilter
http://square.github.com/cubism 
http://nvd3.org
http://polychart.com
http://enjalot.com = 라이브 코딩으로 실험해 볼 수 있는 멋진 도구 
http://www.sammyjs.org/docs#blocks

 