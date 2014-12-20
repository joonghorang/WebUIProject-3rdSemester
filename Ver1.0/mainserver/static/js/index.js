var MAX_WIDTH = window.innerWidth;
var MAX_HEIGHT = window.innerHeight;

var setItemFactoryDisplay = {
    "getElements" : function(){
        this.itemFactory = document.getElementById("itemFactory");
        this.itemFactoryButton = document.getElementById("itemFactory-button");
        this.moments = document.getElementById("moments");
        this.uploadFile = document.getElementById("upload-file");
        this.uploadText = document.getElementById("upload-text");
        this.closeButton = document.getElementById("close-button-wrapper");
        this.previewImg = document.getElementById('preview-image');
    },
    "openFactory" : function(){
        display([this.itemFactory,this.uploadFile,this.closeButton, this.previewImg],'show');
        display([this.moments, this.itemFactoryButton, this.uploadText],'hide');
    },
    "closeFactory" : function(){
        if(this.previewImg.childNodes[0] !== undefined){
            this.previewImg.removeChild(this.previewImg.childNodes[0]);
        }   
        display([this.moments, this.itemFactoryButton],'show');
        display([this.itemFactory, this.closeButton, this.previewImg],'hide');
    },
    "init" : function(){ // mainPage Initial code
        //1.DB에 색상을 요청해서 저장된 칼라값을 받아온 후 배경 컬러를 설정하는 코드 
        //2.DB에 저장된 유닛들을 받아서 원하는 그리드로 뿌려주는 코드. 
        
        this.getElements();
        this.itemFactoryButton.addEventListener('click',this.openFactory.bind(this),false);
        this.closeButton.addEventListener('click', this.closeFactory.bind(this), false);
    }
};
var manageFileInput = {
    "getElements" : function(){
        this.fileInput = document.getElementById("upload-hidden");
        this.textInput = document.getElementById("text-input");
        this.previewImg = document.getElementById('preview-image');
    },
    "reset" : function(){
        this.fileInput.value = null;
    },
    "change" : function(){
        var imgFile = this.fileInput.files.item(0);
        var imgURL = URL.createObjectURL(imgFile);
        if(this.previewImg.childNodes[0] !== undefined){
            this.previewImg.removeChild(this.previewImg.childNodes[0]);
        }  
        var imgElement = document.createElement('img');
        imgElement.setAttribute('id', 'input-image');
        imgElement.src=imgURL; 
        this.previewImg.appendChild(imgElement);   
        display([this.previewImg], 'show');
    },
    "init" : function(){
        this.getElements();
        this.fileInput.addEventListener('click', this.reset.bind(this),false);
        this.fileInput.addEventListener('change',this.change.bind(this),false);
    }
};
var confirm = {
    "getElements" : function(){
        this.closeButton = document.getElementById("close-button-wrapper");
        this.uploadFile = document.getElementById("upload-file");
        this.uploadText = document.getElementById("upload-text");
        this.confirmButton = document.getElementById("confirm-button");
        this.fileInput = document.getElementById("upload-hidden");
        this.previewImg = document.getElementById('preview-image');
        this.textInput = document.getElementById("text-input");
        this.request = new XMLHttpRequest();
    },
    "sendData" : function(e){
        e.preventDefault();
        //파일 없을때 에러처리
        if(this.fileInput.files.item(0)===null){
            alert('no image');
        }
        else{
            if(this.previewImg.childNodes[0] !== undefined){
                this.previewImg.removeChild(this.previewImg.childNodes[0]);
            }  
            display([this.previewImg], 'hide');
            //AJAX로 데이터 받아오기
            var formData = new FormData();
            formData.append("image", this.fileInput.files[0]);
            //길을 열어라! - 보내라! - 받아와라!(data가 load되면 실행)
            this.request.open("POST" , "/upload-image" , true);
            this.request.send(formData);
        }
    },
    "getData" : function(){
        //받아온 데이터는 colorList 배열에 담는다.
        var result = JSON.parse(this.request.responseText);
        var bgColor = result.bgColor;
        var textColor = result.textColor;
        //텍스트 입력창으로 전환 : timer 필요함
        display([this.uploadText],'show');
        display([this.uploadFile, this.closeButton],'hide');

        //JSON에 있는 RGB데이터로 텍스트입력창 배경색 그리기 : 원래 testInput.js에 있던 시행함수
        this.textInput.value = "30자 이내로 입력하세요.";

        // 16진수를 10진수로 바꿔서 fRGB에 넣어준다. 
        fR = parseInt(bgColor.slice(1,3), 16);
        fG = parseInt(bgColor.slice(3,5), 16);
        fB = parseInt(bgColor.slice(5,7), 16);
        
        firstColor = bgColor;
        secondColor = textColor;
        var html = document.getElementById("html");
        html.style.backgroundColor = bgColor;
        drawGradation(bgColor, textColor);
    },
    "init" : function(){
        this.getElements();
        this.confirmButton.addEventListener('click',this.sendData.bind(this),false);
        this.request.addEventListener('load', this.getData.bind(this));
    }
};
var submit = {
    "getElements" : function(){
        this.request = new XMLHttpRequest();
        this.submitButton = document.getElementById("submit-button");
        this.textInput = document.getElementById("text-input");
        this.fileInput = document.getElementById("upload-hidden");
        this.moments = document.getElementById("moments");
        this.itemFactory = document.getElementById("itemFactory");
        this.itemFactoryButton = document.getElementById("itemFactory-button");
        this.mainContentWrapper = document.getElementById("wrapper");
        this.previewImgWrapper = document.getElementById("preview-image");
        this.previewImg = document.getElementById("input-image");
    },
    "sendData" : function(e){
        e.preventDefault();
        // 텍스트 인풋창을 닫고 메인화면으로 돌아간다. 
        display([this.itemFactory], "hide");
        display([this.mainContentWrapper, this.itemFactoryButton], "show");

        // 기존 preview Image에 들어있는 사진을 지우고 원래의 사진기 아이콘으로 되돌려준다. 
        this.previewImgWrapper.removeChild(this.previewImgWrapper.firstElementChild);
        var addCamera = document.createElement("img");
        addCamera.setAttribute('id', "camera");
        addCamera.setAttribute('src', "image/camera.png");
        this.previewImgWrapper.appendChild(addCamera);

        // 기본 문자열 재입력.
        this.textInput.value = "30자 이내로 입력해주세요.";

        // var formData = new FormData();
        // formData.append("textInput", this.textInput.value);
        // formData.append("image", this.fileInput.files[0]);
        
        // this.request.open("POST", "/upload-text", true);
        // this.request.send(formData);
    },
    "init" : function(){
        this.getElements();
        this.submitButton.addEventListener('click', this.sendData.bind(this),false);
    //    this.addMoment();
    }
};

var uploadDrag = document.getElementById("upload-drag");
uploadDrag.addEventListener("drop", function(e){
    e.stopPropagation();
    e.preventDefault();
    var files = e.target.files || e.dataTransfer.files;
    //image 인지 판별 코드 필요.
    fileInput.files = files;
}, true);
//브라우저는 이미지를 받으면 바로 이미지를 여는 기본기능이 있기 때문에, 기본기능을 막아둔다.
uploadDrag.addEventListener("dragover", function(e){ e.preventDefault(); }, true);

setItemFactoryDisplay.init();
manageFileInput.init();
confirm.init();
submit.init();

