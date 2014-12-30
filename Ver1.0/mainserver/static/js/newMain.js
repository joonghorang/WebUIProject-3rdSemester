var wrapper = document.getElementById('wrapper');
var t2 = document.getElementById('t2');

//e.stopPropagation을 어딘가에 적절히....?

//body.addEventListener('mouseover', function(e){
//    wrapper.style.backgroundColor = '#000000';
//});

t2.addEventListener('mouseover', function(){
    wrapper.style.backgroundColor = '#b1a686';
});
t2.addEventListener('mouseout', function(){
    wrapper.style.transition = 'all 0.5s ease-in-out';
    wrapper.style.backgroundColor = 'transparent';
});
