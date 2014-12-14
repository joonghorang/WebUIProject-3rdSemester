define(function (require){
    var shell = document.getElementById('shell');
    var canvas = document.createElement('canvas');
    var image = new Image();
    image.src = '../image/201412140042_wdm3n.jpg';
    var ctx = canvas.getContext("2d");
    canvas.width = 770;
    canvas.height = 576;
    image.onload = function(){
        ctx.drawImage(image,0,0, image.width, image.height, 0,0, canvas.width, canvas.height);
    }
    //shell.appendChild(canvas);

//    var rImageData = rCtx.createImageData(rCanvas.width, rCanvas.height);
//    rCtx.putImageData(rImageData);
    var rgbIndexGlobal = 0;
    var br = 50;
    var t = 0;
    var interval = 0;
    setInterval(function(){
        var rCanvas = document.createElement('canvas');
        rCanvas.width = 770;
        rCanvas.height = 576;
        rCanvas.setAttribute("class", "interval");
        var rCtx = rCanvas.getContext("2d");
        var imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
        var rImageData = rCtx.createImageData(rCanvas.width, rCanvas.height);
        var rgbIndex = rgbIndexGlobal;
        for( var y = 0; y < rCanvas.height; ++y){
            for( var x = 0; x < rCanvas.width; ++x){
                rgbIndex = (rgbIndex + 1)%3;
                var index = (y * rCanvas.width + x) * 4;
                rImageData.data[index + rgbIndex] = imageData.data[index + rgbIndex];
                rImageData.data[index + 0] = (rImageData.data[index + 0]+br > 255)? 255: rImageData.data[index + 0]+br;
                rImageData.data[index + 1] = (rImageData.data[index + 1]+br > 255)? 255: rImageData.data[index + 1]+br;
                rImageData.data[index + 2] = (rImageData.data[index + 2]+br > 255)? 255: rImageData.data[index + 2]+br;
                
                rImageData.data[index + 3] = 255;
            }
        }
        
        rCtx.putImageData(rImageData,0,0);
        shell.insertBefore(rCanvas, shell.firstChild);
        shell.removeChild(shell.childNodes[2]);
        shell.childNodes[1].style.opacity = "0";
//        cv(rCanvas, [1,1,1,
//                    1,1,1,
//                    1,1,1]);
        rgbIndexGlobal = (rgbIndexGlobal+1)%3;
        interval = (Math.pow(t, 2) - 2 * t + 1.1 ) * 1000;
        t = t + 0.05;
        if(t > 2) t -= 2;
    }, 1000);
    
    var cv = function(canvas, mat){
    var matSize = Math.sqrt(mat.length);
    var matSum = mat.reduce(function(p, c){ return p+c; });
    var ctx = canvas.getContext("2d");
    var imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
    var rImageData = ctx.createImageData(canvas.width, canvas.height);
    var rSum;   
    var gSum;
    var bSum;
    var index;
    var cvRange = parseInt(matSize/2);
    for(var y = 0; y < canvas.height; ++y){
        for(var x = 0; x< canvas.width; ++x){
            rSum = 0;
            gSum = 0;
            bSum = 0;
            if( x > cvRange && y > cvRange && x < canvas.width - cvRange && y < canvas.height - cvRange ){
                index = (y * canvas.width + x) * 4;
                for(var i = -cvRange; i <= cvRange; ++i ){
                    for(var j = -cvRange; j<= cvRange; ++j ){
                        var matIndex = (i+cvRange)*matSize + j + cvRange;
                        var imgIndex = (j*canvas.width + i) * 4;
                        rSum += imageData.data[index + imgIndex + 0] * mat[matIndex];
                        gSum += imageData.data[index + imgIndex + 1] * mat[matIndex];
                        bSum += imageData.data[index + imgIndex + 2] * mat[matIndex];
                    }
                }                   
            }

            var rResult = parseInt(rSum/matSum);
            if(rResult < 0 ) rResult = 0;
            if(rResult > 255) rResult = 255;
            var gResult = parseInt(gSum/matSum);
            if(gResult < 0 ) gResult = 0;
            if(gResult > 255) gResult = 255;
            var bResult = parseInt(bSum/matSum);
            if(bResult < 0) bResult = 0;    
            if(bResult > 255) bResult = 255;
            rImageData.data[index + 0] = rResult;
            rImageData.data[index + 1] = gResult;
            rImageData.data[index + 2] = bResult;
            rImageData.data[index + 3] = 255;
        }      
    }
    ctx.putImageData(rImageData, 0, 0);
    return rCanvas;
};
    
});