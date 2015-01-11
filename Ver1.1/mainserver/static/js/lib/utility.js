// utility function
function decimalToHex(num){
    var hexnum = (num).toString(16);
    return hexnum;
}
function combineRgbString(R, G, B){
    var Color = "#" + R.toString() + G.toString() + B.toString();
    return Color;
}
function changeDecToHexColor(r, g, b){
    var result = "#" + zeroCheck((r).toString(16)) 
                     + zeroCheck((g).toString(16)) 
                     + zeroCheck((b).toString(16));
    return result;
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
