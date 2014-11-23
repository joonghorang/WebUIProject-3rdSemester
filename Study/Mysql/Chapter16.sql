16장 데이터 업데이트와 삭제 

데이터 업데이트 

UPDATE 는 두 가지 방법으로 사용할 수 있다. 

1. 테이블에 있는 특정 행 업데이트 
2. 테이블에 있는 모든 행 업데이트

UPDATE 문의 기본 형태는 다음과 같이 세 가지 부분으로 이루어져 있다.

1. 업데이트할 테이블 
2. 컬럼명과 새로운 값
3. 어떤 행이 업데이트 되어야 하는지 지정하는 필터조건 

ex)
UPDATE Customers
SET cust_email = 'kim@thetoysote.com'
WHERE cust_id = '10000000005';

만약 WHERE 절이 없다면 DBMS는 Customers 테이블의 모든 행을 
새로운 이메일 주소로 업데이트 해버린다 !

만약에 여러 컬럼을 업데이트하려면
UPDATE Customers
SET cust_contatc = "Sam Roberts"
	cust_email = "kim@thetoystore.com"
WHERE cust_id = '1000000006';

만약에 컬럼 값을 삭제하려면 
UPDATE Customers
SET cust_email = NULL
WHERE cust_id = '100000006';


데이터 삭제 

DELETE 문은 두 가지 방법으로 사용한다. 

1. 테이블에 있는 특정 행 삭제
2. 테이블에 있는 모든 행 삭제  

DELETE 는 UPDATEㅌ보다 사용하기가 더 쉽다. 
ex)
DELETE FROM Customers
WHERE cust_id = '100000006';

* 외래 키 
외래 키를 이용하여 관계가 설정된 경우, DBMS는 외래 키를 참조 무결성을 위해 사용한다. 
예를 들어 Products 테이블에 새로운 행을 하나 추가하려고 할 때, vend_id  컬럼이 외래키로
Vendors 테이블과 연결되어 있기 때문에 모르는 판매처 ID를 추가하면 DBMS가 삽입을 
허용하지 않느다고 하자. 그렇다면 DELETE 에서는 어떻게 동작할까? 외래 키의 장점은 
참조 무결성을 보장하기 위해 관계에 필요한 행을 삭제하지 못하게 막는다는 점이다. 
이런 이유로 외래 키는 항상 정의하는 것이 좋다. 

* DELETE 는 테이블이 아니라 테이블 내용을 삭제한다. 

업데이트와 삭제에 관한 가이드라인 
1. 모든 테이블이 주 키를 갖고 있는지 확인한다. 
2. 먼저 SELECT 문으로 테스트해볼 것. 
3. 데이터베이스 참조 무결성을 사용한다. 그럼 다른 테이블과 연결되어 잇는 행은 삭제하지 못한다. 
4. SQL은 실행취소 버튼이 없다...
