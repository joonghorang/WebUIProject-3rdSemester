var rgbToHexStr = function(r,g,b){
    var rStr = r.toString(16);
    if(rStr.length == 1) rStr = "0" + rStr;
    var gStr = g.toString(16);
    if(gStr.length == 1) gStr = "0" + gStr;
    var bStr = b.toString(16);
    if(bStr.length == 1) bStr = "0" + bStr;
    
    return "#"+rStr+gStr+bStr;
}