3장 가져온 데이터 정렬하기 

데이터 정렬하기 

SELECT 구문에서 가져온 데이터를 정렬하려면, ORDER BY 절을 사용한다. 
ORDER BY 뒤에는 하나 이상의 컬럼 이름을 적느넫, 이를 기준으로 결과를 정렬한다. 
ex)
SELECT prod_name
FROM Products
ORDER BY prod_name; 

여러 개의 컬럼으로 정렬하기 
ex) 세 개의 컬럼을 가져오고, 가격과 이름 순서대로 결과를 정렬하기
SELECT prod_iit, prod_price, prod_name
FROM Products
ORDER BY prod_price, prod_name; 

컬럼의 위치로 정렬하기 
ex)
SELECT prod_id, prod_price, prod_name
FROM Products
ORDER BY 2, 3 -- 2번째 컬럼으로 정렬하고, 같은 값이 나오면 3번째 컬럼을 기준으로 정렬하라 

정렬 순서 지정하기 
기본은 오름차순으로 정렬되지만 내림차순으로도 정렬할 수 있다. 
ex)
SELECT prod_id, prod_price, prod_name
FROM Products
ORDER BY prod_price DESC;

ex) 두 개 이상의 컬럼까지 응용
ORDER BY prod_price DESC, prod_name;

* 정렬할 때는 대소문자가 구별되지 않는다. 