4장 데이터 필터링

데이터베이스 테이블이 많은 양의 데이터를 담는 데 비해 테이블에서 모든 행을 다 가져오는 일은 매우 드물다. 
그보다는 특별한 작업을 수행하기 위해 데이터 일부분만 가져오는 경우가 많다. 

그를 위한 
WHERE 절 사용하기 
ex)
SELECT prod_name, prod_price
FROM Products
WHERE prod_price = 3.49; -- prod_price의 value값이 3.49인 것만 화면에 출력 

* 만약에 ORDER BY 절과 같이 사용해야 한다면 WHERE 절이 ORDER BY 절보다 한 칸 앞에 있어야한다. 

WHERE 절 연산자

	연산자 					설명

	=						같다 
	<>						같지 않다. 
	!=						같지 않다. 
	<						~보다 작다 
	<=						~보다 작거나 같다. 
	!<						~보다 작지 않다. 
	>						~보다 크다. 
	>=						~보다 크거나 같다. 
	!>						~보다 크지 않다. 
	BETWEEN					두 개의 특정한 값 사이
	IS NULL					값이 NULL 이다. 

단일 값 확인하기 
ex) 
SELECT prod_name, prod_price
FROM Products
WHERE prod_price < 10; -- 가격이 10달러보다 싼 모든 제품을 가져오기 

일치하지 않는 값 확인하기 
ex)
SELECT vend_id, prod_name
FROM Products
WHERE vend_id != 'DLL01'; -- DLL01이 아닌 vend_id를 찾아서 보여준다. 

특정 범위의 값 확인하기 
ex)
SELECT prod_name, prod_price
FROM Products
WHERE prod_price BETWEEN 5 AND 10; -- AND키워드를 사용하여 범위를 지정한다. 

값이 없는 데이터 확인하기 
ex)
SELECT prod_name
FROM Products
WHERE prod_price IS NULL; -- 0이 아니라 정말 비어있는 경우를 출력하라는 뜻. 

* NULL 과 일치하지 않는 값은 다른 의미이다. NULL 은 정말로 그냥 비어있는 경우이고, 일치하지 않는 경우로 검색했을 때 나오지 않는다. 
  따라서 따로 잡아주어야 한다. 

 
