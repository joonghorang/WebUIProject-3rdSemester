define(function (require){
    var imageInput = document.getElementById("image-input-hidden");
    var imageInputButton = document.getElementById("image-input-button");
    
    imageInput.addEventListener('change', function(){
        var XHR = new XMLHttpRequest();
        var formData = new FormData();
        formData.append("image", this.files[0]);
        
        XHR.open('post', '/', true);
        XHR.send(formData);
    });
    
    imageInputButton.addEventListener("drop", function(e){
        e.stopPropagation();
        e.preventDefault();
        var files = e.target.files || e.dataTransfer.files;
        //image 인지 판별 코드 필요.
        imageInput.files = files;
    }, false);
    
    //왜인지 모르게 이부분이 있어야 드래그로 사진을 옮겼을때 크롬에서 이미지가 열려져버리는 일이 발생하지 않는다.
    imageInputButton.addEventListener("dragover", function(e){
        e.stopPropagation();
        e.preventDefault();
    }, false);
});