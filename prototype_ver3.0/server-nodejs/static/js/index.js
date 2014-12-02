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

<<<<<<< HEAD
+ server.js를 실행시키려니 canvas를 또 깔라고 하던데, 무슨 일일까요....? 
=======
+ server.js를 실행시키려니 canvas를 또 깔라고 하던데, 무슨 일일까요....?
>>>>>>> origin/master

[overall]
- 전체적인 스타일 조정(text input 활성화 될 때 가운데부터 나타나는 것, 동적 레이아웃 등)
- 코드 정리(전역변수 통합관리, 전체 흐름 체크? 포함)
*/

window.addEventListener('DOMContentLoaded', function(){    
    var wrapper = document.getElementById('item-factory-wrapper');
    var itemFactory = document.getElementById('item-factory');
    var bg = document.getElementById('item-factory-background');
    var itemFactoryOpen = document.querySelector('#item-factory-nav-open');
    var itemFactoryClose = document.querySelector('#item-factory-nav-close');

//    var XHR = new XMLHttpRequest();   
    
    /*itemFactory 열기*/
    itemFactoryOpen.addEventListener('click',function(){
        wrapper.style.display = 'block';
        var tempImg = document.getElementById('preview-image');
        tempImg.style.display = 'block';
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
       
    /*confirm 클릭 시 itemFactory 확장 -사진 미리보기 사라지기 - text입력받기*/
    /*TODO 각 단계에서 뒤로가기*/
    var confirm = document.getElementById('confirm-button');
    confirm.addEventListener('click',function(){
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
<<<<<<< HEAD


    // AJAX 통신으로 색을 받아오는 함수. 
    var request = new XMLHttpRequest();
    request.open("POST" , "./imageFactory/image" , false);
    request.send(tempImg);
    console.log(request.responseText);


    // // 덕성이가 보내주는 JSON형식 
    // {
    //     "r" : 255,
    //     "g" : 255, 
    //     "b" : 100,
    //     "a" : 255
    // }

    // colors[0]["r"] = 255;
    //     },false);
=======
        
    },false);
>>>>>>> origin/master
    
    /*submit버튼으로 전송하면 output 보여주기*/    
    var submit = document.getElementById('submit-button');
    submit.addEventListener('click',function(){
        
        wrapper.style.display = 'block';
        textValue = textInput.textContent;
		textInput.style.display = 'none';
		submitButton.style.display = 'none';
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
        } else {
            fontName = 'NanumBarunGothic';
        }
        
        /*입력받은 텍스트를 캔버스에 fillText 후 2초후 삭제 */
        textWriter();
        
        outputCanvas.style.opacity = '0';
        setTimeout(function(){
            wrapper.style.display = 'none';
        }, 2000);
        
        /*itemFactoryNav display상태 초기상태로*/
        itemFactoryOpen.style.display = 'block';
        itemFactoryClose.style.display = 'none';

        /*preview-image 의 자식 노드를 지우기*/
        var tempImage = document.getElementById('preview-image');
        tempImage.removeChild(tempImage.childNodes[0]); // 노드가 하나 밖에 없으므로 삭제됨. 

        // 근데 생각해보면 차라리 해당 노드를 '이동'시키는 개념이 더 좋지 않을까? 
        
    },false);

    
    /*gridItem 클릭 시 확대 - output페이지로*/
    /*TODO 동일한 클래스명인 grid-item들 중에서 클릭된 것을 확대시키기. this? e?*/
//    var gridItem = document.getElementsByClassName('grid-item');
//    gridItem.addEventListener('click', function(e){
//        
//        e.target.style.width = '50%';
//        e.target.style.height = '50%';
//    } ,false);    

    
    /*파일 선택시 선택한 이미지를 preview에 보여주기*/
    var fileInput = document.getElementById('upload-hidden');
    fileInput.addEventListener('click', function(){
        fileInput.value = null;
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
        outputCanvas.style.display = 'none';
//        
//        /*AJAX로 데이터 받아오기*/
//        var formData = new FormData();
//        formData.append("image", this.files[0]);
//
//        XHR.open("post", "/itemFactory/image", true);
//        XHR.send(formData);
//        
//        XHR.onreadystatechange = function() 
//        {
//            if (XHR.readyState == 4 && XHR.status == 200) 
//            {
//                /*서버에서 받아온 JSON을 parsing - rgba데이터 받아오기*/
//                var ddd = JSON.parse(XHR.response);
//                alert(ddd.r);
//                alert(XHR.response);
//            }
//        }
    },false);
},false)