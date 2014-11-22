2장 데이터 가져오기

SELECT 구문 
SELECT 구문으로 데이터를 가져오려면, 최소한 두 가지 정보는 반드시 명시해야 한다. 
1. 무엇을 가져올지 
2. 그리고 어디에서 가져올지가 그것이다. 

단일 컬럼 가져오기 
ex)
SELECT prod_name
FROM Products; 

* 데이터는 의미 없는 순서로 반환된다. 
* SQL 구문은 대소문자 구분을 하지 않는다. 그러나 SQL 구문은 대문자로 쓰는 것이 디버깅에 쉽다. 
* 대부분의 개발자는 SQL구문을 여러 줄로 나누는 것이 좋다고 생각한다. 

다중 컬럼 가져오기 
ex)
SELECT prod_id, prod_name, prod_price
FROM Products;

모든 컬럼 가져오기 
ex)
SELECT *
FROM Products;

중복행 출력 방지하기 
ex)
SELECT DISTNCT vend_id // vend_id에 몇개의 데이터가 들어있건 중복하지 않고 '종류만' 출력해준다. 
FROM Products; 

 * DISTINCT는 부분적으로 사용될 수 없다. 

결과 제한하기 (특정 몇 행만 가져오기) 
MySQL의 경우 
ex)
SELECT prod_name
FROM Products
LIMIT 5; // 처음부터 5개만 가져옴 

특정 행부터 특정 개수만큼 가져오기 
MySQL의 경우
ex)
SELECT prod_name
FROM Products
LIMIT 5 OFFSET 5; // 5번째 부터 5개의 행을 가져옴 

단축해서 표현하면 
LIMIT 5, 5

주석 사용하기 
-- 줄단위 주석 
/* 
문단단위 주석 
*/

