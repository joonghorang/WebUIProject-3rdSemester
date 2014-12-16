var MAX_HEIGHT = window.innerHeight*99.8;
var MAX_WIDTH = window.innerWidth*99/100;

var navBar = document.getElementById("navBar");
var momentsBar = document.getElementById("momentsBar");
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


window.addEventListener('DOMContentLoaded', function(){  
	test_genOutputs();
    setCalendar();
}, false);

function setCalendar(){
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var date = d.getDate();
    
    var yearBg = document.getElementById('year-bg');
    var monthBg = document.getElementById('month-bg');
    var dateBg = document.getElementById('date-bg');

    yearBg.textContent = year;
    monthBg.textContent = month;
    dateBg.textContent = date;
}

itemFactoryButton.addEventListener('click', function(){
    mainContentWrapper.style.display = 'none';
    itemFactory.style.display = 'block';
    itemFactoryButton.style.display = 'none';
    uploadFile.style.display = 'block';
    uploadText.style.display = 'none';
    closeButton.style.display = 'block';
},false);

closeButton.addEventListener('click', function(){
    mainContentWrapper.style.display = 'block';
    itemFactory.style.display = 'none';
    itemFactoryButton.style.display = 'block';
    closeButton.style.display = 'none';
},false);

//confirm버튼 누르면 이미지를 서버로 보내기.
confirmButton.addEventListener('click', function(e){
	e.preventDefault();

    //파일 없을때 에러처리
    if(fileInput.files.item(0)===null){
        alert('no image');
    }
    else{
        //AJAX로 데이터 받아오기
        var request = new XMLHttpRequest();
        var formData = new FormData();
        formData.append("image", fileInput.files[0]);

        //길을 열어라!
        request.open("POST" , "/upload-image" , true);
        //보내라!
        request.send(formData);
        //받아와라!(data가 load되면 실행)
        request.addEventListener('load', function(){
            //받아온 JSON
            console.log(request.responseText);
            var result = JSON.parse(request.responseText)

            //텍스트 입력창으로 전환
            uploadText.style.display = 'block';
            uploadFile.style.display = 'none';
            closeButton.style.display = 'none';

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
},false);

//moments bar 안의 moment 클릭시 output페이지로 이동
