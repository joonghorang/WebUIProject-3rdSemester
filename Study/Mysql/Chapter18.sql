18장 뷰 사용하기 

뷰는 가상테이블이다. 
데이터를 갖고있는 테이블과는 달리, 뷰는 저장하고 사용할 때 동적으로 데이터를 가져온다. 

*MYSQL ver5.0 이상부터 사용가능 

왜 뷰를 사용하는가? 

- SQL문을 재사용하기 위해
- 복잡한 SQL 작업을 단순화하기 위해 (상세내용을 읽지 않아도됨)
- 완전한 테이블이 아니라 테이블의 일부분만을 노출하기 위해서
- 데이터를 보호하기 위해서 
- 데이터 형식을 변경하기 위해서 (뷰는 원래 테이블과는 다른 형식으로 데이터를 가져올 수 있다.)

일반적으로 뷰는 생성된 후에 테이블과 같은 방식으로 사용된다. 
데이터를 추가하거나 업데이트할 때에만 약간의 제약이 있다. 

가장 중요한 점은 뷰는 뷰일 뿐이고, 
데이터는 딴 곳에 있다는 점이다. 

그렇기 때문에 그 테이블에서 데이터가 추가되거나 변경되면,
뷰는 변경된 데이터를 가져온다. 

뷰 규칙과 제한 
- 테이블 처럼 뷰는 고유한 이름을 가져야한다. 
- 생성할 수 있는 뷰의 수에는 제한이 없다.
- 뷰를 생성하기 위해 보안 권한을 가져야 한다. 이 권한은 주로 데이터베이스 관리자가 관리한다. 
- 뷰는 뷰를 포함할 수 있다. 
- 많은 DBMS는 뷰 쿼리에서 ORDER BY 절의 사용을 금지한다. 
- 일부 DBS에서는 가져오는 모든 컬럼에 이름을 필히 부여해야한다. 
- 뷰는 인덱스나 트리거 또는 기본값으로 사용될 수 없다. 
- 일부 DBMS는 뷰를 읽기 전용 쿼리로 처리한다. 
- 일부 DBMS는 삽입 또는 업데이트로 뷰의 일부분이었던 행이 이탈하면서, 
	삽입이나 업데이트를 허용하지 않는 뷰를 생성할 수 있다. 

뷰 생성하기 
ex)
CREATE VIEW ProductCustomers AS
SELECT cust_name, cust_contact, prod_id
FROM Customers, Orders, OrderItems
WHERE Customers.cust_id = Orders.cust_id
  AND OrderItems.order_num = Orders.order_num;

제품을 주문한 적이 있는 모든 고객 리스트를 가져오기 위해 세 개의 테이블을 조인하여 ProductCustomers
라는 이름의 뷰를 생성하였다. 

여기서 나중에 RGAN01 제품을 주문한 고객 리스트를 가져오려면 다음과 같이 입력한다. 
ex)
SELECT cust_name, cust_contact
FROM ProductCustomers
WHERE prod_id = 'RGAN01';

* 특정 데이터에 종속되지 않는 뷰를 생성하는 것은 좋은 생각이다. 재사용이 가능하기 때문이다. 

가져온 데이터의 형식을 변경하기 위해 뷰 사용하기 
ex)
SELECT RTRIM(vend_name) + '(' + RTRIM(vend_country) + ')'
AS vend_title
FROM Vendors
ORDER BY vend_name; 
와 같은 구문을 뷰를 사용하면,

CREATE VIEW VendorLoacations AS
SELECT RTRIM(vend_name) + ' ('  + RTRIM(vend_coutry) + ')'
AS vend_title
FROM Vendors;

이렇게 뷰를 생성한뒤 

SELECT *
FROM VendorLocations; 

입력-

원하지 않는 데이터를 필터링하기 위해 뷰 사용하기 
뷰는 WHERE 절과 함께 사용할 떄도 유용하다. 
ex)
CREATE VIEW CustomersEmailList AS
SELECT cust_id, cust_name, cust_email
FROM Customers
WHERE cust_email IS NOT NULL;

계산 필드와 함께 뷰 사용하기 
ex)
CREATE VIEW OrderItemExpanded AS
SELECT order_num,
		prod_id,
		quantitiy,
		item_price,
		quantity * item_price AS expanded_price
FROM OrderItems;

그럼 주문 20008의 상세 정보를 가져오는 예제는 다음과 같다. 
SELECT *
FROM OrderItemsExpanded
WHERE order_num = 20008;
