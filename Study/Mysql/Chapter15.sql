15장 데이터 삽입하기 

INSERT는 데이터베이스 테이블을 삽입하기 위해 사용된다. 
INSERT는 여러 가지 방법으로 사용될 수 있다.

1. 완전한 행 삽입하기 
ex)
INSERT INTO Customers
VALUES ('100000006',
		'Toy Land',
		NULL);

이러헥 쓰는 것보다 더 안전하게 쓰려면

INSERT INTO Customers(cust_id,
					  cust_name,
					  cust_address,
					  )
VALUES ('100000006',
		'Toy Land',
		NULL);

컬럼명이 있기 때문에, 실제 테이블에 정의된 컬럼 순서가 아니라 
문장에 있는 컬럼 순서대로 VALUES 에 있는 값이 매치된다. 
이 방법의 장점은 추후에 테이블 레이아웃이 변경되더라도, INSERT 문이 올바르게 작동한다는 점이다. 

2. 부분 행 삽입하기
NULL 을 삽입하는 경우 그냥 부분만 넣는 구문으로 대체할 수 있다. 
ex)
INSERT INTO Customers(cust_id,
					  cust_name)
VALUES ('100000006',
		'Toy Land');

*그러나 필수값을 누락하면 안된다. 

3. 쿼리 결과 삽입하기 
ex)
INSERT INTO Customers(cust_id,
					  cust_contact)
SELECT cust_id,
	   cust_contact
FROM CustNew;

이 문장은 Custnew에 있는 모든 데이터를 Customers로 가져온다. 
또 VALUES 로 넣을 데이터를 나열하는 대신에, SELECT 문으로 CustNew에서 값을 가져온다. 
* 반드시 컬럼 명이 같아야할 필요는 없다. 하지만 수는 일치시켜야한다. 

다른 테이블로 복사하기 
기존의 테이블에 데이터를 추가하는 INSERT SELECT 와는 달리,
SELECT INTO는 데이터를 새로운 테이블에 복사한다. 

ex)
CREATE TABLE CustCopy AS
SELECT * FROM Customers;

이 셀렉터문은 CustCopy라는 새로운 테이블을 생성하여 내용 전체를 복사한다. 
