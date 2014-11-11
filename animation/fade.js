
(function fadeWhenClicked(){
    var image = document.getElementById('image3');

    image.addEventListener('click',function(e){
        this.style.transition = 'opacity .5s ease-in-out';
        if(this.style.opacity===0){
            this.style.opacity=1;
        }
        else{
            this.style.opacity=0;
        }
    },false);
    
})();

$(document).ready(function(){
    $('#image4').click(function(){
        $(this).fadeToggle('50');
    });
});