var MAX_WIDTH = window.innerWidth;
var MAX_HEIGHT = window.innerHeight;


var setItemFactoryDisplay = {
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
        this.pageIndexNum = 1;  // css Style 적용을 먹일 페이지 넘버 
        this.classIndexNum = 1; // css Style pageIndexNum안에 적용될 하나 하나의 객체 클래스넘버. 
        this.scrollFlag = true;
    },
    "openFactory" : function(){
        display([this.itemFactory,this.itemFactoryButton, this.confirmButton, this.uploadFile,this.closeButton, this.previewImg],'show');
        display([this.moments, this.itemFactoryButton, this.uploadText],'hide');
    },
    "closeFactory" : function(){
        // 취소하므로 모든 상황을 업로드 이전 상태로 돌려준다. 
        if(this.previewImg.childNodes[0] !== undefined){
            this.previewImg.removeChild(this.previewImg.childNodes[0]);
        }   
        display([this.moments, this.itemFactoryButton],'show');
        display([this.itemFactory, this.closeButton, this.previewImg],'hide');  
        this.uploadText.children[0].value = "30자 이내로 입력하세요.";                    // 문구 초기화
        if(typeof(this.previewImg.children[0]) !== "undefined"){                                      // 프리뷰 이미지가 남아있다면, 
            this.previewImg.children[0].setAttribute("id", "camera");                  // 카메라 아이콘을 살려준다. 
            this.previewImg.children[0].src = "image/camera.png";
        } else {
            var addPreview = document.createElement('img');
            addPreview.setAttribute("id", "camera");
            addPreview.src = "image/camera.png";
            this.previewImg.appendChild(addPreview);
        } 
        this.uploadFile.children[1].value = null;                                      // 입력받은 인풋 파일 태그 초기화 
        fR = 255; 
        fG = 255; 
        fB = 255;                                                                       // 그라데이션 색상 초기화 
        firstColor = "#FFFFFF";     
        secondColor = "#FFFFFF";        
    },
    "bootColorSet" : function(){
        var request = new XMLHttpRequest();
        request.open("GET", "/page/" + 1, true); // DB 에 저장된 가장 첫페이지의 객체정보를 가져온다. 
        request.send();
        request.addEventListener('load', function(){
            var result = JSON.parse(request.responseText);
            var body = document.getElementById("body");
            body.style.backgroundColor = result.moments[0].bgColor;
            //console.log("bdColorSet : " + result.moments[0].bgColor);
        }, false);
    },
    //  화면 끝에 다다랐을 떄 추가적으로 로드하는 코드
    "displayMore" : function(){
        // var momentsArray = document.querySelectorAll("#moments a div");
        // var firstEle = momentsArray[0];
        // var lastEle = momentsArray[momentsArray.length-1];
        // console.log("scrollY " + window.scrollY);
        // console.log("lastEle " + (lastEle.offsetTop - window.innerHeight));
        //console.log("moments " + this.moments.offsetHeight);
        // 일단, 메이슨리를 쓰기 때문에 기존의 방법대로 무한스크롤을 구현할 수 없다.
        // 따라서 우리가 해야하는 일은 가장 마지막 아이를 찾고,
        // 그 아이의 Y값위치를 계산한뒤, 
        // 현재 스크롤의 위치와 비교하여 
        // 현재 스크롤 위치가 그 아이의 Y값 위치보다 크다면 
        // 추가 개체들을 생성하고,
        // 아니라면 그냥 지나치도록 한다. 
        // 스크롤의 현재 위치 > 맨위에서부터 마지막 디브까지의 길이 - 현재 창의 안쪽 길이. 

        // 이렇게 전용우 교수님 말대로 진행하려고 했으나, 그렇게 하면 추가되는 아이들의 높이 값에 영향을 너무 받는다.
        // 따라서 현재의 스크롤 위치가 
        // 추가된 전체 moments div의 offsetHeight의 80%를 넘었을때,
        // 새로 길이를 늘려주고 엘레멘트들을 추가하는 코드로 변경. 
        // 즉, 절대적인 길이를 기준으로 바뀌는게 아니라 비율값으로 변경되도록 하였다. 


        if(window.scrollY + 300 > this.moments.offsetHeight * 90 / 100 && this.scrollFlag){
            this.pageIndexNum++;
            this.request.open("GET", "/page/" + this.pageIndexNum.toString(), true);
            this.request.send();
         }
    }, 
    "createMoments" : function(){       //2.DB에 저장된 유닛들을 받아서 원하는 그리드로 뿌려주는 코드.
        this.moments.style.height = this.moments.offsetHeight + 1000 + "px";
        console.log("size Expanded");
            
        //추가 객체들을 요청. 

        var result = JSON.parse(this.request.responseText);
        var unitNumberInPage = 7;
        if(result.moments.length < unitNumberInPage){
            console.log("this is End Page " + "pageIndexNum = " + this.pageIndexNum + "element in Lastpage : " + result.moments.length);
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
    },

    "init" : function(){ // mainPage Initial code
        this.getElements();
        this.itemFactoryButton.addEventListener('click',this.openFactory.bind(this),false);
        this.closeButton.addEventListener('click', this.closeFactory.bind(this), false);
        EventUtil.addHandler(window, 'DOMContentLoaded', this.bootColorSet.bind(this));
        EventUtil.addHandler(window, 'scroll', this.displayMore.bind(this));
        this.request.addEventListener('load', this.createMoments.bind(this), false);
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
        
        /*인풋 이미지 크기에 테두리 맞추기*/
        this.previewImg.style.transition = 'all 0.3s ease-in';
        this.previewImg.style.width = imgElement.style.width;
        this.previewImg.style.height = imgElement.style.height;
        
        /*//인풋 이미지 크기에 테두리 맞추기*/
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
        //하나만 쓰는거기는 하지만 스타일 통일하는 게 나은 것 같아서 요렇게 써둡니다 - 신영
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
        display([this.uploadFile], 'hide');// , this.closeButton],'hide');

        //JSON에 있는 RGB데이터로 텍스트입력창 배경색 그리기 : 원래 testInput.js에 있던 시행함수

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

        // 입력받은 평균 배경의 밝기가 160이하이면 글자색을 흰색으로 설정해준다.(점점 어두워 질테니 125보다 좀더 높게 잡음) 
        var avgBrightness = (fR + fG + fB) / 3;
        if(avgBrightness < 160){
            this.textInput.style.color = "#FFFFFF";
        }
        console.log(avgBrightness);
        drawGradation(bgColor, textColor);  //......????? 아, 전역변수였던가요....? - 신영
                                            // 묑장하지? - 중일
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
        display([this.submitButton], 'hide');
        // 음 여기에 중복을 막는 코드를 넣은 듯? 해놓은듯?
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
    "init" : function(){
        this.getElements();
//        this.submitButton.addEventListener('click', this.reset.bind(this),false);
        this.submitButton.addEventListener('click', this.sendData.bind(this),false);
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

setItemFactoryDisplay.init();
manageFileInput.init();
confirm.init();
submit.init();

