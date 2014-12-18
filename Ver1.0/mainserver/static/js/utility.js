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