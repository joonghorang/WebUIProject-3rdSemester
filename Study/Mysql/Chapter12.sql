12장 테이블 조인 

조인 이해하기에 앞서 관계형 테이블 이해하기 

하나의 테이블 안에 모든 컬럼을 만들지 않는데 그 이유는 
1. 한 회사가 다수의 제품을 생산한 경우, 같은 판매처 정보를 제품마다 반복해서
저장하는 것은 저장 공간과 시간의 낭비이다. 

2. 만약 판매처 정보가 변경되면(예를 들어 회사가 이사를 가거나 우편번호가 변경된 경우),
모든 판매처 정보를 업데이터해야 한다.

3. 데이터가 반복되면(각 제품마다 판매처 정보를 사용하면), 
데이터가 매번 정확히 같은 방식으로 삽입되지 않을 가능성이 높아진다.
불일치한 데이터는 보고하는 데 사용하기가 어렵다. 

즉, 관계형 테이블은 정보를 쪼개 여러 개의 테이블에 저장하도록 설계되었다. 
테이블은 "공통 컬럼을 통해 연결된다."

그래서 각 행은 판매처를 구별할 수 있는 고유한 식별자를 갖는다.
이런 값을 "주 키(primary key)"라고 부른다. 

관계형 테이블을 사용하는 장점은 
1. 판매처 정보가 절대 반복되지 않기 때문에 시간과 공간이 낭비되지 않는다. 
2. 판매처 정보가 변경되더라도 Vendors 테이블에 있는 하나의 레코드만 업데이트 하면된다. 
관련된 테이블에 있는 데이터는 변경되지 않는다. 
3. 데이터가 반복되지 않기 때문에 사용한 데이터는 늘 일관성을 갖는다. 
그렇기 때문에 데이터 보고와 조작이 더 간단해진다. 

"즉, 확장성이 좋다."

따라서 이렇게 여러개로 나뉘어진 테이블의 데이터를 하나의 
SELECT 문으로 가져오기 위해 JOIN 을 사용한다. 

조인 생성하기 
ex)
SELECT vend_name, prod_name, prod_price
FROM Vendors, Products
WHERE Vendors.vend_id = Proucts.vend_id;

SELECT 구문에서 테이블을 조인할 때, 테이블을 어떻게 조인할지에 대한 내용이 아무것도 없기 때문에 
여러분 스스로 정해야 한다. 두 개의 테이블을 조인할 때, 할 일은 첫 번째 테이블의 행과 
두 번째 테이블을 행으로 짝을 짓는 것이다. 
WHERE 절이 있다면 필터로 동작해 지정한 조건과 일치하는 행만 가져온다. 
WHERE 절이 없다면 논리적으로 맞는지와 관계없이, 첫 번째 테이블에 있는 모든 행은 두 번째 
테이블에 있는 모든 행과 짝이 된다. 

내부 조인 
두 개의 테이블에 있는 공통 컬럼의 값이 같은 것을 결과로 가져오는 조인방식이다. 
조인 타입을 표시할 때는 이전과 조금 다른 문법을 사용해야 한다. 
ex)
SELECT vend_name, prod_name, prod_price
FROM Vendors INNER JOIN Products
  ON Vendors.vend_id = Products.vend_id; -- ON은 WHERE과 같은 역할을 한다. 

여러 개의 테이블 조인하기 
ex)
SELECT prod_name, vend_name, prod_price, quantity
FROM OrderItems, Products, Vendors
WHERE Products.vend_id = Vendors.vend_id
  AND OrderItems.prod_id = Products.prod_id
  AND order_num = 20007; -- 3개의 컬럼을 통을어 주문번호가 20007인 제품. 

*조인을 많이 할 수록 성능은 저하된다. 

서브쿼리를 조인문법으로 대체할 수도 있다. 
ex)
SELECT cust_name, cust_contact
FROM Customers
WHERE cust_id IN (SELECT cust_id
				  FROM OrderItems
				  WHERE order_num IN (SELECT order_num
				  					  FROM OrderItems
				  					  WHERE prod_id = 'RGAN01'));

이는, 아래와 같다. 
SELECT cust_name, cust_contact
FROM Customers, Orders, OrderItems
WHERE Customers.cust_id = Orders.cust_id
  AND OrderItems.order_num = Orders.order_num
  AND prod_id = 'RGAN01';



