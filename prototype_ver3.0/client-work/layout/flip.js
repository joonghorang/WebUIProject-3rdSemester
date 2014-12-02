var colorlist = ['#af70fa', '#40e0d0', '#008080','#b6fcd5','#00ced1','#ffa500','#ffc3a0','#a0db8e','#dddddd','#c0d6e4','#6897bb','#f4591d', '#191970','#f5f5dc','#468499','#cbbeb5','#6dc066','#b0e0e6','#d3ffce','#81d8d0'];
var frontlist = document.getElementsByClassName('front');
var backlist = document.getElementsByClassName('back');

for(var i =0 ; i< frontlist.length ; i++){
    frontlist[i].style.backgroundColor = colorlist[i%20];
}

for(var i =0 ; i<backlist.length;i++){
    backlist[i].style.backgroundImage = 'url(./'+ (i%11+1) + '.jpg)';
}