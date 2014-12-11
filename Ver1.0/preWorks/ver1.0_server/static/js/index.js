//DOM content가 다 로드되고 나면(html이 열심히 뼈대를 다 그리고 나면) js에서 조작하는 이벤트들을 등록한다. 
//전역변수를 줄이려는 노력으로 이렇게 계속 쓰고는 있는데, 좋은 방식인지는 잘 모르겠다. 
window.addEventListener('DOMContentLoaded',function(){
                        
    var addIcon = document.getElementById('plus');
    var itemFactoryWrapper = document.getElementById('item-factory-wrapper');

    
    addIcon.addEventListener('click',function(){
        itemFactoryWrapper.style.display = 'block';
    },false);
    
    var formData = new FormData();
    formData.append('inputImage',this.files[0]);
    
    var XHR = new XMLHttpRequest();
    XHR.open('POST', '/upload', true);
    XHR.send();

},false)

