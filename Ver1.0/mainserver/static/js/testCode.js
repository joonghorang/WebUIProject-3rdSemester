var test_genOutputs = function(canvas){
    var colors = document.getElementById("moments");
    for( var i = 0; i < moments.childElementCount; ++i){
        canvas.width  = colors.offsetHeight; 
        canvas.height = colors.offsetHeight;
        test_giveRandomColorTo(canvas);
    }
}

var test_giveRandomColorTo = function(canvas){
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = rgbToHexStr(parseInt(Math.random()*256), parseInt(Math.random()*256), parseInt(Math.random()*256));
    ctx.fillRect(0,0,canvas.width,canvas.height)
}
