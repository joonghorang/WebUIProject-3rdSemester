var wrapper = document.getElementById('wrapper');
var t2 = document.getElementById('t2');

//기본 구조
t2.addEventListener('mouseover', function(){
    wrapper.style.backgroundColor = '#b1a686';
});
t2.addEventListener('mouseout', function(){
    wrapper.style.backgroundColor = 'transparent';
});

//아마도 이렇게 함수로 만들어서, span추가될때마다 색상값만 데이터로 넣어서 이벤트도 같이 추가하면 될 듯?
function spanHover(targetSpan, bgColor){
    targetSpan.addEventListener('mouseover', function(){
    wrapper.style.backgroundColor = bgColor;
    });
    targetSpan.addEventListener('mouseout', function(){
        wrapper.style.backgroundColor = 'transparent';
    });
};