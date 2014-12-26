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
var colorClassifier = function colorClassifier(impressive){
    if(!(this instanceof colorClassifier)){
        return new colorClassifier(impressive);   
    }
    if(impressive instanceof Impressive){
        this.bgColors = new Colors();
        this.textColors = new Colors();
        if(impressive.pickedColors.length >= 2){
            //높은 채도의 색이 없을 때.
            if( impressive.highSatColors.length < 1){
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
                this.bgColors = new Colors(impressive.dominantColors);
                this.textColors = new Colors([impressive.dominantColors[1]]);
                this.textColor = this.textColors[0];
                this.bgColors.splice(this.bgColors.indexOf(this.textColor),1);
    
            //높은 채도의 색이 있을 때
            }else{
                this.textColors = new Colors(impressive.highSatColors);
                this.textColor = this.textColors[0];
                this.bgColors = new Colors(impressive.dominantColors);
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
        return this;
    },
    colorsArr.toHexString = function(num){
        num = typeof num !== "undefined" ? num : 100;
        var pickedHexString =[];
        for(var i = 0; i < this.length && i < num; ++i){
            pickedHexString[i] = tc(this[i]).toHexString();
        }
        return pickedHexString;
    }
    colorsArr.pushArray = function(arr){
        if(arr instanceof Array){
            for(var i =0; i< arr.length; ++i){
                colorsArr[i] = arr[i];   
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