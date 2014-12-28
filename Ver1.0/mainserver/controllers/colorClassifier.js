(function() {
var isNodeModule = typeof module !== 'undefined' && module.exports;
var isRequirejsModule = typeof define === 'function' && define.amd;

var tc;
var Impressive;
if(isNodeModule){
    tc = require("tinycolor2");
    Impressive = require("impressive");
}else if(isRequirejsModule){
    define(["tinycolor2"], function(tinycolor){ 
        tc = tinycolor;
        return colorClassifier; 
    });
/* export normal browser */
}else{
    tc = window.tinycolor;
    window.colorClassifier = colorClassifier;
}    
var hContrastRate = Impressive.hContrastRate;
var sContrastRate = Impressive.sContrastRate;
var vContrastRate = Impressive.vContrastRate;
var colorClassifier = function colorClassifier(impressive){
    if(!(this instanceof colorClassifier)){
        return new colorClassifier(impressive);   
    }
    if(impressive instanceof Impressive){
        console.log(impressive.dominantColors);
        this.bgColors = new Colors();
        this.textColors = new Colors();
        this.middleColors = new Colors();
        if(impressive.pickedColors.length >= 2){
            //높은 채도의 색이 없을 때.
            if( impressive.highSatColors.length < 1){
                this.bgColors.push(impressive.dominantColors[0]);
                this.bgColor = this.bgColors[0];
                for(var i = 1; i<impressive.dominantColors.length; ++i){
                    if(isGoodForText.call(this,impressive.dominantColors[i])){
                        this.textColors.push(impressive.dominantColors[i]);
                    }else if(isSimilar(this.bgColor, impressive.dominantColors[i])){
                        this.bgColors.push(impressive.dominantColors[i]);
                    }else{
                        this.middleColors.push(impressive.dominantColors[i]);
                    }   
                }
                if(this.textColors.length <= 0){
                    if(this.middleColors.length > 0){
                        this.textColors.pushArray(this.middleColors);
                    }else{
                        //find 제일 다른거.
                        this.textColors.push(impressive.dominantColors[1]);
                        this.textColor = this.textColors[0];
                        this.bgColors.splice(this.bgColors.indexOf(this.textColor),1);
                    }
                }
                

        
                        
                
//                                if( impressive.chromaColors.length > 0){
//                    if( impressive.chromaColors[0].rate ){
//                        
//                    }else{
//                        
//                    }
//                    this.textColors = new Colors([impressive.chromaColors]);
//                }else{
//                    
//                }
//                this.textColor = this.textColors[0];
//                this.bgColors.splice(this.bgColors.indexOf(this.textColor),1);
            //높은 채도의 색이 있을 때
            }else{
                this.textColors.pushArray(impressive.highSatColors);
                this.textColor = this.textColors[0];
                for(var i = 0; i< impressive.dominantColors.length; ++i){
                    if(isGoodForBg.call(this,impressive.dominantColors[i])){
                        this.bgColors.push(impressive.dominantColors[i]);
                    }else if(isSimilar(this.textColor, impressive.dominantColors[i])){
                        this.textColors.push(impressive.dominantColors[i]);
                    }else{
                        this.middleColors.push(impressive.dominantColors[i]);
                    }
                }
            }
            function isGoodForBg(bgColor){
                var textColor = this.textColors[0];
                console.log(textColor.v, bgColor.v);
                if( vContrastRate(textColor.v, bgColor.v) > 0.28 ||
                   ((bgColor.v > 0.3 && textColor.v > 0.3) && 
                   ( bgColor.s > 0.2 && textColor.s > 0.2 &&
                   hContrastRate(textColor.h, bgColor.h) > 0.3))) return true;
                else return false;
            }
            function isGoodForText(textColor){
                var bgColor = this.bgColors[0];
                console.log(textColor.v, bgColor.v);
                console.log(hContrastRate(bgColor.h, textColor.h));
                if( vContrastRate(bgColor.v, textColor.v) > 0.28 || 
                   ((bgColor.v > 0.3 && textColor.v > 0.3) && 
                   ( bgColor.s > 0.2 && textColor.s > 0.2 &&       
                   hContrastRate(bgColor.h, textColor.h) > 0.3))) return true;
                else return false;
            }
            function isSimilar(color1, color2){
                if( vContrastRate(color1.v, color2.v) < 0.2 ||
                   sContrastRate(color1.s, color2.s) < 0.2 ||
                   hContrastRate(color1.h, color2.h) < 0.2) return true;
                else return false;
            }
        }
        else if(impressive.pickedColors.length === 1){
            this.bgColors[0] = impressive.pickedColors[0];
            this.textColor = {
                r: 220,
                g: 220,
                b: 220,
                a: 255
            }
        }else{
            this.bgColors[0] = {
                r: 200, 
                g: 200,
                b: 200,
                a: 255,
            };
            this.textColor = {
                r: 100,
                g: 100,
                b: 100,
                a: 255
            };   
        }
//    this.bgColor = [];
//    if(colorList.length === 0){
//        this.bgColor[0] = {
//            r: 200, 
//            g: 200,
//            b: 200,
//            a: 255,
//        };
//        this.textColor = {
//            r: 100,
//            g: 100,
//            b: 100,
//            a: 255
//        };
//    }else if(colorList.length === 1){
//        this.bgColor[0] = colorList[0];
//        this.textColor = {
//            r: 220,
//            g: 220,
//            b: 220,
//            a: 255
//        };
//    }else{
//        this.textColor = colorList[1];
//        this.bgColor = colorList.slice(0);
//        this.bgColor.splice(this.bgColor.indexOf(this.textColor),1);
//        
    }
}
colorClassifier.prototype ={
    textColorRgb : function(){
        return this.textColor;    
    },
    bgColorRgb : function(){
        return this.bgColor;
    },
    textColorHex : function(){
        return tc(this.textColor).toHexString();
    },
    bgColorHex : function(){
        var hex = [];
        for(var i = 0; i<this.bgColor.length; ++i){
             hex[i] = tc(this.bgColor[i]).toHexString();
        }
        return hex;
    }
}

function classifySimilar(colors){  
    var similar = new Colors();
    var dissimilar = new Colors();
    
    for(var i = 0 ; i < colors.length; ++i){
        
    }
}

function Colors(arr){
    var colorsArr
    if(arr instanceof Array){
        colorsArr = new Array(arr.length);
        for(var i=0; i < arr.length; ++i){
            colorsArr[i] = arr[i];   
        }
    }else{
        colorsArr = new Array();    
    }
    colorsArr.toRgb = function(num){
        num = typeof num !== "undefined" ? num : 100;
        var pickedRgb =[];
        for(var i = 0; i < this.length && i < num; ++i){
            var tmpColor = {
                h: this[i].h,
                s: this[i].s,
                v: this[i].v
            }
            pickedRgb[i] = tc(tmpColor).toRgb();
        }
        return pickedRgb;
    },
    colorsArr.toHexString = function(num){
        num = typeof num !== "undefined" ? num : 100;
        var pickedHexString =[];
        for(var i = 0; i < this.length && i < num; ++i){
            var tmpColor = {
                h: this[i].h,
                s: this[i].s,
                v: this[i].v
            }
            pickedHexString[i] = tc(tmpColor).toHexString();
        }
        return pickedHexString;
    }
    colorsArr.pushArray = function(arr){
        if(arr instanceof Array){
            for(var i =0; i< arr.length; ++i){
                this[this.length] = arr[i];   
            }
        }
    }
    return colorsArr;
}
/* Export Setting */    
/* export node module */
if(isNodeModule){
    module.exports = colorClassifier;
/* export requirejs module */
}
})();