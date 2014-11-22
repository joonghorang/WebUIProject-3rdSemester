9장 데이터 요약 

그룹 함수 사용하기 
실제로 데이터를 가져오지 않고 데이터를 요약해야 할 때 쓴다. (분석이나 보고시)
ex) 테이블에 있는 행의 수를 확인한다. 

즉, 데이터 그 자체가 아니라 데이터의 요약정보를 원할 때 사용한다. 

다음과 같은 함수가 있다. 
1. AVG()		// 컬럼의 평균값을 반환한다. 
ex)
SELECT AVG(prod_price) AS avg_price -- 한번에 하나의 컬럼만 계산할 수 있다. 
FROM Products;

2. COUNT()		// 컬럼에 있는 행 개수를 반환한다. 
ex) 테이블에 있는 모든 행의 개수를 세기
SELECT COUNT(*) AS num_cust
FROM Customers;

ex) 지정한 컬럼의 모든 행의 개수를 세기 
SELECT COUNT(cust_email) AS num_cust
FROM Customers;

3. MAX()		// 컬럼의 최대 값을 반환한다. 
ex)
SELECT MAX(prod_price) AS max_price
FROM Products;
* 문자데이터의 경우에는 정렬된 상태에서 가장 마지막에 있는 행을 반환한다. 

4. MIN()		// 컬럼의 최소 값을 반환한다. 
ex)
SELECT MIN(prod_price) AS min_price
FROM Products;
* 문자 데이터의 경우 가장 처음에 있는 행을 반환한다. 

5. SUM()		// 컬럼의 합계를 반환한다. 
ex)
SELECT SUM(quantity) AS item_ordered
FROM OrderItems
WHERE order_num = 20005;

ex) * 와 복합사용
SELECT SUM(item_price * quantity) AS total_price
* 이와 같이 모든 그룹 함수는 표준 수학 연산자를 사용하여 다중 컬럼에 대한 계산을 수행할 수 있다. 

중복되는 값에 대한 그룹 함수 

중복되는 값을 제거하기 위하여 DISTINCT라는 인자를 쓴다. 
ex)
SELECT AVG(DISTINCT prod_price) AS avg_price 
FROM Products
WHERE vend_id = 'DLL01';

*DISTINCT는 반드시 컬럼명과 함께 사용해야 한다. 

그룹 함수 결합하기 -- 여러 그룹함수를 한꺼번에 사용해보기 
ex)
SELECT COUNT(*) AS num_items,		-- 제품의 수 
	MIN(prod_price) AS price_min,	-- 제품의 최소가격
	MAX(prod_price) AS price_max,	-- 제품의 최대가격
	AVG(prod_price) AS price_avg	-- 제품의 평균가 
FROM Products;
