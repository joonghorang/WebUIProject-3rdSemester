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
    var confirm = document.getElementById('confirm-button');
    confirm.addEventListener('click',function(){
        itemFactory.style.backgroundColor = '#ffffff';
        itemFactory.style.opacity = '1';
        itemFactory.style.transition = 'all 0.8s ease-in-out';
        itemFactory.style.position = 'absolute';
        itemFactory.style.top = '0';
        itemFactory.style.left = '0';
        itemFactory.style.width = '100%';
        itemFactory.style.height = '100%';
        
        var uploadButton = document.getElementById('upload-button');
        uploadButton.style.transition = 'opacity 0.4s ease-in-out';
        uploadButton.style.opacity = '0';
        confirm.style.transition='opacity 0.4s ease-in-out';
        confirm.style.opacity = '0';
        
        var submitButton = document.getElementById('submit-button');
        submitButton.style.transition = 'display 0.8s ease-in-out';
        submitButton.style.display = 'block';
        
        var tempImg = document.getElementById('preview-image');
        tempImg.style.transition = 'display 0.8s ease-in-out';
        tempImg.style.display = 'none';
    },false);
    
function setItemFactory(opacity, displayState, openBar, closeBar, bgColor){
    itemFactory.style.opacity = opacity;
    itemFactory.style.display = displayState;
    itemFactoryOpen.style.display = openBar;
    itemFactoryClose.style.display = closeBar;
    bg.style.backgroundColor = bgColor;
}
    
/*gridItem 클릭 시 확대 - output페이지로*/
    var gridItem = document.querySelector('.grid-item');
    gridItem.addEventListener('click', function(){
        gridItem.style.transition = 'all 0.5s ease-in-out';
        gridItem.style.width = '100%';
        gridItem.style.height = '100%';
    } ,false);    
  
/*파일 선택시 선택한 이미지를 preview에 보여주기*/
    var fileInput = document.getElementById('upload-hidden');
    fileInput.addEventListener('change', function(){
        
        /*파일 없을때 에러처리*/
        if(this.files.item(0)===null){
            alert('no image');
        }
        var imgFile = this.files.item(0);
        var imgURL = URL.createObjectURL(imgFile);
        
        var previewImg = document.getElementById('preview-image');
        if(previewImg.childNodes[0] !== undefined){
            previewImg.removeChild(previewImg.childNodes[0]);
        }  
        var imgElement = document.createElement('img');
        imgElement.setAttribute('class', 'inputImage');
        imgElement.src=imgURL;
    
        document.getElementById('preview-image').appendChild(imgElement);
 
    },false);

},false)