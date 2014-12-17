(function(){
var isNodeModule = typeof module !== 'undefined' && module.exports;
var isRequirejs = typeof define === 'function' && define.amd;
    
/* Constructor Setting */
if(isNodeModule){

}else {
    
}

var gaussianNoise = {
    genGaussianNoise : function(variance){
        if(typeof variance === "undefined") variance = 1.0;

        if (typeof this.genGaussianNoise.spare !== "undefined") {
             var spare = this.genGaussianNoise.spare;
             delete this.genGaussianNoise.spare;
             return variance * spare;
         } else {
             var rand1 = Math.random();
             rand1 = -2 * Math.log(rand1);

             var rand2 = Math.random();
             rand2 = 2 * Math.PI * rand2;
             this.genGaussianNoise.spare = Math.sqrt(rand1 * variance) * Math.sin(rand2);
             return Math.sqrt(rand1 * variance) * Math.cos(rand2);
         }
    },
    
    testGaussian : function(variance){
        if(typeof variance === "undefined") variance = 1.0;

        var hist = [];
    //    var histLength = variance * 4 * 2 * 100;
        histLength = 2000;
        for( var i = 0; i< histLength; i++){
            hist[i] = 0;   
        }
        for(var i =0; i< 100000; ++i){
            var gauNoise = this.genGaussianNoise(variance);
            gauNoise = Math.round(gauNoise * 100);
            if(gauNoise < histLength/2 && gauNoise > -histLength/2) hist[parseInt(gauNoise + histLength/2)]++;
        }
        return hist;
    }
}
    
if(isNodeModule){
    module.exports = gaussianNoise;
}else if(isRequirejs){
    define(function(){ return gaussianNoise; });
}else{
    window.gaussianNoise = gaussianNoise;
}
})();