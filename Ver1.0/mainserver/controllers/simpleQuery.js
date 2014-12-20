(function() {
    var simpleQuery = {
        INSERT_INTO : function(table, opt, values){
            values = typeof opt !== "string" &&
                values === "undefined" ? opt : values;
            var query = "INSERT INTO ";
            query += table + " ";
            query += opt; 
            
        }
    }
    if (typeof module !== "undefined" && module.exports) {
        module.exports = Query;
    }
})();