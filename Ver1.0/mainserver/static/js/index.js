var MAX_WIDTH = window.innerWidth;
var MAX_HEIGHT = window.innerHeight;

var setItemFactoryDisplay = {
    "getElements" : function(){

        this.wrapper = document.getElementById("wrapper");
        this.itemFactory = document.getElementById("itemFactory");
        this.itemFactoryButton = document.getElementById("itemFactory-button");
        this.moments = document.getElementById("moments");
        
        this.moments.style.height = "7000px";  
        this.momentsWrapper = document.getElementById("moments-wrapper");

        this.uploadFile = document.getElementById("upload-file");
        this.uploadText = document.getElementById("upload-text");
        this.closeButton = document.getElementById("close-button-wrapper");
        this.previewImg = document.getElementById('preview-image');
        this.request = new XMLHttpRequest();
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
    //  화면 끝에 다다랐을 떄 추가적으로 로드하는 코드
    "displayMore" : function(){
       // console.log(this.moments.offsetHeight);
       // console.log(this.momentsWrapper.offsetHeight);

        var OFFSET = 7000; // 임시로 지정. 나중에 정확한 디자인셋의 높이값을 반영. 

         if(this.momentsWrapper.scrollTop + this.momentsWrapper.offsetHeight + 100 > this.moments.offsetHeight){
             this.moments.style.height = this.moments.offsetHeight + OFFSET + "px";
             // 객체들을 불러들이는 코드 추가.

             this.request.open("GET", "/", true);
             this.request.send();
         }
    },
    //서버에 라우터 완성되면 부활 
    "createMoments" : function(){       //2.DB에 저장된 유닛들을 받아서 원하는 그리드로 뿌려주는 코드.
        var displaySetNum = 2;          //레이아웃 디자인 갯수, 나중에 더 좋은 방법으로 개선해도 좋을듯. 
        var momentUnitNum = 7;          // 한 세트에 적용되는 모멘츠 갯수

        // this.request.addEventListener('load', function(){
        var result = JSON.parse(this.request.responseText);
        console.log("in displayMore");
        console.log(result);
 //       });
        // var result = JSON.parse(this.request.responseText);
        // for(var i = 0; i < this.result.length; i++){
        //     var addMoment = createElement("div");
        //     var addA = createElement("a");
        //     var addImg = createElement("img");
        //     var addP = createElemet("p");

        //     if (i < momentUnitNum){
        //         if(i % 7 === 0){
        //             addMoment.setAttribute("class", "moment-1");
        //         } else if(i % 7 === 1){
        //             addMoment.setAttribute("class", "moment-2");
        //         } else if(i % 7 === 2){
        //             addMoment.setAttribute("class", "moment-3");
        //         } else if(i % 7 === 3){
        //             addMoment.setAttribute("class", "moment-4");
        //         } else if(i % 7 === 4){
        //             addMoment.setAttribute("class", "moment-5");
        //         } else if(i % 7 === 5){
        //             addMoment.setAttribute("class", "moment-6");
        //         } else if(i % 7 === 6){
        //             addMoment.setAttribute("class", "moment-7");
        //         } else {
        //             alert("error in createMoments set Class Name");
        //         }
        //     } else if(i < momentUnitNum * displaySetNum){
        //             addMoment.setAttribute("class", "moment-1");
        //         } else if(i % 7 === 1){
        //             addMoment.setAttribute("class", "moment-2");
        //         } else if(i % 7 === 2){
        //             addMoment.setAttribute("class", "moment-3");
        //         } else if(i % 7 === 3){
        //             addMoment.setAttribute("class", "moment-4");
        //         } else if(i % 7 === 4){
        //             addMoment.setAttribute("class", "moment-5");
        //         } else if(i % 7 === 5){
        //             addMoment.setAttribute("class", "moment-6");
        //         } else if(i % 7 === 6){
        //             addMoment.setAttribute("class", "moment-7");
        //         } else {
        //             alert("error in createMoments set Class Name");
        //         }
        //     }
        //     // 설정된 elements들을 html에 삽입
        //     this.moments.appendChild(addMoment);
        //     addMoment.appendChild(addA);
        //     addA.appendChild(addImg);
        //     addA.appendChild(addP);
        //}
    },
    // "changeBgColor" : function(){       //1.DB에 색상을 요청해서 저장된 칼라값을 받아온 후 배경 컬러를 설정하는 코드 
    //     // 전송을 요청하는 코드

    //     // 요청결과를 받아서 배경화면에 뿌리는 코드.
    //     var result = JSON.parse(this.request.responseText);
    //     var bgColor = result.bgColor;

    //     var html = document.getElementById("html");
    //     html.style.backgroundColor = bgColor;
    // },
    "init" : function(){ // mainPage Initial code
        this.getElements();
        this.itemFactoryButton.addEventListener('click',this.openFactory.bind(this),false);
        this.closeButton.addEventListener('click', this.closeFactory.bind(this), false);
        EventUtil.addHandler(this.momentsWrapper, 'scroll', this.displayMore.bind(this));
        this.request.addEventListener('load', this.createMoments.bind(this), false);
        //this.request.addEventListener('load', this.createBgColor.bind(this), false);
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
    "reset" : function(){
        // 텍스트 인풋창을 닫고 메인화면으로 돌아간다. 
        display([this.itemFactory], "hide");
        display([this.mainContentWrapper, this.itemFactoryButton, this.moments], "show");

        // 기존 preview Image에 들어있는 사진을 지우고 원래의 사진기 아이콘으로 되돌려준다. 
        this.previewImgWrapper.removeChild(this.previewImgWrapper.firstElementChild);
        var addCamera = document.createElement("img");
        addCamera.setAttribute('id', "camera");
        addCamera.setAttribute('src', "image/camera.png");
        this.previewImgWrapper.appendChild(addCamera);

        // 기본 문자열 재입력.
        this.textInput.value = "30자 이내로 입력해주세요.";
    },
    "sendData" : function(e){
        e.preventDefault();

        // 데이터를 전송 
        var formData = new FormData(); 
        formData.append("textInput", this.textInput.value);
        formData.append("image", this.fileInput.files[0]);

        console.log(this.moments.childElementCount);

        formData.append("hopeNumber", this.moments.childElementCount);
        
        this.request.open("POST", "/upload-text", true);
        this.request.send(formData);
        console.log("data send");
    },
    // "refreshMoment" : function(){
    //     var result = JSON.parse(this.request.responseText);

    //     // 새로운 모멘트 생성. 
    //     var addMoment = document.createElement("div");
    //     addMoment.setAttribute('class', result.hopeNumber);
    //     var firstNode = this.moments.firstElementChild;
    //     this.moments.insertBefore(addMoment, firstNode);
    //     console.log(this.moments.firstElementChild)
    //     for(var i = 0; i < this.moments.childElementCount; i++){
    //         console.log(2);
    //     }
    // },
    "init" : function(){
        this.getElements();
        this.submitButton.addEventListener('click', this.reset.bind(this),false);
        this.submitButton.addEventListener('click', this.sendData.bind(this),false);
       // this.request.addEventListener('load', this.refreshMoment.bind(this),false);
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

