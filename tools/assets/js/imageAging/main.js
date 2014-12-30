define(['impressive', 'fading', 'commonCanvas'], function(Impressive, fading, cmCvs){
    var img = document.getElementById('image');
    fadingCanvas = cmCvs.createCanvasByImage(img, 100000);
    var main = document.getElementById("fading");
    main.appendChild(fadingCanvas);
    var imp = Impressive(img);
    
    var hueList = imp.pickedHues.slice(0);
    var nowHue = hueList.pop();
    var INITIAL_RATE= 1;
    var rate = INITIAL_RATE;

    var intervalId = setInterval(drawFading, 500); 
    
    function drawFading(){
        console.log("interval");
        var affected = fading(fadingCanvas, nowHue.rangeL, nowHue.rangeR, rate );
        if(!affected){
            if(hueList.length <= 0){
                clearInterval(intervalId);   
            }else{
                nowHue = hueList.pop();
                rate = INITIAL_RATE;
            }
        }else{
            rate -= 0.1;   
        }
    }
});
