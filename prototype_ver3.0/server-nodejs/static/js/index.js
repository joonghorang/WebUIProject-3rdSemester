/*
141202. Prototype_ver3.0/GeulGeurimNetwork_ver1.0 TODO list
[frontend]
- 재업로드시 preview-image 보이지 않음 (o)
- 재업로드시 confirm 버튼 동작하지 않음 (o)
- itemFactory에서 생성한 output을 grid-item으로 추가하기 : 신영
- 팀장님의 color코드와 연동하기 : 중일
- grid view에서 각 grid-item 클릭 시 나타나는 페이지 논의(output?)
- z-index 통째로 수정 (o)
- itemFactory 각 단계에서 이전단계로 돌아가기

[backend]
- text input, output 에서 background-color Ajax로 서버랑 통신해서 받아오기 -일단보류
- server side complete - web hosting(Heroku) : 덕성
- DB연동

+ server.js를 실행시키려니 canvas를 또 깔라고 하던데, 무슨 일일까요....?

[overall]
- 전체적인 스타일 조정(text input 활성화 될 때 가운데부터 나타나는 것, 동적 레이아웃 등)
- 코드 정리(전역변수 통합관리, 전체 흐름 체크? 포함)
*/

// 색상 받아오는 전역변수 선언 
var colorSetBackup = new Array();
var colorSet = new Array();
var colorSetHex = new Array();
var fontNameArray = new Array();
var textArray = new Array();
var contents = document.getElementById('contents');
var canvasParent = document.getElementById("preview");
var indexId; // for link between e.target and full view div.
var imageSrcArray = new Array(); // for link between contents image and full view image

window.addEventListener('DOMContentLoaded', function(){    
    var wrapper = document.getElementById('item-factory-wrapper');
    var itemFactory = document.getElementById('item-factory');
    var bg = document.getElementById('item-factory-background');
    var itemFactoryOpen = document.querySelector('#item-factory-nav-open');
    var itemFactoryClose = document.querySelector('#item-factory-nav-close');

    var XHR = new XMLHttpRequest();   
    
    /*itemFactory 열기*/
    itemFactoryOpen.addEventListener('click',function(){
        outputBackCanvas = document.getElementById("output-backCanvas");
        outputBackCanvas.style.display = 'none';
        wrapper.style.display = 'block';
        var tempImg = document.getElementById('preview-image');
        tempImg.style.display = 'block';
        var uploadSection = document.getElementById('upload-wrapper');
        uploadSection.style.display = 'block';
        minimizeItemFactory();
        setUploadButtonAtFirst();
        setSubmitButtonAtFirst();
        setItemFactory('0.9', 'block', 'none', 'block', '#101010');
    },false);
    
    /*itemFactory 닫기*/
    itemFactoryClose.addEventListener('click',function(){
        wrapper.style.display = 'none';
        setItemFactory('0', 'none', 'block', 'none', 'transparent');
    },false);

    /*itemFactory 열고 닫을 때 itemFactory의 스타일 설정*/
    function setItemFactory(opacity, displayState, openBar, closeBar, bgColor){
        itemFactory.style.opacity = opacity;
        itemFactory.style.display = displayState;
        itemFactoryOpen.style.display = openBar;
        itemFactoryClose.style.display = closeBar;
        bg.style.backgroundColor = bgColor;
    }
    
    /*confirm 클릭 시 itemFactory 확장*/
    function maximizeItemFactory(){
        itemFactory.style.top = '0';
        itemFactory.style.left = '0';
        itemFactory.style.width = '100%';
        itemFactory.style.height = '100%';
        itemFactory.style.opacity = '1';
    }
    
    /*grid화면에서 itemFactory open하는 경우 처음크기대로 보여주기*/
    function minimizeItemFactory(){
        itemFactory.style.top = '15%';
        itemFactory.style.left = '25%';
        itemFactory.style.width = '50%';
        itemFactory.style.height = '500px';
    }
    
    /*단계 변화에 따른 버튼 스타일 설정*/
    function setUploadButtonOnConfirm(){
        var uploadButton = document.getElementById('upload-button');
        uploadButton.style.display = 'none';
        confirm.style.display = 'none';
    }
    function setUploadButtonAtFirst(){
        var uploadButton = document.getElementById('upload-button');
        uploadButton.style.display = 'block';
        confirm.style.display = 'block';
    }
    function setSubmitButtonOnConfirm(){
        var submitButton = document.getElementById('submit-button');
        submitButton.style.display = 'block';
    }
    function setSubmitButtonAtFirst(){
        var submitButton = document.getElementById('submit-button');
        submitButton.style.display = 'none';
    }

    
    /*파일 선택시 선택한 이미지를 preview에 보여주기*/
    var fileInput = document.getElementById('upload-hidden');
    fileInput.addEventListener('click', function(){
        fileInput.value = null; //input reset
    })
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
        
        var tempImg = document.getElementById('preview-image');
        tempImg.style.display = 'block';
        
        /*재업로드시 outputCanvas가 보이지 않았던 문제 해결용. 아마도 setTimeout과 시간상으로 꼬이는 듯???*/
        var outputCanvas = document.getElementById("output-canvas");
        var outputBackCanvas = document.getElementById("output-backCanvas");
        outputCanvas.style.display = 'none';
        outputBackCanvas.style.display = 'none';

//        /*AJAX로 데이터 받아오기*/
       var formData = new FormData();
       formData.append("image", this.files[0]);

//       XHR.open("post", "http://10.73.38.160:3000/itemFactory/image", true);

       // 서버용 
       XHR.open("post", "https://web-ui-project.herokuapp.com/itemFactory/image", true);
       XHR.send(formData);
       
       XHR.onreadystatechange = function() 
       {
           if (XHR.readyState == 4 && XHR.status == 200) 
           {            
               /*서버에서 받아온 JSON을 parsing - rgba데이터 받아오기*/
               var inColor = JSON.parse(XHR.response);
               for(var i = 0; i < inColor.length; i++){
                    colorSet.push(inColor[i]);
                    colorSetHex.push(changeDecToHexColor(inColor[i]["r"], inColor[i]["g"], inColor[i]["b"]));
               }
               
               //그라데이션 칼라 셋팅 
                if(colorSet.length < 2){    //색상이 하나밖에 없을 때를 대비한 코드. 
                    fR = colorSet[0]["r"];
                    fG = colorSet[0]["g"];
                    fB = colorSet[0]["b"];
                    firstColor = colorSetHex[0];       
                } else {
                    fR = colorSet[1]["r"];
                    fG = colorSet[1]["g"];
                    fB = colorSet[1]["b"];
                    firstColor = colorSetHex[1]; 
                }
                secondColor = colorSetHex[0];
                textInputEventManager();
                drawGradation(firstColor, secondColor);
           } 
        }

        //캔버스 초기화 
        var outputCanvas = document.getElementById("output-canvas");
        var context = outputCanvas.getContext("2d")
        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);        // 픽셀 정리
        context.beginPath();                                         // 컨텍스트 리셋
    },false);
       
    /*confirm 클릭 시 itemFactory 확장 -사진 미리보기 사라지기 - text입력받기*/
    /*TODO 각 단계에서 뒤로가기*/
    var confirm = document.getElementById('confirm-button');
    confirm.addEventListener('click',function(){
        if(XHR.status !== 200 ){       // 일단 방어코드로 급하게 버튼을 누르는 순간 전송이 완료되지 않았으면 대기하는 코드를 짰따. 
            setTimeout(function(){
                confirmdo();
            }, 3000); // 3초 대기. 
        } else {
            confirmdo();
        }
        function confirmdo(){
            maximizeItemFactory();
            setUploadButtonOnConfirm();
            setSubmitButtonOnConfirm();
            
            var tempImg = document.getElementById('preview-image');
            tempImg.style.display = 'none';
            
            var background = document.getElementById('back-ground-canvas');
            var preview = document.getElementById('preview');
            var textInput = document.getElementById('text-input');
            textInput.style.display = 'block';
            preview.style.position = 'absolute';
            preview.style.width = '100%';
            preview.style.height = '100%';
            background.style.display = 'block';
            
            var uploadSection = document.getElementById('upload-wrapper');
            uploadSection.style.display = 'none';
            itemFactoryClose.style.display = 'none';
            
            //textInput창 초기화 코드 
            backGroundCanvas.width = MAX_WIDTH;
            backGroundCanvas.height = MAX_HEIGHT;

            drawGradation(firstColor, secondColor);
            textInputEventManager();
        }
    },false);
    
    /*submit버튼으로 전송하면 output 보여주기*/    

    var submit = document.getElementById('submit-button');
    submit.addEventListener('click',function(){

        wrapper.style.display = 'block';
        textValue = textInput.textContent;
		textInput.style.display = 'none';
		submitButton.style.display = 'none';

        var outputCanvas = document.getElementById("output-canvas");

        outputCanvas.style.opacity = '1';
        outputCanvas.style.display = 'block';

        backGroundCanvas.style.display='none';
        
        function getHour(){
            var now = new Date();
            var hour = now.getHours();
            if (("" + hour).length == 1) { hour = '0' + hour; }
                return hour;
            return getCurrentTime().substr(8,2);
        }
        
        /*시간대에 따라 다른 폰트 사용*/
        var presentTime = parseInt(getHour());
        if(presentTime < 10 || presentTime > 6 ){
            fontName = 'NanumMyeongjo';
            fontNameArray.push('NanumMyeongjo');
        } else {
            fontName = 'NanumBarunGothic';
            fontNameArray.push('NanumBarunGothic');
        }

        // 받은 내용을 textArray에 저장ㅎ나다. 
        textArray.push(textInput.value);
        tempText = textInput.value;
        
        /*입력받은 텍스트를 캔버스에 fillText 후 2초후 삭제 */
        var outputCanvas = document.getElementById("output-canvas");
        var outputBackCanvas = document.getElementById("output-backCanvas");
        textWriterForFirstInput(outputBackCanvas);
        textWriter(outputCanvas, 0, true);
        
        outputCanvas.style.opacity = '0';
        setTimeout(function(){
            wrapper.style.display = 'none';
            itemFactoryOpen.style.display = 'block';
        }, 2100);

        /*preview-image 의 자식 노드를 지우기*/

        var addGridItem = document.createElement('div');
        addGridItem.setAttribute('class', 'grid-item');
        addGridItem.setAttribute('id', ("GridItem" + contents.childNodes.length).toString());
        contents.appendChild(addGridItem);
        addGridItem.style.display = "block";

        var addFront = document.createElement('div');
        addFront.setAttribute('class', 'front');
        addGridItem.appendChild(addFront);
        addFront.style.display = "block";

        var addBack = document.createElement('div');
        addBack.setAttribute('class', 'back');
        addGridItem.appendChild(addBack);
        addBack.style.display = "block";

        var tempImage = document.getElementById('preview-image');
        var addImgElement = tempImage.cloneNode(true); // 해당 노드를 복사한다.
        imageSrcArray.push(addImgElement.src); 
        tempImage.removeChild(tempImage.firstChild);  // 기존 이미지를 지워준다. 

        addImgElement.setAttribute('class', 'in-grid-image');
        addImgElement.setAttribute('id', "contents-back-" + (contents.childNodes.length - 1).toString());  // 새로 생성되는 노드의 아이디는 전체 길이로 부여한다. 
        addGridItem.lastChild.appendChild(addImgElement);
        addImgElement.style.display = "block";

        var addColorElement = document.createElement('p');
        addColorElement.setAttribute('class', 'front');
        addColorElement.setAttribute('id', (contents.childNodes.length - 1).toString());
        addGridItem.firstChild.appendChild(addColorElement);
        addColorElement.style.display = "block";
        addColorElement.value = textInput.value;
        addColorElement.style.backgroundColor = colorSetBackup[0];
        addColorElement.style.opacity = "1";

        // add 1 page Elements for fullView
        var fullContents = document.getElementById("fullView");

        var addFullDiv = document.createElement('div');
        addFullDiv.setAttribute('class', 'grid-item-full');
        addFullDiv.setAttribute('id', "full-div-" + (contents.childNodes.length - 1).toString())
        fullContents.appendChild(addFullDiv);
        addFullDiv.style.display = "block";

        var addFrontCanvas = document.createElement('canvas');
        addFrontCanvas.setAttribute('class', 'outputFront');
        addFullDiv.appendChild(addFrontCanvas);
        addFrontCanvas.style.display = "none";

        var addBackCanvas = document.createElement('canvas');
        addBackCanvas.setAttribute('class', 'outputBack');
        addFullDiv.appendChild(addBackCanvas);
        addBackCanvas.style.display = "none";  

        var addPictureDiv = document.createElement('div');
        addPictureDiv.setAttribute('class', 'outputPictureDiv');
        addFullDiv.appendChild(addPictureDiv);
        addPictureDiv.style.display = "none";  
        var addPicture = document.createElement('img');
        addPicture.setAttribute('class', 'outputPicture');
        addPictureDiv.appendChild(addPicture);
        addPicture.style.display = "none";

        var addExitButtonWrap = document.createElement('div');
        addExitButtonWrap.setAttribute('class', 'exit-button-wrap');
        addFullDiv.appendChild(addExitButtonWrap);
        addExitButtonWrap.style.display = "none";
        var addExitButton = document.createElement('img');
        addExitButton.setAttribute('class', 'exit-button');
        addExitButtonWrap.appendChild(addExitButton);
        addExitButton.style.display = "none";
        addExitButton.src = "image/exit_button.png";


        //textInput에 있던 값을 원래 초기값으로 
        textInput.value = "30자 이내로 입력하세요.";

        /*gridItem 클릭 시 확대 - output페이지로*/
        /*TODO 동일한 클래스명인 grid-item들 중에서 클릭된 것을 확대시키기. this? e?*/
        var gridItems = document.querySelectorAll('.grid-item');
        var front = document.querySelectorAll('.front');

        for(var id = 0; id < gridItems.length; id++){
            gridItems[id].addEventListener('click',function(e){
            // save e.target.id To indexId
            indexId = e.target.id;
            
            // nav hide
            document.getElementById("item-factory-nav-open").style.display = "none";
            document.getElementById("contents").style.position = "absolute";
            document.getElementById("contents").style.display = "none";
            document.getElementById("full-div-" + indexId).style.display = "block";

            var contentsWrap = e.target.parentNode.parentNode;
            //contentsWrap.style.display = "none";

            // full outputPage comes out.
            var targetFullView = document.getElementById("full-div-" + indexId); //특정문자 제거 //substring(15, 16));
        
            // text Page
            var fullOutputCanvas = targetFullView.childNodes[0];
            fullOutputCanvas.style.position = "absolute";
            fullOutputCanvas.style.display = "block";
            fullOutputCanvas.style.width = CANVAS_WIDTH;
            fullOutputCanvas.style.height = CANVAS_HEIGHT;
            fullOutputCanvas.style.background = colorSetBackup[0];
            fullOutputCanvas.style.zIndex = "502";
            

            var fullOutputBackCanvas = targetFullView.childNodes[1];
            fullOutputBackCanvas.style.position = "absolute";
            fullOutputBackCanvas.style.display = "block";
            fullOutputBackCanvas.width = CANVAS_WIDTH;
            fullOutputBackCanvas.height = CANVAS_HEIGHT;
            fullOutputBackCanvas.style.zIndex = "501";

            // text Write.
            textWriter(fullOutputCanvas, (indexId - 1), false);

            // text Page function definition
            fullOutputCanvas.addEventListener('click', function(e){
                fullOutputCanvas.style.display = "none";
                fullOutputBackCanvas.style.display = "none";
                pictureDiv.style.display = "block";
                picture.style.display = "block";
            })

            // picture
            var pictureDiv = targetFullView.childNodes[2];
            pictureDiv.style.position = "absolute";
            pictureDiv.style.display = "block";
            
            pictureDiv.style.width = "100%";
            pictureDiv.style.height = "100%";
            pictureDiv.style.maxWidth = CANVAS_WIDTH + "px";
            pictureDiv.style.maxHeight = CANVAS_HEIGHT + "px";
                
            pictureDiv.style.zIndex = "500";
            
            var fullViewDiv = document.getElementById("fullView");
            fullViewDiv.style.textAlign = "center";

            var picture = pictureDiv.firstChild;
            picture.src =document.getElementById("contents-back-" + indexId).firstChild.src;
            picture.style.display = "block";
            picture.style.zIndex = "500";
            
            picture.style.maxWidth = CANVAS_WIDTH + "px";
            picture.style.maxHeight = CANVAS_HEIGHT + "px";
                
            /*outputPicture Style*/    
            
            picture.style.margin = "0 auto";
            picture.style.height = "100%";


            /*//outputPicture Style*/       
                
            // picture function 
            pictureDiv.addEventListener('click', function(e){
                fullOutputCanvas.style.display = "block";
                fullOutputBackCanvas.style.display = "block";
                pictureDiv.style.display = "none";
                picture.style.display = "none";
            })

            // exit button comes out.
            var buttonWrap = targetFullView.lastChild;
            buttonWrap.style.display = "block";
            buttonWrap.style.width = MAX_HEIGHT * 4 / 100 + "px";
            buttonWrap.style.height = MAX_HEIGHT * 4 / 100 + "px";
            buttonWrap.style.marginLeft = MAX_WIDTH - 40 + "px";
            buttonWrap.style.marginTop = 20 + "px";
            buttonWrap.style.display = "block";
            buttonWrap.style.zIndex = "503";
            buttonWrap.style.position = "absolute";
                
            var exitButton = targetFullView.childNodes[3].childNodes[0];
            exitButton.style.display = "block";
            exitButton.style.width = MAX_HEIGHT * 4 / 100 + "px";
            exitButton.style.height = MAX_HEIGHT * 4 / 100 + "px";
                
            // exit button function definition
            var targetFullView = document.getElementById("full-div-" + indexId);
            var exitButton = targetFullView.lastChild.firstChild;
            exitButton.addEventListener('click',function(e){
                document.getElementById("item-factory-nav-open").style.display = "block";
                document.getElementById("contents").style.position = "relative";
                targetFullView.style.display = "none";
                document.getElementById("contents").style.display = "block";
            });


        }, false);

    
    }
    //확대되면서 this(클릭한 그리드) 말고 다 날려버림???? 일단은 흰색으로 fadeout형식

    },false);
    


},false)