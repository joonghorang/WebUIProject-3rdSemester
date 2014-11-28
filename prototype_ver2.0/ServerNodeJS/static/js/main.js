(function main(){
    var data = document.getElementById("data");
    var fileInput = document.getElementById("file-input");
    var textInput = document.getElementById("text-input");
    var submitButton = document.getElementById("submit-button");
    
    //이미지 첨부한 뒤 액션.
    fileInput.addEventListener("change", function(){
        console.log("gege");
    });
    
    //submit버튼 누른 후 액션.
    submitButton.addEventListener("click", function(e){
        e.preventDefault();
        if(fileInput.files.length < 1){
           console.log("no image");
       }else{
           data.submit();
       }
    });
                    
    
})();