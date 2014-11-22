window.addEventListener('DOMContentLoaded', function(){
    inputMenuControl();
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
