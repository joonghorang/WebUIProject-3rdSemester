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

itemFactoryButton.addEventListener('click', function(){
    mainContentWrapper.style.display = 'none';
    itemFactory.style.display = 'block';
    itemFactoryButton.style.display = 'none';
    uploadFile.style.display = 'block';
    uploadText.style.display = 'none';
    closeButton.style.display = 'block';
    previewImg.style.display = 'block';
},false);

closeButton.addEventListener('click', function(){
    mainContentWrapper.style.display = 'block';
    itemFactory.style.display = 'none';
    itemFactoryButton.style.display = 'block';
    closeButton.style.display = 'none';
    
    if(previewImg.childNodes[0] !== undefined){
        previewImg.removeChild(previewImg.childNodes[0]);
    }   
    previewImg.style.display = 'none';
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
    previewImg.style.display = 'block';
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
            //받아온 JSON
            console.log(request.responseText);
            var result = JSON.parse(request.responseText)

            //텍스트 입력창으로 전환
            uploadText.style.display = 'block';
            uploadFile.style.display = 'none';
            closeButton.style.display = 'none';
            textInput.value = "30자 이내로 입력하세요.";
            //JSON에 있는 RGB데이터로 텍스트입력창 배경색 그리기(bgColor=result.rgb)    
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
    
//왜인지 모르게 이부분이 있어야 드래그로 사진을 옮겼을때 크롬에서 이미지가 열려져버리는 일이 발생하지 않는다.
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
    //파일 없을때 에러처리
    if(fileInput.files.item(0)===null){
        alert('no image');
    }
    formData.append("image", fileInput.files[0]);
    
    request.open("POST", "/upload-text", true);
    request.send(formData);
    
    //데이터 전송이 다 끝난 뒤에 itemFactory close
    itemFactory.style.display = 'none';
    itemFactoryButton.style.display = 'block';
    mainContentWrapper.style.display = 'block';

    //새로운 캔버스 객체를 메인페이지에 생성하는 코드
    //덕성이가 만든 css코드를 이해못하겠으나 자고있으므로, 
    //내일 신영이에게 물어봄... 
    var addLi = document.createElement('li');
    addLi.setAttribute('class', 'moment');
    moments.appendChild(addLi);
    var addCanvas = document.createElement('canvas');
    addCanvas.style.backGroundColor = "black";
    request.onreadystatechange = function(){
        if(request.readyState === 4 && request.status === 200){
            addCanvas.setAttribute('id', request.responseText);
            addLi.appendChild(addCanvas);
            test_genOutputs(addCanvas);
            console.log(1);
        }
    };

},false);

//moments bar 안의 moment 클릭시 output페이지로 이동
