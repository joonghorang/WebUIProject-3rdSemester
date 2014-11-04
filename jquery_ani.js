/*
jQuery가 기본적으로 제공하는 9개의 메서드. 크기변화, 슬라이드효과, 선명도변화 3가지 기능으로 쓰인다.
1. 크기변화
    show() : 크게하기
    hide() : 작게하기
    toggle() : show(), hide()를 번갈아 실행하기
2. 슬라이드
    slideDown() : 슬라이드 효과와 함께 보여주기
    slideUp() : 슬라이드 효과와 함께 사라지기
    slideToggle() : slideDown(), slideUp()을 번갈아 실행하기
3. 선명도
    fadeIn() : 선명하게
    fadeOut() : 흐리게
    fadeToggle() : fadeIn(), fadeOut()을 번갈아 실행하기
    
각 메서드는 다음과 같이 사용한다.
$(selector).method();
$(selector).method(speed);                  : speed는 효과를 진행할 속도. -ms/slow/normal/fast
$(selector).method(speed,callback);         : callback은 효과를 모두 완료하고 실행할 함수
$(selector).method(speed, easing, callback);: easing. 별도 플러그인 없으면, linear/swing만 가능
*/

$(document).ready(function(){
    $('button').click(function(){
        $('img').fadeToggle('50');
    });
});

$(document).ready(function(){
    $('div').hover(function(){
        $(this).animate({
            bottom : 400,
            left : 500
        },'slow');
    }, function(){
        $(this).animate({
            bottom : 0,
            left : 0
        },'slow');
    })
});