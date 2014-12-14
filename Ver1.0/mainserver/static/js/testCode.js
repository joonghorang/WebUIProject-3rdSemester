var test_genOutputs = function(){
    var colors = document.getElementById("moments");
    for( var i = 0; i < 30; ++i){
        var moment = document.createElement("li");
        moment.setAttribute("class", "moment");

        var canvas = document.createElement("canvas");
        canvas.width  = colors.offsetHeight; 
        canvas.height = colors.offsetHeight;
        test_giveRandomColorTo(canvas);
        moment.appendChild(canvas);
        moments.appendChild(moment);
    }
}

var test_giveRandomColorTo = function(canvas){
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = rgbToHexStr(parseInt(Math.random()*256), parseInt(Math.random()*256), parseInt(Math.random()*256));
    ctx.fillRect(0,0,canvas.width,canvas.height)
}
