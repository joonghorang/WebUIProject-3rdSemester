10장 데이터 그룹핑 

"만약 내가 원하는 것이 각 판매처의 제품 수를 구하는 것이라면? "

그룹 생성하기 
그룹은 SELECT 구문에서 GROUP BY 절을 사용하여 생성할 수 있다. 
ex)
SELECT vend_id, COUNT(*) AS num_prods
FROM Products
GROUP BY vend_id; -- vend_id로 그룹핑하여 각각의 아이디가 총 몇개인지를 num_prods 별칭 컬럼에서 보여준다. 


