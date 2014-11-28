var item_factory = document.getElementById("item-factory");
var XHR = new XMLHttpRequest();



var addEventToItemFactory = function(){
    var upload_image_hidden = document.getElementById("upload-image-hidden");
    
    upload_image_hidden.addEventListener("change", function(){
        var formData = new FormData();
        formData.append("image", this.files[0]);
        
        XHR.open("post", "/itemFactory/image", true);
        XHR.setRequestHeader("Content-Type", "multipart/form-data");
        XHR.send(formData);
    });
    
    XHR.onreadystatechange = function() 
    {
        if (XHR.readyState == 4 && XHR.status == 200) 
        {
            alert(XHR.statusText);
        }
    }
}

window.addEventListener('DOMContentLoaded', function(){
    addEventToItemFactory();
},false);
