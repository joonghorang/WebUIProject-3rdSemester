(function() {
    var moment;
    if (typeof module !== "undefined" && module.exports) {

    }else{
           
    }
    var mytools = {
        genFileName: function(){
            var toYYYYMMDDHHmm = function(date) {
                    var YYYY = date.getFullYear().toString();
                    var MM = (date.getMonth()+1).toString();
                    var DD  = date.getDate().toString();
                    var HH = date.getHours().toString();
                    var mm = date.getMinutes().toString();
                    return YYYY + (MM[1]?MM:"0"+MM[0]) + (DD[1]?DD:"0"+DD[0]) + (HH[1]?HH:"0"+HH[0]) + (mm[1]?mm:"0"+mm[0]);
            };
            return toYYYYMMDDHHmm(new Date()) 
            + '_' 
            + Math.random().toString(36).substr(2, 5);    
        }
    }
    
    if (typeof module !== "undefined" && module.exports) {
        module.exports = mytools;
    }
})();