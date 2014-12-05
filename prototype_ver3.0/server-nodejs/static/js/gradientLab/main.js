var wrapper = document.getElementById("wrapper");
//var image = document.getElementById("image");
var image = new Image();
image.src = "../../" + imageSrc;
var CANVAS_WIDTH = window.innerWidth - 50;
var CANVAS_HEIGHT = 400;


image.addEventListener("load", function(){
    var iCanvas = createCanvasByImage(this);
    wrapper.appendChild(iCanvas);      

    wrapper.appendChild(cv(iCanvas, [1,1,1,1,1,1,1,1,1]));  
    wrapper.appendChild(cv(iCanvas, [1,1,1,1,1,
                                     1,1,1,1,1,
                                     1,1,1,1,1,
                                     1,1,1,1,1,
                                     1,1,1,1,1])); 
    wrapper.appendChild(cv(iCanvas, [1,4,1,4,6,4,1,4,1]));    
    wrapper.appendChild(cv(iCanvas, [ 1, 4, 7, 4, 1,
                                      4,16,26,16, 4,
                                      7,26,41,26, 7,
                                      4,16,26,16, 4, 
                                      1, 4, 7, 4, 1]));    

    wrapper.appendChild(cv(iCanvas, [1,1,1,1,-4,1,1,1,1]));    

});

//var canvas = document.createElement("canvas");
//canvas.id = "gradient";
//canvas.width = CANVAS_WIDTH;
//canvas.height = CANVAS_HEIGHT;
//wrapper.appendChild(canvas);
//
//var ctx = canvas.getContext("2d");
//ctx.fillStyle = "#000000";
//ctx.fillRect(20,20, CANVAS_WIDTH, CANVAS_HEIGHT);
//
//gradient(canvas, "#46DB23", "#E6E032");