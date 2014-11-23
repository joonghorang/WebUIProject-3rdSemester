10장 데이터 그룹핑 

"만약 내가 원하는 것이 각 판매처의 제품 수를 구하는 것이라면? "

그룹 생성하기 
그룹은 SELECT 구문에서 GROUP BY 절을 사용하여 생성할 수 있다. 
ex)
SELECT vend_id, COUNT(*) AS num_prods
FROM Products
GROUP BY vend_id; -- vend_id로 그룹핑하여 각각의 아이디가 총 몇개인지를 num_prods 별칭 컬럼에서 보여준다. 

* GROUP BY 의 규칙
	1. GROUP BY 절에는 원하는 만큼의 컬럼을 써서, 
		중첩(nested) 그룹을 만들 수 있다. 
		이 방식은 데이터를 그룹핑하는 방식을 좀 더 세밀하게
		제어할 수 있게 해준다. 

	2. GROUP BY 절에 중첩된 그룹이 있다면, 데이터는 
		가장 마지막에 지정된 그룹에서 요약된다.
		즉, 지정된 컬럼은 그룹핑될 때 같이 측정된다
		(그래서 각 컬럼단위로는 데이터를 얻지 못한다.)

	3. GROUP BY 에 있는 컬럼은 가져오는 컬럼이거나,
		그룹 함수는 아니면서 유효한 수식이어야 한다. 
		SELECT 안에서 수식을 사용한다면, GROUP BY 에도 
		같은 수식을 사용해야 한다. 별칭은 사용할 수 없다. 

	4. 대부분의 SQL 실행 환경에서는 GROUP BY 절에서 
		문자나 메모와 같은 가변형 길이의 데이터형은 사용할 수 없다. 

	5. 그룹 함수 구문을 제외하고 SELECT 문에 있는 모든 컬럼은 
		GROUP BY 절에 존재해야 한다. 

	6. 그룹핑하는 컬럼의 행에 NULL 값이 있다면,
		NULL 도 그룹으로 가져온다. 
		여러행이 NULL 값을 가진다면, 
		모두 함께 그룹화된다. 

	7. GROUP BY 절은 WHERE 절 뒤에 그리고 ORDER BY 절 앞에 와야 한다. 


그룹 필터링 

GROUP BY 를 사용하여 데이터를 그룹핑하는 것뿐만 아니라,
SQL은 어떤 그룹을 포함하고 어떤 그룹은 배제할 것인지 
필터링도 가능하게 해준다. 

WHERE 절을 사용할 수 있을 거라고 생각하지만,
WHERE 절은 행을 필터링하기 때문에, 그룹에는 적용할 수 없다. 

그럼 WHERE 절 대신에 무엇을 사용할 수 있을가? 
SQL은 이에 HAVING 이라는 절을 제공한다. 
HAVING 은 WHERE 절과 매우 유사하여 WHERE 절의 모든 유형을 적용할 수 있다. 
다만 키워드만 다를뿐이다. 

ex) COUNT가 2 보다 큰 그룹내의 데이터를 보여주기 
SELECT cust_id, COUNT(*) AS orders
FROM Orders
GROUP BY cust_id
HAVING COUNT(*) >= 2; 

* WHERE 절과 HAVING 의 또 다른 차이 점 
WHERE 절은 데이터가 그룹화되기 전에 필터링하고, 
HAVING 절은 데이터가 그룹화된 후에 필터링한다는 점이다. 
WHERE 절에서 필터링된 행은 제거되기 때문에 그룹에 포함되지 않아서, 집계값이 바뀔 수 있다. 
HAVING 절에서는 그 집계값으로 필터링하기 때문에 필터링 결과도 바뀔 수 있다. 

* 하나의 문장에 WHERE 절과 HAVING 절 모두를 사용할 필요가 있을 수도 있다.
ex) 지난 12개월 동안 두 번 이상 주문한 적이 있는 고객만을 뽑아내고 싶을 때,
WHERE 절로 지난 12개월 동안 주문했던 고객을 필터링 하고, 
그 다음 HAVING 절을 이용하여 결과에서 두 번 이상 주문한 고객을 필터링하면 된다. 

SELECT vend_id, COUNT(*) AS num_prods
FROM Products
WHERE prod_price >= 4
GROUP BY vend_id
HAVING COUNT(*) >= 2;

그룹핑과 정렬
ORDER BY 와 GROUP BY 비교 

ORDER BY 					GROUP BY
결과를 정렬한다. 			행을 그룹핑한다. 결과는 그룹 순서대로 출력되지 않을 수 있다. 

어떤 컬럼이라도				가져오는 컬럼이나 수식 컬럼을 사용할 수 있고 
(가져오지 않는 컬럼도)		선택된 모든 컬럼 수식을 사용해야 한다. 
사용할 수 있다. 

필수 항목은 아니다. 		그룹 함수와 함께 사용하는 컬럼이 있는 경우 필수 항목이다. 

*따라서 되도록이면 ORDER BY 절을 추가로 사용하여 정렬해준다. 
ex)
SELECT order_num, COUNT(*) AS items
FROM OrderItems
GROUP BY order_num
HAVING COUNT(*) >= 3;
ORDER BY items, order_num; // item을 order_num으로 정렬

SELECT 절 표기순서
1 SELECT > 
2 FROM > 
3 WHERE > 
4 GROUP BY > 
5 HAVING > 
6 ORDER BY

