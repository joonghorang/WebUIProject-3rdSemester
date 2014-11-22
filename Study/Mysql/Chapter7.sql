7장 계산 필드 생성하기 

계산 필드 이해하기
데이터베이스 테이블에 저장된 데이터가 딱 우리에게 맞는 경우가 잘 없다. 
가령 대소문자가 섞인 자료를 모두 대문자로 표현해야 하는 경우 등이다. 

따라서 가져온 데이터는 원본 데이터이기 때문에
애플리케이션이나 보고서에서 원하는 형식으로 바꿔야 한다.  
우리가 원하는 것은
1. 데이터베이스에서 직접 데이터를 변환하여 계산하거나 
2. 아니면 특정 형식으로 바꿔서 가져오는 것이다. 

이럴 때 계산 필드가 필요하다. 
하지만 계산 필드는 데이터베이스 테이블에 실제로 존재하는 것이 아니다. 
SQL SELECT 구문 내에 즉시 생성되기 때문이다. 

* 필드 / 기본적으로는 컬럼과 같은 뜻이며, 종종 서로 바꿔가며 부르기도 한다. 
		하지만 데이터베이스에서 컬럼은 일반적으로 Column이며, 필드는 보통 계산필드와 함께 사용된다.  

필드 연결하기 
두 개의 나눠진 컬럼을 하나로 연결해야 하는 경우가 있다. 
ex)
SELECT vend_name + ' (' + vend_country + ')'
FROM Vendors
ORDER BY vend_name; 

결과 => 
Bear Emporium 		(USA		)

같은 문장을 ||를 사용해 표현하면 
SELECT vend_name || ' (' || vend_country + ')'
FROM Vendors
ORDER BY vend_name;

문자열을 합쳐야 한다면 
SELECT Concat(vend_name, ' (',vend_country,')')
FROM Vendors
ORDER BY vend_name; 
이라고 표현한다. 이렇게 되면 네 개의 항목을 단일 컬럼으로 반환한다. 

그러나 결과에 불필요한 공백이 추가되어 잇을 경우가 있는데, 
이를 제거하려면 SQL RTRIM() 함수를 써야한다. 
ex)
SELECT RTRIM(vend_name) + ' (' + RTRIM(vend_country) + ')'
FROM Vendors
ORDER BY vend_name; 

RTRIM()함수는 오른쪽에 있는 모든 공백을 제거한다. 
LTRIM()함수는 왼쪽에 있는 모든 공백을 제거하고, 
TRIM() 양쪽에 있는 공백을 제거한다. 

별칭 사용하기 
이렇게 새로이 만들어 놓은 컬럼에 이름을 부여하려면 '별칭'을 지정해준다. 
ex)

SELECT Concat(vend_name, ' (', vend_country, ')')
		AS vend_title
FROM Vendors
ORDER BY vend_name; 

* 별칭은 지을 때는 주로 한 두개의 단어로 만든다. 
* 별칭은 '파생열' 이라고 불리기도 한다. 

수학 계산 수행하기 

item_price와 quantity를 곱해서 최종가격 출력하기 
ex)
SELECT prod_id,
		quantity,
		item_price,
		quantity * item_price AS expanded_price -- 이 열은 별칭을 이용한 확장열이다. 
FROM OrderItems
ORDER BY order_num = 20008;

* 그외에 4칙연산도 물론 가능하다. 

