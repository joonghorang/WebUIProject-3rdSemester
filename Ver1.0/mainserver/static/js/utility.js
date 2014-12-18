// utility function
function show(ele){
    ele.style.display = "display";
}
function hide(ele){
    ele.style.display = "none";
}

function display(elements, state){
    for(var i=0 ; i<elements.length ; i++){
        elements[i].style.display = state === 'show'? 'block':'none';
    }
};

// test MainPage Generator
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
