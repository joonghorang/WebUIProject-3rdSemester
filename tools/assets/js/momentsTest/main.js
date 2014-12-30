define(["app/drawText"], function(drawText){
    momentCanvases = document.getElementsByClassName('moment-canvas');

    if(momentCanvases.length !== bgColorsArr.length || momentCanvases.length !== textColorsArr.length) throw err;

    for(var momentIdx = 0; momentIdx< momentCanvases.length; ++momentIdx){
        var canvas = momentCanvases[momentIdx];
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = bgColorsArr[momentIdx][0];
        ctx.fillRect(0,0, canvas.width, canvas.height);
        drawTextOn(canvas, text, textColorsArr[momentIdx][0]);
    }   
});
