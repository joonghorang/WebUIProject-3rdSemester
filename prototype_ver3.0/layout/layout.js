window.addEventListener('DOMContentLoaded', function(){
    inputMenuControl();
    selectFile();
},false)

function inputMenuControl(){
    var menu = document.querySelector('.input_menu');
    var menubutton = document.querySelector('.menu_button');
    menubutton.addEventListener('click', function(){
        if(menu.style.display === 'none'){
            menu.style.display = 'block';
            menubutton.style.backgroundImage = 'url(./menu_button_close.png)';
        }
        else{ 
            menu.style.display = 'none';
            menubutton.style.backgroundImage = 'url(./menu_button_open.png)';
        }
    },false);
}

/*팀 설명용 임시 효과. 파일 업로드 시 미리보기 창 정도의 느낌.*/
function selectFile(){
    var menu_bg = document.querySelector('.input_menu_bg');
    var file = document.querySelector('input:nth-child(1)');
    var preview = document.querySelector('.inputFilePreview');
    
    file.addEventListener('click', function(){
        menu_bg.style.transition = 'transform 1s';
        menu_bg.style.transform = 'scaleY(18)';
        preview.style.display = 'block';
    },false);
}