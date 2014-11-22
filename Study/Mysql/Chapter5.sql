5장 고급 데이터 필터링 

WHERE 절 조합하기 

WHERE 절에서는 AND 나 OR 을 조합하여 다수의 조건을 지정하여 
다양한 필터 제어가 가능하다. 

AND 연산자 사용하기 
ex)
SELECT prod_id, prod_price, prod_name
FROM Products
WHERE vend_id = 'DLL01'AND prod_price <= 4;

OR 연산자 사용하기 
ex)
SELECT prod_name, prod_price
FROM Products
WHERE vend_id = 'DLL01' OR vend_id = 'BRS01';

우선순위 이해하기 
AND와 OR를 같이 사용했을 때, 
우선순위는 AND 에 있다. 
ex)
SELECT prod_name, prod_price
FROM Products
WHERE vend_id = 'DLL01' OR vend_id = 'BRS01'
	  AND prod_price >= 10; 

우선 순위를 바꾸고 싶다면 '괄호'를 사용한다. 

WHERE (vend_id = 'DLL01' OR vend_id = 'BRS01')
	   AND prod_price >= 10;

그러나 일반적으로 괄호를 쓰는 것이 좋다. 

IN 연산자 사용하기 -- WHERE 절에서 OR 비교로 일치하는 값을 찾기 위해 조건을 지정하는 키워드 
IN 연산자는 조건의 범위를 지정할 때 사용한다. 
IN 연산자의 괄호 안에는 조건이 나열되는데, 
각 조건은 콤마로 구분된다. 

ex)
SELECT prod_name, pord_price
FROM Products
WHERE vend_id IN ('DLL01', 'BRS01') -- 판매처가 DLL01이거나 BRS01인 제품을 가져온다. 
ORDER BY prod_name; 

사실상 OR 와 같은 역할을 한다. 
위 문장은 아래와 같다. 
SELECT prod_name, prod_price
FROM Products
WHERE vend_id = 'DLL01' OR vend_id = 'BRS01'
ORDER BY prod_name; 

왜 같은데 IN 연산자를 쓸까? 
가장 큰 장점은 SELECT 구문을 포함하여 사용할 수 있다. 11 장에 자세히 언급한다. 

NOT 연산자 사용하기 -- 단독으로 사용할 수 없다. 
*NOT 키워드는 필터링 하는 컬럼 뒤가 아닐 앞에 적는다. 
ex)
SELECT prod_name
FROM Products
WHERE NOT vend_id = 'DLL01' -- vend_id가 'DLL01'이 아닌 제품을 가져온다. 
ORDER BY prod_name; 

이는 아래의 표현과 같다. 
WHERE vend_id != 'DLL01' 
WHERE vend_id <> 'DLL01' 

그래서 주로 간단한 조건식에는 사용하지 않고, 복잡한 조건식에서 사용하기 적합하다. 
