define(["commonCanvas","app/gradation"], function(cmCvs, grad){
    var INK_AND_PAPER_WIDTH = 600;
    var INK_AND_PAPER_HEIGHT = 600;
    Canvas = cmCvs.Canvas;
    
    ink1 = Canvas(INK_AND_PAPER_WIDTH, INK_AND_PAPER_HEIGHT);
    ink2 = Canvas(INK_AND_PAPER_WIDTH, INK_AND_PAPER_HEIGHT);
    ink3 = Canvas(INK_AND_PAPER_WIDTH, INK_AND_PAPER_HEIGHT);
    
    inkWrapper = document.getElementById("gradation-wrapper");
    
    grad.inkAndPaper(ink1, "#AEFBCF", "#0365F8", 0.5, 0.5, 0.05, 300);
    ink1.class = "ink";
    inkWrapper.appendChild(ink1);
        
//    var image = new Image();
//    image.src = "target_image_data";
//    image.addEventListener("load", function(){
//        var iCanvas = cmCvs.createCanvasByImage(this);
//        shell.appendChild(iCanvas);      
////
////        shell.appendChild(gradation.cv(iCanvas, [1,1,1,
////                                         1,1,1,
////                                         1,1,1]));  
////        shell.appendChild(gradation.cv(iCanvas, [1,1,1,1,1,
////                                         1,1,1,1,1,
////                                         1,1,1,1,1,
////                                         1,1,1,1,1,
////                                         1,1,1,1,1])); 
////        shell.appendChild(gradation.cv(iCanvas, [1,4,1,4,6,4,1,4,1]));    
////        shell.appendChild(gradation.cv(iCanvas, [ 1, 4, 7, 4, 1,
////                                          4,16,26,16, 4,
////                                          7,26,41,26, 7,
////                                          4,16,26,16, 4, 
////                                          1, 4, 7, 4, 1]));    
//
//        shell.appendChild(cv(iCanvas, [ 0,1, 0,
//                                       1, -4,1,
//                                        0,1, 0]));    
//    });

//    var canvas = document.createElement("canvas");
//    canvas.id = "gradient";
//    canvas.width = CANVAS_WIDTH;
//    canvas.height = CANVAS_HEIGHT;
//    shell.appendChild(canvas);
//
//    var canvas2 = document.createElement("canvas");
//    canvas2.id = "gradient2";
//    canvas2.width = CANVAS_WIDTH;
//    canvas2.height = CANVAS_HEIGHT;
//    shell.appendChild(canvas2);
//
//    var ctx = canvas.getContext("2d");
//    ctx.fillStyle = "#000000";
//    ctx.fillRect(20,20, CANVAS_WIDTH, CANVAS_HEIGHT);
//
//    gradation.gradient(canvas, "#46DB23", "#E6E032");
//    gradation.gradientWithNoise(canvas2, "#46DB23","#E6E032", 0.3);

    //shell.appendChild(drawHistogram(testGaussian(0.5), window.innerWidth, 200));
    //shell.appendChild(drawHistogram(testGaussian(1.0), window.innerWidth, 200));
    //shell.appendChild(drawHistogram(testGaussian(2.0), window.innerWidth, 200));
    //shell.appendChild(drawHistogram(testGaussian(3.0), window.innerWidth, 200));
});