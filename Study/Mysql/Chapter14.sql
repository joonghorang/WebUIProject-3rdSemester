14장 쿼리 결합하기 

이 장에서는 UNION 연산자를 사용해 여러 개의 SELECT 문을 결합하여 하나의 결과를 얻는 방법을 학습한다. 

결합 쿼리 이해하기 

기본적으로 결합 쿼리를 사용하는 두 가지 경우의 시나리오가 있따. 

1. 여러 테이블에 있는 비슷한 구조의 데이터를 하나의 쿼리로 가져오는 경우
2. 한 개의 테이블에서 여러 개의 쿼리를 수행하고, 하나의 결과로 가져오는 경우 

UNION 연산자를 사용하면 SQL 쿼리를 결합할 수 있다. 
예를 들어 여러 개의 SELECT 문에 UNION을 지정하면 그 결과가 하나로 결합된다. 

UNION 사용하기 
예를들어
ex)
SELECT cust_name, cust_contact, cust_email
FROM Customers
WHERE cust_state IN ('IL', 'IN', 'MI');

와
SELECT cust_name, cust_contact, cust_email
FROM Customers
WHERE cust_name = 'Fun4All';
을 결합하면 

SELECT cust_name, cust_contact, cust_email
FROM Customers
WHERE cust_state IN ('IL', 'IN', 'MI')
UNION
SELECT cust_name, cust_contact, cust_email
FROM Customers
WHERE cust_name = 'Fun4All';

UNION 은 주로 조건이 복잡하거나, 
하나의 테이블이 아니라 여러 개의 테이블에서 데이터를 가져와야할 때 사용한다.

단순하 쿼리에 UNION 을 사용하는 것은 비추.

UNION 규칙 
- UNION은 반드시 두 개 이상의 SELECT 구문으로 구성되어야 하며, 
  각 구문은 UNION 이라는 키워드로 구분한다(만일 네 개의 SELECT 문이 있다면 UNION 키워드는 세 개가 된다)개가
- UNION에서 각 쿼리는 같은 컬럼이나 수식, 그룹 함수를 가져야한다.
- 컬럼 데이터형은 호환 될 수 있다. 정확히 같은 데이터형일 필요는 없지만 DBMS가 내부적으로 변화할 수 있어야한다. 

중복 행 포함하기와 제거하기 

UNION은 기본적으로 중복 행을 제거해서 가져온다. 
만약 중복되는 행을 포함해서 모든 행을 가져오고 싶다면, UNION ALL 을 사용하면 된다. 

결합 쿼리 결과 정렬하기 
ORDER BY 절을 사용하여 정리할 수 있다. 
