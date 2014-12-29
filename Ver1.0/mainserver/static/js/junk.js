var square = new SquareLetters(10,10); //10 x 10 짜리 글자 배열을 생생합니다.

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

var bgFont =  { 'name' : 'nanumMyeongjo', 'color' : '#000000', 'size' : 30} // pixel
var textFont =  { 'name' : 'nanumMyeongjo', 'color' : '#FF0000', 'size' : 30}

square.setDefault(defaultLetters, bgFont);
//    square.setLetter("흐음", 7, 8, textFont); // 직접 위치를 정해서 넣을 수 있음.
//    square.setLetter(defaultLetters, textFont); //이처럼 같은 10x10 글자 배열을 넣을 수도 있음.
square.randomSetLetters(['흐으으음', '흐음', '흐흐흐', '아아아아아아아아아아아'], textFont); // random하게 배치 가능. 긴 단어는 늘여씀.

var letterBoxWidth = 30;
var letterBoxHeight = 30;
var canvasMargin = 50;

var canvas = square.toCanvas(letterBoxWidth,letterBoxHeight,canvasMargin);

var shell = document.getElementById('shell');
shell.appendChild(canvas);