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

    function setItemFactory(opacity, displayState, openBar, closeBar, bgColor){
        itemFactory.style.opacity = opacity;
        itemFactory.style.display = displayState;
        itemFactoryOpen.style.display = openBar;
        itemFactoryClose.style.display = closeBar;
        bg.style.backgroundColor = bgColor;
    }
    
/*confirm 클릭 시 itemFactory 확장 - text입력받기*/
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
        uploadButton.style.transition = 'display 0.4s ease-in-out';
        uploadButton.style.display = 'none';
        confirm.style.transition='display 0.4s ease-in-out';
        confirm.style.display = 'none';
        
        var submitButton = document.getElementById('submit-button');
        submitButton.style.transition = 'display 0.8s ease-in-out';
        submitButton.style.display = 'block';
        
        var tempImg = document.getElementById('preview-image');
        tempImg.style.transition = 'display 0.8s ease-in-out';
        tempImg.style.display = 'none';
        
        var background = document.getElementById('back-ground-canvas');
        var preview = document.getElementById('preview');
        var textInput = document.getElementById('text-input');
        textInput.style.display = 'block';
        preview.style.width = '100%';
        preview.style.height = '100%';
        background.style.display = 'block';
    },false);
    
var submit = document.getElementById('submit-button');
    submit.addEventListener('click',function(){
        
        textValue = textInput.textContent;
		textInput.style.display = "none";
		submitButton.style.display = "none";
        outputCanvas.style.display = "block";
        backGroundCanvas.style.display='none';
        
        function getHour(){
            var now = new Date();
            var hour = now.getHours();
            if (("" + hour).length == 1) { hour = "0" + hour; }
                return hour;
            return getCurrentTime().substr(8,2);
        }
        
        var presentTime = parseInt(getHour());
        if(presentTime < 10 || presentTime > 6 ){
            fontName = "NanumMyeongjo";
        } else {
            fontName = "NanumBarunGothic";
        }
        
        textWriter(); // 글자 쏴주는 함수 
        
        outputCanvas.style.transition = 'opacity 2s ease-in-out';
        outputCanvas.style.opacity = '0';
        setTimeout(function(){
            wrapper.style.display = 'none';
        },2000);
        
        itemFactoryOpen.style.display = 'block';
        itemFactoryClose.style.display = 'none';

        /*TODO preview-image 의 자식 노드를 지우기*/
        
        
    },false);

    
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