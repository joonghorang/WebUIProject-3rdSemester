var MAX_WIDTH = window.innerWidth;
var MAX_HEIGHT = window.innerHeight;

function display(elements, state){
    for(var i=0 ; i<elements.length ; i++){
        elements[i].style.display = state === 'show'? 'block':'none';
    }
};

var setItemFactoryDisplay = {
    "getElements" : function(){
        this.itemFactory = document.getElementById("itemFactory");
        this.itemFactoryButton = document.getElementById("itemFactory-button");
        this.mainContentWrapper = document.getElementById("wrapper");
        this.uploadFile = document.getElementById("upload-file");
        this.uploadText = document.getElementById("upload-text");
        this.closeButton = document.getElementById("close-button");
        this.previewImg = document.getElementById('preview-image');
    },
    "openFactory" : function(){
        display([this.itemFactory,this.uploadFile,this.closeButton, this.previewImg],'show');
        display([this.mainContentWrapper, this.itemFactoryButton, this.uploadText],'hide');
    },
    "closeFactory" : function(){
        if(this.previewImg.childNodes[0] !== undefined){
            this.previewImg.removeChild(this.previewImg.childNodes[0]);
        }   
        display([this.mainContentWrapper, this.itemFactoryButton],'show');
        display([this.itemFactory, this.closeButton, this.previewImg],'hide');
    },
    "init" : function(){ // mainPage Initial code
        console.log(1);
        //1.DB에 색상을 요청해서 저장된 칼라값을 받아온 후 배경 컬러를 설정하는 코드 
        //2.DB에 저장된 유닛들을 받아서 원하는 그리드로 뿌려주는 코드. 

        this.getElements();
        this.itemFactoryButton.addEventListener('click',this.openFactory.bind(this),false);
        this.closeButton.addEventListener('click', this.closeFactory.bind(this), false);
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
    },
    "sendData" : function(e){
        e.preventDefault();
        var formData = new FormData();
        formData.append("textInput", this.textInput.value);
        formData.append("image", this.fileInput.files[0]);
        
        this.request.open("POST", "/upload-text", true);
        this.request.send(formData);
    },
    // "addMoment" : function(){
    //     //이부분은 필요하지 않습니다. 추후 refresh로 변경.
    //     var addLi = document.createElement('li');
    //     addLi.setAttribute('class', 'moment');
    //     this.moments.appendChild(addLi);
    //     var addA = document.createElement('a');
    //     var addCanvas = document.createElement('canvas');

    //     this.request.addEventListener('load', function(){
    //         //데이터 전송이 다 끝난 뒤에 itemFactory close
    //         display([this.itemFactoryButton, this.mainContentWrapper],'show');
    //         display([this.itemFactory],'hide');

    //         var result = JSON.parse(this.request.responseText);
    //         console.log(result);

    //         var ctx = addCanvas.getContext("2d");
    //         ctx.fillStyle = result.bgColor;
    //         ctx.fillRect(0,0,addCanvas.width,addCanvas.height);

    //         addA.setAttribute('id', "a" + result.id);
    //         addA.href = "/moment/" + result.id;
    //         addLi.appendChild(addA);
            
    //         addCanvas.setAttribute('id', "pc" + result.id);
    //         addA.appendChild(addCanvas);          

    //         test_genOutputs(addCanvas);
    //     }.bind(this));
    // },
    "init" : function(){
        this.getElements();
        this.submitButton.addEventListener('click', this.sendData.bind(this),false);
    //    this.addMoment();
    }
};

setItemFactoryDisplay.init();
manageFileInput.init();
confirm.init();
submit.init();

