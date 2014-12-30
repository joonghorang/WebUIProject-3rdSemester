define(['squareLetters'], function (SquareLetters){
    var square = new SquareLetters(10,10);
    var defaultLetters = [['가','가','가','가','가','가','가','가','가','가'],
                          ['나','나','나','나','나','나','나','나','나','나'],
                          ['다','다','다','다','다','다','다','다','다','다'],
                          ['라','라','라','라','라','라','라','라','라','라'],
                          ['마','마','마','마','마','마','마','마','마','마'],
                          ['바','바','바','바','바','바','바','바','바','바'],
                          ['사','사','사','사','사','사','사','사','사','사'],
                          ['아','아','아','아','아','아','아','아','아','아'],
                          ['자','자','자','자','자','자','자','자','자','자'],
                          ['차','차','차','차','차','차','차','차','차','차']];
    
    var bgFont =  { 'name' : 'nanumMyeongjo', 'color' : '#000000', 'size' : 30}
    var textFont =  { 'name' : 'nanumMyeongjo', 'color' : '#FF0000', 'size' : 30}
    square.setDefault(defaultLetters, bgFont);
//    square.setLetter("흐음", 7, 8, textFont);
    square.randomSetLetters(['흐으으음', '흐음', '흐흐흐', '아아아아아아아아아아아'], textFont);
    var canvas = square.toCanvas(30,30,50);
    
    var shell = document.getElementById('shell');
    shell.appendChild(canvas);
    
    
    
    
});