17장 테이블 생성과 조작

테이블 생성 

일반적으로 데이터베이스 테이블을 생성하는 데는 두 가지 방법이 있다. 

1. 대다수 DBMS는 데이터베이스는 테이블을 생성하고 관리할 수 있는 대화형 관리 툴을 제공한다.
2. SQL 문으로 테이블을 직접 생성하고 관리한다. 

ex)
CREATE TABLE Products
(
prod_id		CHAR(10)		NOT NULL,
prod_name 	CHAR(10)		NOT NULL
);

* MYSQL에서는 VARCHAR 는 text 바꿔야한다. 

NULL 값 사용하기 
NULL을 허용하는 컬럼은 그 컬럼에 아무런 값을 넣지 않아도 
행 삽입이 허용된다. 반면 NULL을 허용하하지 않는 컬럼은 그 컬럼이 반드시 필요하다느 ㄴ뜻이다. 
ex)
CREATE TABLE Vendors
(
vend_id 		CHAR(10) 		NOT NULL,
vend_address	CHAR(50)		
);

기본값 지정하기 
SQL 에서는 행을 삽입할 때 값이 없으면 자동으로 들어가는 기본값을 지정할 수 있다. 

ex)
CREATE TABLE OrderItems
(
order_num		INTEGER		NOT NULL,
quantity		INTEGER		NOT NULL 		DEFAULT 1
);

만약 날짜를 기본값으로 넣고 싶다면

CREATE TABLE OrderItems
(
order_num 		INTEGER		NOT NULL,
order_date		DATE 		DEFAULT CURRENT_DATE()
);

테이블 변경하기 
ALTER TABLE 문이 사용된다. 

고려해야할 사항은 

- 기본적으로 데이터가 있는 테이블은 변경되어서는 안된다. 
- 모든 DBMS는 존재하는 테이블에 컬럼을 추가하는 것은 허용하지만, 추가하는 컬럼의 데이터형에 몇 가지 제약을 둔다. 
- 대부분의 DBMS는 테이블에 있는 컬럼의 제거나 변경을 허용하지 않는다. 
- 대부분의 DBMS는 컬럼명을 변경하는 것을 허용한다. 
- 대부분의 DBMS는 데이터가 있는 컬럼에는 변경할 수 있는 항목을 제한하고, 데이터가 없는 컬럼의 변경에는 제한 사항을 많이 두지 않는다. 

ex) 컬럼 추가 
ALTER TABLE Vendors
ADD vend_phone CHAR(20); -- 데이터형은 반드시 지정해야한다. 

eX) 컬럼 삭제 
ALTER TABLE Vendors
DROP COLUMN vend_phone;

복잡한 테이블 구조를 변경하려면, 다음의 순서대로 진행한다. 

1. 새로운 컬럼 구조를 가진 새 테이블을 생성한다. 
2. INSERT SELECT 문을 사용하여 이전의 테이블에 있는 데이터를 새로운 테이블에 복사한다. 
필요하다면 변환 함수나 계산 필드를 사용한다. 
3. 새로운 테이블에 원하는 데이터가 있는지 확인한다. 
4. 이전 테이블의 이름을 변경한다(또는 과감히 삭제한다).
5. 새로운 테이블을 이전에 사용한 테이블명으로 변경한다.
6. 필요하다면 트리거, 저장 프로시저, 인덱스, 외래 키 등을 다시 생성한다.


테이블 삭제하기 
ex)
DROP TABLE CustCopy;

* 실수로 테이블을 삭제하는 것을 막기위해 관계를 걸어두면 
DBMS는 연관이 있는 테이블을 삭제하지 못하게 막는다. 

테이블 이름 바꾸기
RENAME TABLE Oldname Newname;
(DBMS마다 매우 다르다)

