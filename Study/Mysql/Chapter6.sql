6장 와일드카드 문자를 이용한 필터링 

제품명에 'bean bag'이라는 문자열이 포함된 제품을 찾으려면 어떻게 해야 할까? 
이런 경우 단순 비교 연산자만 가지고는 검색할 수 없다. 
이럴 때 와일드카드 문자를 이용해 검색 패턴을 만들어서 데이터와 비교할 수 있다. 
-- 검색 패턴 : 문자나 와일드 카드 또는 이 두개의 조합으로 구성된 검색 조건 

LIKE 연산자 사용하기 

% 와일드카드 

%는 0개 이상의 문자를 대신 할 수 있다. 

ex) 특정 문자로 시작하는 자료 검색 
SELECT prod_id, prod_name
FROM Products
WHERE prod_name LIKE 'Fish%'; -- Fish로 시작하는 값이 있다면 모두 검색하라 

ex) 특정 문자가 들어있는 자료 검색 
SELECT prod_id, prod_name
FROM Products
WHERE prod_name LIKE '%bean bag%';

ex) 특정 알파벳으로 시작하고 끝나는 자료 검색
SELECT prod_id, prod_name
FROM Products
WHERE prod_name LIKE 'F%y'; 

* 공백에 주의하자 
예를 들어 50개의 문자를 넣을 수 있는 컬럼에 Fish bean bag toy 라는 17개의 문자열을 저장하면, 
컬럼을 채우기 위해 33개의 공백이 추가될 수 있다. 이는 데이터에 영향을 미치진 않지만 
SQL 구문에는 영향을 줄 수도 있다. WHERE prod_name LIKE 'F%y'절은 F로 시작하고 y로 끝나는 문자열을
검색하는데, "값에 공백이 추가되었다면 끝나는 값이 y가 아니기 때문에" Fish bean bag toy는 
검색되지 않는다. 이 문제를 해결하는 간단한 방법은 검색 패턴에 %를 추가하는 것이다. 
"F%y%"로 검색하면 y뒤에 문자나 공백이 와도 된다. 

* %도 NULL 인 행은 가져오지 않는다. 

_ 와일드카드 

_은 단 한개의 문자를 대신한다. 
ex)
SELECT prod_id, prod_name
FROM Products
WHERE prod_name LIKE '__ inch teddy bear';

* 마찬가지로 공백에 주의해야한다. 

* 몇가지 주의 사항
	- 와일드카드를 남용해서는 안된다. 다른 검색 연산자를 이용해서 검색이 가능하다면, 그것을 이용하라. 
	- 꼭 필요하지 않는 한 검색 패턴의 시작에 와일드카드를 사용하지 말자. 와일드카드로 시작하는 검색 패턴은 처리가 가장 느리다. \
