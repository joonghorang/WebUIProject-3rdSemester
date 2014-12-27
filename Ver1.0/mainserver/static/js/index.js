var MAX_WIDTH = window.innerWidth;
var MAX_HEIGHT = window.innerHeight;

var setMainGridView = {
    "getElements" : function(){
        this.wrapper = document.getElementById("wrapper");
        this.itemFactory = document.getElementById("itemFactory");
        this.itemFactoryButton = document.getElementById("itemFactory-button");
        this.moments = document.getElementById("moments");
        this.momentsWrapper = document.getElementById("moments-wrapper");
        this.uploadFile = document.getElementById("upload-file");
        this.uploadText = document.getElementById("upload-text");
        this.closeButton = document.getElementById("close-button-wrapper");
        this.confirmButton = document.getElementById("confirm-button");
        this.previewImg = document.getElementById('preview-image');
        this.request = new XMLHttpRequest();
    },
    "setLogicIndexes" : function(){
        this.sendCheck = 0;     // 페이지 인덱스 넘과 비교하여 동일하면 다시 요청하지 않는다. 
        this.pageIndexNum = 2;  // css Style 적용을 먹일 페이지 넘버 
        this.classIndexNum = 1; // css Style pageIndexNum안에 적용될 하나 하나의 객체 클래스넘버. 
        this.scrollFlag = true;
    },
    //  화면 끝에 다다랐을 떄 추가적으로 로드하는 코드
    "displayMore" : function(){
        if(window.scrollY > this.moments.offsetHeight * 90 / 100 && this.scrollFlag){
            //window.removeEventListener("scroll", this.displayMore(), false);
            if(this.sendCheck !== this.pageIndexNum){
                this.sendCheck = this.pageIndexNum;
               // console.log("sc" + this.sendCheck);
                this.request.open("GET", "/page/" + this.pageIndexNum.toString(), true);
                this.request.send();
                //console.log(this.pageIndexNum);    
            }
         }
    }, 
    "createMoments" : function(){       //2.DB에 저장된 유닛들을 받아서 원하는 그리드로 뿌려주는 코드.
        this.pageIndexNum++;
        this.moments.style.height = this.moments.offsetHeight + 1000 + "px";
        console.log("size Expanded");
            
        //추가 객체들을 요청. 

        var result = JSON.parse(this.request.responseText);
        var unitNumberInPage = 7;
        if(result.moments.length < unitNumberInPage){
            console.log("this is End Page " + "pageIndexNum = " + this.pageIndexNum + "\nelement in Lastpage : " + result.moments.length);
            this.scrollFlag = false;
        }
        for(var i = 0; i < result.moments.length; i++){
            var addA = document.createElement('a');
            addA.setAttribute("href", "./moment/" + result.moments[i].id);

            var addDiv = document.createElement('div');
            addDiv.setAttribute("class", "moment-" + this.classIndexNum.toString());

            if(this.classIndexNum == 1 || this.classIndexNum == 8 || this.classIndexNum == 9 || this.classIndexNum == 12){
                
                addDiv.style.backgroundImage = "url(" + result.moments[i].file + ")";
            }
            if(this.classIndexNum === 14){
                this.classIndexNum = 1;
            } else {
               this.classIndexNum++;
            }
            var addSpan = document.createElement('span');
            addSpan.innerHTML = result.moments[i].text;

            this.moments.appendChild(addA);
            addA.appendChild(addDiv);
            addDiv.appendChild(addSpan);
        }
        EventUtil.addHandler(window, 'scroll', this.displayMore.bind(this));
    },
    "run" : function(){
        this.getElements();
        this.setLogicIndexes();
        EventUtil.addHandler(window, 'scroll', this.displayMore.bind(this));
        EventUtil.addHandler(this.request, 'load', this.createMoments.bind(this));
    }
};

var itemFactoryDisplay = {
    "getElements" : function(){
        this.wrapper = document.getElementById("wrapper");
        this.itemFactory = document.getElementById("itemFactory");
        this.itemFactoryButton = document.getElementById("itemFactory-button");
        this.moments = document.getElementById("moments");
        this.momentsWrapper = document.getElementById("moments-wrapper");
        this.uploadFile = document.getElementById("upload-file");
        this.uploadText = document.getElementById("upload-text");
        this.closeButton = document.getElementById("close-button-wrapper");
        this.confirmButton = document.getElementById("confirm-button");
        this.previewImg = document.getElementById('preview-image');
        this.request = new XMLHttpRequest();
    },
    "openFactory" : function(){
        display([this.itemFactory,this.itemFactoryButton, this.confirmButton, this.uploadFile,this.closeButton, this.previewImg],'show');
        display([this.moments, this.itemFactoryButton, this.uploadText],'hide');
    },
    "closeFactory" : function(){
        // 취소하므로 모든 상황을 업로드 이전 상태로 돌려준다. 
        this.initializeItemfactory();
        display([this.moments, this.itemFactoryButton],'show');
        display([this.itemFactory, this.closeButton, this.previewImg],'hide');
    },
    "initializeItemfactory" : function(){
        if(this.previewImg.childNodes[0] !== undefined){
            this.previewImg.removeChild(this.previewImg.childNodes[0]);
        }  
        
        this.uploadText.children[0].value = "30자 이내로 입력하세요."; // 문구 초기화                    
        
        if(typeof(this.previewImg.children[0]) !== "undefined"){ // 프리뷰 이미지가 남아있다면, 
            this.previewImg.children[0].setAttribute("id", "camera"); // 카메라 아이콘을 살려준다. 
            this.previewImg.children[0].src = "image/camera.png";
        } else {
            var addPreview = document.createElement('img');
            addPreview.setAttribute("id", "camera");
            addPreview.src = "image/camera.png";
            this.previewImg.appendChild(addPreview);
        } 
        
        this.uploadFile.children[1].value = null; // 입력받은 인풋 파일 태그 초기화                                       
        fR = 255; 
        fG = 255; 
        fB = 255;                                                                        
        firstColor = "#FFFFFF"; // 그라데이션 색상 초기화     
        secondColor = "#FFFFFF"; 
    },
    "run" : function(){ // mainPage Initial code
        this.getElements();
        EventUtil.addHandler(this.itemFactoryButton, 'click', this.openFactory.bind(this));
        EventUtil.addHandler(this.closeButton, 'click', this.closeFactory.bind(this));
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
    "onChange" : function(){
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
        
        /*인풋 이미지 크기에 테두리 맞추기*/
        this.previewImg.style.transition = 'all 0.3s ease-in';
        this.previewImg.style.width = imgElement.style.width;
        this.previewImg.style.height = imgElement.style.height;
        /*//인풋 이미지 크기에 테두리 맞추기*/
    },
    "run" : function(){
        this.getElements();
        EventUtil.addHandler(this.fileInput, 'click', this.reset.bind(this));
        EventUtil.addHandler(this.fileInput, 'change', this.onChange.bind(this));
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
    "sendImage" : function(e){
        display([this.confirmButton], 'hide');         
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
            //AJAX로 데이터 보내기
            var formData = new FormData();
            formData.append("image", this.fileInput.files[0]);
            //길을 열어라! - 보내라! - 받아와라!(data가 load되면 실행)
            this.request.open("POST" , "/upload-image" , true);
            this.request.send(formData);
        }
    },
    "getColorForTextInput" : function(){
        //텍스트 입력창으로 전환 : 로딩이미지 넣기
        display([this.uploadText],'show');
        display([this.uploadFile], 'hide');
        
        var result = JSON.parse(this.request.responseText);
        var bgColor = result.bgColor;
        var textColor = result.textColor;

        // 16진수를 10진수로 바꿔서 fRGB에 넣어준다. 
        fR = parseInt(bgColor.slice(1,3), 16);
        fG = parseInt(bgColor.slice(3,5), 16);
        fB = parseInt(bgColor.slice(5,7), 16);
        
        firstColor = bgColor;
        if(textColor !== null){
            secondColor = textColor;
        } else{
            secondColor = bgColor;
        }

        // 입력받은 평균 배경의 밝기가 130이하이면 글자색을 흰색으로 설정해준다.(점점 어두워 질테니 130보다 좀더 높게 잡음) 
        var avgBrightness = (fR + fG + fB) / 3;
        if(avgBrightness < 130){
            this.textInput.style.color = "#FFFFFF";
        }
        console.log(avgBrightness);
        drawGradation(bgColor, textColor);  //......????? 아, 전역변수였던가요....? - 신영
                                            // 묑장하지? - 중일
    },
    "run" : function(){
        this.getElements();
        EventUtil.addHandler(this.confirmButton, 'click', this.sendImage.bind(this));
        this.request.addEventListener('load', this.getColorForTextInput.bind(this));
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
        display([this.submitButton], 'hide');
        e.preventDefault();
        // 데이터를 전송 
        var formData = new FormData(); 
        formData.append("textInput", this.textInput.value);
        formData.append("image", this.fileInput.files[0]);
        
        this.request.open("POST", "/upload-text", true);
        this.request.send(formData);
        var sendData = 1;
        console.log("sendData Count : " + sendData);
        sendData++;
    },
    // 중복 전송을 막는 코드. - 중일 
    "preventDoubleSubmit" : function(e){
        var submitEvent = EventUtil.getEvent(e);
        EventUtil.preventDefault(submitEvent);
    },
    "run" : function(){
        this.getElements();
        EventUtil.addHandler(this.submitButton, 'click', this.sendData.bind(this));
        this.textInput.addEventListener('onsubmit', this.preventDoubleSubmit(this), false);
        this.fileInput.addEventListener('onsubmit', this.preventDoubleSubmit(this), false);
        this.request.addEventListener('load', function(){
            window.location.reload(true);
        }.bind(this) ,false);
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

setMainGridView.run();
itemFactoryDisplay.run();
manageFileInput.run();
confirm.run();
submit.run();

