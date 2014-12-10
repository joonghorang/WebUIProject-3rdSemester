window.addEventListener('DOMContentLoaded', function(){
    setFrameStyle();
},false)

function setFrameStyle(){
    var frame = document.getElementById('frame');
    frame.style.width = window.innerHeight*0.85 + 'px';
    frame.style.height = window.innerHeight*0.85+'px';
}

