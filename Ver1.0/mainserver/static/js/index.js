var MAX_HEIGHT = window.innerHeight*99.8;
var MAX_WIDTH = window.innerWidth*99/100;

var navBar = document.getElementById("navBar");
var momentsBar = document.getElementById("momentsBar");
var moments = document.getElementById("moments");
var fileInput = document.getElementById("upload-hidden");
var textInput = document.getElementById("text-input");
var confirmButton = document.getElementById("confirm-button");
var submitButton = document.getElementById("submit-button");
var uploadDrag = document.getElementById("upload-drag");
var itemFactory = document.getElementById("itemFactory");
var itemFactoryButton = document.getElementById("itemFactory-button");
var mainContentWrapper = document.getElementById("wrapper");
var uploadFile = document.getElementById("upload-file");
var uploadText = document.getElementById("upload-text");
var closeButton = document.getElementById("close-button");
var previewImg = document.getElementById('preview-image');

window.addEventListener('DOMContentLoaded', function(){  
	test_genOutputs();
}, false);

function display(elements, state){
    for(var i=0 ; i<elements.length ; i++){
        elements[i].style.display = state === 'show'? 'block':'none';
    }
};

itemFactoryButton.addEventListener('click', function(){
    display([itemFactory,uploadFile,closeButton, previewImg],'show');
    display([mainContentWrapper, itemFactoryButton, uploadText],'hide');
},false);

closeButton.addEventListener('click', function(){
    if(previewImg.childNodes[0] !== undefined){
        previewImg.removeChild(previewImg.childNodes[0]);
    }   
    display([mainContentWrapper, itemFactoryButton],'show');
    display([itemFactory, closeButton, previewImg],'hide');
},false);

fileInput.addEventListener('click', function(){
    fileInput.value = null; //input reset
});
//fileInput change이벤트 : 여기로 colorLab요청 로직 옮기기.
fileInput.addEventListener('change', function(){
    var imgFile = this.files.item(0);
    var imgURL = URL.createObjectURL(imgFile);
    if(previewImg.childNodes[0] !== undefined){
        previewImg.removeChild(previewImg.childNodes[0]);
    }  
    var imgElement = document.createElement('img');
    imgElement.setAttribute('id', 'input-image');
    imgElement.src=imgURL; 
    previewImg.appendChild(imgElement);   
    display(previewImg, 'show');
});
        
        
//confirm버튼 누르면 이미지를 서버로 보내기.
confirmButton.addEventListener('click', function(e){
	e.preventDefault();

    //파일 없을때 에러처리
    if(fileInput.files.item(0)===null){
        alert('no image');
    }
    else{
        if(previewImg.childNodes[0] !== undefined){
            previewImg.removeChild(previewImg.childNodes[0]);
        }  
        previewImg.style.display = 'none';
        
        //AJAX로 데이터 받아오기
        var request = new XMLHttpRequest();
        var formData = new FormData();
        formData.append("image", fileInput.files[0]);
        //길을 열어라! - 보내라! - 받아와라!(data가 load되면 실행)
        request.open("POST" , "/upload-image" , true);
        request.send(formData);
        request.addEventListener('load', function(){
            //받아온 데이터는 colorList 배열에 담는다.
            var colorList = JSON.parse(request.responseText)
            console.log(colorList);
            //텍스트 입력창으로 전환 : timer 필요함
            display([uploadText],'show');
            display([uploadFile, closeButton],'hide');

            //JSON에 있는 RGB데이터로 텍스트입력창 배경색 그리기 : 원래 testInput.js에 있던 시행함수
            //changeGradation()은????
            textInput.value = "30자 이내로 입력하세요.";
            firstColor = colorList[0];
            secondColor = colorList[1];
            drawGradation(colorList[0], colorList[1]);   
        });
    }
    
}, false);

uploadDrag.addEventListener("drop", function(e){
    e.stopPropagation();
    e.preventDefault();
    var files = e.target.files || e.dataTransfer.files;
    //image 인지 판별 코드 필요.
    fileInput.files = files;
}, true);
    
//브라우저는 이미지를 받으면 바로 이미지를 여는 기본기능이 있기 때문에, 기본기능을 막아둔다.
uploadDrag.addEventListener("dragover", function(e){
    e.stopPropagation();
    e.preventDefault();
}, true);

//submit버튼 누르면 텍스트 데이터를 서버로 보내기.
submitButton.addEventListener('click', function(e){
    e.preventDefault();
    var request = new XMLHttpRequest();
    var formData = new FormData();

    formData.append("textInput", textInput.value);
    formData.append("image", fileInput.files[0]);
    
    request.open("POST", "/upload-text", true);
    request.send(formData);
  
  //새로운 캔버스 객체를 메인페이지에 생성하는 코드  
    var addLi = document.createElement('li');
    addLi.setAttribute('class', 'moment');
    moments.appendChild(addLi);
    var addCanvas = document.createElement('canvas');

    var addFullLi = document.createElement('li');
    addFullLi.setAttribute('class', 'fullMoment');
    fullViewMoments.appendChild(addFullLi);

    var addCanvas = document.createElement('canvas');
    var addFullCanvas = document.createElement('canvas');
    var addBackCanvas = document.createElement('canvas');

    request.addEventListener('load', function(){
        //데이터 전송이 다 끝난 뒤에 itemFactory close
        display([itemFactoryButton, mainContentWrapper],'show');
        display([itemFactory],'hide');

        var result = JSON.parse(request.responseText);
        var ctx = addCanvas.getContext("2d");
        ctx.fillStyle = result.colorList[0];
        ctx.fillRect(0,0,addCanvas.width,addCanvas.height);



        addCanvas.setAttribute('id', request.responseText);
        addLi.appendChild(addCanvas);
        
        addFullCanvas.setAttribute('id', "fc" + request.responseText);
        addFullCanvas.setAttribute('class', "full-canvas");
        addBackCanvas.setAttribute('id', "bc" + request.responseText);
        addFullCanvas.setAttribute('class', "back-canvas");

        addFullCanvas.style.display = "none";
        addBackCanvas.style.display = "none";

        addFullLi.appendChild(addFullCanvas);    
        addFullLi.appendChild(addBackCanvas);            

        test_genOutputs(addCanvas);
        EventUtil.addHandler(addCanvas, "click", function(event){
            itemFactory.style.display = "none";
            wrapper.style.display = "none";
            itemFactoryButtonWrapper.style.display = "none";

            var targetFullCanvas = document.getElementById("fc" + event.target.id);
            var targetBackCanvas = document.getElementById("bc" + event.target.id);
            targetFullCanvas.style.display = "block";

            targetBackCavnas.style.backgroundColor = "yellow";
            targetBackCanvas.style.display = "block";
        });
    });
},false);

//moments bar 안의 moment 클릭시 output페이지로 이동
