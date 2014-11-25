19장 저장 프로시저 사용하기 

종종 복잡한 작업을 수행하기 위한 다수의 구문을 사용할 필요가 있다. 
수행해야하는 정확한 SQL 구문이 있지도 않고, 
순서가 고정되는 것도 아니다. 
제품이 재고에 있는지 없는지에 따라서 SQL구문이나 순서가 변경될 수 있기 때문이다.

저장 프로시저는 일종의 배치파일이라고 생가갛면된다. 

저장 프로시저 사용의 장점
- 읽기 쉬운 단위로 묶어서 복잡한 작업을 단순화한다. 
- 여러 단계를 반복해서 만들 필요가 없기 때문에, 데이터 일관성을 보장한다. 
- 변경 관리를 단순화한다. 테이블, 컬럼명, 비지니스 로직이 변경되면, 저장 프로시저 코드만 바꾸고
다른 것은 수정할 필요가 없다. 이는 보안성을 높이는데도 영향을 미친다. 
- 저장 프로시저는 대개 컴파일된 형태로 저장되기 때문에, 명령을 처리하기 위해서 
DBMS가 해야 하는 일이 줄어들고, 그 결과 성능이 향상된다. 

즉 단순성, 보안성, 성능에 좋다. 

그러나 단점도 있는데, 
- 저장 프로시저문법이 각 DBMS마다 매우 다르다. 
- 저장 프로시저는 기본 SQL 구문을 작성하는 것보다는 좀 더 복잡하다. 


* 그러나 작성할수는 없어도 사용할 수는 있다. 

저장 프로시저 실행하기 
ex)
EXECUTE AddNewProduct('JTS01', 'Struffed Eiffel Tower', 6.49,
'Plush struffed toy with the text La Tour Eiffel in red white and blue');

AddNewProduct라는 이름의 저장 프로시저를 실행. 
괄호안의 3개 인자를 받아 Products테이블에 새로운 제품을 추가한다. 


-- 읽다가 이 이상 필요한 내용이 아니라 개념만 정리하고 넘어감. 추후 재정리.