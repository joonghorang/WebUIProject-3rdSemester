(function(){
var isNodeModule = typeof module !== 'undefined' && module.exports;
var isRequirejs = typeof define === 'function' && define.amd;
     
/* Constructor Setting */
if(isNodeModule){
    Canvas = require("canvas");   
    Image = Canvas.Image;
}else {
    Canvas = function(width, height){
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        return canvas;
    }
    if(isRequirejs){
        define(["commonCanvas"], function(cmCvs){
            commonCanvas = cmCvs;
            return SquareLetters; 
        });
    }
}

var SquareLetters = function SquareLetters(width, height){
    var letters = [];
    letters.width = width;
    letters.height = height;
    for(var x =0; x <width; ++x){
        letters[x] = new Array(height);
    }
    var defaultLetters = [];
    for(var x =0; x <width; ++x){
        defaultLetters[x] = new Array(height);
    }
    var fontDatas = []
    for(var x =0; x <width; ++x){
        fontDatas[x] = new Array(height);
    }
    letters.default = defaultLetters;
    letters.fontDatas = fontDatas;

    letters.setDefault = function(defaultLetters, fontData){
        for(var x= 0; x< this.width; ++x){
            for(var y= 0; y< this.height; ++y){
                this.default[x][y] = defaultLetters[x][y];  
                this.fontDatas[x][y] = fontData;
            }
        }
    };
    letters.setLetter = function(letter, letterX, letterY, fontData){
        if(letter instanceof Array){
            fontData = letterX;
            for(var x= 0; x< this.width; ++x){
                for(var y= 0; y< this.height; ++y){
                    this[x][y] = letter[x][y];   
                    this.fontDatas[x][y] = fontData;
                }
            }
        }else if(typeof letter === 'string'){
            if((this.width > letterX + letter.length - 1) && this.height > letterY ){
                for(var i = 0; i <letter.length; ++i){
                    this[letterX + i][letterY] = letter[i];   
                    this.fontDatas[letterX+i][letterY] = fontData;
                }
                return true;
            }else{
                return false;   
            }
        }
    };
    letters.randomSetLetters = function(letterList, fontData){
        var letterCount = 0;
        var longerThanWidth = 0;
        for(var i=0; i< letterList.length; ++i){
            if(letterList[i] === '') letterList.splice(i, 1);
            letterCount += letterList[i].length; 
            var times = parseInt(letterList[i].length / this.width)
            if(times > 0) longerThanWidth += times;
        }
        if(letterCount >= this.width * this.height){
            return false;
        }else if(letterList.length + longerThanWidth <= this.height){
            var lines = randomPick(this.height - longerThanWidth, letterList.length);
            lines.sort();
            for(var i =0; i< letterList.length; ++i){
                var letterY = lines[i];   
                var times = parseInt(letterList[i].length / this.width);
                if(times > 0){
                    for(var j =i+1; j< letterList.length; ++j){
                        lines[j] += times; 
                    }  
                } 
                var canMove = ((times+1)*this.width - letterList[i].length);
                var letterX = Math.floor(Math.random() * canMove);
                var firstLetter = letterList[i].slice(0, this.width - letterX);
                console.log(firstLetter);
                var remainLetter = letterList[i].slice(this.width - letterX, letterList[i].length);
                this.setLetter(firstLetter, letterX, letterY, fontData);
                for(var j = 0; j < times; ++j){
                    var letter = remainLetter.slice(0, this.width);
                    this.setLetter(letter, 0, ++letterY, fontData);
                    remainLetter = remainLetter.slice(this.width, remainLetter.length);
                }
            }
        }else{
            
        }
        function randomPick(poolNum, pickNum){
            if(poolNum >= pickNum){
                var pool = [];
                var pick = [];
                for(var i =0; i < poolNum; ++i){
                    pool[i] = i;   
                }
                for(var i =0; i< pickNum; ++i){
                    var index = Math.floor(Math.random() * pool.length);
                    pick.push(pool.splice(index, 1)[0]);
                }
                return pick;
            }
        }
    }
    letters.toCanvas = function(letterWidth, letterHeight, margin, bgCanvas){
        if(commonCanvas.isCanvas(margin)){
            bgCanvas = margin;
            margin = 0;
        }
        margin = typeof margin !== 'undefined' ? margin : 0;
        var canvasWidth = letterWidth * this.width + 2 * margin;
        var canvasHeight = letterHeight * this.height + 2 * margin;
        
        bgCanvas = typeof bgCanvas !== 'undefined' ? bgCanvas : new Canvas(canvasWidth, canvasHeight);
        bgCtx = bgCanvas.getContext('2d');
        for(var x = 0; x <this.width; ++x){
            for(var y =0; y<this.height; ++y){
                var letter = typeof this[x][y] !== 'undefined' ? this[x][y] : this.default[x][y];   
                if(letter){
                    var letterCanvas = new Canvas(letterWidth, letterHeight);

                    var letterCtx = letterCanvas.getContext('2d');
                    commonCanvas.setText(letterCtx, letter, letterWidth/2, letterHeight/2, 'center', 'middle', fontDatas[x][y]);
                    var letterXPos = margin + x * letterWidth;
                    var letterYPos = margin + y * letterHeight;
                    bgCtx.drawImage(letterCanvas, letterXPos, letterYPos);
                }
            }
        }
        return bgCanvas;
    }
    return letters;
}
    
if(isNodeModule){
    module.exports = SquareLetters;
}else {
    window.SquareLetters = SquareLetters;
}
})();