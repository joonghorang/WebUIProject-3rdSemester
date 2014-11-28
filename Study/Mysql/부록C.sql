부록C
SQL 구문 문법

* | 기호는 여러 옵션 중 하나를 나타낸다. 
* 대괄호 안에 있는 키워드나 절은 선택적으로 사용할 수 있음을 나타낸다.

1.
ALTER TABLE / 존재하고 있는 테이블의 스키마를 변경하기위해 사용한다. 

ex)
ALTER TABLE tablename
{
	ADD | DROP column datatype [NULL|NOT NULL] [CONSTRAINTS],
	ADD | DROP ...
};


2.
CREATE PROCEDURE / 저장 프로시저를 생성하기 위해 사용한다. 

ex)
CREATE PROCEDURE procedure [parameters] [options]
AS
SQL statement;


3.
CREATE TABLE / 새로운 테이블을 만들기 위해 사용한다. 

ex)
CREATE TABLE tablename
{
	column datatype [NULL|NOT NULL] [CONSTRAINTS]
	column datatype ...
};


4.
CREATE VIEW / 하나 이상의 테이블에 새로운 뷰를 만들기 위해 사용한다. 

ex)
CREATE VIEW viewname AS
SELECT columns, ...
FROM tables, ...
[WHERE ...]
[GROUP BY ...]
[HAVING ...];


5. 
DELETE / 테이블에서 하나 이상의 행을 삭제하기 위해 사용한다. 

ex)
DELETE FROM tablename
[WHERE ...];


6.
DROP / 데이터베이스 객체(테이블, 뷰, 인덱스 등)를 완전히 삭제하기 위해 사용한다. 

ex)
DROP INDEX|PROCEDURE|TABLE|VIEW
indexname|procedure|tablename|viewname;


7.
INSERT / 테이블에 새로운 행을 하나 추가하기 위해 사용한다. 

ex)
INSERT INTO tablename [(columns, ...)]
VALUES(values, ...);


8.
INSERT SELECT / SELECT로 가져온 결과를 테이블에 삽입하기 위해 사용한다. 

ex)
INSERT INTO tablename [(columns, ...)]
SELECT columns, ... FROM tablename, ...
[WHERE ...];


9. 
ROLLBACK /  트랜잭션 단위로 되돌리기 위해 사용한다. 

ex)
ROLLBACK [ TO savepointname ];


10.
SELECT / 하나 이상의 테이블에서 데이터를 가져오기 위해 사용한다. 

ex)
SELECT columnname, ...
FROM tablename, ...
[WHERE ...]
[UNION ...]
[GROUP BY ...]
[HAVING ...]
[ORDER BY ...];


11.
UPDATE / 테이블에 있는 행을 수정하기 위해 사용한다. 

ex)
UPDATE tablename
SET columname = value, ...
[WHERE ...];

