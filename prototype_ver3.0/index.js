
window.addEventListener('DOMContentLoaded', function(){

    var wrapper = document.getElementById('item-factory-wrapper');
    var itemFactory = document.getElementById('item-factory');
    var bg = document.getElementById('item-factory-background');
    var itemFactoryOpen = document.querySelector('#item-factory-nav-open');
    var itemFactoryClose = document.querySelector('#item-factory-nav-close');

/*itemFactory 열기*/
    itemFactoryOpen.addEventListener('click',function(){
        wrapper.style.display = 'block';
        setItemFactory('0.9', 'block', 'none', 'block', '#101010');
},false);
/*itemFactory 닫기*/
    itemFactoryClose.addEventListener('click',function(){
        wrapper.style.display = 'none';
        setItemFactory('0', 'none', 'block', 'none', 'transparent');
},false);

/*submit 클릭 시 itemFactory 확장 - output페이지로(html전환)*/
    var submit = document.getElementById('submit-button');
    submit.addEventListener('click',function(){
        itemFactory.style.backgroundColor = '#ffffff';
        itemFactory.style.opacity = '1';
        itemFactory.style.transition = 'all 0.8s ease-in-out';
        itemFactory.style.transform = 'scale(2.2)';
    },false);
    
/*gridItem 클릭 시 확대 - output페이지로*/
    var gridItem = document.querySelector('.grid-item');
    gridItem.addEventListener('click', function(){
        gridItem.style.transition = 'all 0.5s ease-in-out';
        gridItem.style.width = '100%';
        gridItem.style.height = '100%';
    } ,false);
    
function setItemFactory(opacity, displayState, openBar, closeBar, bgColor){
    itemFactory.style.opacity = opacity;
    itemFactory.style.display = displayState;
    itemFactoryOpen.style.display = openBar;
    itemFactoryClose.style.display = closeBar;
    bg.style.backgroundColor = bgColor;
}
    
},false)