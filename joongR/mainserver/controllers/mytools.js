(function() {
    if (typeof module !== "undefined" && module.exports) {

    }else{
           
    }
    var mytools = {
        genId: function(date){
            return this.toYYYYMMDDHHmm(date) 
            + '_' 
            + Math.random().toString(36).substr(2, 5);    
        },
        toYYYYMMDDHHmm : function(date) {
            var YYYY = date.getFullYear().toString();
            var MM = (date.getMonth()+1).toString();
            var DD  = date.getDate().toString();
            var HH = date.getHours().toString();
            var mm = date.getMinutes().toString();
            return YYYY + (MM[1]?MM:"0"+MM[0]) + (DD[1]?DD:"0"+DD[0]) + (HH[1]?HH:"0"+HH[0]) + (mm[1]?mm:"0"+mm[0]);
        },
        toYYYYMMDDHHmmSSsss : function(date) {
            var YYYY = date.getFullYear().toString();
            var MM = (date.getMonth()+1).toString();
            var DD  = date.getDate().toString();
            var HH = date.getHours().toString();
            var mm = date.getMinutes().toString();
            var SS = date.getSeconds().toString();
            var sss = date.getMilliseconds().toString();
            return YYYY + (MM[1]?MM:"0"+MM) + (DD[1]?DD:"0"+DD) + (HH[1]?HH:"0"+HH) + 
                (mm[1]?mm:"0"+mm) + (SS[1]?SS:"0"+SS) + 
                (sss[1]?(sss[2]?sss:"0"+sss):"00"+sss);
        }
    }
    
    if (typeof module !== "undefined" && module.exports) {
        module.exports = mytools;
    }
})();