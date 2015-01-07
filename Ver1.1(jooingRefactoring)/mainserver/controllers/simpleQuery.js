(function() {
    var simpleQuery = {
        INSERT_INTO : function(table, opt, values){
            function opt2Array(opt){
                //remove space.
                var splited = opt.split(" ");
                var tmpOpt = "";
                for(var i=0; i< splited.length; ++i){
                    tmpOpt += splited[i];
                }
                //remove (, )
                if(tmpOpt[0] === "(" && tmpOpt[tmpOpt.length-1] === ")"){
                    tmpOpt = tmpOpt.slice(1,tmpOpt.length-1);   
                }
                return tmpOpt.split(",");
            }
            var columns;
            if(typeof opt !== "string" && typeof values === "undefined"){
                values = opt;
                opt = " ";
            }else{
                opt = " " + opt + " ";
                columns = opt2Array(opt);
            }
                var query = "INSERT INTO ";
            query += table;
            query += opt; 
            query += "VALUES("
            if(values instanceof Array){
                var i;
                for(i = 0; i< values.length-1; ++i){
                    query += "'" +values[i] + "',";
                }
                query += "'" + values[i] + "');";
            }else if(values instanceof Object){
                var i;
                for(i = 0; i< columns.length-1; ++i){
                    query += "'" +(values[columns[i]]) + "',";   
                }
                query += "'" + (values[columns[i]]) + "');";
            }else{
                console.err("not good values friend");
            }   
            return query;
        }
    }
    if (typeof module !== "undefined" && module.exports) {
        module.exports = simpleQuery;
    }
})();