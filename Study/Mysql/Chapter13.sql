13장 고급테이블 조인 생성하기 

테이블 별칭 사용하기 
별칭을 사용하는 이유는 크게 2가지 이다. 
1. 사용하는 SQL문장의 수를 줄이기 위해
2. SELECT 구문 내에서 같은 테이블을 여러 번 사용하기 위해 

ex)
SELECT cust_name, cust_contact
FROM Customers AS C, Orders AS O, OrderItems AS OI -- Customers를 C로 
WHERE C.cust_id = O.cust_id
AND OI.order_num = O.order_num
AND prod_id = 'RGAN01';

* 오라클에서는 AS 를 사용할 수 없다. 

다른 조입 타입 사용하기 

셀프 조인(Self Join)

만약 Jim Jones라는 사람과 같은 회사에서 일하는 모든 직원에게 매일을 보내려고 한다 
1. 그렇다면 먼저 Jim Jones가 어느 회사에서 일하는지 알아내야하고,
2. 그 다음 그 회사에서 일하는 직원 연락처를 알아내는 쿼리가 필요하다. 

ex) 서브 쿼리에 의한 해결법 
SELECT cust_id, cust_name, cust_contact
FROM Customers
WHERE cust_name = (SELECT cust_name
					FROM Customers
					WHERE cust_contact = 'Jim Jones');

ex) 셀프조인
SELECT c1.cust_id, c1.cust_name, c1.cust_contact
FROM Customers AS c1, Customers AS c2
WHERE c1.cust_name = c2.cust_name
AND c2.cust_contact = 'Jim Jones';

이 쿼리에서 필요한 두 테이블은 실제로는 같은 테이블이다. 
그래서 Customers 테이블이 두 번 나타난다. 
문법적으로는 이렇게 사용해도 아무런 문제가 없지만 Customers 테이블을 
참고하는 것은 매우 모호해질 수 있다. 그래서 별칭을 사용한다. 

*서브쿼리보다는 셀프 조인이 속도가 더 빠르다. 

자연 조인(Natural Join)
테이블을 조인할 때, 두 개이상의 테이블에서 최소한 하나의 컬럼은 있어야한다.
(조인을 생성할 때 그 컬럼을 써야하기 때문)
표준적인 조인은 같은 컬럼이 여러 번 나타나더라도 모든 데이터를 반환하다.
자연조인은 여러 번 반복되는 컬럼을 제거하여 각 컬럼이 한 번만 반환되는 것을 말한다. 

ex) 와일드 카드를 이용한 중복제거 조인 
SELECT C.*, O.order_num, O.order_date, OI.prod_id, OI.quantity, OI.item_price
FROM Customers AS C, Orders AS O, OdersItems AS OI
WHERE C.cust_id = O.cust_id
  AND OI.order_num = O.order_num
  AND prod_id = 'RGAN01';

자연 조인이 아닌 내부 조인은 아마 평생 만들 일이 없다. 

외부 조인(Outer Join)
대부분의 조인은 한 테이블의 행과 다른 테이블의 행과 관계가 있다. 
하지만 때로는 "관련되지 않은 행을 포함시키고 싶은 때도 있다."

다음과 같은 상황이다. 
 	- 각 고객의 주문량을 계산할 때 아직 주문을 하지 않은 고객도 포함시킨다.
 	- 제품과 주문 수량을 함께 나열하며, 아무도 주문하지 않은 제품도 포함시킨다. 
 	- 주문을 하지 않은 고객도 고려하여, 평균 세일 규모를 계산한다. 

ex)
SELECT Customers.cust_id, Orders.order_num
FROM Customers LEFT OUTER JOIN Orders
  ON Customers.cust_id = Orders.cust_id;

* OUTER JOIN 문법을 쓸 때는 반드시 "RIGHT"나 "LEFT" 키워드를 명시해
어떤 테이블에 있는 모든 행을 가져올 것인지 지정해야 한다. 

전체 외부 조인 
두 개의 테이블에서 모든 행을 가져오고 관련된 행은 연결한다. 

ex)
SELECT Customers.cust_id, Orders.order_num
FROM Orders FULL OUTER JOIN Customers
  ON Orders.cust_id = Customers.cust_id;

그룹 함수와 조인 사용하기 
ex) 모든 고객리스트와 각 고객이 주문한 수량을 가져오기
SELECT Customers.cust_id, COUNT(Orders.order_num) AS num_ord
FROM Customers INNER JOIN Orders
  ON Customers.cust_id = Orders.cust_id
GROUP BY Customers.cust_id;

이는 다음과 같다. 
SELECT Customers.cust_id, COUNT(Orders.order_num) AS num_ord
FROM Customers LEFT OUTER JOIN Orders
  ON Customers.cust_id = Orders.cust_id
GROUP BY Customers.cust_id;

조인과 조인 조건 올바르게 사용하기 

- 사용할 조인 타입을 신중히 결정하라. 내부 조인을 사용하는 것이 좀 더 수월하겠지만, 외부 조인이 적합할 때도 많다. 
- 정확히 어떠한 조인 문법을 지원하는지 확인하려면, 여러분이 사용하는 DBMS의 매뉴얼을 참고하자.
- 올바른 조인 조건을 사용했는지 확인하자. 그렇지 않으면 문법이 올바르더라도 잘못된 데이터를 가져올 것이다. 
- 조인 조건을 쓰는 것을 잊지 말고 항상 확인하자. 그렇지 않으면 카티전 곱의 결과가 반환될 것이다. 
- 조인에 여러 개의 테이블을 포함시켜 각각의 조인 타입을 다르게 할 수도 있다. 
