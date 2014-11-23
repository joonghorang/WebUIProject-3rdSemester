11장 서브쿼리 사용하기 

여러분이 RGAN01이라는 제품을 구매한 고객 리스트를 원한다고 가정해보자.
이 정보를 가져오려면 

1. RGAN01를 주문한 주문 번호를 가져온다. 
2. 이전 단계에서 가져온 주문 번호로 고객 ID를 가져온다.
3. 이전 단계에서 가져온 고객 ID로 고객의 상세 정보를 가져온다. 

ex)
SELECT order_num
FROM OrderItems
WHERE prod_id = 'RGAN01';


결과 => 20007, 20008

SELECT cust_id
FROM Orders
WHERE order_num IN (20007, 20008);

결과 => 1000004, 1000005

이 세단계를 별도의 쿼리로 수행할 수 있지만, 귀찮다. 
이 때 서브쿼리를 사용하면 하나의 문장으로 만들 수 있다. 

SELECT cust_name, cust_contact
FROM Customers
WHERE cust_id IN (SELECT cust_id
					FROM Orders
				 	WHERE order_num IN (SELECT order_num
											FROM OrderItems
											WHERE prod_id = 'RGAN01'));

서브쿼리는 항상 안에 있는 쿼리를 먼저 처리하고,
그 다음 바깥쪽에 있는 쿼리를 처리한다. 

* 너무 많은 서브쿼리를 사용하면 성능이 저하될 수 있다. 

계산 필드로 서브쿼리 사용하기 

주문을 Customers 테이블에 있는 고객별로 보고 싶다고 가정해보자. 
이 정보를 가져오려면

1. Customers 테이블에서 고객 리스트를 가져온다. 
2. Orders 테이블에서 각각의 고객이 주문한 수를 센다. 

ex)
SELECT cust_name,
		cust_state,
		(SELECT COUNT(*)
		FROM Orders
		WHERE Orders.cust_id = Customers.cust_id) AS orders -- 이 조건에 맞는 수만큼 서브쿼리가 반복된다. 
															-- 이렇게 쓸때는 완전한 컬럼명을 사용한다. 
															-- 컬럼명이 모호할 수 있기 때문이다. 
FROM Customers
ORDER BY cust_name;

* 이런 SELECT 문을 작성할 떄는 컬럼명이 여러 가지로 해석될 수 있으므로 분명하게 하자. 
