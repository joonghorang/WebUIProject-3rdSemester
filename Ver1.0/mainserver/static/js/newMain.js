var wrapper = document.getElementById('wrapper');
var t2 = document.getElementById('t2');

//기본 구조
t2.addEventListener('mouseover', function(){
    wrapper.style.backgroundColor = '#b1a686';
    
    var otherSpans = document.querySelectorAll('span:not(#'+this.id+')');
    for(var i=0 ; i<otherSpans.length ; i++){
        otherSpans[i].style.opacity = '0.5';
    }
});
t2.addEventListener('mouseout', function(){
    wrapper.style.backgroundColor = 'transparent';
    
    var otherSpans = document.querySelectorAll('span:not(#'+this.id+')');
    for(var i=0 ; i<otherSpans.length ; i++){
        otherSpans[i].style.opacity = '1';
    }
});

//아마도 이렇게 함수로 만들어서, span추가될때마다 색상값만 데이터로 넣어서 이벤트도 같이 추가하면 될 듯?
function spanHover(targetSpan, bgColor){
    targetSpan.addEventListener('mouseover', function(){
        wrapper.style.backgroundColor = bgColor;
        
        var otherSpans = document.querySelectorAll('span:not(#'+this.id+')');
        for(var i=0 ; i<otherSpans.length ; i++){
            otherSpans[i].style.opacity = '0.5';
        }
    });
    targetSpan.addEventListener('mouseout', function(){
        wrapper.style.backgroundColor = 'transparent';
        
        var otherSpans = document.querySelectorAll('span:not(#'+this.id+')');
        for(var i=0 ; i<otherSpans.length ; i++){
            otherSpans[i].style.opacity = '1';
        }
    });
};

