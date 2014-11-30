var item_factory = document.getElementById("item-factory");
var XHR = new XMLHttpRequest();



var addEventToItemFactory = function(){
    var upload_image_hidden = document.getElementById("upload-image-hidden");
    
    upload_image_hidden.addEventListener("change", function(){
        var formData = new FormData();
        formData.append("image", this.files[0]);
        
        XHR.open("post", "/itemFactory/image", true);
        XHR.send(formData);
    });
    
    XHR.onreadystatechange = function() 
    {
        if (XHR.readyState == 4 && XHR.status == 200) 
        {
            alert(XHR.response);
        }
    }
}

window.addEventListener('DOMContentLoaded', function(){
    addEventToItemFactory();
},false);
